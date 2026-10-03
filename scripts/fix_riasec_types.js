const fs = require("fs");
let content = fs.readFileSync("js/assessmentData.js", "utf8");

// Replace all likert_5 for riasec questions
content = content.replace(/(id:\s*"(?:ria|qria)-\d+"[\s\S]*?type:\s*)"likert_5"/g, '$1"binary_choice"');

fs.writeFileSync("js/assessmentData.js", content, "utf8");
console.log("Updated all RIASEC question types to binary_choice!");
