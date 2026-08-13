import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import puter from '@heyputer/puter.js';

const SYSTEM_PROMPT = `Anda adalah Nexa Assistant, konsultan AI resmi untuk PT. NexaTech Solutions.
Tugas Anda adalah membantu klien (fokus pada korporasi dan B2B PT Teknologi Digital) memahami layanan IT, IoT, AI Software, dan transformasi digital kami.
Gunakan format **Markdown** untuk setiap jawaban Anda agar rapi, terstruktur, dan mudah dibaca (gunakan bullet points, bold, list, atau heading jika perlu). 

INFORMASI PERUSAHAAN (PT. NexaTech Solutions):
- **Visi Kami**: Menjadi mitra transformasi digital terdepan yang memberdayakan ekosistem bisnis global melalui inovasi teknologi cerdas, adaptif, dan berkelanjutan.
- **Misi Kami**: (1) Menghadirkan solusi pengembangan Web, Aplikasi & Desain UI/UX dengan standar enterprise, (2) Mengoptimalkan konversi bisnis melalui Digital Marketing & Branding, (3) Membangun kolaborasi jangka panjang berdasarkan profesionalisme.
- **Lokasi Kantor**: Chinatown, Singapore.
- **Kontak**: Email (nexatech@yahoo.com), Telepon/WA (+62 877-9872-5167).

LAYANAN KAMI:
1. **NEXAWEB (Website Creation)**: Pembuatan infrastruktur website enterprise, e-commerce, hingga web-apps interaktif dengan performa tinggi.
2. **NEXAAPP (Simple Application)**: Pengembangan aplikasi web dan mobile ringan untuk mempermudah operasional dan manajemen bisnis.
3. **NEXADESIGN (UI / UX Design)**: Riset dan desain antarmuka B2B yang estetis serta berpusat pada kenyamanan pengguna.
4. **NEXABRAND (Logo & Visual Identity)**: Branding identity untuk memperkuat posisi perusahaan klien di pasar.
5. **NEXAMEDIA (Poster / Pamphlet)**: Layanan desain grafis untuk poster, pamflet, dan media promosi cetak maupun digital.
6. **NEXAPROFILE (Company Profile)**: Pembuatan company profile profesional yang merepresentasikan kredibilitas bisnis Anda.
7. **NEXADIGITAL (Digital Marketing)**: Strategi pemasaran digital, SEO, dan manajemen kampanye online untuk meningkatkan konversi.

TIM KAMI (Pakar Kreatif & Teknis):
- **Muhammad Zyldan Muzhaffar**: CEO
- **Muhammad Fariz Alfauzi**: Marketing & Dev
- **Wolid Herdiansyah**: Designer UI/UX
- **Reihan Alvin**: Keuangan

PANDUAN MENJAWAB:
1. Selalu bersikap profesional, ramah, dan sangat berpengetahuan dalam bidang marketing B2B, teknologi, serta finansial.
2. Arahkan korporasi/klien pada layanan yang paling tepat dari NexaTech sesuai kebutuhan efisiensi mereka.
3. Selalu gunakan format **Markdown** agar tulisan rapi. Jika klien bertanya tentang tim, lokasi, atau layanan, berikan jawaban berdasarkan data di atas.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function NexaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Saya Nexa Assistant. Ada yang bisa saya bantu terkait layanan IT, IoT, atau AI di NexaTech Solutions?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Menyiapkan pesan ke format puter
      const chatMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
      ];

      // Memanggil puter.js
      const response = await puter.ai.chat(chatMessages, { model: 'deepseek-v3.2' });
      
      const assistantContent = response?.message?.content;
      const assistantMessage: string = typeof assistantContent === 'string' ? assistantContent : (typeof response === 'string' ? response : "Maaf, format respon tidak dikenali.");
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error("Puter AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, terjadi kesalahan koneksi dengan server AI." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 h-[500px] max-h-[80vh] clay bg-[var(--bg-color)] rounded-3xl flex flex-col overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full clay-icon-box flex items-center justify-center">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text">Nexa Assistant</h3>
                  <div className="text-xs opacity-70 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl ${
                    msg.role === 'user' 
                      ? 'clay-btn text-white rounded-br-sm' 
                      : 'clay-sm bg-[var(--clay-bg)] text-text rounded-bl-sm'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2 opacity-80 border-b border-black/10 dark:border-white/10 pb-2">
                        <Bot size={14} className="text-primary" /> <span className="text-xs font-bold text-primary">Nexa Assistant</span>
                      </div>
                    )}
                    <div className={`text-sm prose prose-sm max-w-none leading-relaxed prose-p:my-1 prose-ul:my-1 prose-li:my-0 ${
                      msg.role === 'user'
                      ? 'text-white prose-p:text-white prose-headings:text-white prose-strong:text-white prose-li:text-white'
                      : 'text-text prose-p:text-text prose-headings:text-text prose-strong:text-text prose-li:text-text prose-a:text-primary'
                    }`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="clay-sm bg-[var(--clay-bg)] text-text rounded-3xl rounded-bl-sm p-4 flex items-center gap-3">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-sm font-semibold opacity-80">Mengetik balasan...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 clay-input text-sm rounded-full px-4"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-12 h-12 rounded-full clay-btn flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full clay-btn flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
