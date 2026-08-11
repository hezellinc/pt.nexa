import { Mail, Phone, MapPin, Send, ChevronDown, Check, CheckCircle } from 'lucide-react';
import InteractiveIcon from './InteractiveIcon';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

const services = [
  "Website Landing Page",
  "Website E-Commerce",
  "Custom Web Application",
  "UI/UX Design",
  "Mobile App Development",
  "SEO & Digital Marketing",
  "Social Media Management",
  "Brand Identity & Logo",
  "Cloud & Hosting Setup",
  "IT Consulting",
  "Lainnya"
];

import ContactMap from './ContactMap';

export default function Contact() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [customService, setCustomService] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

    // Reset after a while
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="kontak" className="lazy-section py-8 md:py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="clay p-6 sm:p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            
            {/* Contact Info */}
            <div className="w-full lg:w-5/12">
              <h2 className="text-3xl font-bold mb-6 text-text">Mari Berkolaborasi!</h2>
              <p className="opacity-80 mb-10 leading-relaxed">
                Siap untuk mentransformasi bisnis Anda? Hubungi tim ahli kami hari ini untuk konsultasi gratis dan penawaran terbaik.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <InteractiveIcon icon={Mail} colorClass="clay-icon-box" size={24} />
                  <div>
                    <div className="font-bold text-text text-lg">Email</div>
                    <a href="mailto:nexatech@yahoo.com" className="opacity-80 hover:text-primary transition-colors">nexatech@yahoo.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <InteractiveIcon icon={Phone} colorClass="clay-icon-box-alt1" size={24} />
                  <div>
                    <div className="font-bold text-text text-lg">Telepon / WhatsApp</div>
                    <a href="tel:+6287798725167" className="opacity-80 hover:text-primary transition-colors">+62 877-9872-5167</a>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <InteractiveIcon icon={MapPin} colorClass="clay-icon-box-alt2" size={24} />
                  <div>
                    <div className="font-bold text-text text-lg">Lokasi</div>
                    <div className="opacity-80">Singapore, Chinatown</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 md:mt-10 h-64 lg:h-80 w-full rounded-2xl overflow-hidden shadow-inner border border-white/5 relative z-10">
                <ContactMap />
              </div>
            </div>

            {/* Form */}
            <div className="w-full lg:w-7/12">
              <form className="clay-sm p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold mb-2 text-text">Kirim Pesan</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-medium opacity-80 ml-2">Nama Lengkap</label>
                    <input type="text" placeholder="Nama Anda" className="clay-input w-full" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-medium opacity-80 ml-2">Email</label>
                    <input type="email" placeholder="username@nexa.com" className="clay-input w-full" required />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 relative">
                  <label className="font-medium opacity-80 ml-2">Layanan yang Dibutuhkan</label>
                  <div className="relative">
                    <div 
                      className="clay-input w-full cursor-pointer flex justify-between items-center"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className="text-text">{selectedService}</span>
                      <ChevronDown size={20} className={`text-primary transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsDropdownOpen(false)}
                          />
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 mt-2 z-50 clay-sm bg-[color-mix(in_srgb,var(--bg-color)_90%,transparent)] backdrop-blur-xl max-h-60 overflow-y-auto rounded-2xl py-2"
                          >
                            {services.map(service => (
                              <div 
                                key={service}
                                className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex items-center justify-between text-text hover:text-primary transition-colors"
                                onClick={() => {
                                  setSelectedService(service);
                                  setIsDropdownOpen(false);
                                }}
                              >
                                <span className="font-medium">{service}</span>
                                {service === selectedService && (
                                  <Check size={18} className="text-primary" />
                                )}
                              </div>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {selectedService === 'Lainnya' && (
                  <div className="flex flex-col gap-2">
                    <label className="font-medium opacity-80 ml-2">Layanan Lainnya</label>
                    <input 
                      type="text" 
                      placeholder="Sebutkan layanan yang Anda butuhkan..." 
                      className="clay-input w-full"
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="font-medium opacity-80 ml-2">Detail Proyek</label>
                  <textarea rows={4} placeholder="Ceritakan tentang proyek Anda..." className="clay-input w-full resize-y min-h-[120px]" required></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitted}
                  className={`clay-btn py-4 flex items-center justify-center gap-2 font-bold text-lg mt-2 w-full transition-all duration-300 ${isSubmitted ? 'bg-green-500 hover:bg-green-500 scale-95' : ''}`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="submitted"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        Pesan Terkirim! <CheckCircle size={20} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        Kirim Penawaran <Send size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
