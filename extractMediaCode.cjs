const fs = require('fs');

const content = fs.readFileSync('src/components/ProjectDetailModal.tsx', 'utf8');

// We want to extract the ProjectMediaGallery function, ProjectMediaVideo function,
// and the part inside ProjectDetailModal that renders media.

const galleryMatch = content.match(/function ProjectMediaGallery\([\s\S]*?\}\n\nfunction ProjectMediaVideo/);
const videoMatch = content.match(/function ProjectMediaVideo\([\s\S]*?\}\n\nexport function ProjectDetailModal/);

const renderBlockMatch = content.match(/\{\/\* Media Section \*\/\}([\s\S]*?)\{\/\* Text Section \*\/\}/);

console.log('// --- COMPONENT: ProjectMediaGallery ---');
if (galleryMatch) console.log(galleryMatch[0].replace(/\nfunction ProjectMediaVideo$/, ''));

console.log('\n// --- COMPONENT: ProjectMediaVideo ---');
if (videoMatch) console.log(videoMatch[0].replace(/\nexport function ProjectDetailModal$/, ''));

console.log('\n// --- MEDIA RENDER BLOCK in ProjectDetailModal ---');
if (renderBlockMatch) console.log('{/* Media Section */}' + renderBlockMatch[1]);
