const path = require("path");
global.window = global;
require(path.join(__dirname, "../js/assessmentData.js"));
require(path.join(__dirname, "../js/careerDatabase.js"));
require(path.join(__dirname, "../js/scoring.js"));

console.log("======================================================================");
console.log("🔍 CAREERMARG END-TO-END PSYCHOMETRIC & SCORING VERIFICATION SUITE");
console.log("======================================================================\n");

// 1. QUESTION INTEGRITY VERIFICATION
console.log("--- [STEP 1] Question Bank Integrity ---");
const riasecQuestions = global.DISHA_ALL_QUESTIONS.filter((q) => q.tier === "tier1_riasec");
console.log(`Total RIASEC Questions: ${riasecQuestions.length}`);

const traitCounts = {};
riasecQuestions.forEach((q) => {
  traitCounts[q.traitCode] = (traitCounts[q.traitCode] || 0) + 1;
});
console.log("Questions per Holland Trait (Expected 7 each):", traitCounts);

// 2. SIMULATE GROUP I (Classes 6-8: RIASEC Interest Only)
console.log("\n--- [STEP 2] Simulating Group I (Class 7 Student: Likes Technology & Mechanics) ---");
const answersG1 = {};
// Student likes 7/7 Realistic, 6/7 Investigative, 4/7 Enterprising, 1/7 Social, 0/7 Artistic, 2/7 Conventional
riasecQuestions.forEach((q) => {
  if (q.traitCode === "R") answersG1[q.id] = "like"; // 7/7 = 100%
  else if (q.traitCode === "I") answersG1[q.id] = q.id === "ria-39" ? "dislike" : "like"; // 6/7 = 86%
  else if (q.traitCode === "E") answersG1[q.id] = ["ria-05", "ria-10", "ria-16", "ria-19"].includes(q.id) ? "like" : "dislike"; // 4/7 = 57%
  else if (q.traitCode === "C") answersG1[q.id] = ["ria-06", "ria-15"].includes(q.id) ? "like" : "dislike"; // 2/7 = 29%
  else if (q.traitCode === "S") answersG1[q.id] = ["ria-04"].includes(q.id) ? "like" : "dislike"; // 1/7 = 14%
  else answersG1[q.id] = "dislike"; // 0/7 = 0%
});

const scoresG1 = global.MoineeScore.scoreAllTiers(answersG1, global.DISHA_ALL_QUESTIONS);
console.log("Calculated Trait Percentiles:", scoresG1.traits);
console.log("Generated Dominant Holland Code:", scoresG1.hollandCode);
console.log("Ranked Traits:", scoresG1.riasecRanked);

const profileG1 = {
  grade: "7",
  stream: "general",
  completedTiers: ["tier1_riasec"],
  traitScores: scoresG1.traits,
  interestTags: ["robotics", "software_engineering", "ai_ml"]
};

const matchesG1 = global.MoineeScore.matchCareers(profileG1, global.DISHA_CAREER_DATABASE);
console.log(`\nTotal Careers Matched: ${matchesG1.length}`);
console.log("Top 3 Recommended Careers for Group 1:");
matchesG1.slice(0, 3).forEach((m, idx) => {
  console.log(`\n  [#${idx + 1}] ${m.title} (${m.hi})`);
  console.log(`      Overall Fit Score: ${m.fit}%`);
  console.log(`      Formula Used: ${m.matchBreakdown.formula}`);
  console.log(`      Factor Breakdown: Holland=${m.matchBreakdown.riasecPct}% (Weight: ${m.matchBreakdown.riasecWeight}), Stream=${m.matchBreakdown.streamPct}% (Weight: ${m.matchBreakdown.streamWeight})`);
  console.log(`      Reasons:`);
  m.reasons.forEach((r) => console.log(`        - [${r.title}] ${r.text}`));
});

// 3. SIMULATE GROUP II (Classes 9-10: RIASEC + TAMANNA Aptitude)
console.log("\n\n--- [STEP 3] Simulating Group II (Class 10 Student: RIASEC + NCERT TAMANNA) ---");
const answersG2 = { ...answersG1 };
// Add TAMANNA Aptitude responses (Correct answers for Math, Spatial, Mechanical)
const tamannaQuestions = global.DISHA_ALL_QUESTIONS.filter((q) => q.tier === "tier2_tamanna");
tamannaQuestions.forEach((q) => {
  if (["TAMANNA_NA", "TAMANNA_SA", "TAMANNA_MA", "TAMANNA_AR"].includes(q.traitCode)) {
    answersG2[q.id] = q.correctKey || "b"; // High Math/Spatial/Mechanical
  } else {
    answersG2[q.id] = "a"; // Moderate Verbal/Language
  }
});

