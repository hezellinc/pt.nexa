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
    const apiKey = process.env.MAXROUTER_API_KEY;
    
    // Fallback URL jika environment variable tidak diset, ganti sesuai dokumentasi MaxRouter jika beda
    const baseUrl = process.env.MAXROUTER_BASE_URL || "https://api.maxrouter.com/v1/chat/completions";

    if (!apiKey) {
      return res.status(500).json({ error: "MAXROUTER_API_KEY is missing" });
    }

    const maxRouterMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages
    ];

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-v3.2", 
        messages: maxRouterMessages,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MaxRouter API Error:", errorText);
      return res.status(response.status).json({ error: `MaxRouter API Error: ${response.statusText}` });
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Invalid JSON from MaxRouter:", responseText);
      return res.status(500).json({ error: "MaxRouter URL salah. Pastikan MAXROUTER_BASE_URL berakhiran dengan /v1/chat/completions" });
    }

    res.status(200).json({
      choices: [{
        message: {
          content: data.choices?.[0]?.message?.content || "Respon dari server kosong."
        }
      }]
    });
  } catch (error) {
    console.error("Vercel MaxRouter Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
