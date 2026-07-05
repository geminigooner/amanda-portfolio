import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { playHoverSound } from '../utils/audioEffects';

export function ProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, prefersReducedMotion ? { stiffness: 10000, damping: 100, mass: 0.1 } : {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[1px] z-[1000] pointer-events-none">
      <div className="absolute inset-0 bg-white/5" />
      <motion.div
        className="absolute top-0 left-0 bottom-0 origin-left"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, rgba(255,0,110,0.5), rgba(192,132,252,0.8))'
        }}
      />
    </div>
  );
}
