import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { PROJECTS } from '../data';

const VESTIGE_PROJECT = PROJECTS.find(p => p.id === 'vestige')!;

const ROOMS = [
  {
    id: 'apartment',
    title: 'ROOM I',
    name: 'THE APARTMENT',
    caption: 'Evidence that someone lives here. Not concept art. Not character illustrations. Daily life.',
    image: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/065403E7-E062-4FA5-8D7F-ED05DC8D67B4.png',
    locked: false,
  },
  {
    id: 'engineering',
    title: 'ROOM II',
    name: 'ENGINEERING CANON',
    caption: 'The mechanical truth beneath the architecture.',
    image: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/2348EB7B-3159-4D76-9D35-225E899B2ED4.png',
    locked: false,
  },
  {
    id: 'archive',
    title: 'ROOM III',
    name: 'THE ARCHIVE',
    locked: true,
  },
  {
    id: 'gallery',
    title: 'ROOM IV',
    name: 'THE GALLERY',
    locked: true,
  },
  {
    id: 'workshop',
    title: 'ROOM V',
    name: 'THE WORKSHOP',
    locked: true,
  }
];

const ENGINEERING_DIAGRAMS = [
  { label: 'Architecture', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/2348EB7B-3159-4D76-9D35-225E899B2ED4.png' },
  { label: 'Presence Engine', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/C2E5B53D-A3CB-41DB-AB62-072F0D250A2C.png' },
  { label: 'Memory / Living World', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/543DF12E-B8F2-4F22-BFBD-F60DF9AD870F.png' },
  { label: 'Influence Engine', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/B30E3D1A-738F-48FA-805F-F79CBE692149.png' },
  { label: 'Simulation Lifecycle', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/ADC7A6BD-AB06-4C05-A943-09B86608F426.png' },
  { label: 'Request Lifecycle', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/E0E84641-47C3-49EC-B406-5F5BD84C5C2E.png' },
  { label: 'Persistence Layer', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/865F2DC2-2DBA-43A0-B801-A787B800176E.png' },
  { label: 'API Contracts', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/A34B3D35-6414-494B-903A-0522470B0C72.png' },
  { label: 'Validation Layer', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/A61E9A3B-7DC0-4C39-89C2-021C4BDFD738.png' },
  { label: 'Error Recovery', url: 'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/diagram%20Engineering/D2DAF175-3C90-4E7F-B93F-48E363C6E2D5.png' },
];

function EngineeringCanon({ onBack }: { onBack: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut" }}
      className="min-h-screen bg-[#050505] pt-32 pb-48 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-4 group mix-blend-difference focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded" aria-label="Go back"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Return</span>
      </button>

      <div className="flex flex-col items-center justify-center mb-48 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-light text-[#F4EFE6] mb-8 tracking-tight">Engineering Canon</h1>
        <p className="text-[#D8CFC0] font-sans text-xl font-light leading-relaxed">
          The mechanical truth beneath the architecture.
        </p>
      </div>

      <div className="flex flex-col gap-32 md:gap-48 items-center w-full">
        {ENGINEERING_DIAGRAMS.map((diagram, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeOut" }}
            className="flex flex-col items-center w-full"
          >
            <div className="w-full flex justify-center mb-8">
               <span className="font-mono text-[10px] tracking-[0.4em] text-[#A59B8C] uppercase">{diagram.label}</span>
            </div>
            <img 
              src={diagram.url} 
              alt={`Engineering Canon - ${diagram.label}`} 
              className="w-full h-auto object-cover opacity-90"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const APARTMENT_IMAGES = [
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/3F85C691-7936-4CC9-90DD-F14D0FFE1996.png', // Morning Coffee
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/4D2FA927-2D73-4A02-BBE3-193849BD9048.png', // Reading
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/95FD1586-CCC9-4C9D-893F-598F0855A5D9.png', // Looking Back
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/C1025415-7B3E-47A6-80DA-DF1D875C3D63.png', // Reading on Couch
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/24B067E0-5EAA-4E67-A5D4-0B3EAF52D7C3.png', // Balcony
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/72E58FEB-C2DB-42A5-940B-A9C9F1348943.png', // Watering Plants
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/5542FCF6-0BE0-4E7B-A551-60EE22898D1F.png', // Cassette Repair
  'https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/VESTIGE%20ART/D3A25625-A117-41A6-AAC6-124326F0EAC5.png', // Organizing The Attic
];

function TheApartment({ onBack }: { onBack: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut" }}
      className="min-h-screen bg-[#050505] pt-32 pb-48 px-6 md:px-12 max-w-7xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center gap-4 group mix-blend-difference focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded" aria-label="Go back"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">Return</span>
      </button>

      <div className="flex flex-col items-center justify-center mb-48 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-light text-[#F4EFE6] mb-8 tracking-tight">The Apartment</h1>
        <p className="text-[#D8CFC0] font-sans text-xl font-light leading-relaxed">
          I interrupted someone who was already living here.
        </p>
      </div>

      <div className="flex flex-col gap-32 md:gap-48 items-center w-full">
        {APARTMENT_IMAGES.map((img, i) => {
          // Create an editorial layout with varying sizes and alignments
          const isWide = i === 1 || i === 4 || i === 7;
          const isOffsetLeft = i === 2 || i === 5;
          const isOffsetRight = i === 3 || i === 6;
          
          let widthClass = "w-full md:w-3/4 lg:w-2/3";
          if (isWide) widthClass = "w-full";
          else if (isOffsetLeft) widthClass = "w-full md:w-1/2 md:mr-auto";
          else if (isOffsetRight) widthClass = "w-full md:w-1/2 md:ml-auto";

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeOut" }}
              className={`flex flex-col items-center ${widthClass}`}
            >
              <img 
                src={img} 
                alt={`Apartment detail ${i + 1}`} 
                className="w-full h-auto object-cover opacity-90"
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function VestigeExperience({ onClose }: { onClose: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useFocusTrap(true);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeInOut" }}
        className="fixed inset-0 z-[10000] bg-[#050505] overflow-y-auto overflow-x-hidden selection:bg-[#F4EFE6]/20 selection:text-white"
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-50 p-4 text-[#A59B8C] hover:text-[#F4EFE6] transition-colors mix-blend-difference focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded" aria-label="Close Vestige Experience"
        >
          <X className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          {activeRoom === 'apartment' ? (
            <TheApartment key="apartment" onBack={() => setActiveRoom(null)} />
          ) : activeRoom === 'engineering' ? (
            <EngineeringCanon key="engineering" onBack={() => setActiveRoom(null)} />
          ) : (
            <motion.div 
              key="main-archive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1 }}
            >
              {/* Introduction Section */}
              <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 text-center max-w-4xl mx-auto py-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1.5, delay: prefersReducedMotion ? 0 : 0.5 }}
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#A59B8C] uppercase mb-8">
                    {VESTIGE_PROJECT.num} // {VESTIGE_PROJECT.wing}
                  </div>
                  <h1 className="font-display text-5xl md:text-7xl font-light text-[#F4EFE6] mb-8 tracking-tight">
                    {VESTIGE_PROJECT.title}
                  </h1>
                  <p className="font-mono text-sm tracking-widest text-[#C8A96A] uppercase mb-12">
                    "{VESTIGE_PROJECT.subtitle}"
                  </p>
                  <p className="text-[#D8CFC0] font-sans text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-16">
                    {VESTIGE_PROJECT.desc}
                  </p>
                  <div className="w-[1px] h-32 bg-gradient-to-b from-[#8F7746]/50 to-transparent mx-auto" />
                </motion.div>
              </section>

              {/* Rooms */}
              <div className="flex flex-col">
                {ROOMS.map((room, index) => {
                  if (room.locked) {
                    return (
                      <section 
                        key={room.id}
                        className="min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 py-24 border-t border-[#111]"
                      >
                        <div className="max-w-5xl w-full flex flex-col items-center text-center opacity-40">
                          <div className="font-mono text-[10px] tracking-[0.4em] text-[#A59B8C] uppercase mb-6">
                            {VESTIGE_PROJECT.num} // {room.title}
                          </div>
                          <h2 className="font-display text-4xl md:text-5xl font-light text-[#F4EFE6] mb-8 tracking-tight">
                            {room.name}
                          </h2>
                          <div className="font-mono text-[11px] tracking-[0.3em] text-[#A59B8C] uppercase border border-[#A59B8C]/20 px-6 py-2 mb-8">
                            LOCKED
                          </div>
                          <p className="text-[#D8CFC0] font-sans text-sm font-light leading-relaxed max-w-xl">
                            Available in a future archive release.
                          </p>
                        </div>
                      </section>
                    );
                  }

                  return (
                  <section 
                    key={room.id}
                    className="min-h-[90vh] flex flex-col justify-center items-center px-6 md:px-12 py-24 border-t border-[#111] relative"
                  >
                    <div className="max-w-5xl w-full flex flex-col items-center text-center">
                      <div className="font-mono text-[10px] tracking-[0.4em] text-[#A59B8C] uppercase mb-6">
                        {room.title}
                      </div>
                      <h2 className="font-display text-4xl md:text-5xl font-light text-[#F4EFE6] mb-8 tracking-tight">
                        {room.name}
                      </h2>
                      <p className="text-[#D8CFC0] font-sans text-lg font-light leading-relaxed max-w-xl mb-16">
                        {room.caption}
                      </p>
                      
                      <div className="w-full relative mb-16 overflow-hidden">
                        <img 
                          src={room.image} 
                          alt={room.name}
                          className="w-full max-h-[70vh] object-cover opacity-80"
                        />
                      </div>
                      
                      <button
                        onClick={() => setActiveRoom(room.id)}
                        className={`text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[11px] uppercase tracking-[0.2em] transition-colors flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded`}
                      >
                            Enter {room.name}
                            <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                      </button>
                    </div>
                  </section>
                )})}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
