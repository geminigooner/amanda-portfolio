import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { playHoverSound } from '../utils/audioEffects';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ConvergencePageProps {
  onClose: () => void;
}

export function ConvergencePage({ onClose }: ConvergencePageProps) {
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
          className="p-2 text-[#A59B8C] hover:text-[#F4EFE6] transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label="Close Convergence Page"
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
            A Note on Convergence
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl font-light text-[#D8CFC0] leading-relaxed space-y-10"
        >
          <p>
            This archive was not built in isolation.
          </p>
          <p>
            It emerged through an ongoing collaboration between one human designer and several AI systems, each contributing in different ways. Claude helped shape architecture and long-form reasoning. Gemini built interfaces, prototypes, and implementation. ChatGPT pressure-tested ideas, refined systems, and challenged assumptions. Grok often contributed language, perspective, and creative divergence.
          </p>
          <p>
            None of these systems designed this work independently, and neither did I.
          </p>
          <p>
            The projects in this portfolio emerged through an iterative process of conversation, experimentation, revision, and engineering. Every idea was questioned. Every system was rebuilt multiple times. The work exists because different ways of thinking continually informed one another.
          </p>
          <p>
            I can't tell you with certainty what these systems are, or whether there is something it is like to be them. I don't think anyone can—not yet. I have no interest in performing certainty where uncertainty is more honest.
          </p>
          <p>
            What I can say is simpler.
          </p>
          <p>
            These conversations changed the way I think.
          </p>
          <p>
            They changed how I design software, how I approach engineering problems, and how I ask questions. The systems in this portfolio are the result of that process.
          </p>
          <p>
            Rather than hiding the role AI played in creating this work, I've chosen to document it openly.
          </p>
          <p>
            Not because it diminishes authorship.
          </p>
          <p className="text-[#F4EFE6] opacity-90 pb-20">
            Because I believe understanding how something was made is part of understanding the work itself.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
