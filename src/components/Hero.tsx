import { motion } from 'motion/react';
import { Monitor, Smartphone, PenTool, LayoutTemplate } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';
import GradientWaves from './GradientWaves';

export default function Hero() {
  return (
    <section id="beranda" className="lazy-section pt-32 pb-12 flex flex-col items-center justify-center relative px-4">
      
      {/* Dynamic Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={0.3}
          mouseInteraction={false}
          parallaxStrength={0.5}
          grain={true}
          grainIntensity={0.05}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6 px-4 md:px-6 py-2 bg-[var(--clay-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase"
        >
          Inovasi Digital Tanpa Batas
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 md:mb-8 text-text leading-tight px-2"
        >
          Tingkatkan Bisnis Anda dengan <span className="text-primary block sm:inline">NexaTech</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl opacity-80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Kami memberikan solusi menyeluruh mulai dari Pengiklanan strategi digital, Desain & Pengembangan (Produk Jasa), hingga proses Penjualan dan Pendistribusian yang modern.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full px-6"
        >
          <a href="#layanan" className="clay-btn px-8 py-4 font-bold text-base md:text-lg w-full sm:w-auto flex items-center justify-center text-center">
            Eksplorasi Layanan
          </a>
          <a href="#kontak" className="clay-btn-accent px-8 py-4 font-bold text-base md:text-lg w-full sm:w-auto flex items-center justify-center text-center">
            Konsultasi Gratis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
