const { buildSync } = require('esbuild');
buildSync({ entryPoints: ['src/data.ts'], bundle: true, format: 'cjs', outfile: 'dist/data.cjs', packages: 'external' });
const { PROJECTS } = require('./dist/data.cjs');
const projectContext = `Visitor is currently observing section: HOME\n\n` + PROJECTS.map(p => `${p.title} (${p.wing}): ${p.desc} [Tags: ${p.tags.join(', ')}]${p.sourceLink ? ' [Source code available]' : ''}`).join('\n');

const run = async () => {
  const url = 'http://localhost:3000/api/chat';
  
  // Real user message
  const reqBody2 = {
    messages: [
      {role: "assistant", content: "Welcome. I maintain this archive.\n\nName a project, ask where to begin, or tell me what kind of work brought you here."},
      {role: "user", content: "tell me about Gemini inertia"}
    ],
    projectContext, visitorMemory: { visitCount: 1 }
  };
  const res2 = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reqBody2) });
  console.log(await res2.text());
};
run().catch(console.error);
