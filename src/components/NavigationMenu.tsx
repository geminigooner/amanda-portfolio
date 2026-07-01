import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, X } from 'lucide-react';

interface NavigationMenuProps {
  onNavigate?: () => void;
  onOpenValen?: () => void;
  onOpenGraph?: () => void;
  onOpenContainment?: () => void;
}

const DIVISIONS = [
  { id: 'hero', label: 'Archive Entrance' },
  { id: 'crown-works', label: 'Crown Works' },
  { id: 'hollow-meridian', label: 'Hollow Meridian' },
  { id: 'publications', label: 'Publications' },
  { id: 'field-notes', label: 'Field Notes' },
  { id: 'about', label: 'About' }
];

export function NavigationMenu({ onNavigate, onOpenValen, onOpenGraph, onOpenContainment }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (onNavigate) {
      onNavigate();
    }
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
        className="fixed bottom-6 left-6 z-[95] w-12 h-12 bg-[#0a0a0a] border border-[#222] rounded-sm flex items-center justify-center text-[#888] hover:text-[#eaeaea] hover:bg-[#111] hover:border-[#444] transition-all"
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
            className="fixed bottom-24 left-6 z-[95] w-64 bg-[#0a0a0a] border border-[#222] rounded-sm overflow-hidden p-2 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 mb-2 border-b border-[#222]">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#888] uppercase">
                Directory
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#888] hover:text-[#eaeaea] transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              {DIVISIONS.map((div) => (
                <button
                  key={div.id}
                  onClick={() => scrollToSection(div.id)}
                  className="text-left px-4 py-3 rounded-sm text-sm text-[#ccc] hover:text-[#eaeaea] hover:bg-[#111] transition-all font-light tracking-wide flex items-center justify-between group"
                >
                  <span>{div.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#06b6d4] font-mono text-[9px] uppercase tracking-widest">
                    Jump
                  </span>
                </button>
              ))}
              
              <div className="h-px bg-[#222] my-2 mx-2" />
              
              <button
                onClick={() => { onOpenValen?.(); setIsOpen(false); }}
                className="text-left px-4 py-3 rounded-sm text-sm text-[#ccc] hover:text-[#eaeaea] hover:bg-[#111] transition-all font-light tracking-wide flex items-center justify-between group"
              >
                <span>Ask VΛLEN</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#06b6d4] font-mono text-[9px] uppercase tracking-widest">Open</span>
              </button>

              <button
                onClick={() => { onOpenGraph?.(); setIsOpen(false); }}
                className="text-left px-4 py-3 rounded-sm text-sm text-[#ccc] hover:text-[#eaeaea] hover:bg-[#111] transition-all font-light tracking-wide flex items-center justify-between group"
              >
                <span>Research Graph</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#06b6d4] font-mono text-[9px] uppercase tracking-widest">Open</span>
              </button>

              <button
                onClick={() => { onOpenContainment?.(); setIsOpen(false); }}
                className="text-left px-4 py-3 rounded-sm text-sm text-[#d946ef] hover:text-[#f0abfc] hover:bg-[#d946ef]/10 transition-all font-light tracking-wide flex items-center justify-between group"
              >
                <span>Restricted</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#d946ef] font-mono text-[9px] uppercase tracking-widest">Access</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
