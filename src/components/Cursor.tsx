import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

export function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const prefersReducedMotion = useReducedMotion();
  const springConfig = prefersReducedMotion ? { damping: 100, stiffness: 10000, mass: 0.1 } : { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, isVisible]);

  return (
    <div className="hidden md:block">
      {/* Tiny dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-screen bg-[#ff006e] shadow-[0_0_10px_rgba(255,0,110,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          marginLeft: 12,
          marginTop: 12
        }}
      />
      
      {/* Subtle trailing ring */}
      {!prefersReducedMotion && (
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-white/20 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 0.5 : 0,
        }}
      />
      )}
    </div>
  );
}
