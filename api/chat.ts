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

export default async function handler(req: any, res: any) {
  // Hanya menerima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
      return res.status(200).json({ choices: [{ message: { content: "Silakan mulai percakapan." } }] });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: geminiMessages,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    res.status(200).json({
      choices: [{
        message: {
          content: response.text
        }
      }]
    });
  } catch (error) {
    console.error("Vercel Gemini Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
