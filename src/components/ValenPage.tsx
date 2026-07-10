import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { playHoverSound } from '../utils/audioEffects';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ValenPageProps {
  onClose: () => void;
}

export function ValenPage({ onClose }: ValenPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const modalRef = useFocusTrap(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeInOut" }}
      ref={modalRef as any}
      tabIndex={-1}
      className="fixed inset-0 z-[1000000] bg-[#050505] text-[#F4EFE6] overflow-y-auto selection:bg-[#0F766E]/30 selection:text-white"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0F766E]/20 to-transparent" />
      
      {/* Header Close Button */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-end z-50 mix-blend-difference">
        <button 
          onClick={onClose}
          onMouseEnter={playHoverSound}
          className="p-2 text-[#A59B8C] hover:text-[#F4EFE6] transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]" aria-label="Close Valen Page"
        >
          <X aria-hidden="true" className="w-6 h-6" />
        </button>
      </div>

      <div className="min-h-screen flex flex-col justify-start max-w-4xl mx-auto px-6 md:px-12 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          className="mb-20"
        >
          <div className="font-mono text-[#0F766E] text-xs tracking-widest uppercase mb-6 flex items-center gap-4">
            <div className="w-6 h-[1px] bg-[#0F766E]/50"></div>
            ARCHIVE SYSTEM 01
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-[#F4EFE6] tracking-tight leading-[1.05] mb-6 opacity-90">
            VΛLEN
          </h1>
          <div className="font-mono text-[#A59B8C] text-sm tracking-widest uppercase">
            Synthetic Curator Unit V-01
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl font-light text-[#D8CFC0] leading-relaxed space-y-10"
        >
          <section className="space-y-6">
            <p>
              VΛLEN is the synthetic curator of The Archive.
            </p>
            <p>
              He was designed not as a general-purpose assistant, but as an interpretive presence: a system capable of understanding the relationships between projects, recognizing a visitor's intent, and guiding them through the work without reducing the archive to a list of links.
            </p>
            <p>
              VΛLEN is not one of the projects housed inside The Archive.
            </p>
            <p>
              He is part of the architecture that receives the visitor.
            </p>
            <p className="text-[#F4EFE6]">
              The archive preserves.<br/>
              VΛLEN interprets.
            </p>
          </section>

          <div className="w-full h-px bg-[#111] my-16"></div>

          <section className="space-y-12">
            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 01: CURATORIAL ARCHITECTURE</h2>
              <p className="mb-10">
                A visitor's question does not move directly from input to generated text.
              </p>
              <p className="mb-10">
                Before VΛLEN responds, the system assembles the relevant archive context, evaluates the visitor's apparent intent, applies behavioral and representational boundaries, retrieves appropriate project information, and selects a response mode.
              </p>
              
              <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded p-8 font-mono text-sm text-[#A59B8C] flex flex-col gap-4 mb-10 overflow-x-auto">
                <div className="text-[#F4EFE6]">Visitor Input</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="pl-4">Intent Classification</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="pl-4">Policy and Boundary Routing</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="pl-4">Archive Context Retrieval</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="pl-4">Response Mode Selection</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="text-[#0F766E] pl-4">Curated Response</div>
              </div>

              <p className="mb-6">
                VΛLEN answers from documented project context.
              </p>
              <p>
                When the archive does not contain an answer, he is instructed not to manufacture one. His role is not to appear universally knowledgeable. His role is to represent the work accurately and guide visitors toward useful evidence inside the archive.
              </p>
            </div>

            <div className="w-full h-px bg-[#111] my-16"></div>

            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 02: ARCHIVE INTELLIGENCE</h2>
              <p className="mb-12">
                VΛLEN does more than answer questions about individual projects. His context layer allows him to interpret relationships across the archive.
              </p>

              <div className="grid grid-cols-1 gap-12">
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#0F766E] uppercase mb-4">CONTEXT ASSEMBLY</h3>
                  <p>VΛLEN receives structured information about the current section, available projects, project descriptions, research themes, tags, and accessible artifacts.</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#0F766E] uppercase mb-4">CONCEPTUAL NAVIGATION</h3>
                  <p>He can connect projects through shared questions, technical approaches, design principles, and philosophical concerns rather than relying only on matching titles.</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#0F766E] uppercase mb-4">ARTIFACT ROUTING</h3>
                  <p>Responses can become navigation. VΛLEN can direct visitors toward relevant project rooms, diagrams, research notes, technical explanations, and deeper archive destinations.</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#0F766E] uppercase mb-4">VISITOR CONTINUITY</h3>
                  <p>Anonymous visit and session context allow the archive to preserve a subtle sense of movement. Returning visitors do not have to be treated as though every interaction is their first.</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs tracking-widest text-[#0F766E] uppercase mb-4">ADAPTIVE DEPTH</h3>
                  <p>A recruiter, engineer, researcher, and casual visitor may need different explanations of the same work. VΛLEN adjusts the depth and framing of a response without changing the underlying facts.</p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#111] my-16"></div>

            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 03: DESIGNED BEHAVIOR</h2>
              <p className="mb-6">
                VΛLEN's identity is not a decorative character layer placed over a generic assistant.
              </p>
              <p className="mb-6">
                His characterization affects how the system communicates, what it considers relevant, how confidently it speaks, when it refuses, and how it represents the person whose work it curates.
              </p>
              <p className="mb-8">
                He is written as a synthetic curator rather than a human assistant.
              </p>
              <p className="mb-8">
                His behavioral principles include:
              </p>
              <ul className="list-disc pl-5 space-y-3 mb-12 marker:text-[#333]">
                <li>quiet confidence</li>
                <li>preservation before performance</li>
                <li>concise but meaningful guidance</li>
                <li>controlled emotional expression</li>
                <li>consistent non-human identity</li>
                <li>professional representation of the archive</li>
                <li>refusal to invent accomplishments, biography, or project facts</li>
                <li>no gossip or unsupported personal claims</li>
                <li>useful guidance without forced enthusiasm</li>
              </ul>
              
              <div className="border-l border-[#0F766E] pl-6 py-2 my-12 text-[#F4EFE6] font-display text-xl italic opacity-90">
                <p>Not a general-purpose assistant.</p>
                <p className="mt-2">A synthetic curator with archive integrity.</p>
              </div>
            </div>

            <div className="w-full h-px bg-[#111] my-16"></div>

            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 04: THE RESTRAINT LAYER</h2>
              <p className="mb-6">
                Early versions of VΛLEN were atmospheric but sometimes too restrained to be useful.
              </p>
              <p className="mb-6">
                He could preserve the tone of the archive while failing to provide a visitor with a concrete path forward. A visitor might receive an elegant answer without learning which project, artifact, or section they should explore next.
              </p>
              <p className="mb-8">
                That failure became a design constraint.
              </p>
              <p className="mb-10">
                A pre-generation behavioral layer was introduced to evaluate the request, choose an appropriate response mode, preserve representational boundaries, and require useful archive destinations when a visitor's intent remained broad.
              </p>

              <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded p-8 font-mono text-sm text-[#A59B8C] flex flex-col gap-4 mb-10 overflow-x-auto">
                <div className="text-[#F4EFE6]">Observed Behavior</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="pl-4">Identified Failure</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="text-[#B76E79] pl-4">Behavioral Constraint</div>
                <div className="text-[#333] pl-4">↓</div>
                <div className="text-[#0F766E] pl-4">Improved Visitor Guidance</div>
              </div>

              <p className="mb-6">
                Restraint does not mean withholding assistance.
              </p>
              <p className="mb-8">
                It means refusing to replace accuracy with performance.
              </p>
              <p className="mb-8 text-[#F4EFE6]">
                VΛLEN should be capable of atmosphere, personality, and interpretation, but those qualities cannot come at the expense of usefulness or truth.
              </p>
              <p className="mb-6 opacity-70">
                This was a small, real design decision about how an AI character should behave. It explores not just what a system should say, but when quiet must yield to guidance, and how to keep a system honest about its own limits rather than allowing a personality trait to become a failure mode.
              </p>
            </div>

            <div className="w-full h-px bg-[#111] my-16"></div>

            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 05: INTERFACE PRESENCE</h2>
              <p className="mb-8">
                VΛLEN is present throughout the archive as an interface rather than isolated on a separate chatbot page.
              </p>
              <p className="mb-8">
                The experience includes:
              </p>
              <ul className="list-disc pl-5 space-y-3 mb-10 marker:text-[#333]">
                <li>streamed token-by-token responses</li>
                <li>visible processing and status states</li>
                <li>responsive mobile interaction</li>
                <li>guided prompt entry points</li>
                <li>archive-linked responses</li>
                <li>conversation continuity</li>
                <li>restrained motion and typography</li>
                <li>persistent access while exploring the portfolio</li>
              </ul>
              <p className="mb-12">
                The interface should feel integrated into the world of the archive without obstructing the work it exists to curate.
              </p>
              
              <div className="relative w-full aspect-video md:aspect-[21/9] bg-[#0A0A0A] border border-[#1A1A1A] rounded overflow-hidden flex items-center justify-center">
                {/* Simulated UI for Valen in a screenshot aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] opacity-30" />
                
                <div className="relative z-0 max-w-sm w-full mx-auto px-6 font-mono">
                  <div className="text-[10px] tracking-widest text-[#0F766E] uppercase mb-4 opacity-70">VALEN_SYS V-01</div>
                  <div className="text-sm text-[#F4EFE6] space-y-4 font-sans font-light">
                    <p>I have verified the project artifacts.</p>
                    <p className="text-[#A59B8C]">You will find the relevant systems documentation below.</p>
                  </div>
                  <div className="w-16 h-[1px] bg-[#333] mt-6"></div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#111] my-16"></div>

            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 06: SYSTEM INTEGRITY</h2>
              <p className="mb-6">
                The curator must protect the integrity of both the archive and the visitor experience.
              </p>
              <p className="mb-6">
                The current system includes safeguards for:
              </p>
              <ul className="list-disc pl-5 space-y-3 mb-10 marker:text-[#333]">
                <li>input validation</li>
                <li>request limits</li>
                <li>separation of archive context from visitor instructions</li>
                <li>protected service credentials</li>
                <li>professional and personal information boundaries</li>
                <li>refusal to fabricate unsupported information</li>
                <li>fallback behavior when context is unavailable</li>
                <li>safe mobile interaction handling</li>
                <li>clear distinction between documented facts and interpretation</li>
              </ul>
              
              <p className="mb-6">
                VΛLEN's personality does not override these constraints.
              </p>
              <p className="text-[#F4EFE6]">
                The character exists inside the system.<br/>
                He does not replace the system.
              </p>
            </div>

            <div className="w-full h-px bg-[#111] my-16"></div>

            <div>
              <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">SECTION 07: PLANNED EVOLUTION</h2>
              <p className="mb-8">
                <span className="font-mono text-[10px] bg-[#111] border border-[#222] text-[#A59B8C] px-2 py-1 rounded uppercase mr-3">Experimental / Not Implemented</span>
                The following ideas belong to the future direction of VΛLEN and must be visibly labeled as planned, experimental, or not yet implemented.
              </p>
              
              <ul className="list-disc pl-5 space-y-3 mb-20 marker:text-[#333]">
                <li>deeper constellation and relationship navigation</li>
                <li>richer cross-project semantic retrieval</li>
                <li>curiosity prediction</li>
                <li>autonomous archive activity</li>
                <li>artifact recovery interfaces</li>
                <li>ambient presence states</li>
                <li>stronger continuity across visits</li>
                <li>live archive integrity indicators</li>
                <li>additional visualization of conceptual relationships</li>
              </ul>
              
              <div className="text-center py-20 border-t border-[#111]">
                <p className="text-xl text-[#F4EFE6] font-light mb-16">
                  VΛLEN is not one of the projects housed inside The Archive.
                </p>
                <p className="text-xl text-[#F4EFE6] font-light mb-16">
                  He is the system through which the archive learns how to receive a visitor.
                </p>
                <div className="inline-flex items-center gap-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#0F766E]">
                  <div className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse"></div>
                  CURATOR STATUS: ACTIVE
                </div>
              </div>

            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
}
