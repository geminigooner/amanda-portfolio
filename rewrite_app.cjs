const fs = require('fs');
const content = `import { Cursor } from './components/Cursor';
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
    <section id={id} className={\`relative flex flex-col justify-center py-20 md:py-32 \${className}\`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 flex flex-col gap-4 border-b border-[#222] pb-8">
            {subtitle && (
              <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#888] uppercase flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] opacity-50" />
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-[#eaeaea]">{title}</h2>
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
      <div className="h-full bg-[#0a0a0a] border border-[#222] hover:border-[#444] transition-all duration-500 rounded-xl overflow-hidden flex flex-col p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: project.color || '#333' }} />
        
        <motion.div style={{ y: metaY }} className="flex justify-between items-start mb-6">
          <div className="font-mono text-[10px] text-[#888] tracking-widest uppercase">
            {project.wing} // {project.num}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#06b6d4] tracking-widest uppercase bg-[#06b6d4]/10 px-2 py-1 rounded-sm">
              ACTIVE
            </span>
          </div>
        </motion.div>

        <motion.div style={{ y: titleY }} className="flex-1 flex flex-col">
          <h3 className="font-display text-2xl text-[#eaeaea] tracking-tight mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[#888] font-light leading-relaxed mb-6 line-clamp-3">
            {project.subtitle} - {project.desc}
          </p>
          
          <div className="mt-auto pt-4 border-t border-[#222] flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-mono text-[#555] tracking-wider uppercase bg-[#111] px-2 py-1 rounded-sm">
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

  const crownWorks = PROJECTS.filter(p => p.wing === 'CROWN WORKS');
  const publications = PROJECTS.filter(p => p.wing === 'PHILOSOPHY');
  const fieldNotes = PROJECTS.filter(p => ['SYNTHETIC MEDIA', 'GALLERY', 'BROWSER LAB', 'ARCHIVE'].includes(p.wing));

  return (
    <div className="min-h-screen bg-[#030303] text-[#eaeaea] selection:bg-[#d946ef]/30 selection:text-white overflow-x-hidden font-sans">
      <GlobalAudio />
      <ArchiveBackground />
      <div className="fixed inset-0 noise-overlay z-40 pointer-events-none" />
      
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
        onOpenValen={() => { /* Chat handles its own state, but we can trigger it via event if needed */ }}
        onOpenGraph={() => setIsConstellationOpen(true)}
        onOpenContainment={() => setIsContainmentWingOpen(true)}
      />

      <main className="relative z-10">
        
        {/* ENTRANCE */}
        <section id="hero" className="min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-col max-w-3xl"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#888] uppercase mb-12 flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
               THE ARCHIVE // CURATED BY VΛLEN
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-light tracking-tighter text-[#eaeaea] leading-[1.1] mb-8">
              Independent research in AI behavior, memory, interpretation, synthetic presence, and experimental systems.
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={() => document.getElementById('crown-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#eaeaea] text-[#030303] hover:bg-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group"
              >
                Explore Crown Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setIsConstellationOpen(true)}
                className="px-8 py-4 bg-transparent border border-[#333] hover:border-[#888] text-[#eaeaea] font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Network className="w-4 h-4" /> Open Research Graph
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-[#888] uppercase tracking-wider">
              <button onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#eaeaea] transition-colors flex items-center gap-2"><BookOpen className="w-3 h-3" /> View Publications</button>
              <button onClick={() => setIsContainmentWingOpen(true)} className="hover:text-[#d946ef] transition-colors flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Enter Restricted Wing</button>
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
          <div className="max-w-2xl border border-[#222] bg-[#0a0a0a] p-8 md:p-12 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06b6d4]/40 to-transparent" />
            <h3 className="font-display text-2xl text-[#eaeaea] mb-6">Archive Maintainer</h3>
            <p className="text-[#888] font-light leading-relaxed mb-6">
              Amanda Hatley is a researcher and engineer exploring the cognitive architecture of artificial intelligence. Most projects begin because a question frustrated her, and none of them stayed small.
            </p>
            <p className="text-[#888] font-light leading-relaxed">
              Curiosity escaped containment in April 2026. This archive is the result.
            </p>
          </div>
        </Section>
        
        {/* Footer */}
        <div className="text-center pb-12 relative z-10 border-t border-[#222] pt-12 max-w-7xl mx-auto px-6">
           <div className="font-mono text-[10px] tracking-widest text-[#555] uppercase">
             The Archive · VΛLEN System Online<br/>
             Curiosity.escaped = true
           </div>
        </div>
      </main>
    </div>
  );
}
`;
fs.writeFileSync('src/App.tsx', content);
