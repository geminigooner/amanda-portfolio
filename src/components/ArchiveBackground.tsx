import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export function ArchiveBackground() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // Grid variables
    let scrollY = 0;
    const gridSize = 120; // larger grid for editorial feel

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid
      ctx.strokeStyle = 'rgba(216, 207, 192, 0.03)'; // muted cream grid
      ctx.lineWidth = 1;
      
      const offsetY = prefersReducedMotion ? 0 : (scrollY * 0.1) % gridSize;
      
      for(let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for(let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y - offsetY);
        ctx.lineTo(canvas.width, y - offsetY);
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handleScroll = () => {
      if (prefersReducedMotion) draw();
      scrollY = window.scrollY;
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6, background: '#050505' }}
    />
  );
}
