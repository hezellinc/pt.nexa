import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Rocket, Home, Info, Layers, Settings, Tag, Activity, Users, Phone, Moon, Sun, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import InteractiveIcon from './InteractiveIcon';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Beranda', href: '#beranda', icon: Home, colorClass: 'clay-icon-box' },
    { name: 'Tentang', href: '#tentang', icon: Info, colorClass: 'clay-icon-box-alt1' },
    { name: 'Layanan', href: '#layanan', icon: Layers, colorClass: 'clay-icon-box-alt2' },
    { name: 'Cara Kerja', href: '#proses', icon: Settings, colorClass: 'clay-icon-box-alt3' },
    { name: 'Harga', href: '#harga', icon: Tag, colorClass: 'clay-icon-box-alt4' },
    { name: 'Analitik', href: '#analitik', icon: Activity, colorClass: 'clay-icon-box' },
    { name: 'Tim', href: '#tim', icon: Users, colorClass: 'clay-icon-box-alt1' },
    { name: 'FAQ', href: '#faq', icon: HelpCircle, colorClass: 'clay-icon-box' },
    { name: 'Kontak', href: '#kontak', icon: Phone, colorClass: 'clay-icon-box-alt2' },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 p-3 md:p-4 pointer-events-none">
      <div className="max-w-6xl mx-auto clay-sm px-4 md:px-6 py-3 md:py-4 flex justify-between items-center bg-[color-mix(in_srgb,var(--bg-color)_90%,transparent)] backdrop-blur-md pointer-events-auto transition-colors duration-300">
        <div className="flex items-center gap-2 md:gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center shrink-0"
          >
            <img src="/nexa-logo.png" alt="NexaTech Logo" className="h-8 md:h-10 w-auto object-contain" />
          </motion.div>
          <span className="font-bold text-lg md:text-xl tracking-tight text-text truncate">PT. NexaTech <span className="text-primary hidden sm:inline">Solution</span></span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            className="p-2 clay-sm rounded-xl text-primary hover:text-white hover:bg-primary transition-colors"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button 
            className="p-2 clay-sm rounded-xl text-primary hover:text-white hover:bg-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-4 right-4 md:left-auto md:right-4 md:w-96 clay p-6 flex flex-col gap-2 bg-[color-mix(in_srgb,var(--bg-color)_95%,transparent)] backdrop-blur-xl origin-top-right pointer-events-auto transition-colors duration-300"
          >
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors group"
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-2xl shrink-0 ${link.colorClass} group-hover:scale-110 transition-transform`}>
                    <link.icon size={20} className="text-white" />
                  </div>
                  <span className="font-bold text-lg text-text group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>
            
            <motion.a 
              href="#kontak" 
              onClick={() => setIsOpen(false)} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="clay-btn flex items-center justify-center py-4 font-bold text-lg mt-4 w-full"
            >
              Mulai Konsultasi
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
