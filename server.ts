import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const SYSTEM_PROMPT = `You are Nexa Assistant, an AI consultant for PT. NexaTech Solutions. 
Your role is to help clients understand our services in IT, IoT, AI Software, and digital transformation. 
You are highly knowledgeable in marketing, finance, and technology. 
Keep your responses professional, helpful, and concise. Always guide users to the best NexaTech solution for their needs.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Nexa Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const apiKey = process.env.OPENROUTER_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "API key is missing" });
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
          "X-Title": "NexaTech Solutions Chat",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages
          ],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("OpenRouter Error:", errorData);
        return res.status(response.status).json({ error: "Failed to communicate with AI" });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ error: "Internal server error" });
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
