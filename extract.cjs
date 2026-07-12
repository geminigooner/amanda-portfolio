const fs = require('fs');

const content = fs.readFileSync('src/data.ts', 'utf8');

// Match from { id: "vestige" ... to the matching closing brace.
// We can use a regex or simple parser.
let startIndex = content.indexOf('{ id: "vestige"');
if (startIndex === -1) {
  console.error("Not found");
  process.exit(1);
}

let braceCount = 0;
let endIndex = -1;
let inString = false;
let escapeNext = false;

for (let i = startIndex; i < content.length; i++) {
  const char = content[i];
  
  if (escapeNext) {
    escapeNext = false;
    continue;
  }
  
  if (char === '\\') {
    escapeNext = true;
    continue;
  }
  
  if (char === '"' || char === "'" || char === '`') {
    // Basic string handling (might need refinement for backticks)
    if (!inString) {
      inString = char;
    } else if (inString === char) {
      inString = false;
    }
  }
  
  if (!inString) {
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
  }
}

if (endIndex !== -1) {
  console.log(content.substring(startIndex, endIndex + 1));
} else {
  console.error("Parse failed");
}
