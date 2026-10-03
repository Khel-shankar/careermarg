const mysql = require("mysql2/promise");
const { createClient } = require("@supabase/supabase-js");

let supabase = null;
let pool = null;

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
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const tier = req.query.tier;
  const sb = getSupabase();

  // 1. Supabase Fetch
  if (sb) {
    try {
      let query = sb.from("assessment_questions").select("*");
      if (tier) {
        query = query.eq("tier_code", tier);
      }
      const { data, error } = await query;
      if (error) throw error;

      if (data && data.length > 0) {
        const formatted = data.map((q) => ({
          id: q.id,
          tier: q.tier_code,
          traitCode: q.trait_code,
          submodule: q.submodule,
          submoduleTitle: q.submodule_title,
          submoduleTitleHi: q.submodule_title_hi,
          questionText: q.question_text_en,
          questionTextHi: q.question_text_hi,
          textEn: q.question_text_en,
          textHi: q.question_text_hi,
          text: q.question_text_en,
          options: typeof q.options_json === "string" ? JSON.parse(q.options_json) : q.options_json,
          type: q.type,
          correctKey: q.correct_key,
        }));

        return res.status(200).json({
          success: true,
          provider: "supabase",
          count: formatted.length,
          questions: formatted,
        });
      }
    } catch (err) {
      console.warn("Supabase questions fetch fallback:", err.message);
    }
  }

  // 2. MySQL Fetch
  try {
    const p = getPool();
    let sql = "SELECT * FROM `assessment_questions`";
    let params = [];
    if (tier) {
      sql += " WHERE `tier_code` = ?";
      params.push(tier);
    }
    const [rows] = await p.query(sql, params);
    if (rows && rows.length > 0) {
      const formatted = rows.map((q) => ({
        id: q.id,
        tier: q.tier_code,
        traitCode: q.trait_code,
        submodule: q.submodule,
        submoduleTitle: q.submodule_title,
        submoduleTitleHi: q.submodule_title_hi,
        questionText: q.question_text_en,
        questionTextHi: q.question_text_hi,
        textEn: q.question_text_en,
        textHi: q.question_text_hi,
        text: q.question_text_en,
        options: JSON.parse(q.options_json || "[]"),
        type: q.type || "likert_5",
        correctKey: q.correct_key || null,
      }));

      return res.status(200).json({
        success: true,
        provider: "mysql",
        count: formatted.length,
        questions: formatted,
      });
    }
  } catch (err) {
    console.warn("MySQL questions fetch fallback:", err.message);
  }

  // 3. Fallback response indicating client bundle should be used if DB table not yet populated
  return res.status(200).json({
    success: true,
    provider: "local_fallback",
    count: 0,
    questions: [],
    message: "Questions served from client knowledge library if DB table is unpopulated",
  });
};
