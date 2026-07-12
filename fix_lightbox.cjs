const fs = require('fs');

let content = fs.readFileSync('src/components/ProjectDetailModal.tsx', 'utf8');

// Add lightbox state
content = content.replace(
  '  const [isMagnifying, setIsMagnifying] = useState(false);\n  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });',
  `  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);`
);

// Reset lightbox open on project change
content = content.replace(
  '    setCurrentImageIndex(0);\n    setIsMagnifying(false);\n  }, [project]);',
  `    setCurrentImageIndex(0);
    setIsMagnifying(false);
    setLightboxOpen(false);
  }, [project]);`
);

// Add onClick to open lightbox
content = content.replace(
  `                        <div \n                          className="relative aspect-video rounded-sm overflow-hidden border border-[#111] bg-[#111] flex items-center justify-center cursor-crosshair touch-pan-y"\n                          onMouseEnter={() => setIsMagnifying(true)}\n                          onMouseLeave={() => setIsMagnifying(false)}\n                          onMouseMove={handleMouseMove}\n                          onTouchStart={onTouchStart}\n                          onTouchMove={onTouchMove}\n                          onTouchEnd={onTouchEnd}\n                        >`,
  `                        <div \n                          className="relative aspect-video rounded-sm overflow-hidden border border-[#111] bg-[#111] flex items-center justify-center cursor-zoom-in touch-pan-y"\n                          onMouseEnter={() => setIsMagnifying(true)}\n                          onMouseLeave={() => setIsMagnifying(false)}\n                          onMouseMove={handleMouseMove}\n                          onTouchStart={onTouchStart}\n                          onTouchMove={onTouchMove}\n                          onTouchEnd={onTouchEnd}\n                          onClick={() => setLightboxOpen(true)}\n                        >`
);

// Add lightbox JSX before closing AnimatePresence
content = content.replace(
  '        </motion.div>\n      )}\n    </AnimatePresence>\n  );\n}',
  `        </motion.div>
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
                  key={\`lightbox-\${currentImageIndex}\`}
                  src={project.images![currentImageIndex]}
                  alt={\`\${project.title} screenshot \${currentImageIndex + 1} full\`}
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
                        className={\`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors \${idx === currentImageIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}\`} 
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
`
);

fs.writeFileSync('src/components/ProjectDetailModal.tsx', content);
console.log('done');
