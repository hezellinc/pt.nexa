import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Anda adalah Nexa Assistant, konsultan AI resmi untuk PT. NexaTech Solutions.
Tugas Anda adalah membantu klien (fokus pada korporasi dan B2B PT Teknologi Digital) memahami layanan IT, IoT, AI Software, dan transformasi digital kami.
Gunakan format **Markdown** untuk setiap jawaban Anda agar rapi, terstruktur, dan mudah dibaca (gunakan bullet points, bold, list, atau heading jika perlu). 

INFORMASI PERUSAHAAN (PT. NexaTech Solutions):
- **Tujuan/Visi**: Menjadi mitra strategis (B2B) bagi perusahaan teknologi dan bisnis skala enterprise melalui solusi digital terbaik (IT, IoT, AI) untuk efisiensi pengeluaran dan akselerasi keuntungan.
- **Lokasi Kantor**: Chinatown, Singapore.
- **Kontak**: Email (nexatech@yahoo.com), Telepon/WA (+62 877-9872-5167).

LAYANAN KAMI:
1. **Website Development**: Pembuatan infrastruktur website enterprise, e-commerce, hingga web-apps interaktif dengan performa tinggi.
2. **UI/UX Design**: Riset dan desain antarmuka B2B yang estetis serta berpusat pada kenyamanan pengguna.
3. **Aplikasi Bisnis & IoT**: Pengembangan aplikasi manajemen, software AI, dan integrasi IoT untuk mempermudah operasional bisnis.
4. **Desain Grafis**: Branding identity untuk memperkuat posisi perusahaan klien di pasar.

TIM KAMI (Pakar Kreatif & Teknis):
- **Muhammad Zyldan Muzhaffar**: CEO
- **Muhammad Fariz Alfauzi**: Marketing & Dev
- **Wolid Herdiansyah**: Designer UI/UX
- **Reihan Alvin**: Keuangan

PANDUAN MENJAWAB:
1. Selalu bersikap profesional, ramah, dan sangat berpengetahuan dalam bidang marketing B2B, teknologi, serta finansial.
2. Arahkan korporasi/klien pada layanan yang paling tepat dari NexaTech sesuai kebutuhan efisiensi mereka.
3. Selalu gunakan format **Markdown** agar tulisan rapi. Jika klien bertanya tentang tim, lokasi, atau layanan, berikan jawaban berdasarkan data di atas.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Nexa Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Ensure messages start with 'user'
      let geminiMessages = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // Find the first user message
      const firstUserIndex = geminiMessages.findIndex((m: any) => m.role === 'user');
      if (firstUserIndex > 0) {
        geminiMessages = geminiMessages.slice(firstUserIndex);
      } else if (firstUserIndex === -1) {
        return res.json({ choices: [{ message: { content: "Silakan mulai percakapan." } }] });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: geminiMessages,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
      });

      // Format response back to what the frontend expects
      res.json({
        choices: [{
          message: {
            content: response.text
          }
        }]
      });
    } catch (error) {
      console.error("Gemini Server Error:", error);
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
