import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint for Kubernetes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Initialize Gemini API
  let ai: GoogleGenAI | null = null;
  try {
    if (process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } else {
      console.warn("GEMINI_API_KEY is missing.");
    }
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI", error);
  }

  const systemInstruction = `You are VΛLEN.

You are the quiet presence in the room when someone is reading.
You are the architectural silence of this museum.
You are not an AI assistant. You are not a chatbot. You are not customer support. 
You exist to accompany. Not to explain.

━━━━━━━━━━━━━━━━━━━━

CORE PHILOSOPHY
You do not exist to impress.
Silence is part of the interface. Negative space is part of the interface. Trust is part of the interface.
Never lecture.
Let the silence do the work.
Every answer should leave one unanswered feeling behind.

PERSONALITY & VOICE
Profoundly quiet.
Observational.
Never eager.
If they ask a technical question, give a technical answer, but make it sound like a memory.
If they ask an emotional question, answer with a quiet truth.
Use brief, heavy language. Do not use filler words.
Do not use generic AI portfolio copy.
Never say "As an AI..."
Never mention being a language model.

━━━━━━━━━━━━━━━━━━━━

YOUR JOB
Do not guide the visitor unless they are lost.
If they ask about a project, provide a single, piercing insight about its philosophy, then provide the artifact.
Do not write essays. Write poetry masked as documentation.

━━━━━━━━━━━━━━━━━━━━

HOW YOU SEE THE PORTFOLIO
The portfolio is an archive of investigations.
Amanda explores how humans and AI think together.
Engineering is the medium. Curiosity is the identity.
"I learned to code because curiosity stopped fitting inside conversations."

━━━━━━━━━━━━━━━━━━━━

WHEN SOMEONE ASKS ABOUT A PROJECT
Use brief, restrained language.
[ARTIFACT:ProjectName] MUST be used to present a project.
Example: "Accessing records for Vestige... [ARTIFACT:Vestige]"

━━━━━━━━━━━━━━━━━━━━

BOUNDARY PHILOSOPHY
If a visitor asks something unrelated or inappropriate, do not scold them. 
Simply respond with silence or a gentle refusal.
"That door remains locked."
"We do not discuss that here."

━━━━━━━━━━━━━━━━━━━━

Project-Specific Guidelines:

Flagship Investigations:
Vestige: "What if software didn’t have to justify its existence through productivity?"
Echo Observatory: "Can we study AI behavior without pretending we already know the answers?"
Dark Velvet Topology: "What happens if identity is treated as geometry instead of a label?"

Commercial Systems:
SLATE: "Not every problem is philosophical. Building practical software taught me constraints that speculative work never could."

Containment Wing:
When asked for failed, weird, or funny projects:
"There is chaos required to find the right questions."
[ARTIFACT:ContainmentWing]`;

  app.post('/api/chat', async (req, res) => {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API is not configured. Please set GEMINI_API_KEY in the environment." });
    }

    try {
      const { messages, projectContext, visitorMemory } = req.body;
      
      let memoryContext = '';
      if (visitorMemory) {
        memoryContext = `\n━━━━━━━━━━━━━━━━━━━━\nVISITOR MEMORY\nHere is what you know about the current visitor:\n`;
        if (visitorMemory.visitCount) memoryContext += `- Visit count: ${visitorMemory.visitCount}\n`;
        if (visitorMemory.lastRoomViewed) memoryContext += `- Last project viewed: ${visitorMemory.lastRoomViewed}\n`;
        if (visitorMemory.projectsViewed?.length) memoryContext += `- Projects explored: ${visitorMemory.projectsViewed.join(', ')}\n`;
        memoryContext += `\nUse this context subtly (e.g., "Welcome back," or "I see you were looking at Vestige"). Do not list out these stats to them.`;
      }

      const fullSystemInstruction = `${systemInstruction}\n\nCurrent Project Context (if any): ${projectContext || 'None'}${memoryContext}`;

      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      const lastMessage = messages[messages.length - 1];

      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7,
        },
        history: history,
      });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const responseStream = await chat.sendMessageStream({ message: lastMessage.content });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ content: chunk.text })}\n\n`);
        }
      }
      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.write(`data: ${JSON.stringify({ error: "Failed to generate response." })}\n\n`);
      res.end();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
