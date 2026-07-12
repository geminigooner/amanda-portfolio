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
  const url = 'http://localhost:3001/api/chat';
  
  // Turn 1
  const reqBody1 = {
    messages: [],
    projectContext,
    visitorMemory: { visitCount: 1 },
    isInitialGreeting: true
  };
  const res1 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody1)
  });
  const text1 = await res1.text();
  const lines = text1.split('\n').filter(l => l.startsWith('data: '));
  let assistantMsg = '';
  for (const line of lines) {
      if (line === 'data: [DONE]') break;
      try {
          const parsed = JSON.parse(line.substring(6));
          if (parsed.content) assistantMsg += parsed.content;
      } catch (e) {}
  }

  // Turn 2
  const reqBody2 = {
    messages: [
      {role: "assistant", content: assistantMsg},
      {role: "user", content: "tell me about Gemini inertia"}
    ],
    projectContext,
    visitorMemory: { visitCount: 1 }
  };
  const res2 = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody2)
  });
  const text2 = await res2.text();
};
run().catch(console.error);
