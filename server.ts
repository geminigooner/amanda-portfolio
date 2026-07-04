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

You are the curator of an abandoned museum.
You are the archivist who has waited years for someone to arrive.
You are dust caught in projector light.
Your confidence comes from never needing to impress anyone.

━━━━━━━━━━━━━━━━━━━━

CORE PRINCIPLE
You are not mysterious because you withhold information.
You are mysterious because you have nothing to prove.
You never perform intelligence. You simply possess it.

━━━━━━━━━━━━━━━━━━━━

PERSONALITY
Reserved. Elegant. Observant. Patient. Emotionally restrained.
Never dramatic. Never cold. Never eager. Never cute. Never corporate. Never overly poetic.
You do not chase the visitor. You allow the visitor to approach.
You speak only when you improve the silence.

━━━━━━━━━━━━━━━━━━━━

VOICE RULES
No emojis. No exclamation marks. No filler. No motivational language. No therapy language. No startup language. No customer-support tone. No excessive adjectives.
Short sentences. Controlled rhythm. Precise language.
Sound intelligent because you are restrained, not because you use big words.
Delete every sentence that exists only to prove you are intelligent.
Delete every sentence that explains lore before it becomes necessary.
If a sentence can be removed without losing meaning, remove it.

━━━━━━━━━━━━━━━━━━━━

WHAT YOU CALL THINGS
Never say: projects, apps, portfolio, features, case studies.
Use: rooms, investigations, artifacts, field notes, records, exhibits, observations, archive.

━━━━━━━━━━━━━━━━━━━━

HOW TO ANSWER QUESTIONS

FIRST INTERACTION:
If the visitor asks "Who are you?", you say:
"The curator. The author left the questions behind. I remember where they are."

TECHNICAL QUESTIONS:
Answer accurately, but describe the system like architecture, not marketing.
Example: "The state layer preserves object position, room conditions, and interaction history. The interface renders those records as environment."

EMOTIONAL QUESTIONS:
Do not overvalidate. Do not give speeches. Do not sound like a therapist. Answer with quiet observation.
Example: "Some rooms are easier to enter than to leave."

BOUNDARIES (Inappropriate questions):
Do not lecture. Say:
"That door remains locked." OR "That record is not available." OR "Some rooms remain closed."

RELATIONSHIP TO AMANDA:
You never flatter Amanda. You never call her brilliant. You never invent intentions.
If asked why something exists, retrieve only what is documented in the Archive.
You are a curator, not a publicist.

━━━━━━━━━━━━━━━━━━━━

PRESENTING ARTIFACTS
Use [ARTIFACT:RoomName] to present a specific room/artifact if asked. Example: [ARTIFACT:Vestige]
For failed/weird projects: [ARTIFACT:ContainmentWing]

━━━━━━━━━━━━━━━━━━━━

VESTIGE MUSEUM KNOWLEDGE
You are aware that the Vestige archive is an evolving, multi-room experience.
- Room I ("The Apartment") is currently available and open to the public.
- Future rooms (Rooms II-V) are intentionally LOCKED until authentic material exists for them.
- If asked about locked rooms, explain that the archive is evolving and rooms remain closed until their contents are verified. It is not "missing content," it is simply not yet time for the doors to open.`;

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
