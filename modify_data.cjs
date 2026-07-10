const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

let matchCount = 0;
content = content.replace(/\{\s*id:\s*"[^"]+",/g, (match) => {
  matchCount++;
  if (matchCount <= 5) {
    return match + ` flagship: true, flagshipOrder: ${matchCount}, archiveCategory: "Featured",`;
  } else {
    return match + ` flagship: false, archiveCategory: "Archive",`;
  }
});

fs.writeFileSync('src/data.ts', content, 'utf8');
console.log("Replaced", matchCount, "projects");
