const fs = require('fs');
let content = fs.readFileSync('src/components/ProjectDetailModal.tsx', 'utf8');

content = content.replace('  const [isMagnifying, setIsMagnifying] = useState(false);\n  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });\n', '');
content = content.replace('    setIsMagnifying(false);\n', '');

content = content.replace(/  const handleMouseMove = \(e: React\.MouseEvent<HTMLDivElement>\) => \{[\s\S]*?  \};\n/, '');

fs.writeFileSync('src/components/ProjectDetailModal.tsx', content);
console.log("cleaned");
