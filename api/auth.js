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

  const action = req.query.action || "status";
  const data = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const sb = getSupabase();

  // 1. DEMO LOGINS (Group I, II, III, Admin)
  if (action === "demo_g1") {
    const demoUser = {
      id: "demo_ananya_g1",
      full_name: "Ananya Sharma",
      email: "ananya.discovery@gmail.com",
      grade_level: "7",
      school_name: "St. Mary's Convent School",
      city: "Jaipur",
      stream: "general",
      role: "student",
    };
    return res.status(200).json({ success: true, auth: demoUser, profile: demoUser });
  }

  if (action === "demo_g2") {
    const demoUser = {
      id: "demo_rohan_g2",
      full_name: "Rohan Verma",
      email: "rohan.stream@gmail.com",
      grade_level: "10",
      school_name: "Delhi Public School",
      city: "New Delhi",
      stream: "science_pcm",
      role: "student",
    };
    return res.status(200).json({ success: true, auth: demoUser, profile: demoUser });
  }

  if (action === "demo_g3") {
    const demoUser = {
      id: "demo_priya_g3",
      full_name: "Priya Singh",
      email: "priya.decision@gmail.com",
      grade_level: "12",
      school_name: "Kendriya Vidyalaya IIT",
      city: "Bengaluru",
      stream: "science_pcm",
      role: "student",
    };
    return res.status(200).json({ success: true, auth: demoUser, profile: demoUser });
  }

  if (action === "demo_admin") {
    const demoUser = {
      id: "admin_1",
      full_name: "Dr. Khel Shankar (Head Counselor)",
      email: "admin@careermarg.org",
      role: "admin",
      counselor_specialization: "National Career Psychologist",
    };
    return res.status(200).json({ success: true, auth: demoUser, profile: demoUser });
  }

  // 2. SIGNUP
  if (action === "signup") {
    const email = data.email || "";
    const name = data.name || data.fullName || "Student";
    const grade = data.grade || data.gradeLevel || "10";
    const stream = data.stream || "general";
    const newId = "usr_" + Math.random().toString(36).substring(2, 9);

    if (sb) {
      try {
        const { error } = await sb.from("users").insert({
          id: newId,
          name: name,
          email: email,
          role: "student",
          grade_group: grade,
          stream: stream,
        });
        if (error && !error.message.includes("duplicate")) throw error;

        const authUser = {
          id: newId,
          full_name: name,
          email: email,
          grade_level: grade,
          stream: stream,
          role: "student",
        };
        return res.status(200).json({ success: true, auth: authUser, profile: authUser });
      } catch (err) {
        return res.status(200).json({
          success: true,
          auth: { id: newId, full_name: name, email, grade_level: grade, stream, role: "student" },
        });
      }
    }

    try {
      const p = getPool();
      await p.query(
        "INSERT INTO `users` (`id`, `full_name`, `email`, `grade_level`, `stream`, `role`) VALUES (?, ?, ?, ?, ?, 'student')",
        [newId, name, email, grade, stream]
      );
    } catch (_) {}

    const authUser = { id: newId, full_name: name, email, grade_level: grade, stream, role: "student" };
    return res.status(200).json({ success: true, auth: authUser, profile: authUser });
  }

  // 3. SIGNIN
  if (action === "signin") {
    const email = data.email || "";
    if (sb) {
      try {
        const { data: users } = await sb.from("users").select("*").eq("email", email).limit(1);
        if (users && users.length) {
          const u = users[0];
          const authUser = {
            id: u.id,
            full_name: u.name,
            email: u.email,
            grade_level: u.grade_group,
            stream: u.stream,
            role: u.role || "student",
          };
          return res.status(200).json({ success: true, auth: authUser, profile: authUser });
        }
      } catch (_) {}
    }

    try {
      const p = getPool();
      const [users] = await p.query("SELECT * FROM `users` WHERE `email` = ? LIMIT 1", [email]);
      if (users.length) {
        return res.status(200).json({ success: true, auth: users[0], profile: users[0] });
      }
    } catch (_) {}

    // Fallback: instant login
    const fallbackUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      full_name: email.split("@")[0] || "Student",
      email: email,
      grade_level: "10",
      stream: "general",
      role: "student",
    };
    return res.status(200).json({ success: true, auth: fallbackUser, profile: fallbackUser });
  }

  // 4. LOGOUT
  if (action === "logout") {
    return res.status(200).json({ success: true, message: "Logged out" });
  }

  return res.status(200).json({ success: true, status: "active" });
};
