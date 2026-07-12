const { buildSync } = require('esbuild');
buildSync({
  entryPoints: ['src/data.ts'],
  bundle: true,
  format: 'cjs',
  outfile: 'dist/data.cjs',
  packages: 'external'
});
const { PROJECTS } = require('./dist/data.cjs');
const projectContext = `Visitor is currently observing section: HOME\n\n` + PROJECTS.map(p => `${p.title} (${p.wing}): ${p.desc} [Tags: ${p.tags.join(', ')}]${p.sourceLink ? ' [Source code available]' : ''}`).join('\n');

const run = async () => {
  const reqBody2 = {
    messages: [
      {role: "assistant", content: "Welcome."},
      {role: "user", content: "tell me about Gemini inertia"}
    ],
    projectContext,
    visitorMemory: { visitCount: 1 }
  };
  const res2 = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody2)
  });
  const text2 = await res2.text();
  console.log("Turn 2 Response:", text2);
};
run().catch(console.error);
