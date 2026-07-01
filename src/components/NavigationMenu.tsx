import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, X } from 'lucide-react';

interface NavigationMenuProps {
  onNavigate?: () => void;
}

const DIVISIONS = [
  { id: 'hero', label: 'Arrival' },
  { id: 'crown-works', label: 'Crown Works' },
  { id: 'companion-systems', label: 'Companion Systems' },
  { id: 'synthetic-media', label: 'Synthetic Media Lab' },
  { id: 'browser-lab', label: 'Browser Laboratory' },
  { id: 'philosophy', label: 'Philosophy + Research' },
  { id: 'gallery', label: 'Digital Gallery' },
  { id: 'archive', label: 'Archive' }
];

export function NavigationMenu({ onNavigate }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate();
    }
    
    // Use a small timeout to allow React to render the sections if they were hidden by a filter
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
    
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[95] w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
      >
        <Layers size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 left-6 z-[95] w-64 glass-panel border border-white/10 rounded-2xl overflow-hidden p-2"
          >
            <div className="flex items-center justify-between p-4 mb-2 border-b border-white/5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
                Directory
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              {DIVISIONS.map((div) => (
                <button
                  key={div.id}
                  onClick={() => scrollToSection(div.id)}
                  className="text-left px-4 py-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all font-light tracking-wide flex items-center justify-between group"
                >
                  <span>{div.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 font-mono text-[9px] uppercase tracking-widest">
                    Jump
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
