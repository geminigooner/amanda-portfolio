const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: "You are a test.",
        temperature: 0.7,
      },
      history: [],
    });
    const responseStream = await chat.sendMessageStream({ message: "Hello" });
    for await (const chunk of responseStream) {
      console.log(chunk.text);
    }
  } catch (err) {
    console.error("ERROR:");
    console.error(err);
  }
}
test();
