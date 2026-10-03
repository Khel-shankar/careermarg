global.window = global;
const fs = require('fs');
eval(fs.readFileSync('./js/assessmentData.js', 'utf8'));

let sql = '-- ==========================================================================\n';
sql += '-- CAREERMARG (DISHA V2) - SUPABASE POSTGRESQL PRODUCTION SCHEMA & DATA\n';
sql += '-- Conforms to 3-Stage Assessment Framework (Group I, II, III)\n';
sql += '-- ==========================================================================\n\n';

sql += '-- 1. Enable UUID extension\n';
sql += 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n\n';

sql += '-- 2. Assessment Questions Table\n';
sql += 'CREATE TABLE IF NOT EXISTS public.assessment_questions (\n';
sql += '    id VARCHAR(64) PRIMARY KEY,\n';
sql += '    tier VARCHAR(64) NOT NULL,\n';
sql += '    submodule VARCHAR(64) NOT NULL,\n';
sql += '    submodule_title VARCHAR(255),\n';
sql += '    submodule_title_hi VARCHAR(255),\n';
sql += '    trait_code VARCHAR(64) NOT NULL,\n';
sql += '    trait_title VARCHAR(255),\n';
sql += '    trait_title_hi VARCHAR(255),\n';
sql += '    question_text TEXT NOT NULL,\n';
sql += '    question_text_hi TEXT NOT NULL,\n';
sql += '    type VARCHAR(32) DEFAULT \'likert_5\',\n';
sql += '    options JSONB NOT NULL DEFAULT \'[]\'::jsonb,\n';
sql += '    correct_key VARCHAR(64),\n';
sql += '    display_order INT DEFAULT 0,\n';
sql += '    created_at TIMESTAMPTZ DEFAULT NOW()\n';
sql += ');\n\n';

sql += '-- 3. Student Assessment Profiles & Reports Table\n';
sql += 'CREATE TABLE IF NOT EXISTS public.student_profiles (\n';
sql += '    id VARCHAR(128) PRIMARY KEY,\n';
sql += '    email VARCHAR(255),\n';
sql += '    name VARCHAR(255),\n';
sql += '    grade VARCHAR(32),\n';
sql += '    school VARCHAR(255),\n';
sql += '    stream VARCHAR(64),\n';
sql += '    city VARCHAR(128),\n';
sql += '    role_model_archetype VARCHAR(64),\n';
sql += '    aspiration TEXT,\n';
sql += '    interest_tags JSONB DEFAULT \'[]\'::jsonb,\n';
sql += '    saved_careers JSONB DEFAULT \'[]\'::jsonb,\n';
sql += '    completed_tiers JSONB DEFAULT \'[]\'::jsonb,\n';
sql += '    tier_answers JSONB DEFAULT \'{}\'::jsonb,\n';
sql += '    trait_scores JSONB DEFAULT \'{}\'::jsonb,\n';
sql += '    career_matches JSONB DEFAULT \'[]\'::jsonb,\n';
sql += '    report JSONB DEFAULT \'{}\'::jsonb,\n';
sql += '    created_at TIMESTAMPTZ DEFAULT NOW(),\n';
sql += '    updated_at TIMESTAMPTZ DEFAULT NOW()\n';
sql += ');\n\n';

sql += '-- 4. Insert / Upsert 126 Assessment Questions\n';
DISHA_ALL_QUESTIONS.forEach((q, idx) => {
  const esc = (s) => (s || '').replace(/'/g, "''");
  const optsJson = JSON.stringify(q.options || []).replace(/'/g, "''");
  const correctVal = q.correctKey ? "'" + esc(q.correctKey) + "'" : "NULL";
  sql += "INSERT INTO public.assessment_questions (id, tier, submodule, submodule_title, submodule_title_hi, trait_code, trait_title, trait_title_hi, question_text, question_text_hi, type, options, correct_key, display_order) VALUES ('" + esc(q.id) + "', '" + esc(q.tier) + "', '" + esc(q.submodule) + "', '" + esc(q.submoduleTitle) + "', '" + esc(q.submoduleTitleHi) + "', '" + esc(q.traitCode) + "', '" + esc(q.traitTitle) + "', '" + esc(q.traitTitleHi) + "', '" + esc(q.questionText) + "', '" + esc(q.questionTextHi) + "', '" + esc(q.type || 'likert_5') + "', '" + optsJson + "'::jsonb, " + correctVal + ", " + (idx + 1) + ") ON CONFLICT (id) DO UPDATE SET tier = EXCLUDED.tier, submodule = EXCLUDED.submodule, submodule_title = EXCLUDED.submodule_title, submodule_title_hi = EXCLUDED.submodule_title_hi, trait_code = EXCLUDED.trait_code, trait_title = EXCLUDED.trait_title, trait_title_hi = EXCLUDED.trait_title_hi, question_text = EXCLUDED.question_text, question_text_hi = EXCLUDED.question_text_hi, type = EXCLUDED.type, options = EXCLUDED.options, correct_key = EXCLUDED.correct_key, display_order = EXCLUDED.display_order;\n";
});

sql += '\n-- 5. Row Level Security (RLS) & Public Access Policies\n';
sql += 'ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;\n';
sql += 'ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;\n\n';

sql += 'DROP POLICY IF EXISTS "Allow anonymous read on assessment_questions" ON public.assessment_questions;\n';
sql += 'CREATE POLICY "Allow anonymous read on assessment_questions" ON public.assessment_questions FOR SELECT TO anon, authenticated USING (true);\n\n';

sql += 'DROP POLICY IF EXISTS "Allow anonymous read on student_profiles" ON public.student_profiles;\n';
sql += 'CREATE POLICY "Allow anonymous read on student_profiles" ON public.student_profiles FOR SELECT TO anon, authenticated USING (true);\n\n';

sql += 'DROP POLICY IF EXISTS "Allow anonymous insert on student_profiles" ON public.student_profiles;\n';
sql += 'CREATE POLICY "Allow anonymous insert on student_profiles" ON public.student_profiles FOR INSERT TO anon, authenticated WITH CHECK (true);\n\n';

sql += 'DROP POLICY IF EXISTS "Allow anonymous update on student_profiles" ON public.student_profiles;\n';
sql += 'CREATE POLICY "Allow anonymous update on student_profiles" ON public.student_profiles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);\n';

fs.writeFileSync('database/supabase_setup.sql', sql);
console.log('✅ Generated database/supabase_setup.sql with ' + DISHA_ALL_QUESTIONS.length + ' questions and RLS policies!');
