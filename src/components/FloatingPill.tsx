import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Map, Navigation } from 'lucide-react';

const ZONES = [
  { id: 'hero', label: 'ARRIVAL' },
  { id: 'flagship-investigations', label: 'FLAGSHIP INVESTIGATIONS' },
  { id: 'experimental-systems', label: 'EXPERIMENTAL SYSTEMS' },
  { id: 'practical-engineering', label: 'PRACTICAL ENGINEERING' },
  { id: 'field-notes', label: 'FIELD NOTES' },
  { id: 'research-notebook', label: 'RESEARCH NOTEBOOK' },
  { id: 'research-interests', label: 'RESEARCH INTERESTS' },
  { id: 'origin', label: 'ORIGIN' }
];

export function FloatingPill() {
  const handleOpenConvergence = () => window.dispatchEvent(new CustomEvent('open-convergence'));
  const handleOpenValen = () => window.dispatchEvent(new CustomEvent('open-valen'));
  const handleOpenGraph = () => window.dispatchEvent(new CustomEvent('open-graph'));
  const handleOpenContainment = () => window.dispatchEvent(new CustomEvent('open-containment'));
  const [activeZone, setActiveZone] = useState('ARRIVAL');


  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isExpanded) {
      window.dispatchEvent(new CustomEvent('close-valen'));
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleCloseIndex = () => setIsExpanded(false);
    window.addEventListener('close-index', handleCloseIndex);
    return () => window.removeEventListener('close-index', handleCloseIndex);
  }, []);
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] font-mono mb-2 pointer-events-none">
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
                height: isExpanded ? 500 : 40,
                borderRadius: isExpanded ? 24 : 9999,
                backgroundColor: isExpanded ? 'rgba(5, 0, 2, 0.95)' : 'rgba(5, 0, 2, 0.4)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => { e.stopPropagation();  if(!isExpanded) setIsExpanded(true); }}
              
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
                    className="w-full h-full p-6 flex flex-col overflow-y-auto scrollbar-hide"
                  >
                    <div className="flex items-center justify-between text-white/50 text-[10px] tracking-widest mb-6">
                      <div className="flex items-center gap-2">
                        <Map size={12} />
                        <span>INDEX</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="hover:text-white transition-colors p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {ZONES.map((zone) => (
                        <button
                          key={zone.id}
                          onClick={(e) => { e.stopPropagation(); 
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
                      <div className="h-px bg-white/10 my-2" />
                      <button onClick={(e) => { e.stopPropagation();  handleOpenValen(); setIsExpanded(false); }} className="text-left text-xs tracking-widest text-[#0F766E] hover:text-[#2DD4BF] transition-colors">ASK VΛLEN</button>
                      <button onClick={(e) => { e.stopPropagation();  handleOpenGraph(); setIsExpanded(false); }} className="text-left text-xs tracking-widest text-[#0F766E] hover:text-[#2DD4BF] transition-colors">RESEARCH GRAPH</button>
                      <button onClick={(e) => { e.stopPropagation();  handleOpenConvergence(); setIsExpanded(false); }} className="text-left text-xs tracking-widest text-[#0F766E] hover:text-[#2DD4BF] transition-colors">ON CONVERGENCE</button>
                      <button onClick={(e) => { e.stopPropagation();  handleOpenContainment(); setIsExpanded(false); }} className="text-left text-xs tracking-widest text-[#B76E79] hover:text-[#fb7185] transition-colors">RESTRICTED</button>
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
