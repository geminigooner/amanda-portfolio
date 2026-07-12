import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PROJECTS, type Project } from '../data';
import { playHoverSound } from '../utils/audioEffects';
import { useFocusTrap } from '../hooks/useFocusTrap';

export function ProjectDetailModal({ project, onClose }: { project: Project | null, onClose: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useFocusTrap(!!project);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

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
    setLightboxOpen(false);
  }, [project]);

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
      playHoverSound();
    }
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
      playHoverSound();
    }
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
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[#050002]/80 cursor-pointer pointer-events-auto"
            onClick={onClose}
          />
          
          <motion.div
            ref={modalRef as any}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#080706] border border-[#111] rounded-sm flex flex-col pointer-events-auto shadow-2xl"
            style={{ boxShadow: `0 0 40px ${project.color}10` }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[#111] bg-[#080706]/90 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="text-3xl" style={{ textShadow: `0 0 20px ${project.color}40` }}>{project.emoji}</span>
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase mb-1">
                    {project.num} // {project.wing}
                  </div>
                  <h2 className="font-display text-2xl tracking-tight text-[#F4EFE6]">{project.title}</h2>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                onMouseEnter={playHoverSound}
                className="p-2 bg-[#111] border border-[#333] hover:border-[#A59B8C] hover:bg-[#111] transition-colors text-[#A59B8C] hover:text-[#F4EFE6] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label="Close project details"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            <div className={`p-6 md:p-10 flex flex-col gap-8 ${((project.images && project.images.length > 0) || project.video) ? 'lg:flex-row' : ''}`}>
              {/* Media Section */}
              {((project.images && project.images.length > 0) || project.video) && (
                <div className="w-full lg:w-1/2 flex flex-col gap-8">
                  {project.video && (
                    <div className="flex flex-col gap-3">
                      {project.images && project.images.length > 0 && (
                        <div className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase">Video Overview</div>
                      )}
                      <div className="relative aspect-video rounded-sm overflow-hidden border border-[#111] bg-[#111]">
                        <iframe
                          src={project.video}
                          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                  {project.images && project.images.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {project.video && (
                        <div className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase">Engineering Diagrams</div>
                      )}
                      <div className="relative group/carousel">
                        <div 
                          className="relative aspect-video rounded-sm overflow-hidden border border-[#111] bg-[#111] flex items-center justify-center cursor-zoom-in touch-pan-y"
                          onTouchStart={onTouchStart}
                          onTouchMove={onTouchMove}
                          onTouchEnd={onTouchEnd}
                          onClick={() => setLightboxOpen(true)}
                        >
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={currentImageIndex}
                              src={project.images![currentImageIndex]}
                              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </AnimatePresence>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxOpen(true);
                            }}
                            className="absolute top-2 right-2 p-3 md:p-2 bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur rounded-sm opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
                            aria-label="View full screen"
                          >
                            <Maximize2 aria-hidden="true" className="w-5 h-5 md:w-4 md:h-4" />
                          </button>
                        </div>
                        
                        {project.images!.length > 1 && (
                          <>
                            <button 
                              onClick={prevImage}
                              className="absolute -left-3 md:-left-5 top-[calc(50%-1.5rem)] md:top-[calc(50%-2rem)] p-2 rounded-full bg-black border border-white/10 text-white/70 hover:text-white hover:bg-[#222] shadow-xl opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100 z-10" aria-label="Previous image"
                            >
                              <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={nextImage}
                              className="absolute -right-3 md:-right-5 top-[calc(50%-1.5rem)] md:top-[calc(50%-2rem)] p-2 rounded-full bg-black border border-white/10 text-white/70 hover:text-white hover:bg-[#222] shadow-xl opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100 z-10" aria-label="Next image"
                            >
                              <ChevronRight aria-hidden="true" className="w-5 h-5" />
                            </button>
                            
                            <div className="flex justify-center gap-1.5 mt-3 mb-1">
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
                    </div>
                  )}
                </div>
              )}

              {/* Text Section */}
              <div className={`flex flex-col gap-8 ${((project.images && project.images.length > 0) || project.video) ? 'w-full lg:w-1/2' : 'w-full'}`}>
                <div>
                  <h3 className="font-mono text-sm tracking-widest uppercase mb-4" style={{ color: project.color }}>
                    "{project.subtitle}"
                  </h3>
                  <p className="text-base text-[#D8CFC0] leading-relaxed font-sans font-light whitespace-pre-wrap">
                    {project.desc}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase mb-3">
                    TECHNOLOGY / PARADIGM
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 bg-[#111] border border-[#111] text-[#A59B8C] rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {(project.link || (project as any).sourceLink) && (
                  <div className="pt-4 border-t border-white/5 mt-2 flex flex-wrap gap-3">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#F4EFE6] text-[#030303] hover:bg-white transition-all font-mono text-[10px] tracking-widest uppercase group rounded-sm flex-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]"
                      >
                        {(project as any).sourceLink ? 'Live Demo' : 'Visit Exhibit'}
                        <ChevronRight aria-hidden="true" className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    )}
                    {(project as any).sourceLink && (
                      <a 
                        href={(project as any).sourceLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-[#333] hover:border-[#A59B8C] transition-all font-mono text-[10px] tracking-widest uppercase text-[#A59B8C] hover:text-[#F4EFE6] group rounded-sm flex-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]"
                      >
                        {project.id === "haiku" ? "View PDF" : "Source Code"}
                        <ChevronRight aria-hidden="true" className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox Overlay */}
      {project && project.images && project.images.length > 0 && (
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm touch-none"
              onClick={() => setLightboxOpen(false)}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                className="absolute top-6 right-6 p-3 bg-black/50 border border-white/10 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none z-50"
              >
                <X aria-hidden="true" className="w-6 h-6" />
              </button>

              <div 
                className="relative w-full h-full flex items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <motion.img
                  key={`lightbox-${currentImageIndex}`}
                  src={project.images![currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1} full`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[95vw] max-h-[90vh] object-contain"
                  loading="lazy"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {project.images!.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { prevImage(e); e.stopPropagation(); }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all focus:outline-none z-50"
                  >
                    <ChevronLeft aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
                  </button>
                  <button 
                    onClick={(e) => { nextImage(e); e.stopPropagation(); }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all focus:outline-none z-50"
                  >
                    <ChevronRight aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur border border-white/10" onClick={(e) => e.stopPropagation()}>
                    {project.images!.map((_, idx) => (
                      <button
                        key={idx} 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); playHoverSound(); }}
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`} 
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </AnimatePresence>
  );
}

