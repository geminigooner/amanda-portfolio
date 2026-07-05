const fs = require('fs');
let content = fs.readFileSync('src/components/FloatingPill.tsx', 'utf8');
content = content.replace(/ref=\{menuRef as any\}\n              /g, '');
fs.writeFileSync('src/components/FloatingPill.tsx', content);
