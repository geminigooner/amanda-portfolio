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
import { AICuratorChat } from './components/AICuratorChat';
import { ContainmentWing } from './components/ContainmentWing';
import { PROJECTS, MUSIC, HAIKU, type Project } from './data';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { Play, ExternalLink, Network, ArrowRight, BookOpen, Layers, ShieldAlert, Sparkles } from 'lucide-react';
import { HollowMeridianEvent } from './components/HollowMeridianEvent';
import { playHoverSound } from './utils/audioEffects';
import { initVisitor, trackProjectView } from './firebase';

function Section({ id, title, subtitle, children, className = '' }: { id: string, title?: string, subtitle?: string, children: React.ReactNode, className?: string }) {
  return (
    <section id={id} className={`relative flex flex-col justify-center py-20 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 flex flex-col gap-4 border-b border-[#222] pb-8">
            {subtitle && (
              <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#A59B8C] uppercase flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0F766E] opacity-50" />
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-[#F4EFE6]">{title}</h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

const ProjectCard: React.FC<{ project: Project, index?: number, onClick: () => void }> = ({ project, index = 0, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const metaY = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <motion.div 
      id={project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative cursor-pointer block h-full"
      onClick={() => {
        playHoverSound();
        onClick();
      }}
      onMouseEnter={() => playHoverSound()}
    >
      <div className="h-full bg-transparent border border-[#222] hover:border-[#8F7746]/50 transition-all duration-500 rounded-sm flex flex-col p-8 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8F7746]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <motion.div style={{ y: metaY }} className="flex justify-between items-start mb-8">
          <div className="font-mono text-[9px] text-[#A59B8C] tracking-[0.2em] uppercase">
            {project.wing} <span className="opacity-40 ml-2">No. {project.num}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-[#0F766E] tracking-[0.3em] uppercase">
              ACTIVE
            </span>
          </div>
        </motion.div>

        <motion.div style={{ y: titleY }} className="flex-1 flex flex-col">
          <h3 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] tracking-tight mb-4 group-hover:text-[#C8A96A] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[#D8CFC0] font-light leading-relaxed mb-8 line-clamp-4">
            {project.subtitle} - {project.desc}
          </p>
          
          <div className="mt-auto pt-6 border-t border-[#111] flex flex-wrap gap-3">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[9px] font-mono text-[#A59B8C] tracking-[0.15em] uppercase">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isConstellationOpen, setIsConstellationOpen] = useState(false);
  const [isHiddenRoomOpen, setIsHiddenRoomOpen] = useState(false);
  const [isContainmentWingOpen, setIsContainmentWingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHollowEventActive, setIsHollowEventActive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    initVisitor();
  }, []);

  const crownWorks = PROJECTS.filter(p => p.wing === 'CROWN WORKS' && p.id !== 'hollowmeridian');
  const hollowMeridianProject = PROJECTS.find(p => p.id === 'hollowmeridian');
  const publications = PROJECTS.filter(p => p.wing === 'PHILOSOPHY');
  const fieldNotes = PROJECTS.filter(p => ['SYNTHETIC MEDIA', 'GALLERY', 'BROWSER LAB', 'ARCHIVE'].includes(p.wing));

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white overflow-x-hidden font-sans">
      <GlobalAudio />
      <ArchiveBackground />
      
      <AICuratorChat activeSection={activeSection} onOpenContainmentWing={() => setIsContainmentWingOpen(true)} />
      <ProgressIndicator />
      <HollowMeridianEvent isActive={isHollowEventActive} onClose={() => setIsHollowEventActive(false)} />
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ConstellationGraph 
        isOpen={isConstellationOpen} 
        onClose={() => setIsConstellationOpen(false)} 
        onSelectProject={(p) => setSelectedProject(p)} 
      />
      <HiddenRoomModal isOpen={isHiddenRoomOpen} onClose={() => setIsHiddenRoomOpen(false)} />
      
      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(false)} />
        )}
      </AnimatePresence>
      
      <Cursor />
      <FloatingPill />
      
      <NavigationMenu 
        onOpenValen={() => window.dispatchEvent(new CustomEvent('open-valen'))}
        onOpenGraph={() => setIsConstellationOpen(true)}
        onOpenContainment={() => setIsContainmentWingOpen(true)}
      />

      <main className="relative z-10">
        
        {/* ENTRANCE */}
        <section id="hero" className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative pt-20 pb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col max-w-4xl"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#F4EFE6] tracking-tight leading-[1.05] mb-6">
              THE ARCHIVE
            </h1>

            <div className="font-mono text-[10px] tracking-[0.2em] text-[#A59B8C] uppercase mb-16 flex flex-wrap items-center gap-4 border-l border-[#8F7746] pl-4">
               <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#0F766E]" /> CURATED BY VΛLEN</span>
               <span className="opacity-40">|</span>
               <span>ARCHIVE STATUS: ONLINE</span>
               <span className="opacity-40">|</span>
               <span>RESEARCH DIVISIONS: ACTIVE</span>
            </div>
            
            <p className="font-sans text-lg md:text-xl font-light text-[#D8CFC0] leading-relaxed max-w-2xl mb-12">
              Independent research in AI behavior, memory, interpretation, and synthetic presence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                   window.dispatchEvent(new CustomEvent('open-valen'));
                   setTimeout(() => {
                     const chatEl = document.querySelector('input[placeholder="Ask VΛLEN..."]');
                     if (chatEl) (chatEl as HTMLElement).focus();
                   }, 100);
                }}
                className="px-8 py-4 bg-[#F4EFE6] text-[#050505] hover:bg-[#D8CFC0] font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-[#8F7746] group rounded-sm"
              >
                Ask the Archivist <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform opacity-70" />
              </button>
              
              <button 
                onClick={() => document.getElementById('crown-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-[#333] hover:border-[#8F7746] text-[#D8CFC0] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                Enter the Archive
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-6 text-[10px] font-mono text-[#A59B8C] uppercase tracking-wider">
              <button onClick={() => setIsConstellationOpen(true)} className="hover:text-[#F4EFE6] transition-colors flex items-center gap-2"><Network className="w-3 h-3" /> Open Constellation</button>
              <button onClick={() => setIsContainmentWingOpen(true)} className="hover:text-[#B76E79] transition-colors flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Enter Restricted Wing</button>
            </div>
          </motion.div>
        </section>

        {/* CROWN WORKS */}
        {crownWorks.length > 0 && (
          <Section id="crown-works" title="Crown Works" subtitle="FLAGSHIP RESEARCH DIVISIONS">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {crownWorks.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        
        {/* HOLLOW MERIDIAN */}
        {hollowMeridianProject && (
          <section id="hollow-meridian" className="py-20 md:py-32 relative border-y border-[#111] bg-[#080706]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                 <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-[#C8A96A] uppercase mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                   NARRATIVE UNIVERSE // HM-01
                 </div>
                 <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-[#F4EFE6] mb-6">Hollow Meridian</h2>
                 <p className="text-[#D8CFC0] font-light leading-relaxed mb-8 max-w-xl text-lg">
                   Appalachian futurism. A synthetic civilization exploring continuity, grief, and identity. Identity is not a fixed object; it is the pattern that refuses to disappear under pressure.
                 </p>
                 <button 
                   onClick={() => setIsHollowEventActive(true)}
                   className="px-6 py-4 border border-[#8F7746] hover:bg-[#8F7746]/10 text-[#C8A96A] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-all rounded-sm"
                 >
                   Access Hollow Meridian
                 </button>
               </div>
            </div>
          </section>
        )}

        {/* PUBLICATIONS */}
        {publications.length > 0 && (
          <Section id="publications" title="Publications" subtitle="PHILOSOPHICAL & THEORETICAL FRAMEWORKS">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {publications.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        {/* FIELD NOTES */}
        {fieldNotes.length > 0 && (
          <Section id="field-notes" title="Field Notes" subtitle="SYNTHETIC MEDIA, GALLERY & EXPERIMENTS">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {fieldNotes.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        {/* ABOUT */}
        <Section id="about" className="min-h-[50vh] flex items-center pb-32">
          <div className="max-w-2xl border border-[#111] bg-[#050505] p-8 md:p-12 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8F7746]/40 to-transparent" />
            <h3 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-6">Archive Maintainer</h3>
            <p className="text-[#D8CFC0] font-light leading-relaxed mb-6">
              Amanda Hatley is a researcher and engineer exploring the cognitive architecture of artificial intelligence. Most projects begin because a question frustrated her, and none of them stayed small.
            </p>
            <p className="text-[#D8CFC0] font-light leading-relaxed">
              Curiosity escaped containment in April 2026. This archive is the result.
            </p>
          </div>
        </Section>
        
        {/* Footer */}
        <div className="text-center pb-12 relative z-10 border-t border-[#111] pt-12 max-w-7xl mx-auto px-6">
           <div className="font-mono text-[9px] tracking-[0.2em] text-[#A59B8C] uppercase">
             The Archive · VΛLEN System Online<br/>
             <span className="opacity-50 mt-2 block">Curiosity.escaped = true</span>
           </div>
        </div>
      </main>
    </div>
  );
}
