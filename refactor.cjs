const fs = require('fs');

const newContent = `import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PROJECTS, type Project } from '../data';
import { playHoverSound } from '../utils/audioEffects';
import { useFocusTrap } from '../hooks/useFocusTrap';

function ProjectMediaGallery({ 
  images, 
  title, 
  onImageClick 
}: { 
  images: string[], 
  title: string, 
  onImageClick: (idx: number, images: string[], title: string) => void 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    if (distance > minSwipeDistance) nextImage();
    if (distance < -minSwipeDistance) prevImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    playHoverSound();
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    playHoverSound();
  };

  return (
    <div className="relative group/carousel">
      {title && <div className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase mb-1">{title}</div>}
      <div 
        className="relative aspect-video rounded-sm overflow-hidden border border-[#111] bg-[#111] flex items-center justify-center cursor-zoom-in touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          e.stopPropagation();
          onImageClick(currentImageIndex, images, title);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={\`\${title} screenshot \${currentImageIndex + 1}\`}
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
            onImageClick(currentImageIndex, images, title);
          }}
          className="absolute top-2 right-2 p-3 md:p-2 bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur rounded-sm opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
          aria-label="View full screen"
        >
          <Maximize2 aria-hidden="true" className="w-5 h-5 md:w-4 md:h-4" />
        </button>
      </div>
      
      {images.length > 1 && (
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
            {images.map((_, idx) => (
              <div
                key={idx} 
                className={\`w-1.5 h-1.5 rounded-full transition-colors \${idx === currentImageIndex ? 'bg-white' : 'bg-white/30'}\`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectMediaVideo({ video, title }: { video: string, title: string }) {
  return (
    <div className="relative group/video">
      {title && <div className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase mb-1">{title}</div>}
      <div className="relative aspect-video rounded-sm overflow-hidden border border-[#111] bg-black/50 backdrop-blur">
        <video 
          src={video}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export function ProjectDetailModal({ project, onClose }: { project: Project | null, onClose: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useFocusTrap(!!project);

  const [lightboxGroup, setLightboxGroup] = useState<{ images: string[], title: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxTouchStartX = useRef<number | null>(null);
  const lightboxTouchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchEndX.current = null;
    lightboxTouchStartX.current = e.targetTouches[0].clientX;
  };

  const onLightboxTouchMove = (e: React.TouchEvent) => {
    lightboxTouchEndX.current = e.targetTouches[0].clientX;
  };

  const onLightboxTouchEnd = () => {
    if (!lightboxTouchStartX.current || !lightboxTouchEndX.current) return;
    const distance = lightboxTouchStartX.current - lightboxTouchEndX.current;
    if (distance > minSwipeDistance) nextLightboxImage();
    if (distance < -minSwipeDistance) prevLightboxImage();
    lightboxTouchStartX.current = null;
    lightboxTouchEndX.current = null;
  };

  const nextLightboxImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (lightboxGroup) {
      setLightboxIndex((prev) => (prev + 1) % lightboxGroup.images.length);
      playHoverSound();
    }
  };

  const prevLightboxImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (lightboxGroup) {
      setLightboxIndex((prev) => (prev - 1 + lightboxGroup.images.length) % lightboxGroup.images.length);
      playHoverSound();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxGroup) {
          setLightboxGroup(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose, lightboxGroup]);

  useEffect(() => {
    setLightboxGroup(null);
    setLightboxIndex(0);
  }, [project]);

  const openLightbox = (idx: number, images: string[], title: string) => {
    setLightboxGroup({ images, title });
    setLightboxIndex(idx);
  };

  const hasAnyMedia = project && (
    (project.images && project.images.length > 0) || 
    project.video || 
    (project.mediaGroups && project.mediaGroups.length > 0)
  );

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#0A0A0A] border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0A0A0A] z-10 sticky top-0">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] tracking-widest text-[#A59B8C]">
                  {project.num || "PROJ-0X"}
                </span>
                <h2 className="text-xl font-sans tracking-tight text-[#F4EFE6]">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-[#A59B8C] hover:text-[#F4EFE6] hover:bg-white/5 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]"
                aria-label="Close modal"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className={\`flex-1 overflow-y-auto p-6 md:p-8 flex flex-col \${hasAnyMedia ? 'lg:flex-row' : ''} gap-12 lg:gap-16 scroll-smooth\`}>
              {/* Media Section */}
              {hasAnyMedia && (
                <div className="w-full lg:w-1/2 flex flex-col gap-10">
                  {/* Backward compatibility: render flat video/images first if present */}
                  {project.video && (
                    <ProjectMediaVideo video={project.video} title="Prototype Preview" />
                  )}
                  {project.images && project.images.length > 0 && (
                    <ProjectMediaGallery 
                      images={project.images} 
                      title="Engineering Diagrams" 
                      onImageClick={openLightbox} 
                    />
                  )}

                  {/* New group-based media */}
                  {project.mediaGroups && project.mediaGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col gap-6">
                      {group.video && (
                        <ProjectMediaVideo video={group.video} title={group.title} />
                      )}
                      {group.images && group.images.length > 0 && (
                        <ProjectMediaGallery 
                          images={group.images} 
                          title={group.title} 
                          onImageClick={openLightbox} 
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Text Section */}
              <div className={\`flex flex-col gap-8 \${hasAnyMedia ? 'w-full lg:w-1/2' : 'w-full'}\`}>
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
      {project && lightboxGroup && lightboxGroup.images.length > 0 && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm touch-none"
            onClick={() => setLightboxGroup(null)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxGroup(null); }}
              className="absolute top-6 right-6 p-3 bg-black/50 border border-white/10 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none z-50"
            >
              <X aria-hidden="true" className="w-6 h-6" />
            </button>

            <div 
              className="relative w-full h-full flex items-center justify-center"
              onTouchStart={onLightboxTouchStart}
              onTouchMove={onLightboxTouchMove}
              onTouchEnd={onLightboxTouchEnd}
            >
              <motion.img
                key={\`lightbox-\${lightboxIndex}\`}
                src={lightboxGroup.images[lightboxIndex]}
                alt={\`\${lightboxGroup.title} screenshot \${lightboxIndex + 1} full\`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="max-w-[95vw] max-h-[90vh] object-contain"
                loading="lazy"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {lightboxGroup.images.length > 1 && (
              <>
                <button 
                  onClick={(e) => { prevLightboxImage(e); e.stopPropagation(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all focus:outline-none z-50"
                >
                  <ChevronLeft aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button 
                  onClick={(e) => { nextLightboxImage(e); e.stopPropagation(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all focus:outline-none z-50"
                >
                  <ChevronRight aria-hidden="true" className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur border border-white/10" onClick={(e) => e.stopPropagation()}>
                  {lightboxGroup.images.map((_, idx) => (
                    <button
                      key={idx} 
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); playHoverSound(); }}
                      className={\`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors \${idx === lightboxIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}\`} 
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </AnimatePresence>
  );
}
`;

fs.writeFileSync('src/components/ProjectDetailModal.tsx', newContent);
