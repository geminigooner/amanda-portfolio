const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

const oldDesc = `OverviewLLM Museum is an interactive educational experience designed to make the internal mechanics of modern language models understandable through direct exploration rather than static explanation.Instead of reading about machine learning concepts, visitors move through a series of interactive rooms that visualize each major stage of an LLM's reasoning pipeline—from tokenization to embeddings, attention, prediction, multimodal perception, and model-specific behavior.The project combines systems thinking, interaction design, software engineering, and educational storytelling to translate abstract machine learning concepts into experiences that can be explored visually.---Room HighlightsRoom 01 — TokenizationDemonstrates how text is segmented into tokens rather than interpreted as complete words. Visitors can type any sentence and observe how language is divided into the discrete units processed by a language model.Room 02 — Embedding SpaceVisualizes semantic embeddings as points within a high-dimensional vector space, illustrating how concepts with similar meanings naturally cluster together despite differences in wording.Room 03 — AttentionExplores the self-attention mechanism by showing how relationships between tokens influence contextual understanding. Instead of processing words sequentially, visitors see how information flows across an entire sentence simultaneously.Room 04 — PredictionSimulates next-token prediction, allowing visitors to explore probability distributions and observe how repeated selections can lead to common language model failure modes such as repetition collapse.Room 05 — Model WorldsCompares how multiple language models interpret the same prompt differently, highlighting how training data, architecture, and design priorities influence responses.`;

const newDesc = `Overview

LLM Museum is an interactive educational experience designed to make the internal mechanics of modern language models understandable through direct exploration rather than static explanation.

Instead of reading about machine learning concepts, visitors move through a series of interactive rooms that visualize each major stage of an LLM's reasoning pipeline—from tokenization to embeddings, attention, prediction, multimodal perception, and model-specific behavior.

The project combines systems thinking, interaction design, software engineering, and educational storytelling to translate abstract machine learning concepts into experiences that can be explored visually.

---

Room Highlights

Room 01 — Tokenization

Demonstrates how text is segmented into tokens rather than interpreted as complete words. Visitors can type any sentence and observe how language is divided into the discrete units processed by a language model.

Room 02 — Embedding Space

Visualizes semantic embeddings as points within a high-dimensional vector space, illustrating how concepts with similar meanings naturally cluster together despite differences in wording.

Room 03 — Attention

Explores the self-attention mechanism by showing how relationships between tokens influence contextual understanding. Instead of processing words sequentially, visitors see how information flows across an entire sentence simultaneously.

Room 04 — Prediction

Simulates next-token prediction, allowing visitors to explore probability distributions and observe how repeated selections can lead to common language model failure modes such as repetition collapse.

Room 05 — Model Worlds

Compares how multiple language models interpret the same prompt differently, highlighting how training data, architecture, and design priorities influence responses.`;

content = content.replace(oldDesc, newDesc);
fs.writeFileSync('src/data.ts', content);
