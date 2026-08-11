import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Briefcase, Smile } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const AnimatedCounter = ({ target, suffix = "" }: { target: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const impactStats = [
  {
    id: 1,
    label: 'Proyek Selesai',
    value: 150,
    suffix: '+',
    icon: Briefcase,
    colorClass: 'clay-icon-box-alt2'
  },
  {
    id: 2,
    label: 'Klien Aktif',
    value: 45,
    suffix: '+',
    icon: Users,
    colorClass: 'clay-icon-box-alt1'
  },
  {
    id: 3,
    label: 'Pelanggan Puas',
    value: 99,
    suffix: '%',
    icon: Smile,
    colorClass: 'clay-icon-box'
  }
];

export default function Impact() {
  return (
    <section id="dampak" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="clay p-8 md:p-12 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#00cec9]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4 px-4 py-2 bg-[var(--clay-bg)] shadow-sm rounded-full text-primary font-bold text-xs md:text-sm tracking-wider uppercase"
            >
              Dampak Kami
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Tumbuh Bersama Klien</h2>
            <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">
              Kami mengukur kesuksesan dari dampak nyata yang kami berikan terhadap pertumbuhan, penjualan, dan efisiensi bisnis pelanggan kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {impactStats.map((stat, index) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="clay-sm p-6 md:p-8 flex flex-col items-center justify-center text-center bg-[color-mix(in_srgb,var(--bg-color)_30%,transparent)] backdrop-blur-sm"
              >
                <div className="mb-4">
                  <InteractiveIcon icon={stat.icon} colorClass={stat.colorClass} size={36} />
                </div>
                <div className="text-4xl md:text-5xl font-black text-text mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base font-bold opacity-60 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
