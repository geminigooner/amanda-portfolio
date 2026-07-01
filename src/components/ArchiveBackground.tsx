import { useEffect, useRef } from 'react';

export function ArchiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{x: number, y: number, vx: number, vy: number, size: number, color: string, alpha: number}> = [];
    let lines: Array<{y: number, speed: number, alpha: number, length: number}> = [];
    
    // Grid variables
    let scrollY = 0;
    const gridSize = 40;

    const init = () => {
      particles = [];
      lines = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 25000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.8 ? 'rgba(45, 212, 191, ' : 'rgba(255, 255, 255, ',
          alpha: Math.random() * 0.3 + 0.1
        });
      }

      for (let i = 0; i < 5; i++) {
        lines.push({
          y: Math.random() * canvas.height,
          speed: (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1),
          alpha: Math.random() * 0.1 + 0.02,
          length: Math.random() * 200 + 50
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      
      const offsetY = (scrollY * 0.2) % gridSize;
      
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

      // Constellations
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // Data Lines (Scanning effect)
      lines.forEach(l => {
        l.y += l.speed;
        if (l.y < 0) l.y = canvas.height;
        if (l.y > canvas.height) l.y = 0;

        ctx.fillStyle = `rgba(45, 212, 191, ${l.alpha})`;
        ctx.fillRect(0, l.y, canvas.width, 1);
        
        ctx.font = '8px monospace';
        ctx.fillStyle = `rgba(255, 255, 255, ${l.alpha * 2})`;
        // Simulate some binary or hex data
        if (Math.random() > 0.95) {
           ctx.fillText(`0x${Math.floor(Math.random()*16777215).toString(16)}`, Math.random() * canvas.width, l.y - 2);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleScroll = () => {
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
