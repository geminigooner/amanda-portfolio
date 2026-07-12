const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const fs = require('fs');

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

const content = fs.readFileSync('server.ts', 'utf8');
const sysInstMatch = content.match(/const systemInstruction = `([\s\S]*?)`;/);
const systemInstruction = sysInstMatch[1];
const fullSystemInstruction = `${systemInstruction}\n\n<PROJECT_CONTEXT>\n${projectContext}\n</PROJECT_CONTEXT>`;

const run = async () => {
    let history = [
        { role: 'user', parts: [{ text: 'SYS_INIT_GREETING' }] },
        { role: 'model', parts: [{ text: 'Welcome.' }] }
    ];
    
    try {
      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7,
        },
        history: history,
      });
      const responseStream = await chat.sendMessageStream({ message: "tell me about Gemini inertia" });
      for await (const chunk of responseStream) {
        process.stdout.write(chunk.text);
      }
      console.log();
    } catch (error) {
      console.error("Error in /api/chat:", error?.message || "Unknown error occurred", error);
    }
};
run().catch(console.error);
