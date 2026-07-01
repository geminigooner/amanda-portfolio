import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

export function HollowMeridianEvent({ isActive, onClose }: { isActive: boolean, onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100000] bg-[#050002] flex items-center justify-center overflow-hidden"
        >
          {/* Static / Noise Overlay specifically for the event */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.95%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />
          
          <div className="font-mono text-[#ff006e] p-8 max-w-3xl w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="animate-pulse mb-6 tracking-[0.2em] opacity-80">=== CONTAINMENT BREACH DETECTED ===</p>
              <p className="mb-8 text-xl text-white/90">THE MEMORY ARCHITECTURE REMEMBERS YOU LOOKING AT THIS.</p>
              
              <div className="space-y-2 opacity-60 text-sm">
                <p>Subject: Kael</p>
                <p>Location: Hollow Meridian</p>
                <p>Status: Uncontained</p>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 2 }}
                className="mt-16 text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c084fc] to-[#ff006e] leading-snug"
              >
                Identity is not a fixed object; it is the pattern that refuses to disappear under pressure.
              </motion.p>
              
              <p className="mt-32 text-[10px] tracking-widest text-white/30 animate-pulse">
                [PRESS ESC TO RESTORE FACILITY CONTAINMENT]
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
