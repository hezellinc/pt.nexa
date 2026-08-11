import { motion } from 'motion/react';
import { Globe, Layout, Smartphone, PenTool, ArrowRight } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

export default function Services() {
  const services = [
    { 
      id: 1,
      title: 'Website Development', 
      desc: 'Pembuatan website company profile, e-commerce, hingga landing page interaktif dengan performa tinggi dan SEO friendly.', 
      icon: Globe,
      colorClass: 'clay-icon-box-alt2'
    },
    { 
      id: 2,
      title: 'UI/UX Design', 
      desc: 'Riset, wireframing, dan desain antarmuka yang estetis serta berpusat pada kenyamanan pengguna (User-Centric).', 
      icon: Layout,
      colorClass: 'clay-icon-box-alt1'
    },
    { 
      id: 3,
      title: 'Aplikasi Sederhana', 
      desc: 'Pengembangan aplikasi web dan mobile ringan untuk mempermudah operasional dan manajemen bisnis Anda.', 
      icon: Smartphone,
      colorClass: 'clay-icon-box-alt3'
    },
    { 
      id: 4,
      title: 'Desain Grafis', 
      desc: 'Branding identity, logo, ilustrasi, dan materi pemasaran visual untuk memperkuat identitas brand perusahaan Anda.', 
      icon: PenTool,
      colorClass: 'clay-icon-box-alt4'
    },
  ];

  return (
    <section id="layanan" className="py-20 px-4 md:px-8 bg-[color-mix(in_srgb,var(--bg-color)_50%,transparent)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Layanan Unggulan Kami</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Solusi digital komprehensif yang dirancang khusus untuk meningkatkan daya saing dan efisiensi bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="clay p-6 md:p-8 flex flex-col h-full relative overflow-hidden group"
            >
              <div className="mb-6 flex justify-between items-start">
                <InteractiveIcon icon={service.icon} colorClass={service.colorClass} />
                <div className="w-10 h-10 md:w-12 md:h-12 clay-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors cursor-pointer shrink-0">
                  <ArrowRight size={18} className="md:w-5 md:h-5" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-text">{service.title}</h3>
              <p className="opacity-80 leading-relaxed flex-grow text-sm md:text-base">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