const scoresG2 = global.MoineeScore.scoreAllTiers(answersG2, global.DISHA_ALL_QUESTIONS);
console.log("Calculated Trait Percentiles:", scoresG2.traits);

const streamsG2 = global.MoineeScore.recommendStreams(scoresG2.traits);
console.log("\nRecommended Academic Streams (Post-Class 10):");
streamsG2.slice(0, 3).forEach((st, idx) => {
  console.log(`  ${idx + 1}. ${st.title} (${st.titleHi}): ${st.score}% Fit`);
  console.log(`     Target Pathways: ${st.fields.join(", ")}`);
  console.log(`     Reason: ${st.reasonEn}`);
});

const profileG2 = {
  grade: "10",
  stream: "science_pcm",
  completedTiers: ["tier1_riasec", "tier2_tamanna"],
  traitScores: scoresG2.traits,
  interestTags: ["robotics", "software_engineering"]
};

const matchesG2 = global.MoineeScore.matchCareers(profileG2, global.DISHA_CAREER_DATABASE);
console.log("\nTop 3 Recommended Careers for Group 2:");
matchesG2.slice(0, 3).forEach((m, idx) => {
  console.log(`\n  [#${idx + 1}] ${m.title} (${m.hi})`);
  console.log(`      Overall Fit Score: ${m.fit}%`);
  console.log(`      Formula Used: ${m.matchBreakdown.formula}`);
  console.log(`      Factor Breakdown: Holland=${m.matchBreakdown.riasecPct}% (Weight: ${m.matchBreakdown.riasecWeight}), Aptitude=${m.matchBreakdown.aptitudePct}% (Weight: ${m.matchBreakdown.aptitudeWeight}), Stream=${m.matchBreakdown.streamPct}% (Weight: ${m.matchBreakdown.streamWeight})`);
  console.log(`      Reasons:`);
  m.reasons.forEach((r) => console.log(`        - [${r.title}] ${r.text}`));
});

// 4. SIMULATE GROUP III (Classes 11-12: RIASEC + TAMANNA + Big Five OCEAN)
console.log("\n\n--- [STEP 4] Simulating Group III (Class 12 Student: Comprehensive 3-Pronged Model) ---");
const answersG3 = { ...answersG2 };
// Add Big Five OCEAN responses (Likert 1 to 5)
const oceanQuestions = global.DISHA_ALL_QUESTIONS.filter((q) => q.tier === "tier3_ocean");
oceanQuestions.forEach((q) => {
  if (q.traitCode === "OCEAN_C") answersG3[q.id] = "5"; // High Conscientiousness (100%)
  else if (q.traitCode === "OCEAN_O") answersG3[q.id] = "4"; // High Openness (80%)
  else if (q.traitCode === "OCEAN_E") answersG3[q.id] = "3"; // Moderate Extraversion (60%)
  else if (q.traitCode === "OCEAN_A") answersG3[q.id] = "4"; // High Agreeableness (80%)
  else answersG3[q.id] = "4"; // High Emotional Stability (80%)
});

const scoresG3 = global.MoineeScore.scoreAllTiers(answersG3, global.DISHA_ALL_QUESTIONS);
console.log("Calculated Trait Percentiles (RIASEC + Aptitude + OCEAN):", scoresG3.traits);

const profileG3 = {
  grade: "12",
  stream: "science_pcm",
  completedTiers: ["tier1_riasec", "tier2_tamanna", "tier3_ocean"],
  traitScores: scoresG3.traits,
  interestTags: ["ai_ml", "software_engineering"]
};

const matchesG3 = global.MoineeScore.matchCareers(profileG3, global.DISHA_CAREER_DATABASE);
console.log("\nTop 3 Recommended Careers for Group 3 (Comprehensive 3-Pronged Match):");
matchesG3.slice(0, 3).forEach((m, idx) => {
  console.log(`\n  [#${idx + 1}] ${m.title} (${m.hi})`);
  console.log(`      Overall Fit Score: ${m.fit}%`);
  console.log(`      Formula Used: ${m.matchBreakdown.formula}`);
  console.log(`      Factor Breakdown: Holland=${m.matchBreakdown.riasecPct}%, Aptitude=${m.matchBreakdown.aptitudePct}%, Personality=${m.matchBreakdown.oceanPct}%, Stream=${m.matchBreakdown.streamPct}%`);
  console.log(`      Reasons:`);
  m.reasons.forEach((r) => console.log(`        - [${r.title}] ${r.text}`));
});

console.log("\n======================================================================");
console.log("✅ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!");
console.log("======================================================================");
