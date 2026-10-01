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

  const action = req.query.action || "dashboard";
  const sb = getSupabase();

  // 1. SUPABASE COUNSELOR HANDLER
  if (sb) {
    try {
      if (action === "dashboard") {
        const { data: students } = await sb.from("users").select("*").eq("role", "student").order("created_at", { ascending: false }).limit(100);
        const { data: sessions } = await sb.from("student_assessment_sessions").select("*");
        const { data: notes } = await sb.from("counselor_notes").select("*");

        const stuList = students || [];
        const sessList = sessions || [];
        const noteList = notes || [];

        const enrichedStudents = stuList.map((stu) => {
          const userSessions = sessList.filter((s) => s.user_id === stu.id);
          const completedTiers = userSessions.filter((s) => s.status === "completed").map((s) => s.tier_code);
          const stuNotes = noteList.filter((n) => n.student_id === stu.id);

          let stage = "Group II (Class 10)";
          const g = parseInt(stu.grade_group || "10", 10);
          if (g <= 8) stage = "Group I (Classes 6–8)";
          else if (g >= 11) stage = "Group III (Classes 11–12)";

          return {
            id: stu.id,
            name: stu.name,
            email: stu.email,
            grade: stu.grade_group,
            school: "Registered Student",
            city: "",
            stage,
            completedTiers,
            completedCount: completedTiers.length,
            lastActive: stu.updated_at || stu.created_at,
            notesCount: stuNotes.length,
          };
        });

        return res.status(200).json({
          success: true,
          provider: "supabase",
          stats: {
            totalStudents: stuList.length,
            totalAssessmentsCompleted: sessList.filter((s) => s.status === "completed").length,
            totalCounselingSessions: noteList.length,
          },
          students: enrichedStudents,
        });
      }

      if (action === "save_note" && req.method === "POST") {
        const data = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
        const studentId = data.studentId;
        const counselorId = data.counselorId || "counselor_head";
        const note = data.notes || "";

        await sb.from("counselor_notes").insert({
          counselor_id: counselorId,
          student_id: studentId,
          note: note,
        });

        return res.status(200).json({ success: true, provider: "supabase", message: "Counselor note saved to Supabase!" });
      }

      return res.status(200).json({ success: true, message: "Supabase Counselor API OK" });
    } catch (err) {
      return res.status(200).json({ success: true, offline: true, message: "Supabase fallback: " + err.message });
    }
  }

  // 2. MYSQL COUNSELOR HANDLER
  try {
    const p = getPool();

    if (action === "dashboard") {
      const [students] = await p.query("SELECT * FROM `users` WHERE `role` = 'student' ORDER BY `created_at` DESC LIMIT 100");
      const [sessions] = await p.query("SELECT * FROM `student_assessment_sessions`");
      const [records] = await p.query("SELECT * FROM `counseling_records` ORDER BY `session_date` DESC");

      const enrichedStudents = students.map((stu) => {
        const userSessions = sessions.filter((s) => s.user_id === stu.id);
        const completedTiers = userSessions.filter((s) => s.status === "completed").map((s) => s.tier_code);
        const stuRecords = records.filter((r) => r.student_id === stu.id);

        let stage = "Group II (Class 10)";
        const g = parseInt(stu.grade_level || "10", 10);
        if (g <= 8) stage = "Group I (Classes 6–8)";
        else if (g >= 11) stage = "Group III (Classes 11–12)";

        return {
          id: stu.id,
          name: stu.full_name,
          email: stu.email,
          grade: stu.grade_level,
          school: stu.school_name,
          city: stu.city,
          stage,
          completedTiers,
          completedCount: completedTiers.length,
          lastActive: stu.updated_at || stu.created_at,
          notesCount: stuRecords.length,
        };
      });

      return res.status(200).json({
        success: true,
        provider: "mysql",
        stats: {
          totalStudents: students.length,
          totalAssessmentsCompleted: sessions.filter((s) => s.status === "completed").length,
          totalCounselingSessions: records.length,
        },
        students: enrichedStudents,
      });
    }

    if (action === "save_note" && req.method === "POST") {
      const data = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const studentId = data.studentId;
      const counselorId = data.counselorId || "counselor_demo";
      const notes = data.notes || "";
      const stream = data.recommendedStream || "Science";

      await p.query(
        "INSERT INTO `counseling_records` (`student_id`, `counselor_id`, `counselor_notes`, `recommended_stream`, `status`) VALUES (?, ?, ?, ?, 'completed')",
        [studentId, counselorId, notes, stream]
      );

      return res.status(200).json({ success: true, provider: "mysql", message: "Counselor note saved successfully!" });
    }

    return res.status(200).json({ success: true, message: "Counselor API OK" });
  } catch (err) {
    return res.status(200).json({
      success: true,
      offline: true,
      message: "Counselor fallback: " + err.message,
    });
  }
};
