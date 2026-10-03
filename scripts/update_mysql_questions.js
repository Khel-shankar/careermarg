const mysql = require("mysql2/promise");
const path = require("path");
global.window = global;
require(path.join(__dirname, "../js/assessmentData.js"));

async function updateMysql() {
  const config = {
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    database: process.env.DB_NAME || "career_guidance_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    charset: "utf8mb4",
  };

  const pool = mysql.createPool(config);
  console.log("Connecting to MySQL...");

  const questions = global.DISHA_ALL_QUESTIONS || [];
  console.log(`Updating ${questions.length} questions in MySQL...`);

  for (const q of questions) {
    const qid = q.id;
    const tier = q.tier;
    const trait = q.traitCode;
    const submodule = q.submodule || "";
    const subTitle = q.submoduleTitle || "";
    const subTitleHi = q.submoduleTitleHi || "";
    const textEn = q.questionText || q.textEn || "";
    const textHi = q.questionTextHi || q.textHi || "";
    const optsJson = JSON.stringify(q.options || []);
    const qtype = q.type || "likert_5";
    const correctKey = q.correctKey || null;

    await pool.query(
      "INSERT INTO `assessment_questions` (`id`, `tier_code`, `trait_code`, `submodule`, `submodule_title`, `submodule_title_hi`, `question_text_en`, `question_text_hi`, `options_json`, `type`, `correct_key`) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
      "ON DUPLICATE KEY UPDATE " +
      "`tier_code` = VALUES(`tier_code`), `trait_code` = VALUES(`trait_code`), `submodule` = VALUES(`submodule`), `submodule_title` = VALUES(`submodule_title`), `submodule_title_hi` = VALUES(`submodule_title_hi`), `question_text_en` = VALUES(`question_text_en`), `question_text_hi` = VALUES(`question_text_hi`), `options_json` = VALUES(`options_json`), `type` = VALUES(`type`), `correct_key` = VALUES(`correct_key`)",
      [qid, tier, trait, submodule, subTitle, subTitleHi, textEn, textHi, optsJson, qtype, correctKey]
    );
  }

  console.log("✅ Successfully updated all 126 questions in MySQL database!");
  await pool.end();
}

updateMysql().catch(console.error);
