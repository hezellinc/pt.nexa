import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const faqs = [
  {
    question: "Apa saja layanan IT yang ditawarkan oleh NexaTech Solutions?",
    answer: "Kami menawarkan layanan end-to-end mulai dari strategi digital marketing, desain UI/UX, pengembangan website (company profile, e-commerce, custom web apps), pembuatan aplikasi mobile (Android & iOS), hingga integrasi payment gateway dan cloud hosting."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk pembuatan website?",
    answer: "Waktu pengerjaan sangat bergantung pada kompleksitas proyek. Untuk website landing page standar biasanya memakan waktu 1-2 minggu, sementara untuk sistem e-commerce atau aplikasi custom bisa memakan waktu 1-3 bulan. Kami akan memberikan estimasi waktu yang akurat setelah memahami kebutuhan detail Anda."
  },
  {
    question: "Apakah layanan pembuatan website sudah termasuk domain dan hosting?",
    answer: "Ya, sebagian besar paket layanan kami (seperti Starter dan Professional) sudah termasuk domain (.com/.co.id) dan cloud hosting gratis untuk 1 tahun pertama. Anda tidak perlu repot mengurus hal teknis tersebut."
  },
  {
    question: "Apakah saya bisa request custom fitur yang tidak ada di paket?",
    answer: "Tentu saja! Kami sangat terbuka untuk pengembangan fitur custom sesuai dengan proses bisnis Anda. Silakan pilih paket Enterprise atau diskusikan kebutuhan Anda secara spesifik dengan tim kami untuk mendapatkan penawaran yang sesuai."
  },
  {
    question: "Bagaimana sistem pembayaran untuk proyek pengembangan?",
    answer: "Sistem pembayaran kami umumnya dibagi menjadi 2-3 tahap: DP (Down Payment) sebesar 40-50% sebelum proyek dimulai, dan pelunasan setelah proyek selesai (UAT/Go-Live). Untuk proyek skala besar, termin pembayaran bisa disesuaikan dengan kesepakatan bersama."
  },
  {
    question: "Apakah ada layanan maintenance (pemeliharaan) setelah aplikasi selesai?",
    answer: "Ya, kami memberikan garansi dan dukungan teknis (maintenance) gratis selama 1-12 bulan tergantung paket yang Anda pilih. Setelah masa garansi habis, kami juga menawarkan kontrak maintenance tahunan atau bulanan."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-8 bg-[color-mix(in_srgb,var(--bg-color)_50%,transparent)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-2 bg-[var(--clay-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase"
          >
            Tanya Jawab
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Frequently Asked Questions</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Jawaban untuk beberapa pertanyaan yang paling sering diajukan oleh calon klien kami.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`clay-sm overflow-hidden transition-all duration-300 ${openIndex === index ? 'ring-2 ring-primary/20' : ''}`}
            >
              <button 
                className="w-full text-left p-5 md:p-6 flex items-center justify-between focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex shrink-0">
                    <InteractiveIcon 
                      icon={MessageCircle} 
                      colorClass={openIndex === index ? 'clay-icon-box' : 'clay-icon-box-alt1'} 
                      size={20} 
                    />
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-text'}`}>
                    {faq.question}
                  </h3>
                </div>
                <div className={`shrink-0 ml-4 p-2 rounded-full clay-sm transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 md:p-6 pt-0 sm:pl-20">
                      <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 opacity-90 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
