import json
import subprocess
import os

# Run node to extract all questions, sectors, and careers
res = subprocess.run(
    ["node", "-e", """
    global.window = global;
    require('./js/assessmentData.js');
    require('./js/careerDatabase.js');
    console.log(JSON.stringify({
        questions: global.DISHA_ALL_QUESTIONS || [],
        sectors: global.DISHA_CAREER_SECTORS || [],
        careers: global.DISHA_CAREER_DATABASE || []
    }));
    """],
    capture_output=True,
    text=True,
    encoding='utf-8'
)

data = json.loads(res.stdout)
questions = data['questions']
raw_sectors = data['sectors']
careers = data['careers']

def esc(val):
    if val is None:
        return 'NULL'
    s = str(val).replace("'", "''")
    return f"'{s}'"

def json_esc(obj):
    if obj is None:
        return "'{}'::jsonb"
    s = json.dumps(obj, ensure_ascii=False).replace("'", "''")
    return f"'{s}'::jsonb"

sql_lines = [
"""-- ============================================================================
-- CAREERMARG COMPLETE SUPABASE DATABASE MIGRATION & SEED SCRIPT
-- Tables:
-- 1. users
-- 2. student_assessment_sessions
-- 3. student_trait_scores
-- 4. student_career_matches
-- 5. counselor_notes
-- 6. assessment_questions (126 Verified Bilingual Questions)
-- 7. career_sectors (Industry Sectors)
-- 8. careers (Curated Career Library)
-- ============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(32) DEFAULT 'student',
    school_name VARCHAR(255) DEFAULT 'Online Student Community',
    grade_group VARCHAR(50) DEFAULT '10',
    stream VARCHAR(100) DEFAULT 'general',
    saved_careers JSONB DEFAULT '[]'::jsonb,
    finalized_career VARCHAR(100) DEFAULT NULL,
    password_hash VARCHAR(255) DEFAULT '$2y$10$demoHashPlaceholder',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ASSESSMENT SESSIONS TABLE
CREATE TABLE IF NOT EXISTS student_assessment_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    tier_code VARCHAR(50) NOT NULL,
    status VARCHAR(32) DEFAULT 'in_progress',
    progress_percent INT DEFAULT 0,
    responses_json JSONB DEFAULT '{}'::jsonb,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, tier_code)
);

-- 3. TRAIT SCORES TABLE
CREATE TABLE IF NOT EXISTS student_trait_scores (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(64) UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    riasec_primary VARCHAR(10) DEFAULT NULL,
    riasec_secondary VARCHAR(10) DEFAULT NULL,
    top_aptitudes JSONB DEFAULT '[]'::jsonb,
    all_scores_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. STUDENT CAREER MATCHES TABLE
CREATE TABLE IF NOT EXISTS student_career_matches (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    career_id VARCHAR(64) NOT NULL,
    match_percent INT NOT NULL,
    breakdown_json JSONB DEFAULT '{}'::jsonb,
    reasons_json JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, career_id)
);

-- 5. COUNSELOR NOTES TABLE
CREATE TABLE IF NOT EXISTS counselor_notes (
    id BIGSERIAL PRIMARY KEY,
    counselor_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    student_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ASSESSMENT QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS assessment_questions (
    id VARCHAR(64) PRIMARY KEY,
    tier_code VARCHAR(32) NOT NULL,
    trait_code VARCHAR(32) NOT NULL,
    submodule VARCHAR(64) DEFAULT '',
    submodule_title VARCHAR(128) DEFAULT '',
    submodule_title_hi VARCHAR(128) DEFAULT '',
    question_text_en TEXT NOT NULL,
    question_text_hi TEXT NOT NULL,
    options_json JSONB NOT NULL,
    type VARCHAR(32) DEFAULT 'likert_5',
    correct_key VARCHAR(16) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CAREER SECTORS TABLE
CREATE TABLE IF NOT EXISTS career_sectors (
    id VARCHAR(128) PRIMARY KEY,
    label VARCHAR(128) NOT NULL,
    hi VARCHAR(128) NOT NULL,
    icon VARCHAR(32) DEFAULT '🌐'
);

-- 8. CAREERS TABLE
CREATE TABLE IF NOT EXISTS careers (
    id VARCHAR(64) PRIMARY KEY,
    sector_id VARCHAR(128) DEFAULT 'it_tech',
    title VARCHAR(128) NOT NULL,
    title_hi VARCHAR(128) NOT NULL,
    riasec_code VARCHAR(16) DEFAULT 'IRC',
    stream VARCHAR(64) DEFAULT 'any',
    description TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    salary_range VARCHAR(64) DEFAULT '₹4 - ₹15 LPA',
    growth_outlook VARCHAR(64) DEFAULT 'High',
    education TEXT DEFAULT '',
    education_hi TEXT DEFAULT '',
    entrance_exams JSONB DEFAULT '[]'::jsonb,
    interest_tags JSONB DEFAULT '[]'::jsonb,
    roadmap JSONB DEFAULT '[]'::jsonb,
    ocean_traits JSONB DEFAULT '{}'::jsonb,
    aptitude_reqs JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISABLE RLS FOR ZERO-RESTRICTION SEAMLESS API SYNC
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student_assessment_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student_trait_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student_career_matches DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS counselor_notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS assessment_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS career_sectors DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS careers DISABLE ROW LEVEL SECURITY;

-- SEED AUTHENTIC PERSONAS
INSERT INTO users (id, name, email, role, grade_group, school_name, stream, saved_careers)
VALUES 
('usr_demo_ananya_g1', 'Ananya Sharma', 'ananya.sharma@careermarg.org', 'student', '7', 'Kendriya Vidyalaya No. 1', 'general', '["ui_ux_designer", "data_scientist", "robotics_engineer"]'::jsonb),
('usr_demo_rohan_g2', 'Rohan Verma', 'rohan.verma@careermarg.org', 'student', '10', 'Delhi Public School', 'science_pcm', '["robotics_engineer", "aerospace_engineer", "data_scientist"]'::jsonb),
('usr_demo_priya_g3', 'Priya Patel', 'priya.patel@careermarg.org', 'student', '12', 'St. Xavier''s Senior Secondary School', 'science_pcm', '["software_engineer", "data_scientist", "ai_researcher"]'::jsonb),
('usr_admin_counselor', 'Dr. Sunita Rao (Director, CDGC)', 'director.counselor@careermarg.org', 'admin', '12', 'Career Development Guidance Cell (CDGC)', 'psychology', '[]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    grade_group = EXCLUDED.grade_group,
    school_name = EXCLUDED.school_name,
    stream = EXCLUDED.stream,
    saved_careers = EXCLUDED.saved_careers;
"""
]

