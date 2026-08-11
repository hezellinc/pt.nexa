import { Rocket } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-12 pb-6 px-4 opacity-80">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-300 pt-8">
        <div className="flex items-center gap-3">
          <img src="/nexa-logo.png" alt="NexaTech Logo" className="h-8 w-auto object-contain" />
          <span className="font-bold text-lg text-text">PT. NexaTech <span className="text-primary">Solution</span></span>
        </div>
        
        <div className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} PT. NexaTech Solution. All rights reserved.
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
