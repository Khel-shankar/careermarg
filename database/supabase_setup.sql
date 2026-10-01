-- ============================================================================
-- CAREERMARG SUPABASE FULL SETUP & SEED SCRIPT (ROBUST & SAFE)
-- Copy and paste all of this into Supabase SQL Editor and click 'RUN'
-- ============================================================================

-- Step 1: Add all required columns to 'users' table if they don't already exist
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS school_name VARCHAR(255) DEFAULT 'Online Student Community';
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS grade_group VARCHAR(50) DEFAULT '10';
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS stream VARCHAR(100) DEFAULT 'general';
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS saved_careers JSONB DEFAULT '[]'::jsonb;
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS finalized_career VARCHAR(100) DEFAULT NULL;
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) DEFAULT '$2y$10$demoHashPlaceholder';
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE IF EXISTS users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Step 2: Ensure correct column width on student_assessment_sessions
DO $$
BEGIN
    ALTER TABLE student_assessment_sessions ALTER COLUMN tier_code TYPE character varying(50);
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- Step 3: Disable Row Level Security (RLS) on all tables for seamless API sync
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student_assessment_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student_trait_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS counselor_notes DISABLE ROW LEVEL SECURITY;

-- Step 4: Insert Authentic Demo Users
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

-- Step 5: Insert Live Assessment Sessions
INSERT INTO student_assessment_sessions (user_id, tier_code, status, progress_percent, responses_json, completed_at)
VALUES
('usr_demo_ananya_g1', 'tier1_riasec', 'completed', 100, '{"ria-1": 4, "ria-2": 5, "ria-3": 4, "ria-4": 3, "ria-5": 5}'::jsonb, NOW()),
('usr_demo_rohan_g2', 'tier1_riasec', 'completed', 100, '{"ria-1": 5, "ria-2": 5, "ria-3": 4, "ria-4": 3}'::jsonb, NOW()),
('usr_demo_rohan_g2', 'tier2_tamanna', 'completed', 100, '{"tam-1": "b", "tam-2": "a", "tam-3": "c", "tam-4": "d"}'::jsonb, NOW()),
('usr_demo_priya_g3', 'tier1_riasec', 'completed', 100, '{"ria-1": 5, "ria-2": 5, "ria-3": 4, "ria-4": 5}'::jsonb, NOW()),
('usr_demo_priya_g3', 'tier2_tamanna', 'completed', 100, '{"tam-1": "b", "tam-2": "a", "tam-3": "c"}'::jsonb, NOW()),
('usr_demo_priya_g3', 'tier3_ocean', 'completed', 100, '{"oce-1": 4, "oce-2": 5, "oce-3": 4}'::jsonb, NOW())
ON CONFLICT (user_id, tier_code) DO UPDATE SET
    status = EXCLUDED.status,
    progress_percent = EXCLUDED.progress_percent,
    responses_json = EXCLUDED.responses_json,
    completed_at = EXCLUDED.completed_at;

-- Step 6: Insert Diagnostic Trait Scores
INSERT INTO student_trait_scores (user_id, riasec_primary, riasec_secondary, all_scores_json)
VALUES
('usr_demo_ananya_g1', 'I', 'A', '{"R": 54, "I": 84, "A": 80, "S": 66, "E": 48, "C": 42, "riasec": {"R": 54, "I": 84, "A": 80, "S": 66, "E": 48, "C": 42}}'::jsonb),
('usr_demo_rohan_g2', 'R', 'I', '{"R": 88, "I": 85, "E": 68, "C": 55, "S": 50, "A": 44, "spatial": 90, "numerical": 86, "logical": 84, "mechanical": 82, "perceptual": 76, "verbal": 72, "language": 70, "riasec": {"R": 88, "I": 85, "E": 68, "C": 55, "S": 50, "A": 44}}'::jsonb),
('usr_demo_priya_g3', 'I', 'E', '{"R": 86, "I": 92, "E": 78, "A": 68, "C": 64, "S": 60, "spatial": 85, "numerical": 88, "logical": 90, "verbal": 82, "openness": 86, "conscientiousness": 84, "extraversion": 78, "agreeableness": 80, "neuroticism": 32, "riasec": {"R": 86, "I": 92, "E": 78, "A": 68, "C": 64, "S": 60}}'::jsonb)
ON CONFLICT (user_id) DO UPDATE SET
    riasec_primary = EXCLUDED.riasec_primary,
    riasec_secondary = EXCLUDED.riasec_secondary,
    all_scores_json = EXCLUDED.all_scores_json,
    updated_at = NOW();

-- Step 7: Insert Counselor Record
INSERT INTO counselor_notes (counselor_id, student_id, note)
VALUES ('usr_admin_counselor', 'usr_demo_priya_g3', 'Candidate demonstrates exceptional analytical acumen. Recommended preparation for B.Tech AI & Data Science.');

-- Confirm success
SELECT count(*) AS total_students_active FROM users;
