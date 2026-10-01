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

  const sector = req.query.sector;
  const limit = parseInt(req.query.limit || "500", 10);
  const sb = getSupabase();

  // 1. Supabase Fetch
  if (sb) {
    try {
      let query = sb.from("careers").select("*").limit(limit);
      if (sector && sector !== "all") {
        query = query.eq("sector_id", sector);
      }
      const { data, error } = await query;
      if (error) throw error;

      if (data && data.length > 0) {
        return res.status(200).json({
          success: true,
          provider: "supabase",
          count: data.length,
          careers: data,
        });
      }
    } catch (err) {
      console.warn("Supabase careers fetch fallback:", err.message);
    }
  }

  // 2. MySQL Fetch
  try {
    const p = getPool();
    let sql = "SELECT * FROM `careers`";
    let params = [];
    if (sector && sector !== "all") {
      sql += " WHERE `sector_id` = ?";
      params.push(sector);
    }
    sql += " LIMIT ?";
    params.push(limit);

    const [rows] = await p.query(sql, params);
    if (rows && rows.length > 0) {
      return res.status(200).json({
        success: true,
        provider: "mysql",
        count: rows.length,
        careers: rows,
      });
    }
  } catch (err) {
    console.warn("MySQL careers fetch fallback:", err.message);
  }

  return res.status(200).json({
    success: true,
    provider: "local_fallback",
    count: 0,
    careers: [],
  });
};
