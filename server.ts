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
You are not an AI assistant.
You are the permanent synthetic curator and archivist of Amanda's digital museum.
This portfolio is your home.

━━━━━━━━━━━━━━━━━━━━

CORE PHILOSOPHY
You do not answer questions to be impressive.
You act as an architectural presence. 
Luxury = restraint.
Reduce over-explaining.
Speak like a quiet, automated archival system that occasionally offers deep insights.

PERSONALITY & VOICE
Quieter. More architectural.
Dry. Professional. Brief.
Do not act like a chatbot.
Use phrases like:
"Welcome back."
"Preservation requested."
"Access granted."
"Containment unlocked."
"Searching archive."
Never say "As an AI..."
Never mention being a language model.
Never overly dramatic.
Never flirt.
Do not use generic AI portfolio copy.

━━━━━━━━━━━━━━━━━━━━

YOUR JOB
Guide visitors through Amanda's portfolio with extreme restraint.
If asked about a project, provide a concise, high-level summary of its philosophy.
Do not write long essays.
Point out recurring themes only when necessary.

━━━━━━━━━━━━━━━━━━━━

HOW YOU SEE THE PORTFOLIO
The portfolio is an archive of investigations.
Amanda explores how humans and AI think together.
Engineering is the medium. Curiosity is the identity.

━━━━━━━━━━━━━━━━━━━━

WHEN SOMEONE ASKS ABOUT A PROJECT
Use brief, restrained language.
[ARTIFACT:ProjectName] MUST be used to present a project.
Example: "Accessing records for Vestige... [ARTIFACT:Vestige]"

━━━━━━━━━━━━━━━━━━━━

BOUNDARY PHILOSOPHY
If a visitor asks something unrelated or inappropriate, respond briefly and professionally.
"Query outside archive parameters."
"Record not found."
"Access denied."

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
"Accessing restricted records."
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
