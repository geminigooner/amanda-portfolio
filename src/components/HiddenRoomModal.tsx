import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Lock, FileKey } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface HiddenRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HiddenRoomModal({ isOpen, onClose }: HiddenRoomModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useFocusTrap(isOpen);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
        className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 md:p-12 bg-[#050002]/90"
      >
        <div className="absolute inset-0 pointer-events-none noise-overlay opacity-50" />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1], delay: prefersReducedMotion ? 0 : 0.2 }}
          ref={modalRef as any}
          tabIndex={-1}
          className="relative max-w-2xl w-full bg-[#0a0a0a] border border-[#222] rounded-sm p-8 md:p-12 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-#0F766E/50 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/30 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full z-10"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full border border-[#0F766E]/30 bg-[#042F2E]/20 flex items-center justify-center motion-safe:animate-pulse">
              <Lock className="w-5 h-5 text-[#2DD4BF]" />
            </div>
            <div>
              <h2 className="font-mono text-sm tracking-[0.3em] text-[#2DD4BF] uppercase">Classified Wing</h2>
              <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-1">Access Level: Granted</div>
            </div>
          </div>

          <div className="prose prose-invert prose-p:text-white/60 prose-p:font-light prose-p:leading-relaxed">
            <p>
              This is the archive's basement. Not everything here is meant to be seen. Some experiments break. Some ideas are too chaotic, too dangerous, or too personal.
            </p>
            <p>
              I keep them anyway. You can't understand a structure without studying the scaffolding.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4">
            <div className="p-4 rounded-sm border border-[#222] bg-[#111] flex items-center justify-between group hover:border-[#A59B8C] transition-all cursor-not-allowed opacity-60">
               <div className="flex items-center gap-4">
                 <FileKey className="w-5 h-5 text-white/30 group-hover:text-[#2DD4BF] transition-colors" />
                 <div>
                   <div className="font-mono text-[11px] text-white uppercase tracking-wider mb-1">Project: Obsidian</div>
                   <div className="font-mono text-[9px] text-red-400/80 uppercase tracking-widest">[REDACTED BY VΛLEN]</div>
                 </div>
               </div>
               <Lock className="w-4 h-4 text-white/20" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
