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
import { AICuratorChat } from './components/AICuratorChat';
import { ContainmentWing } from './components/ContainmentWing';
import { ConvergencePage } from './components/ConvergencePage';
import { ValenPage } from './components/ValenPage';
import { PROJECTS, MUSIC, HAIKU, type Project } from './data';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, MotionConfig } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { Play, ExternalLink, Network, ArrowRight, BookOpen, Layers, ShieldAlert, Sparkles } from 'lucide-react';
import { HollowMeridianEvent } from './components/HollowMeridianEvent';
import { InfoModal } from './components/InfoModal';
import { playHoverSound } from './utils/audioEffects';
import { initVisitor, trackProjectView } from './firebase';

function Section({ id, title, subtitle, children, className = '' }: { id: string, title?: string, subtitle?: string, children: React.ReactNode, className?: string }) {
  return (
    <motion.section 
      id={id} 
      className={`relative flex flex-col justify-center py-32 md:py-48 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10">
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 flex flex-col gap-4 border-b border-[#222] pb-8">
            {subtitle && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#A59B8C] uppercase flex items-center gap-3"
              >
                {subtitle}
              </motion.div>
            )}
            {title && (
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-display text-4xl md:text-6xl font-light tracking-tight text-[#F4EFE6]"
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.section>
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
    <motion.article id={project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative cursor-pointer block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded" tabIndex={0} onKeyDown={(e) => { if(e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }} role="button" aria-label={`View project: ${project.title}`}
      onClick={() => {
        playHoverSound();
        onClick();
      }}
      onMouseEnter={() => playHoverSound()}
    >
      <div className="h-full bg-transparent border border-[#222] hover:border-[#8F7746]/50 transition-all duration-500 rounded-sm flex flex-col p-8 relative">
        
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
          <p className="text-[#C8A96A] font-light leading-relaxed mb-4 text-base italic">
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
    </motion.article>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isConstellationOpen, setIsConstellationOpen] = useState(false);
  const [isHiddenRoomOpen, setIsHiddenRoomOpen] = useState(false);
  const [isContainmentWingOpen, setIsContainmentWingOpen] = useState(false);
  const [isConvergenceOpen, setIsConvergenceOpen] = useState(false);
  const [isValenPageOpen, setIsValenPageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHollowEventActive, setIsHollowEventActive] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    const handleNavigateEvent = (e: any) => {
      if (e.detail?.path) {
        navigate(e.detail.path);
        
        if (e.detail.hash) {
          setTimeout(() => {
            document.getElementById(e.detail.hash)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };
    window.addEventListener('navigate', handleNavigateEvent);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handleNavigateEvent);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    initVisitor();
  }, []);

  useEffect(() => {
    const handleOpenGraph = () => setIsConstellationOpen(true);
    const handleOpenContainment = () => setIsContainmentWingOpen(true);
    const handleOpenConvergence = () => setIsConvergenceOpen(true);
    const handleOpenValenPage = () => setIsValenPageOpen(true);
    
    window.addEventListener('open-graph', handleOpenGraph);
    window.addEventListener('open-containment', handleOpenContainment);
    window.addEventListener('open-convergence', handleOpenConvergence);
    window.addEventListener('open-valen-page', handleOpenValenPage);
    
    return () => {
      window.removeEventListener('open-graph', handleOpenGraph);
      window.removeEventListener('open-containment', handleOpenContainment);
      window.removeEventListener('open-convergence', handleOpenConvergence);
      window.removeEventListener('open-valen-page', handleOpenValenPage);
    };
  }, []);

  const flagshipProjects = PROJECTS.filter(p => p.flagship).sort((a, b) => (a.flagshipOrder || 0) - (b.flagshipOrder || 0));
  
  const archiveProjects = PROJECTS.filter(p => !p.flagship);
  
  const WING_ORDER = [
    "EXPERIMENTAL SYSTEMS",
    "RESEARCH PROTOCOLS",
    "APPLIED SYSTEMS",
    "FIELD NOTES",
    "SPECULATIVE ARCHIVES",
    "BROWSER LAB",
    "GALLERY",
    "ARCHIVE"
  ];
  
  const archiveWings = [...new Set(archiveProjects.map(p => p.wing))].sort((a, b) => {
    const indexA = WING_ORDER.indexOf(a);
    const indexB = WING_ORDER.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });


  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white font-sans">
      <Cursor />
      <GlobalAudio />
      <ArchiveBackground />
      <FloatingPill />
      <AICuratorChat activeSection={activeSection} onOpenContainmentWing={() => setIsContainmentWingOpen(true)} onOpenConvergence={() => setIsConvergenceOpen(true)} onSelectProject={(project) => setSelectedProject(project)} />
      <ProgressIndicator />
      <HollowMeridianEvent isActive={isHollowEventActive} onClose={() => setIsHollowEventActive(false)} />
      
      <AnimatePresence>
        {selectedProject?.id === 'vestige' ? (
          <VestigeExperience key="vestige-exp" onClose={() => setSelectedProject(null)} />
        ) : (
          selectedProject && <ProjectDetailModal key="project-modal" project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
      <ConstellationGraph 
        isOpen={isConstellationOpen} 
        onClose={() => setIsConstellationOpen(false)} 
        onSelectProject={(p) => setSelectedProject(p)} /> 
      
      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConvergenceOpen && (
          <ConvergencePage onClose={() => setIsConvergenceOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isValenPageOpen && (
          <ValenPage onClose={() => setIsValenPageOpen(false)} />
        )}
      </AnimatePresence>
      <InfoModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <p>This site uses anonymous authentication to remember basic visit information (like which rooms you’ve explored) so Valen can provide continuity across visits.</p>
        <p>No personal information is collected, stored conversations are not sold or shared with third parties, and no tracking occurs beyond what’s needed for this feature.</p>
      </InfoModal>
      <InfoModal isOpen={isAccessibilityOpen} onClose={() => setIsAccessibilityOpen(false)} title="Accessibility Statement">
        <p>This portfolio is intended to be accessible to as many people as possible. I believe the web should be an inclusive space, and accessibility improvements are an ongoing part of this project.</p>
        <p>If you encounter any barriers while navigating the archive, please feel free to reach out. Your feedback is welcome and appreciated.</p>
      </InfoModal>
      
      <AnimatePresence>
        {isHiddenRoomOpen && (
          <HiddenRoomModal isOpen={isHiddenRoomOpen} onClose={() => setIsHiddenRoomOpen(false)} />
        )}
      </AnimatePresence>
      
      

      <main className="relative z-10">
        
        {currentPath === '/archive' ? (
          <>
            <header className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto relative">
              <button 
                onClick={() => navigate('/')}
                className="text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded mb-12"
              >
                <div className="w-8 h-[1px] bg-[#8F7746] group-hover:w-4 transition-all duration-500"></div>
                ← Return to Home
              </button>
              <h1 className="font-display text-4xl md:text-6xl text-[#F4EFE6] tracking-tight leading-[1.05] mb-6 opacity-80">
                Full Archive
              </h1>
              <p className="font-sans text-xl font-light text-[#D8CFC0] leading-relaxed max-w-3xl">
                A comprehensive collection of all investigations, experiments, applied systems, and field notes.
              </p>
            </header>

            {archiveWings.map(wing => {
              const wingProjects = archiveProjects.filter(p => p.wing === wing);
              if (wingProjects.length === 0) return null;
              
              return (
                <Section key={wing} id={`archive-${wing.replace(/\s+/g, '-').toLowerCase()}`} title={wing}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {wingProjects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
                    ))}
                  </div>
                </Section>
              );
            })}
          </>
        ) : (
          <>
            {/* ENTRANCE */}
            <header id="hero" className="min-h-[100dvh] flex flex-col px-6 md:px-12 max-w-7xl mx-auto relative pt-24 pb-32 md:pt-20 md:pb-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="flex flex-col max-w-4xl my-auto"
              >
                <h1 className="font-display text-3xl md:text-6xl text-[#F4EFE6] tracking-tight leading-[1.05] mb-8 md:mb-12 opacity-80">
                  The Archive
                </h1>
                
                <p className="font-sans text-[1.15rem] leading-[1.6] md:text-3xl font-light text-[#F4EFE6] md:leading-relaxed max-w-3xl mb-8 md:mb-16">
                  What kinds of application architecture are necessary before memory, presence, or agency emerge as coherent properties of an interactive system?
                </p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                  className="font-sans text-[1.1rem] leading-[1.65] md:text-xl font-light text-[#D8CFC0] md:leading-relaxed max-w-2xl mb-16 md:mb-24 space-y-4 md:space-y-6"
                >
                  <p>
                    That question runs through everything here. Rather than prompting a model to perform a more convincing personality, these projects test whether coherent behavior—refusal, initiative, continuity, memory—can emerge from deterministic application architecture that sits outside the language model itself. The model expresses state; the application owns it.
                  </p>
                  <p>
                    That separation doesn't make a system's behavior more accurate—it makes the mechanisms producing that behavior more legible and attributable. That's a more modest claim, and the one I actually care about.
                  </p>
                  <p>
                    I've been building these systems since late April 2026, almost entirely from an iPhone, in collaboration with multiple AI systems taking on distinct roles—architecture, implementation, critique. Building became the method, not just the outcome: some questions about AI behavior are easier to investigate by constructing a system than by discussing one.
                  </p>
                  <p>
                    Individually, the projects range across persistent agent architectures, real-time interaction systems, and environmental memory design. Each one answers a version of the opening question with a working system rather than a proposal—the goal isn't a definitive answer, but architectures that make the question easier to investigate, evaluate, and reason about.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 2, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button 
                    onClick={() => document.getElementById('flagship-investigations')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded"
                  >
                    <div className="w-8 h-[1px] bg-[#8F7746] group-hover:w-12 transition-all duration-500"></div>
                    Enter
                  </button>
                </motion.div>
              </motion.div>
            </header>

            {/* FLAGSHIP INVESTIGATIONS */}
            {flagshipProjects.length > 0 && (
              <Section id="flagship-investigations" title="Flagship Investigations" subtitle="CORE RESEARCH DIVISIONS">
                <div className="mb-12 max-w-2xl">
                  <p className="text-[#C8A96A] font-light leading-relaxed text-base italic mb-4">
                    "Questions that require their own architecture to ask."
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {flagshipProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
                  ))}
                </div>
                <div className="mt-24 text-center border-t border-[#222] pt-12">
                  <button 
                    onClick={() => navigate('/archive')}
                    className="text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-[0.2em] transition-colors inline-flex items-center gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded"
                  >
                    explore the full archive <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Section>
            )}

            {/* RESEARCH INTERESTS */}
            <Section id="research-interests" title="Research Interests" subtitle="THEMES & METHODS">
              <div className="max-w-3xl text-[#D8CFC0] font-light leading-relaxed text-lg space-y-8">
                <p>
                  I build software to investigate questions as much as to implement features.
                </p>
                <p>
                  Across my projects, I repeatedly return to the same themes: agency, memory, interaction, and the ways complex systems produce behavior through relationships rather than isolated components.
                </p>
                <p>
                  Rather than treating engineering and design as separate disciplines, I approach both as tools for exploring how intelligent systems behave over time.
                </p>

                <div className="pt-8 pb-4">
                  <div className="text-[#C8A96A] font-mono text-[10px] tracking-[0.2em] uppercase mb-8">Core Themes</div>
                  <ul className="space-y-4 text-base">
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>AI agency and autonomous behavior</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>Human–AI interaction</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>Multi-agent systems</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>Persistent memory architectures</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>Context assembly and decision systems</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>Emergent behavior in interactive software</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>State-driven interaction design</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>System architecture and information flow</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="text-[#8F7746] mt-1 text-[10px]">&bull;</span>
                      <span>Explainability and reasoning representations</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 pb-4 space-y-8">
                  <div className="text-[#C8A96A] font-mono text-[10px] tracking-[0.2em] uppercase mb-4">Technical Interests</div>
                  <p>
                    My approach bridges engineering and exploration, relying on a diverse technical foundation. I build primarily with TypeScript, structuring persistent environments through Firebase and integrating reasoning capabilities via Cloudflare Workers AI and various REST APIs. 
                  </p>
                  <p>
                    These systems take shape through rapid prototyping, deliberate system architecture, and interaction design. Working natively from the Linux command line and managing iteration via Git and GitHub keeps the process fluid and direct.
                  </p>
                  <p>
                    Alongside traditional development, methods like prompt engineering and open-source intelligence (OSINT) research serve as essential investigative tools, helping to map the problem space before any code is written.
                  </p>
                </div>

                <div className="pt-12 space-y-8 border-t border-[#111]">
                  <p>
                    My projects rarely begin with a product idea.
                  </p>
                  <p>
                    They usually begin with a question.
                  </p>
                  <p>
                    The software is simply the method I use to explore it.
                  </p>
                </div>
              </div>
            </Section>

            {/* DESIGN PHILOSOPHY */}
            <Section id="design-philosophy" title="Design Philosophy" subtitle="THEORY & PRACTICE">
              <div className="max-w-3xl text-[#D8CFC0] font-light leading-relaxed text-lg space-y-8">
                <p>
                  Many of my projects begin with a conceptual question rather than a product specification.
                </p>
                <p>
                  I enjoy building systems where behavior emerges from architecture instead of being scripted directly. Questions about memory, agency, interaction, and perception often become working software—not because software is the goal, but because it is the most effective way I know to investigate those ideas.
                </p>
                <p>
                  Iteration is central to my process. Several projects in this portfolio changed direction entirely because experimentation revealed that my original assumptions were incomplete. Rather than treating those moments as failures, I consider them the point where the most meaningful engineering begins.
                </p>
                <p>
                  I value systems that make their reasoning visible, architectures that separate decision-making from expression, and interfaces that communicate complex ideas with clarity. Whether I am designing interaction flows, multi-agent systems, or research prototypes, my goal is to build software that helps both people and machines become easier to understand.
                </p>
              </div>
            </Section>

            {/* ORIGIN */}
            <Section id="origin" className="min-h-[50vh] flex items-center pb-32">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="max-w-2xl border border-[#111] bg-[#050505] p-8 md:p-12 rounded-sm relative overflow-hidden"
              >
                <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-6">Origin</h2>
                <div className="text-[#D8CFC0] font-light leading-relaxed space-y-6 text-lg">
                  <p>I tend to approach software as a research medium rather than a destination.</p>
                  <p>The questions that motivate my projects are rarely about features. They are usually about how different architectural decisions influence behavior, interaction, interpretation, and the way people relate to intelligent systems. Instead of treating those questions as purely theoretical, I try to express them as working software that can be explored, criticized, and revised.</p>
                  <p>Across this archive, building functions as a form of inquiry. Each project begins with a question, then evolves through implementation, iteration, and refinement. More often than not, the process of building changes my understanding of the original idea.</p>
                  <p>I don't expect software to provide definitive answers.</p>
                  <p>I build because implementation has a way of revealing assumptions that conversation alone cannot.</p>
                </div>
              </motion.div>
            </Section>
          </>
        )}

        {/* Shared Footer & Buttons */}
        <div className="text-center pb-8 pt-12 relative z-10 pointer-events-auto flex flex-col sm:flex-row justify-center gap-6">
           <button 
             onClick={() => setIsValenPageOpen(true)}
             className="px-8 py-4 border border-[#A59B8C]/40 bg-[#0a0a0a] hover:bg-[#A59B8C]/10 font-mono text-xs tracking-[0.2em] text-[#F4EFE6] uppercase transition-all shadow-xl rounded-sm hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
           >
             About VΛLEN
           </button>
           <button 
             onClick={() => setIsConvergenceOpen(true)}
             className="px-8 py-4 border border-[#A59B8C]/40 bg-[#0a0a0a] hover:bg-[#A59B8C]/10 font-mono text-xs tracking-[0.2em] text-[#F4EFE6] uppercase transition-all shadow-xl rounded-sm hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
           >
             On Convergence
           </button>
        </div>
        <footer className="text-center pb-48 pt-12 relative z-10 border-t border-[#111] max-w-7xl mx-auto px-6 mt-12">
           <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
             <button onClick={() => setIsPrivacyOpen(true)} className="text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[9px] uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded">Privacy</button>
             <button onClick={() => setIsAccessibilityOpen(true)} className="text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[9px] uppercase tracking-[0.2em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] rounded">Accessibility</button>
           </div>
           <div className="font-mono text-[9px] tracking-[0.2em] text-[#A59B8C] uppercase">
             <span className="opacity-50 mt-2 block">Curiosity.escaped = true</span>
           </div>
        </footer>
      </main>
    </div>
    </MotionConfig>
  );
}
