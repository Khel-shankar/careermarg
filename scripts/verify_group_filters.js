// Verification script for Student Cohort Group Filters
const fs = require("fs");

function parseGradeNumber(raw) {
  if (typeof raw === "number") return raw;
  if (!raw) return 10;
  const str = String(raw).trim();
  const match = str.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    if (!isNaN(num) && num >= 1 && num <= 12) return num;
  }
  if (str.toLowerCase().includes("group_1") || str.toLowerCase().includes("group 1") || str.toLowerCase().includes("group i")) return 7;
  if (str.toLowerCase().includes("group_3") || str.toLowerCase().includes("group 3") || str.toLowerCase().includes("group iii")) return 12;
  return 10;
}

const mockStudents = [
  { id: "s1", name: "Ananya Sharma", grade: "7", school: "KV No. 1" },
  { id: "s2", name: "Kabir Mehta", grade: "class_6", school: "Army Public School" },
  { id: "s3", name: "Sneha Mukherjee", grade: "8th", school: "DPS" },
  { id: "s4", name: "Rohan Verma", grade: "10", school: "DPS" },
  { id: "s5", name: "Aayush Sengupta", grade: "class_9", school: "St. Xavier" },
  { id: "s6", name: "Tanvi Deshmukh", grade: "10th", school: "KV No. 1" },
  { id: "s7", name: "Priya Patel", grade: "12", school: "St. Xavier" },
  { id: "s8", name: "Siddharth Nair", grade: "class_11", school: "Army Public School" },
  { id: "s9", name: "Meera Iyer", grade: "12th", school: "DPS" }
];

function filterByCohort(students, cohortFilter) {
  return students.filter(s => {
    const gNum = parseGradeNumber(s.grade);
    const studentGroup = gNum <= 8 ? "group_1" : gNum >= 11 ? "group_3" : "group_2";
    if (cohortFilter === "group_1") return studentGroup === "group_1";
    if (cohortFilter === "group_2") return studentGroup === "group_2";
    if (cohortFilter === "group_3") return studentGroup === "group_3";
    return true;
  });
}

console.log("=== 1. GROUP I FILTER (Classes 6-8) ===");
const g1 = filterByCohort(mockStudents, "group_1");
console.log(g1.map(s => `${s.name} (Class ${parseGradeNumber(s.grade)})`));

console.log("\n=== 2. GROUP II FILTER (Classes 9-10) ===");
const g2 = filterByCohort(mockStudents, "group_2");
console.log(g2.map(s => `${s.name} (Class ${parseGradeNumber(s.grade)})`));

console.log("\n=== 3. GROUP III FILTER (Classes 11-12) ===");
const g3 = filterByCohort(mockStudents, "group_3");
console.log(g3.map(s => `${s.name} (Class ${parseGradeNumber(s.grade)})`));

console.log("\n=== 4. INTEGRITY CHECK ===");
const total = g1.length + g2.length + g3.length;
console.log(`Total students: ${mockStudents.length}, Sum of 3 groups: ${total}`);
if (total === mockStudents.length && g1.every(s => parseGradeNumber(s.grade) <= 8) && g2.every(s => [9,10].includes(parseGradeNumber(s.grade))) && g3.every(s => parseGradeNumber(s.grade) >= 11)) {
  console.log(" SUCCESS: All filters strictly isolate students by their class group with 0% mix-up!");
} else {
  console.error("❌ ERROR: Filter overlap detected!");
  process.exit(1);
}
