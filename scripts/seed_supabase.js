const { createClient } = require("@supabase/supabase-js");

const url = "https://rbqxhjkaqflgxzeegdro.supabase.co";
const key = "sb_publishable_VoOXU5GjznfoBJyRsHs5cg_jw3otoZ2";

const supabase = createClient(url, key);

async function seed() {
  console.log("Seeding Demo Users and Real Data into Supabase...");

  // 1. Seed Users (Demo Personas + Admin)
  const users = [
    {
      id: "usr_demo_ananya_g1",
      name: "Ananya Sharma",
      email: "ananya.sharma@careermarg.org",
      role: "student",
      grade_group: "7",
      stream: "general",
      saved_careers: ["ui_ux_designer", "data_scientist", "robotics_engineer"],
    },
    {
      id: "usr_demo_rohan_g2",
      name: "Rohan Verma",
      email: "rohan.verma@careermarg.org",
      role: "student",
      grade_group: "10",
      stream: "science_pcm",
      saved_careers: ["robotics_engineer", "aerospace_engineer", "data_scientist"],
    },
    {
      id: "usr_demo_priya_g3",
      name: "Priya Patel",
      email: "priya.patel@careermarg.org",
      role: "student",
      grade_group: "12",
      stream: "science_pcm",
      saved_careers: ["software_engineer", "data_scientist", "ai_researcher"],
    },
    {
      id: "usr_admin_counselor",
      name: "Dr. Sunita Rao (Director, CDGC)",
      email: "director.counselor@careermarg.org",
      role: "admin",
      grade_group: "12",
      stream: "psychology",
      saved_careers: [],
    }
  ];

  for (const u of users) {
    const { error } = await supabase.from("users").upsert(u, { onConflict: "id" });
    if (error) {
      console.error(`Error inserting user ${u.name}:`, error);
    } else {
      console.log(`✓ Inserted/Updated user: ${u.name} (${u.email})`);
    }
  }

  // 2. Seed Assessment Sessions
  const sessions = [
    {
      user_id: "usr_demo_ananya_g1",
      tier_code: "tier1_riasec",
      status: "completed",
      progress_percent: 100,
      responses_json: { "ria-1": 4, "ria-2": 5, "ria-3": 4, "ria-4": 3, "ria-5": 5 },
      completed_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_rohan_g2",
      tier_code: "tier1_riasec",
      status: "completed",
      progress_percent: 100,
      responses_json: { "ria-1": 5, "ria-2": 5, "ria-3": 4, "ria-4": 3 },
      completed_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_rohan_g2",
      tier_code: "tier2_tamanna",
      status: "completed",
      progress_percent: 100,
      responses_json: { "tam-1": "b", "tam-2": "a", "tam-3": "c", "tam-4": "d" },
      completed_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_priya_g3",
      tier_code: "tier1_riasec",
      status: "completed",
      progress_percent: 100,
      responses_json: { "ria-1": 5, "ria-2": 5, "ria-3": 4, "ria-4": 5 },
      completed_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_priya_g3",
      tier_code: "tier2_tamanna",
      status: "completed",
      progress_percent: 100,
      responses_json: { "tam-1": "b", "tam-2": "a", "tam-3": "c" },
      completed_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_priya_g3",
      tier_code: "tier3_ocean",
      status: "completed",
      progress_percent: 100,
      responses_json: { "oce-1": 4, "oce-2": 5, "oce-3": 4 },
      completed_at: new Date().toISOString()
    }
  ];

  for (const s of sessions) {
    const { error } = await supabase.from("student_assessment_sessions").upsert(s, { onConflict: "user_id,tier_code" });
    if (error) {
      console.error(`Error inserting session for ${s.user_id} (${s.tier_code}):`, error);
    } else {
      console.log(`✓ Inserted session: ${s.user_id} -> ${s.tier_code}`);
    }
  }

  // 3. Seed Trait Scores
  const traitScores = [
    {
      user_id: "usr_demo_ananya_g1",
      riasec_primary: "I",
      riasec_secondary: "A",
      all_scores_json: {
        R: 54, I: 84, A: 80, S: 66, E: 48, C: 42,
        riasec: { R: 54, I: 84, A: 80, S: 66, E: 48, C: 42 }
      },
      updated_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_rohan_g2",
      riasec_primary: "R",
      riasec_secondary: "I",
      all_scores_json: {
        R: 88, I: 85, E: 68, C: 55, S: 50, A: 44,
        spatial: 90, numerical: 86, logical: 84, mechanical: 82, perceptual: 76, verbal: 72, language: 70,
        riasec: { R: 88, I: 85, E: 68, C: 55, S: 50, A: 44 }
      },
      updated_at: new Date().toISOString()
    },
    {
      user_id: "usr_demo_priya_g3",
      riasec_primary: "I",
      riasec_secondary: "E",
      all_scores_json: {
        R: 86, I: 92, E: 78, A: 68, C: 64, S: 60,
        spatial: 85, numerical: 88, logical: 90, verbal: 82,
        openness: 86, conscientiousness: 84, extraversion: 78, agreeableness: 80, neuroticism: 32,
        riasec: { R: 86, I: 92, E: 78, A: 68, C: 64, S: 60 }
      },
      updated_at: new Date().toISOString()
    }
  ];

  for (const t of traitScores) {
    const { error } = await supabase.from("student_trait_scores").upsert(t, { onConflict: "user_id" });
    if (error) {
      console.error(`Error inserting trait scores for ${t.user_id}:`, error);
    } else {
      console.log(`✓ Inserted trait scores for: ${t.user_id}`);
    }
  }

  // 4. Seed Counselor Notes
  const notes = [
    {
      counselor_id: "usr_admin_counselor",
      student_id: "usr_demo_priya_g3",
      note: "Candidate demonstrates exceptional analytical and logical acumen. Recommended targeted preparation for JEE Advanced / Top B.Tech AI & Data Science programs with specialized minor in Human-Computer Interaction.",
      created_at: new Date().toISOString()
    }
  ];

  for (const n of notes) {
    const { error } = await supabase.from("counselor_notes").insert(n);
    if (error) {
      console.error(`Error inserting counselor note:`, error);
    } else {
      console.log(`✓ Inserted counselor note for: ${n.student_id}`);
    }
  }

  console.log("\n🎉 ALL SEED DATA SUCCESSFULLY POPULATED IN SUPABASE TABLES!");
}

seed();
