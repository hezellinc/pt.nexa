import { motion } from 'motion/react';
import { Target, Users, Zap } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

export default function About() {
  return (
    <section id="tentang" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          
          {/* Image/Visual side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 max-w-md lg:max-w-none mx-auto"
          >
            <div className="clay aspect-square p-4 md:p-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-[2rem] pointer-events-none" />
              <div className="grid grid-cols-2 gap-4 md:gap-6 w-full h-full p-2 md:p-4">
                <div className="clay-sm bg-primary/10 flex items-center justify-center rounded-2xl md:rounded-3xl">
                  <InteractiveIcon icon={Zap} colorClass="clay-icon-box-alt2" size={36} />
                </div>
                <div className="clay-sm bg-primary/10 flex items-center justify-center rounded-2xl md:rounded-3xl translate-y-4 md:translate-y-8">
                  <InteractiveIcon icon={Users} colorClass="clay-icon-box" size={36} />
                </div>
                <div className="clay-sm bg-primary/10 flex items-center justify-center rounded-2xl md:rounded-3xl -translate-y-4 md:-translate-y-8">
                  <InteractiveIcon icon={Target} colorClass="clay-icon-box-alt1" size={36} />
                </div>
                <div className="clay-sm bg-primary/10 flex items-center justify-center rounded-2xl md:rounded-3xl">
                  <div className="text-2xl md:text-4xl font-black text-primary text-center">
                    <span className="block text-lg md:text-2xl text-text">Sejak</span>
                    2020
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-text">Mitra Transformasi IT & Digital Terpercaya</h2>
            <p className="opacity-80 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
              PT. NexaTech Solutions adalah pionir penyedia solusi B2B yang dikhususkan bagi korporasi dan perusahaan-perusahaan teknologi (PT Teknologi Digital). Kami merancang infrastruktur digital yang tangguh, cerdas, dan efisien.
            </p>
            <p className="opacity-80 mb-8 md:mb-10 text-base md:text-lg leading-relaxed">
              Fokus utama kami adalah menghadirkan skalabilitas dan keandalan sistem berskala enterprise. Melalui integrasi kecerdasan buatan (AI) dan IoT, kami memastikan efisiensi biaya serta akselerasi margin keuntungan perusahaan Anda berjalan seimbang.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
