import { Cursor } from './components/Cursor';
import { FloatingPill } from './components/FloatingPill';
import { GlobalAudio } from './components/AudioPlayer';
import { ArchiveBackground } from './components/ArchiveBackground';
import { HaikuGlitch } from './components/HaikuGlitch';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ConstellationGraph } from './components/ConstellationGraph';
import { HiddenRoomModal } from './components/HiddenRoomModal';
import { NavigationMenu } from './components/NavigationMenu';
import { HeartStorm } from './components/HeartStorm';
import { AICuratorChat } from './components/AICuratorChat';
import { ContainmentWing } from './components/ContainmentWing';
import { PROJECTS, MUSIC, HAIKU, type Project } from './data';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { Play, ExternalLink, Network } from 'lucide-react';
import { HollowMeridianEvent } from './components/HollowMeridianEvent';
import { playHoverSound } from './utils/audioEffects';
import { initVisitor, trackProjectView } from './firebase';

function Section({ id, title, subtitle, children, className = '' }: { id: string, title?: string, subtitle?: string, children: React.ReactNode, className?: string }) {
  return (
    <section id={id} className={`relative flex flex-col justify-center border-t border-white/5 py-12 md:py-24 ${className}`}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,0,110,0.03)_0%,transparent_80%)]" />
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ amount: 0.1, once: true }}
        className="max-w-6xl w-full mx-auto px-6 relative z-10"
      >
        {title && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ amount: 0.2 }}
            className="mb-16"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#ff006e] mb-4">
              // {subtitle}
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
              {title}
            </h2>
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
}

