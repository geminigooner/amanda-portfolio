import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { playHoverSound } from '../utils/audioEffects';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface RestraintPageProps {
  onClose: () => void;
}

export function RestraintPage({ onClose }: RestraintPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useFocusTrap(true);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeInOut" }}
      ref={modalRef as any}
      tabIndex={-1}
      className="fixed inset-0 z-[1000000] bg-[#050505] text-[#F4EFE6] overflow-y-auto selection:bg-[#B76E79]/30 selection:text-white"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8F7746]/20 to-transparent" />
      
      {/* Header Close Button */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-end z-50 mix-blend-difference">
        <button 
          onClick={onClose}
          onMouseEnter={playHoverSound}
          className="p-2 text-[#A59B8C] hover:text-[#F4EFE6] transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label="Close Restraint Page"
        >
          <X aria-hidden="true" className="w-6 h-6" />
        </button>
      </div>

      <div className="min-h-screen flex flex-col justify-center max-w-3xl mx-auto px-6 md:px-12 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          className="mb-20"
        >
          <h1 className="font-display text-4xl md:text-5xl text-[#F4EFE6] tracking-tight leading-[1.05] opacity-90">
            A Note on Restraint
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl font-light text-[#D8CFC0] leading-relaxed space-y-10"
        >
          <p>
            Valen was designed with an intentional tension between two goals: maintaining an atmospheric, restrained presence, and actually being useful to a visitor who doesn't know where to look.
          </p>
          <p>
            Early iterations leaned too far into restraint. When asked a simple question for orientation, Valen offered vague, poetic non-answers rather than pointing anywhere concrete.
          </p>
          <p>
            The solution was not to abandon the restrained voice, but to introduce a specific constraint: upon a visitor's first general inquiry, Valen must surface two or three concrete rooms using the existing artifact-tagging system. This ensures restraint never collapses into unhelpfulness.
          </p>
          <p className="text-[#F4EFE6] opacity-90 pb-20">
            This was a small, real design decision about how an AI character should behave. It explores not just what a system should say, but when quiet must yield to guidance, and how to keep a system honest about its own limits rather than allowing a personality trait to become a failure mode.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
