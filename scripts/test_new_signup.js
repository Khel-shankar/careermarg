const { createClient } = require("@supabase/supabase-js");

const url = "https://rbqxhjkaqflgxzeegdro.supabase.co";
const key = "sb_publishable_VoOXU5GjznfoBJyRsHs5cg_jw3otoZ2";

const supabase = createClient(url, key);

async function testNewUser() {
  console.log("Testing Live Real-time Registration & Sync with Supabase...");

  const testEmail = "khelshankar.student@gmail.com";
  const testId = "usr_khelshankar_student";

  // 1. Insert New Registered Student
  const { error: insErr } = await supabase.from("users").upsert({
    id: testId,
    name: "Khel Shankar Vyas",
    email: testEmail,
    role: "student",
    grade_group: "11",
    school_name: "Modern Senior Secondary School",
    stream: "science_pcm",
    saved_careers: ["data_scientist", "robotics_engineer"],
    updated_at: new Date().toISOString()
  });

  if (insErr) {
    console.error("Error inserting test user:", insErr);
    return;
  }
  console.log("✓ New Student registered in Supabase:", testEmail);

  // 2. Insert Live Assessment
  const { error: sessErr } = await supabase.from("student_assessment_sessions").upsert({
    user_id: testId,
    tier_code: "tier1_riasec",
    status: "completed",
    progress_percent: 100,
    responses_json: { "ria-1": 5, "ria-2": 5, "ria-3": 5 },
    completed_at: new Date().toISOString()
  }, { onConflict: "user_id,tier_code" });

  if (sessErr) {
    console.error("Error inserting test session:", sessErr);
  } else {
    console.log("✓ Live Assessment completed & synced for student!");
  }

  // 3. Verify in Users Table
  const { data: allUsers } = await supabase.from("users").select("name, email, school_name, role");
  console.log("\n📊 Current Live Database Roster in Supabase (Total " + allUsers.length + " users):");
  allUsers.forEach((u, i) => {
    console.log(`${i + 1}. ${u.name} | ${u.email} | ${u.school_name} | Role: ${u.role}`);
  });
}

testNewUser();