# Sectors insert
sec_rows = []
for s in raw_sectors:
    sid = s.get('id', 'all')
    label = s.get('label', sid)
    hi = s.get('hi', label)
    icon = s.get('icon', '💼')
    sec_rows.append(f"({esc(sid)}, {esc(label)}, {esc(hi)}, {esc(icon)})")

sql_lines.append(f"-- SEED CAREER SECTORS\nINSERT INTO career_sectors (id, label, hi, icon) VALUES\n" + ",\n".join(sec_rows) + "\nON CONFLICT (id) DO UPDATE SET label = EXCLUDED.label, hi = EXCLUDED.hi, icon = EXCLUDED.icon;\n")

# Questions insert
q_rows = []
for q in questions:
    qid = q.get('id')
    tier = q.get('tier', 'tier1_riasec')
    trait = q.get('traitCode', 'R')
    submodule = q.get('submodule', '')
    subTitle = q.get('submoduleTitle', '')
    subTitleHi = q.get('submoduleTitleHi', '')
    textEn = q.get('questionText') or q.get('textEn') or q.get('text') or ''
    textHi = q.get('questionTextHi') or q.get('textHi') or ''
    opts = q.get('options', [])
    qtype = q.get('type', 'likert_5')
    correctKey = q.get('correctKey')
    
    q_rows.append(
        f"({esc(qid)}, {esc(tier)}, {esc(trait)}, {esc(submodule)}, {esc(subTitle)}, {esc(subTitleHi)}, {esc(textEn)}, {esc(textHi)}, {json_esc(opts)}, {esc(qtype)}, {esc(correctKey)})"
    )

sql_lines.append(f"-- SEED 126 BILINGUAL ASSESSMENT QUESTIONS\nINSERT INTO assessment_questions (id, tier_code, trait_code, submodule, submodule_title, submodule_title_hi, question_text_en, question_text_hi, options_json, type, correct_key) VALUES\n" + ",\n".join(q_rows) + "\nON CONFLICT (id) DO UPDATE SET question_text_en = EXCLUDED.question_text_en, question_text_hi = EXCLUDED.question_text_hi, options_json = EXCLUDED.options_json;\n")

# Careers insert (batch by 50)
career_batches = []
batch_size = 50
for i in range(0, len(careers), batch_size):
    chunk = careers[i:i + batch_size]
    c_rows = []
    for c in chunk:
        cid = c.get('id')
        sector_id = c.get('sectorId') or c.get('cluster') or 'it_tech'
        title = c.get('title', '')
        title_hi = c.get('hi') or c.get('titleHi') or title
        riasec_code = c.get('riasec') if isinstance(c.get('riasec'), str) else "IRC"
        stream = c.get('stream', 'any')
        desc = c.get('overview') or c.get('blurb') or c.get('description') or ''
        desc_hi = c.get('overviewHi') or c.get('hi') or desc
        salary = c.get('salary') or c.get('salaryRange') or '₹4 - ₹15 LPA'
        growth = c.get('growthOutlook') or 'High'
        education = c.get('education') or c.get('educationPath') or ''
        education_hi = c.get('educationHi') or ''
        entrance_exams = c.get('entranceExams') or []
        interest_tags = c.get('interestTags') or []
        roadmap = c.get('roadmap') or []
        ocean_traits = c.get('ocean') or {}
        aptitude_reqs = c.get('aptitude') or {}

        c_rows.append(
            f"({esc(cid)}, {esc(sector_id)}, {esc(title)}, {esc(title_hi)}, {esc(riasec_code)}, {esc(stream)}, {esc(desc)}, {esc(desc_hi)}, {esc(salary)}, {esc(growth)}, {esc(education)}, {esc(education_hi)}, {json_esc(entrance_exams)}, {json_esc(interest_tags)}, {json_esc(roadmap)}, {json_esc(ocean_traits)}, {json_esc(aptitude_reqs)})"
        )
    
    career_batches.append(
        f"INSERT INTO careers (id, sector_id, title, title_hi, riasec_code, stream, description, description_hi, salary_range, growth_outlook, education, education_hi, entrance_exams, interest_tags, roadmap, ocean_traits, aptitude_reqs) VALUES\n" +
        ",\n".join(c_rows) +
        "\nON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, title_hi = EXCLUDED.title_hi, description = EXCLUDED.description, salary_range = EXCLUDED.salary_range;\n"
    )

sql_lines.append(f"-- SEED {len(careers)} VERIFIED INDIAN CAREER PATHWAYS\n" + "\n".join(career_batches))

output_sql = "\n".join(sql_lines)
with open("database/supabase_setup.sql", "w", encoding="utf-8") as f:
    f.write(output_sql)

print(f"Successfully generated database/supabase_setup.sql with {len(questions)} questions and {len(careers)} careers! Total size: {len(output_sql)} characters.")
