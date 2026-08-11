import { motion } from 'motion/react';
import { Lightbulb, PenTool, Code, Rocket, ArrowRight } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const steps = [
  {
    icon: Lightbulb,
    title: '1. Riset & Pengiklanan',
    description: 'Kami menganalisis pasar Anda, merancang strategi pengiklanan, dan menentukan konsep produk yang paling menjual.',
    colorClass: 'clay-icon-box-alt4'
  },
  {
    icon: PenTool,
    title: '2. Desain UI/UX',
    description: 'Pembuatan wireframe dan prototipe interaktif agar Anda dapat melihat gambaran nyata sebelum dikembangkan.',
    colorClass: 'clay-icon-box-alt1'
  },
  {
    icon: Code,
    title: '3. Pengembangan & Integrasi',
    description: 'Proses coding (Front-end & Back-end) serta integrasi fitur penjualan seperti Payment Gateway.',
    colorClass: 'clay-icon-box-alt2'
  },
  {
    icon: Rocket,
    title: '4. Peluncuran & Distribusi',
    description: 'Mendistribusikan produk digital ke server cloud (Web) atau mempublikasikannya ke App Store/Play Store (Mobile).',
    colorClass: 'clay-icon-box'
  }
];

export default function Process() {
  return (
    <section id="proses" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-2 bg-[var(--clay-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase"
          >
            Cara Kerja Kami
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Proses End-to-End</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Dari perencanaan strategis, pemasaran (pengiklanan), pembuatan produk, hingga pendistribusian ke tangan pengguna.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-black/5 dark:bg-white/5 -translate-y-1/2 z-0 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary w-full rounded-full opacity-30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="clay p-6 md:p-8 flex flex-col items-center text-center group bg-[color-mix(in_srgb,var(--bg-color)_90%,transparent)] backdrop-blur-sm relative"
              >
                {/* Mobile/Tablet connector arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-6 text-gray-400 z-20">
                    <ArrowRight size={24} className="rotate-90 md:rotate-0" />
                  </div>
                )}
                
                <div className="mb-6 bg-[var(--bg-color)] p-2 rounded-2xl shadow-sm">
                  <InteractiveIcon icon={step.icon} colorClass={step.colorClass} size={32} />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 text-text">{step.title}</h3>
                <p className="opacity-80 text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
