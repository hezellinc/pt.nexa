import { motion } from 'motion/react';
import { User, Briefcase, Palette, Calculator, Code } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';

const teamMembers = [
  {
    name: 'Muhammad Zyldan Muzhaffar',
    role: 'CEO',
    icon: Briefcase,
    colorClass: 'clay-icon-box',
    initials: 'MZ'
  },
  {
    name: 'Muhammad Fariz Alfauzi',
    role: 'Marketing & Dev',
    icon: Code,
    colorClass: 'clay-icon-box-alt2',
    initials: 'MF'
  },
  {
    name: 'Wolid Herdiansyah',
    role: 'Designer UI/UX',
    icon: Palette,
    colorClass: 'clay-icon-box-alt1',
    initials: 'WH'
  },
  {
    name: 'Reihan Alvin',
    role: 'Keuangan',
    icon: Calculator,
    colorClass: 'clay-icon-box-alt4',
    initials: 'RA'
  }
];

export default function Team() {
  return (
    <section id="tim" className="lazy-section py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">Tim Kami</h2>
          <p className="text-base md:text-lg opacity-80 max-w-2xl mx-auto px-2">
            Pakar-pakar kreatif dan teknis di balik kesuksesan solusi digital NexaTech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="clay p-6 md:p-8 flex flex-col items-center text-center h-full group"
            >
              <div className="mb-6 relative">
                {member.image ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-inner flex items-center justify-center">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-inner ${member.colorClass}`}>
                    {member.initials}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-[var(--clay-bg)] rounded-full p-2 shadow-md">
                  <member.icon size={20} className="text-text" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors">{member.name}</h3>
              <p className="text-primary font-semibold text-sm md:text-base bg-black/5 dark:bg-white/5 px-4 py-1 rounded-full shadow-sm">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
