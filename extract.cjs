const fs = require('fs');
const content = fs.readFileSync('src/data.ts', 'utf8');

const regex = /id: "(observatory|llmmuseum|ghostgarage|geometryofbecoming)"[^`]*desc: `([^`]+)`/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`\n\n=== PROJECT: ${match[1]} ===\n\n`);
  console.log(match[2]);
}
