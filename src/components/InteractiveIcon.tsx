import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface InteractiveIconProps {
  icon: LucideIcon;
  colorClass?: string;
  size?: number;
}

export default function InteractiveIcon({ icon: Icon, colorClass = "clay-icon-box", size = 32 }: InteractiveIconProps) {
  return (
    <motion.div 
      className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center ${colorClass} cursor-pointer`}
      whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Icon size={size} className="w-[60%] h-[60%]" strokeWidth={2.5} />
    </motion.div>
  );
}
