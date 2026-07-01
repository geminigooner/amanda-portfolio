import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS, type Project } from '../data';
import { playHoverSound } from '../utils/audioEffects';

export function ProjectDetailModal({ project, onClose }: { project: Project | null, onClose: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsMagnifying(false);
  }, [project]);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
      playHoverSound();
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
      playHoverSound();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnifying) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMagnifierPosition({ x, y });
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div 
          key="modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden pointer-events-none"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[#050002]/80 cursor-pointer pointer-events-auto"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto artifact-decay glass-panel clinical-border rounded-2xl flex flex-col pointer-events-auto"
            style={{ 
              background: `linear-gradient(135deg, rgba(5,0,2,0.95) 0%, rgba(10,0,5,0.98) 100%)`,
              boxShadow: `0 0 40px ${project.color}15, inset 0 0 20px ${project.color}10` 
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-[#050002]/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="text-3xl" style={{ textShadow: `0 0 20px ${project.color}40` }}>{project.emoji}</span>
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-white/50 uppercase mb-1">
                    {project.num} // {project.wing}
                  </div>
                  <h2 className="font-display text-xl font-bold text-white">{project.title}</h2>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                onMouseEnter={playHoverSound}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            <div className={`p-6 md:p-10 flex flex-col gap-8 ${((project.images && project.images.length > 0) || project.video) ? 'lg:flex-row' : ''}`}>
              {/* Media Section */}
              {((project.images && project.images.length > 0) || project.video) && (
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                  {project.video ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50">
                      <iframe
                        src={project.video}
                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  ) : (
                    <div 
                      className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-black/50 flex items-center justify-center cursor-crosshair"
                      onMouseEnter={() => setIsMagnifying(true)}
                      onMouseLeave={() => setIsMagnifying(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          src={project.images![currentImageIndex]}
                          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ 
                            opacity: 1, 
                            scale: isMagnifying ? 2 : 1,
                          }}
                          style={{
                            transformOrigin: isMagnifying ? `${magnifierPosition.x}% ${magnifierPosition.y}%` : 'center'
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: isMagnifying ? 0 : 0.3 }}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </AnimatePresence>
                      
                      {project.images!.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          
                          <div className="absolute bottom-3 left-1/2 -translate-y-0 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/10">
                            {project.images!.map((_, idx) => (
                              <div 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}`} 
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Text Section */}
              <div className={`flex flex-col gap-8 ${((project.images && project.images.length > 0) || project.video) ? 'w-full lg:w-1/2' : 'w-full'}`}>
                <div>
                  <h3 className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: project.color }}>
                    {project.subtitle}
                  </h3>
                  <p className="text-base text-white/80 leading-relaxed font-sans">
                    {project.desc}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase mb-3">
                    TECHNOLOGY / PARADIGM
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="font-mono text-[10px] tracking-[0.15em] px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit Link */}
                {project.link && (
                  <div className="pt-4 border-t border-white/5 mt-2">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-mono text-[11px] tracking-widest uppercase text-white/90 hover:text-white group"
                    >
                      Visit Exhibit
                      <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
