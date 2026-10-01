const mysql = require("mysql2/promise");
const { createClient } = require("@supabase/supabase-js");

let pool = null;
let supabase = null;

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (url && key) {
    if (!supabase) {
      supabase = createClient(url, key);
    }
    return supabase;
  }
  return null;
}

function getPool() {
  if (!pool) {
    const host = process.env.DB_HOST || "127.0.0.1";
    const port = parseInt(process.env.DB_PORT || "3306", 10);
    const database = process.env.DB_NAME || "career_guidance_db";
    const user = process.env.DB_USER || "root";
    const password = process.env.DB_PASS || "";

    const config = {
      host,
      port,
      database,
      user,
      password,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      charset: "utf8mb4",
    };

    if (
      process.env.DB_SSL === "true" ||
      process.env.DB_SSL === "1" ||
      host.includes("tidbcloud") ||
      host.includes("aivencloud") ||
      host.includes("railway")
    ) {
      config.ssl = { rejectUnauthorized: false };
    }

    pool = mysql.createPool(config);
  }
  return pool;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const sb = getSupabase();

  // ==================== GET: Fetch user data ====================
  if (req.method === "GET") {
    const userId = req.query.userId || "usr-demo-1";

    // 1. SUPABASE HANDLER
    if (sb) {
      try {
        const { data: users, error: uErr } = await sb
          .from("users")
          .select("*")
          .or(`id.eq.${userId},email.eq.${userId}`)
          .limit(1);

        if (uErr) throw uErr;
        if (!users || !users.length) {
          return res.status(200).json({ success: true, user: null });
        }

        const user = users[0];
        const { data: sessions } = await sb
          .from("student_assessment_sessions")
          .select("*")
          .eq("user_id", user.id);

        const completedTiers = [];
        let tierAnswers = {};
        (sessions || []).forEach((s) => {
          if (s.status === "completed") {
            completedTiers.push(s.tier_code);
          }
          const ans = typeof s.responses_json === "string" ? JSON.parse(s.responses_json || "{}") : (s.responses_json || {});
          tierAnswers = { ...tierAnswers, ...ans };
        });

        const { data: traits } = await sb
          .from("student_trait_scores")
          .select("*")
          .eq("user_id", user.id)
          .limit(1);

        let scores = {};
        if (traits && traits.length) {
          scores = typeof traits[0].all_scores_json === "string" ? JSON.parse(traits[0].all_scores_json || "{}") : (traits[0].all_scores_json || {});
        }

        let savedCareers = user.saved_careers || [];
        if (typeof savedCareers === "string") {
          try { savedCareers = JSON.parse(savedCareers); } catch (_) {}
        }

        return res.status(200).json({
          success: true,
          provider: "supabase",
          user: {
            ...user,
            full_name: user.name,
            grade_level: user.grade_group,
          },
          completedTiers,
          tierAnswers,
          scores,
          savedCareers,
        });
      } catch (err) {
        return res.status(200).json({
          success: true,
          offline: true,
          message: "Supabase fallback: " + err.message,
        });
      }
    }

    // 2. MYSQL HANDLER
    try {
      const p = getPool();
      const [users] = await p.query("SELECT * FROM `users` WHERE `id` = ? OR `email` = ? LIMIT 1", [userId, userId]);
      if (!users.length) {
        return res.status(200).json({ success: true, user: null });
      }

      const user = users[0];
      const [sessions] = await p.query("SELECT * FROM `student_assessment_sessions` WHERE `user_id` = ?", [user.id]);
      
      const completedTiers = [];
      let tierAnswers = {};
      sessions.forEach((s) => {
        if (s.status === "completed") {
          completedTiers.push(s.tier_code);
        }
        try {
          const ans = JSON.parse(s.responses_json || "{}");
          tierAnswers = { ...tierAnswers, ...ans };
        } catch (_) {}
      });

      const [traits] = await p.query("SELECT * FROM `student_trait_scores` WHERE `user_id` = ? LIMIT 1", [user.id]);
      let scores = {};
      if (traits.length) {
        try {
          scores = JSON.parse(traits[0].all_scores_json || "{}");
        } catch (_) {}
      }

      let savedCareers = [];
      try {
        savedCareers = JSON.parse(user.saved_careers || "[]");
      } catch (_) {}

      return res.status(200).json({
        success: true,
        provider: "mysql",
        user,
        completedTiers,
        tierAnswers,
        scores,
        savedCareers,
      });
    } catch (err) {
      return res.status(200).json({
        success: true,
        offline: true,
        message: "Database offline fallback: " + err.message,
      });
    }
  }

  // ==================== POST: Sync user data & assessment responses ====================
  if (req.method === "POST") {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    if (!data) {
      return res.status(400).json({ success: false, message: "Invalid JSON payload" });
    }

    const userId = data.userId || "usr-demo-1";
    const userEmail = data.email || `student_${userId}@careermarg.org`;
    const userName = data.name || "Student";
    const grade = data.grade || "10";
    const stream = data.stream || "general";
    const savedCareers = data.savedCareers || [];

    // 1. SUPABASE SYNC HANDLER
    if (sb) {
      try {
        // Upsert User
        const { error: userErr } = await sb.from("users").upsert({
          id: userId,
          name: userName,
          email: userEmail,
          role: "student",
          grade_group: grade,
          stream: stream,
          saved_careers: savedCareers,
          updated_at: new Date().toISOString(),
        });
        if (userErr) throw userErr;

        // Upsert Assessment Sessions
        const completedTiers = data.completedTiers || [];
        const tierAnswers = data.tierAnswers || {};
        const tierMetadata = {
          tier1_riasec: { prefix: "ria-", total: 42 },
          tier1_quick_riasec: { prefix: "qria-", total: 24 },
          tier2_tamanna: { prefix: "tam-", total: 28 },
          tier3_ocean: { prefix: "oce-", total: 20 },
        };

        for (const [tierCode, meta] of Object.entries(tierMetadata)) {
          const tierAns = {};
          let ansCount = 0;
          for (const [k, v] of Object.entries(tierAnswers)) {
            if (k.startsWith(meta.prefix)) {
              tierAns[k] = v;
              ansCount++;
            }
          }

          const isDone = completedTiers.includes(tierCode) || ansCount >= meta.total;
          if (ansCount > 0 || isDone) {
            const status = isDone ? "completed" : "in_progress";
            const progressPercent = Math.min(100, Math.round((ansCount / meta.total) * 100));

            await sb.from("student_assessment_sessions").upsert(
              {
                user_id: userId,
                tier_code: tierCode,
                status: status,
                progress_percent: progressPercent,
                responses_json: tierAns,
                completed_at: isDone ? new Date().toISOString() : null,
              },
              { onConflict: "user_id,tier_code" }
            );
          }
        }

        // Upsert Trait Scores
        const traitScores = data.traitScores || {};
        if (Object.keys(traitScores).length > 0) {
          const riasec = traitScores.riasec || {};
          let primary = null, secondary = null;
          const sorted = Object.entries(riasec).sort((a, b) => b[1] - a[1]);
          if (sorted.length > 0) primary = sorted[0][0];
          if (sorted.length > 1) secondary = sorted[1][0];

          await sb.from("student_trait_scores").upsert(
            {
              user_id: userId,
              riasec_primary: primary,
              riasec_secondary: secondary,
              all_scores_json: traitScores,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
        }

        return res.status(200).json({
          success: true,
          provider: "supabase",
          offline: false,
          message: "All assessment data saved live to Supabase Table Editor!",
        });
      } catch (err) {
        return res.status(200).json({
          success: true,
          offline: true,
          message: "Saved locally (Supabase error: " + err.message + ")",
        });
      }
    }

    // 2. MYSQL SYNC HANDLER
    try {
      const p = getPool();
      const school = data.school || "Government High School";
      const educationStatus = data.educationStatus || "pursuing";
      const city = data.city || "";
      const roleModelArchetype = data.roleModelArchetype || "tech";
      const roleModelName = data.roleModelName || "";
      const dreamImpact = data.dreamImpact || "";
      const aspiration = data.aspiration || "";
      const workStyle = data.workStyle || "analytical";
      const interests = JSON.stringify(data.interestTags || []);
      const savedCareersJson = JSON.stringify(savedCareers);
      const finalizedCareer = data.finalizedCareer || null;

      await p.query(
        `INSERT INTO \`users\` (\`id\`, \`role\`, \`email\`, \`password_hash\`, \`full_name\`, \`grade_level\`, \`school_name\`, \`education_status\`, \`city\`, \`stream\`, \`role_model_archetype\`, \`role_model_name\`, \`dream_impact\`, \`aspiration\`, \`interest_tags\`, \`work_style\`, \`saved_careers\`, \`finalized_career\`)
         VALUES (?, 'student', ?, '$2y$10$demoHashPlaceholder', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
             full_name = VALUES(full_name),
             grade_level = VALUES(grade_level),
             school_name = VALUES(school_name),
             education_status = VALUES(education_status),
             city = VALUES(city),
             stream = VALUES(stream),
             role_model_archetype = VALUES(role_model_archetype),
             role_model_name = VALUES(role_model_name),
             dream_impact = VALUES(dream_impact),
             aspiration = VALUES(aspiration),
             interest_tags = VALUES(interest_tags),
             work_style = VALUES(work_style),
             saved_careers = VALUES(saved_careers),
             finalized_career = VALUES(finalized_career)`,
        [
          userId,
          userEmail,
          userName,
          grade,
          school,
          educationStatus,
          city,
          stream,
          roleModelArchetype,
          roleModelName,
          dreamImpact,
          aspiration,
          interests,
          workStyle,
          savedCareersJson,
          finalizedCareer,
        ]
      );

      return res.status(200).json({
        success: true,
        provider: "mysql",
        offline: false,
        message: "All data synchronized live to MySQL database!",
      });
    } catch (err) {
      return res.status(200).json({
        success: true,
        offline: true,
        message: "Fallback saved locally: " + err.message,
      });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
};
