import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Map, Navigation } from 'lucide-react';

const ZONES = [
  { id: 'hero', label: 'ARRIVAL' },
  { id: 'crown-works', label: 'CROWN WORKS' },
  { id: 'companion-systems', label: 'COMPANION SYSTEMS' },
  { id: 'synthetic-media', label: 'SYNTHETIC MEDIA LAB' },
  { id: 'browser-lab', label: 'BROWSER LABORATORY' },
  { id: 'philosophy', label: 'PHILOSOPHY + RESEARCH' },
  { id: 'gallery', label: 'DIGITAL GALLERY' },
  { id: 'archive', label: 'ARCHIVE' }
];

export function FloatingPill() {
  const [activeZone, setActiveZone] = useState('ARRIVAL');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;
    
    // Hide if scrolling down quickly, show if scrolling up or at top
    if (diff > 10 && latest > 100) {
      setIsVisible(false);
      setIsExpanded(false);
    } else if (diff < -10 || latest < 100) {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ZONES.map(z => document.getElementById(z.id));
      let current = ZONES[0].label;
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = ZONES.find(z => z.id === section.id)?.label || current;
          }
        }
      }
      setActiveZone(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] font-mono mb-2 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-auto"
          >
            <motion.div
              className="glass-panel border border-white/5 hover:border-white/20 rounded-full flex flex-col items-center justify-center overflow-hidden cursor-pointer backdrop-blur-xl"
              animate={{
                width: isExpanded ? 300 : 160,
                height: isExpanded ? 340 : 40,
                borderRadius: isExpanded ? 24 : 9999,
                backgroundColor: isExpanded ? 'rgba(5, 0, 2, 0.95)' : 'rgba(5, 0, 2, 0.4)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              <AnimatePresence mode="wait">
                {!isExpanded ? (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 px-4 h-10 w-full justify-center text-white/50 text-[10px] tracking-widest hover:text-white transition-colors"
                  >
                    <Map size={12} />
                    <span className="truncate max-w-[100px]">{activeZone}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-2 text-white/50 text-[10px] tracking-widest mb-6">
                      <Map size={12} />
                      <span>INDEX</span>
                    </div>
                    <div className="flex flex-col gap-3">
                      {ZONES.map((zone) => (
                        <button
                          key={zone.id}
                          onClick={() => {
                            document.getElementById(zone.id)?.scrollIntoView({ behavior: 'smooth' });
                            setIsExpanded(false);
                          }}
                          className={`text-left text-xs tracking-widest transition-colors ${
                            activeZone === zone.label 
                              ? 'text-[#c084fc]' 
                              : 'text-white/40 hover:text-white'
                          }`}
                        >
                          {zone.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
