import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const root = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(root, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();
    const history = Array.isArray(req.body?.history) ? req.body.history.slice(-12) : [];
    if (!message) return res.status(400).json({ error: "Type or say something first." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "AI setup needed: add OPENAI_API_KEY in Render Environment settings." });
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const safeHistory = history.filter(x => x && ["user", "assistant"].includes(x.role))
      .map(x => ({ role: x.role, content: String(x.content || "").slice(0, 2000) }));
    const result = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: "You are Quest Glasses AI, a friendly voice-first assistant in an unofficial smart-glasses-style simulator for Meta Quest. Be concise and honest. Never claim to see through headset cameras unless an image was actually provided. Explain that a website cannot replace the headset operating system or unlock unsupported hardware.",
      input: [...safeHistory, { role: "user", content: message }],
      max_output_tokens: 450
    });
    res.json({ reply: result.output_text || "I couldn't form a response. Try again." });
  } catch (err) {
    console.error("AI request failed:", err?.message || err);
    res.status(500).json({ error: "AI request failed. Check the server logs and API key." });
  }
});
app.get("*", (_req, res) => res.sendFile(path.join(root, "public", "index.html")));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Quest Glasses AI listening on ${port}`));
