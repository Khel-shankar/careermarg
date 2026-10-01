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

  // 1. Check Supabase first if configured
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from("users").select("id").limit(1);
      if (error) {
        return res.status(200).json({
          status: "offline",
          provider: "supabase",
          message: "Supabase connection error: " + error.message,
        });
      }
      return res.status(200).json({
        status: "connected",
        provider: "supabase",
        message: "Supabase PostgreSQL Database successfully connected and live!",
      });
    } catch (err) {
      return res.status(200).json({
        status: "offline",
        provider: "supabase",
        message: "Supabase exception: " + err.message,
      });
    }
  }

  // 2. Fallback to MySQL
  try {
    const p = getPool();
    const [rows] = await p.query("SELECT 1 AS connected");
    return res.status(200).json({
      status: "connected",
      provider: "mysql",
      database: process.env.DB_NAME || "career_guidance_db",
      host: process.env.DB_HOST || "127.0.0.1",
      message: "MySQL Database successfully connected and live!",
    });
  } catch (err) {
    return res.status(200).json({
      status: "offline",
      provider: "none",
      message: "Database connection could not be established. Please set Supabase or MySQL environment variables in Vercel.",
      error: err.message,
    });
  }
};