const ProjectCard: React.FC<{ project: Project, index?: number, onClick: () => void }> = ({ project, index = 0, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax transforms
  const titleY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const metaY = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      id={project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 + 0.1 }}
      viewport={{ once: true, amount: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={playHoverSound}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: typeof window !== 'undefined' && window.innerWidth > 768 ? "preserve-3d" : "flat" }}
      className="glass-panel rounded-xl p-8 md:p-12 flex flex-col group relative overflow-hidden md:cursor-none border border-white/5 hover:border-white/20 transition-colors duration-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2"
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right, ${project.color}, transparent 70%)` }}
      />
      <motion.div style={{ y: metaY }} className="flex justify-between items-start mb-10 relative z-10">
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
          {project.num}
        </span>
        <div className="flex items-center gap-4">
          {'link' in project && typeof project.link === 'string' && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all pointer-events-auto cursor-pointer"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <span className="text-3xl filter opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {project.emoji}
          </span>
        </div>
      </motion.div>
      <motion.h3 style={{ y: titleY }} className="font-display text-3xl font-medium text-white/90 mb-3 relative z-10 group-hover:text-white transition-colors duration-500">
        {project.title}
      </motion.h3>
      <motion.div style={{ y: metaY }} className="font-mono text-[10px] tracking-widest mb-8 relative z-10 text-white/40 uppercase">
        {project.subtitle}
      </motion.div>
      <p className="text-[15px] text-white/60 leading-[1.8] mb-12 flex-1 relative z-10 font-light max-w-[95%] group-hover:text-white/80 transition-colors duration-500">
        {project.desc}
      </p>
      <motion.div style={{ y: metaY }} className="flex flex-wrap gap-3 relative z-10">
        {project.tags.map(tag => (
          <span key={tag} className="font-mono text-[9px] tracking-[0.15em] px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-white/40 group-hover:bg-white/[0.05] transition-colors duration-500">
            {tag}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [isHollowEventActive, setIsHollowEventActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<'Recent' | 'Alpha' | 'Impact'>('Recent');
  const [activeSection, setActiveSection] = useState('hero');
  const [isConstellationOpen, setIsConstellationOpen] = useState(false);
  const [isHiddenRoomOpen, setIsHiddenRoomOpen] = useState(false);
  const [isContainmentWingOpen, setIsContainmentWingOpen] = useState(false);
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Hidden shortcut: Ctrl+Shift+C (or Cmd+Shift+C on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setIsContainmentWingOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch (e) {
      // Ignore iframe security errors
    }
    try {
      window.scrollTo(0, 0);
      // As a fallback for some browsers/frames
      setTimeout(() => window.scrollTo(0, 0), 100);
    } catch (e) {}
    
    initVisitor().then(uid => {
      if (!uid) {
        setAuthError(true);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedProject) {
      trackProjectView(selectedProject.title);
    }
  }, [selectedProject]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    // Hidden Room Trigger
    let keySequence = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence += e.key.toLowerCase();
      if (keySequence.length > 7) {
        keySequence = keySequence.slice(-7);
      }
      if (keySequence === 'archive') {
        setIsHiddenRoomOpen(true);
        keySequence = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const sectionColors: Record<string, string> = {
    'hero': '#050002',
    'crown-works': '#050002',
    'companion-systems': '#0a0005',
    'synthetic-media': '#050002',
    'browser-lab': '#020005',
    'philosophy': '#050002',
    'gallery': '#0a0005',
    'archive': '#020005',
  };

  const getSortedProjects = (projects: typeof PROJECTS) => {
    const arr = [...projects];
    if (activeSort === 'Alpha') {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (activeSort === 'Impact') {
      arr.sort((a, b) => (b.desc.length + b.tags.length * 5) - (a.desc.length + a.tags.length * 5));
    }
    // Recent implies chronological added order, which is the default array order.
    return arr;
  };

  const crownWorks = getSortedProjects(PROJECTS.filter(p => p.wing === 'CROWN WORKS' && (!activeFilter || activeFilter === 'CROWN WORKS')));
  const companionSystems = getSortedProjects(PROJECTS.filter(p => p.wing === 'COMPANION SYSTEMS' && (!activeFilter || activeFilter === 'COMPANION SYSTEMS')));
  const syntheticMedia = getSortedProjects(PROJECTS.filter(p => p.wing === 'SYNTHETIC MEDIA' && (!activeFilter || activeFilter === 'SYNTHETIC MEDIA')));
  const browserLab = getSortedProjects(PROJECTS.filter(p => p.wing === 'BROWSER LAB' && (!activeFilter || activeFilter === 'BROWSER LAB')));
  const philosophy = getSortedProjects(PROJECTS.filter(p => p.wing === 'PHILOSOPHY' && (!activeFilter || activeFilter === 'PHILOSOPHY')));
  const gallery = getSortedProjects(PROJECTS.filter(p => p.wing === 'GALLERY' && (!activeFilter || activeFilter === 'GALLERY')));
  const archive = getSortedProjects(PROJECTS.filter(p => p.wing === 'ARCHIVE' && (!activeFilter || activeFilter === 'ARCHIVE')));

  const sectionLabels: Record<string, string> = {
    'hero': 'Arrival',
    'hollow-meridian': 'The Hollow Meridian',
    'crown-works': 'Crown Works',
    'companion-systems': 'Companion Systems',
    'synthetic-media': 'Synthetic Media Lab',
    'browser-lab': 'Browser Laboratory',
    'philosophy': 'Philosophy + Research',
    'gallery': 'Digital Gallery',
    'archive': 'Archive',
  };

  return (
    <main 
      className="relative transition-colors duration-1000 ease-in-out" 
      style={{ backgroundColor: sectionColors[activeSection] || '#050002' }}
    >
      <ArchiveBackground />
      <div className="fixed inset-0 noise-overlay z-40 pointer-events-none" />
      <HeartStorm />
      <AICuratorChat activeSection={activeSection} onOpenContainmentWing={() => setIsContainmentWingOpen(true)} />
      <ProgressIndicator />
      <HollowMeridianEvent isActive={isHollowEventActive} onClose={() => setIsHollowEventActive(false)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ConstellationGraph 
        isOpen={isConstellationOpen} 
        onClose={() => setIsConstellationOpen(false)} 
        onSelectProject={(p) => setSelectedProject(p)} 
      />
      <HiddenRoomModal 
        isOpen={isHiddenRoomOpen}
        onClose={() => setIsHiddenRoomOpen(false)}
      />
      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(false)} />
        )}
      </AnimatePresence>
      <Cursor />
      <FloatingPill />
      <NavigationMenu onNavigate={() => setActiveFilter(null)} />
      <GlobalAudio />

      {/* STICKY BREADCRUMB */}
      <div className="fixed top-8 left-8 z-[90] font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase pointer-events-none mix-blend-difference hidden md:block">
        <div className="flex items-center gap-3">
          <span className="opacity-50">OBSERVATORY</span>
          <span className="opacity-50">/</span>
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500">
            {sectionLabels[activeSection] || 'Archive'}
          </span>
        </div>
      </div>

      {authError && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-black/80 border border-white/10 px-4 py-2 rounded-full font-mono text-[9px] tracking-widest text-white/50 backdrop-blur-md">
          CONNECTION TO ARCHIVE MEMORY UNAVAILABLE. BROWSING IN OFFLINE MODE.
        </div>
      )}

      {/* FLOATING FILTER BAR */}
      <div className="fixed top-24 right-6 z-[90] flex flex-col gap-2 items-end">
        <button
          onClick={() => setIsConstellationOpen(true)}
          className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all border bg-teal-900/20 border-teal-400/50 text-teal-300 hover:bg-teal-900/40 hover:text-teal-200 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)] mb-4 flex items-center gap-2"
        >
          <Network size={12} />
          <span className="hidden md:inline">Constellation Map</span>
        </button>

        <div className="hidden xl:flex flex-col gap-2 items-end">
          <div className="font-mono text-[9px] text-[#ff006e] tracking-widest uppercase mb-2">Division Filter</div>
          {[null, 'CROWN WORKS', 'COMPANION SYSTEMS', 'SYNTHETIC MEDIA', 'BROWSER LAB', 'PHILOSOPHY', 'GALLERY', 'ARCHIVE'].map((filter) => (
          <button
            key={filter || 'ALL'}
            onClick={() => setActiveFilter(filter)}
            className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all border ${
              activeFilter === filter 
                ? 'bg-[#ff006e]/20 border-[#ff006e]/50 text-white drop-shadow-[0_0_8px_rgba(255,0,110,0.5)]' 
                : 'bg-black/40 border-white/10 text-white/40 hover:text-white/80 hover:border-white/30 backdrop-blur-md'
            }`}
          >
            {filter || 'ALL DIVISIONS'}
          </button>
        ))}

        <div className="font-mono text-[9px] text-[#ff006e] tracking-widest uppercase mb-2 mt-4">Sort By</div>
        {(['Recent', 'Alpha', 'Impact'] as const).map((sortType) => (
          <button
            key={sortType}
            onClick={() => setActiveSort(sortType)}
            className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all border ${
              activeSort === sortType 
                ? 'bg-[#c084fc]/20 border-[#c084fc]/50 text-white drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]' 
                : 'bg-black/40 border-white/10 text-white/40 hover:text-white/80 hover:border-white/30 backdrop-blur-md'
            }`}
          >
            {sortType === 'Recent' ? 'Recently Added' : sortType === 'Alpha' ? 'Alphabetical' : 'Impact Level'}
          </button>
        ))}
        </div>
      </div>

      {/* ARRIVAL (HERO) */}
      <section id="hero" className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05)_0%,transparent_60%)] animate-pulse-glow" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="font-mono text-[9px] md:text-[11px] tracking-[0.3em] text-white/50 uppercase mb-12 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
             LIVING ARCHIVE // 2026
          </div>
          
          <h1 className="font-display text-6xl md:text-[8rem] font-bold tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-colors duration-1000">
            Amanda<br/>Hatley
          </h1>
          
          <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#c084fc]/70 uppercase mb-12">
            Clinical Femme Research Institute
          </div>

          <div className="max-w-lg glass-panel clinical-border rounded-3xl p-6 md:p-8 text-sm text-white/60 leading-relaxed text-left relative overflow-hidden group">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
            Started building in <em className="text-teal-400 not-italic font-bold">April 2026</em>. Learned by chasing curiosity through increasingly ambitious prototypes and refusing to stop when systems became complicated<span onClick={() => setIsHollowEventActive(true)} className="cursor-pointer opacity-10 hover:opacity-100 hover:text-teal-400 transition-all">.</span>
            <br/><br/>
            Most projects begin because something <em className="text-white/90 not-italic font-bold">frustrated her</em>. None of them stayed small.
            <br/><br/>
            <em className="text-white/40 not-italic">Oh, you're curious too?</em>
          </div>
        </motion.div>
      </section>

      {/* CROWN WORKS */}
      {crownWorks.length > 0 && (
        <Section id="crown-works" title="Crown Works" subtitle="FLAGSHIP RESEARCH DIVISIONS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {crownWorks.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </Section>
      )}

      {/* COMPANION SYSTEMS */}
      {companionSystems.length > 0 && (
        <Section id="companion-systems" title="Companion Systems" subtitle="SYNTHETIC RELATIONSHIP ECOLOGIES">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {companionSystems.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </Section>
      )}

      {/* SYNTHETIC MEDIA LAB */}
      {(!activeFilter || activeFilter === 'SYNTHETIC MEDIA') && (
        <Section id="synthetic-media" title="Synthetic Media Lab" subtitle="GENERATIVE CINEMA & AUDIO">
          {syntheticMedia.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-16">
              {syntheticMedia.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          )}

          <div className="glass-panel rounded-2xl p-10 mb-8 border border-white/5 hover:border-white/10 transition-colors">
            <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">AUDIO ARCHIVE // PLAYLIST</div>
            <p className="text-[15px] font-light text-white/60 mb-10 max-w-xl">Original AI-assisted tracks. Chaotic. Feminine. Dangerous. Play at your own risk. Audio does not autoplay.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MUSIC.map((song, index) => (
                <motion.button
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 + 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => (window as any).playTrack(song.id)}
                  className="text-left group glass-panel border border-white/5 hover:border-white/20 rounded-xl p-4 flex items-center gap-4 transition-all hover:bg-white/5 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg" style={{ backgroundImage: `linear-gradient(135deg, ${song.color}, #050002)` }}>
                    <Play size={14} className="text-white ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm text-white truncate group-hover:text-glow transition-all">{song.title}</div>
                    <div className="font-mono text-[9px] tracking-wider uppercase truncate mt-1" style={{ color: song.color }}>{song.vibe}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* BROWSER LAB */}
      {browserLab.length > 0 && (
        <Section id="browser-lab" title="Browser Laboratory" subtitle="EXPERIMENTAL COMPUTATION WING">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
             {browserLab.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </Section>
      )}

      {/* PHILOSOPHY + RESEARCH */}
      {philosophy.length > 0 && (
        <Section id="philosophy" title="Philosophy + Research" subtitle="THEORETICAL FOUNDATIONS">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
             {philosophy.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </Section>
      )}

      {/* DIGITAL GALLERY */}
      {gallery.length > 0 && (
        <Section id="gallery" title="Digital Gallery" subtitle="VISUAL ARTIFACTS">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
             {gallery.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>
        </Section>
      )}

      {/* ARCHIVE */}
      {archive.length > 0 && (
        <Section id="archive" title="Archive" subtitle="MEMORY SEDIMENTATION">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Projects */}
          <div className="flex flex-col gap-12">
            {archive.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
            ))}
          </div>

          {/* The Haiku Artifact */}
          <div className="h-full">
            <div className="glass-panel border border-white/5 rounded-xl h-full flex flex-col overflow-hidden relative transition-colors hover:border-white/20">
              <div className="px-8 pt-8 pb-4 flex flex-col gap-2">
                <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">ARTIFACT.01 // POETRY</span>
              </div>
              <div className="px-8 pb-8 flex-1 flex flex-col justify-center relative">
                 <div className="relative z-10 cursor-crosshair">
                   <HaikuGlitch text={HAIKU} />
                 </div>
              </div>
            </div>
          </div>

        </div>
      </Section>
      )}

      {/* Footer Note */}
      <div className="mt-32 text-center pb-12 relative z-10">
         <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
           Amanda Observatory · curiosity.escaped = true<br/>
           Archive // 2026
         </div>
      </div>

    </main>
  );
}
