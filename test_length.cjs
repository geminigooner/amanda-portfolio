const { buildSync } = require('esbuild');
buildSync({ entryPoints: ['src/data.ts'], bundle: true, format: 'cjs', outfile: 'dist/data.cjs', packages: 'external' });
const { PROJECTS } = require('./dist/data.cjs');

const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

function getContext(activeSection, messages, userMessage) {
  const recentUserMessages = [...messages, userMessage].filter(m => m.role === 'user').slice(-3);
  const relevanceString = recentUserMessages.map(m => normalizeText(m.content)).join('');

  const matchedProjects = PROJECTS.filter(p => {
    const normalizedTitle = normalizeText(p.title);
    return relevanceString.includes(normalizedTitle);
  });

  matchedProjects.sort((a, b) => {
    const idxA = relevanceString.lastIndexOf(normalizeText(a.title));
    const idxB = relevanceString.lastIndexOf(normalizeText(b.title));
    return idxB - idxA;
  });

  const topMatchedProjects = matchedProjects.slice(0, 3);

  const compactIndex = PROJECTS.map(p => {
    let line = `- ${p.title} (${p.wing})`;
    if (p.subtitle) line += `: ${p.subtitle}`;
    if (p.tags && p.tags.length > 0) line += ` [Tags: ${p.tags.join(', ')}]`;
    if (p.flagship) {
      line += ` [Flagship${p.flagshipOrder ? ` ${p.flagshipOrder}` : ''}]`;
    }
    if (p.link) line += ` [Public link]`;
    if (p.sourceLink) line += ` [Source/PDF link]`;
    if (p.images && p.images.length > 0) line += ` [Images available]`;
    return line;
  }).join('\n');

  let projectContext = `Visitor is currently observing section: ${activeSection}\n\n`;
  projectContext += `COMPACT ARCHIVE INDEX\n${compactIndex}\n\n`;
  
  if (topMatchedProjects.length > 0) {
    projectContext += `RELEVANT PROJECT DETAIL\n`;
    projectContext += topMatchedProjects.map(p => `${p.title}:\n${p.desc}`).join('\n\n');
  } else {
    projectContext += `RELEVANT PROJECT DETAIL\nNo specific project detail was requested.`;
  }
  return projectContext;
}

const oldFull = `Visitor is currently observing section: HOME\n\n` + PROJECTS.map(p => `${p.title} (${p.wing}): ${p.desc} [Tags: ${p.tags.join(', ')}]${p.sourceLink ? ' [Source code available]' : ''}`).join('\n');
console.log("Old full context length:", oldFull.length);

const generic = getContext("HOME", [], {role: 'user', content: 'hello'});
console.log("Generic generic length:", generic.length);

const single = getContext("HOME", [], {role: 'user', content: 'tell me about K-ONSET'});
console.log("Single project length:", single.length);

const compare = getContext("HOME", [], {role: 'user', content: 'compare K-ONSET and Gemini Inertia'});
console.log("Compare projects length:", compare.length);
