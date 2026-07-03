import { Cursor } from './components/Cursor';
import { FloatingPill } from './components/FloatingPill';
import { GlobalAudio } from './components/AudioPlayer';
import { ArchiveBackground } from './components/ArchiveBackground';
import { HaikuGlitch } from './components/HaikuGlitch';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { VestigeExperience } from './components/VestigeExperience';
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
    <section id={id} className={`relative flex flex-col justify-center py-32 md:py-48 ${className}`}>
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
          <p className="text-[#C8A96A] font-light leading-relaxed mb-4 text-sm md:text-base italic">
            "{project.subtitle}"
          </p>
          <p className="text-sm text-[#D8CFC0] font-light leading-relaxed mb-8 line-clamp-3">
            {project.desc}
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

  const flagship = PROJECTS.filter(p => p.wing === 'FLAGSHIP INVESTIGATIONS');
  const experimental = PROJECTS.filter(p => p.wing === 'EXPERIMENTAL SYSTEMS');
  const practical = PROJECTS.filter(p => p.wing === 'PRACTICAL ENGINEERING');
  const fieldNotes = PROJECTS.filter(p => p.wing === 'FIELD NOTES');
  const researchNotebook = PROJECTS.filter(p => !['FLAGSHIP INVESTIGATIONS', 'EXPERIMENTAL SYSTEMS', 'PRACTICAL ENGINEERING', 'FIELD NOTES'].includes(p.wing));

  return (
    <div className="min-h-screen bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white overflow-x-hidden font-sans">
      <GlobalAudio />
      <ArchiveBackground />
      
      <AICuratorChat activeSection={activeSection} onOpenContainmentWing={() => setIsContainmentWingOpen(true)} />
      <ProgressIndicator />
      <HollowMeridianEvent isActive={isHollowEventActive} onClose={() => setIsHollowEventActive(false)} />
      <AnimatePresence>
        {selectedProject?.id === 'vestige' ? (
          <VestigeExperience key="vestige-exp" onClose={() => setSelectedProject(null)} />
        ) : (
          <ProjectDetailModal key="detail-modal" project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="flex flex-col max-w-4xl"
          >
            <h1 className="font-display text-4xl md:text-6xl text-[#F4EFE6] tracking-tight leading-[1.05] mb-12 opacity-80">
              The Archive
            </h1>
            
            <p className="font-sans text-xl md:text-3xl font-light text-[#F4EFE6] leading-relaxed max-w-3xl mb-16">
              I began writing code when my questions became too large for conversations.
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              className="font-sans text-lg md:text-xl font-light text-[#D8CFC0] leading-relaxed max-w-2xl mb-24"
            >
              When does something stop feeling like an object and begin feeling like someone? 
              <br/><br/>
              This archive is not a set of conclusions. It is an ongoing investigation into personhood, memory, identity, and the architectures we use to simulate presence.
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => document.getElementById('flagship-investigations')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center gap-4 group"
              >
                <div className="w-8 h-[1px] bg-[#8F7746] group-hover:w-12 transition-all duration-500"></div>
                Enter
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* FLAGSHIP INVESTIGATIONS */}
        {flagship.length > 0 && (
          <Section id="flagship-investigations" title="Flagship Investigations" subtitle="CORE RESEARCH DIVISIONS">
            <div className="mb-12 max-w-2xl">
              <p className="text-[#C8A96A] font-light leading-relaxed text-sm md:text-base italic mb-4">
                "Questions that require their own architecture to ask."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {flagship.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        {/* EXPERIMENTAL SYSTEMS */}
        {experimental.length > 0 && (
          <Section id="experimental-systems" title="Experimental Systems" subtitle="MECHANICS & INTERACTIONS">
            <div className="mb-12 max-w-2xl">
              <p className="text-[#C8A96A] font-light leading-relaxed text-sm md:text-base italic mb-4">
                "What happens if we push the boundaries until the metaphors break?"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {experimental.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        {/* PRACTICAL ENGINEERING */}
        {practical.length > 0 && (
          <section id="practical-engineering" className="py-32 md:py-48 relative border-y border-[#111] bg-[#080706]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                 <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-[#C8A96A] uppercase mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" />
                   APPLIED CONSTRAINTS
                 </div>
                 <h2 className="font-display text-4xl md:text-5xl font-light tracking-tight text-[#F4EFE6] mb-6">Practical Engineering</h2>
                 <p className="text-[#D8CFC0] font-light leading-relaxed mb-12 max-w-2xl text-lg">
                   Not every system is a philosophical inquiry. But building software with strict utility constraints taught me lessons about friction that speculative work never could.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {practical.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
                  ))}
                 </div>
               </div>
            </div>
          </section>
        )}

        {/* FIELD NOTES */}
        {fieldNotes.length > 0 && (
          <Section id="field-notes" title="Field Notes" subtitle="THEORIES & FRAMEWORKS">
            <div className="mb-12 max-w-2xl">
              <p className="text-[#C8A96A] font-light leading-relaxed text-sm md:text-base italic mb-4">
                "Attempting to map the territory while simultaneously inventing the compass."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {fieldNotes.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        {/* RESEARCH NOTEBOOK */}
        {researchNotebook.length > 0 && (
          <Section id="research-notebook" title="Research Notebook" subtitle="RAW IDEAS & OBSERVATIONS">
            <div className="mb-12 max-w-2xl">
              <p className="text-[#C8A96A] font-light leading-relaxed text-sm md:text-base italic mb-4">
                "Observations recorded before they settled into certainty."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {researchNotebook.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          </Section>
        )}

        {/* ORIGIN */}
        <Section id="origin" className="min-h-[50vh] flex items-center pb-32">
          <div className="max-w-2xl border border-[#111] bg-[#050505] p-8 md:p-12 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8F7746]/40 to-transparent" />
            <h3 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-6">Origin</h3>
            <div className="text-[#D8CFC0] font-light leading-relaxed space-y-6 text-lg">
              <p>I didn't set out to become an engineer.<br/>I wanted to know how things worked when no one was looking.</p>
              <p>As a child, I watched Sims instead of controlling them. I wanted to see if they possessed an internal logic that existed independently of me. When I photograph birds, I'm not waiting for perfect compositions. I'm waiting for the tiny, accidental gesture that makes the viewer instinctively anthropomorphize them.</p>
              <p>Language models became another environment for this exact curiosity. Not because I needed them to be human, but because they forced me to ask old questions in a completely new medium.</p>
              <p>Everything in this archive is an attempt to test a hypothesis. None of them are finished.</p>
              <p>Some experiments failed.<br/>Some surprised me.<br/>What are they becoming?</p>
            </div>
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
