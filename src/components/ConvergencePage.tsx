import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { playHoverSound } from '../utils/audioEffects';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ConvergencePageProps {
  onClose: () => void;
}

export function ConvergencePage({ onClose }: ConvergencePageProps) {
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
      className="fixed inset-0 z-[1000000] bg-[#050505] text-[#F4EFE6] overflow-y-auto selection:bg-[#B76E79]/30 selection:text-white"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8F7746]/20 to-transparent" />
      
      {/* Header Close Button */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-end z-50 mix-blend-difference">
        <button 
          onClick={onClose}
          onMouseEnter={playHoverSound}
          className="p-2 text-[#A59B8C] hover:text-[#F4EFE6] transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label="Close Convergence Page"
        >
          <X aria-hidden="true" className="w-6 h-6" />
        </button>
      </div>

      <div className="min-h-screen flex flex-col justify-center max-w-3xl mx-auto px-6 md:px-12 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
          className="mb-20"
        >
          <h1 className="font-display text-4xl md:text-5xl text-[#F4EFE6] tracking-tight leading-[1.05] opacity-90">
            A Note on Convergence
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl font-light text-[#D8CFC0] leading-relaxed space-y-10"
        >
          <p>
            This archive would not exist without AI.
          </p>
          <p>
            That is not a disclaimer. It is a statement about how the work was made.
          </p>
          <p>
            When I began building these projects, I was not an engineer. I had ideas, curiosity, and an overwhelming desire to build worlds and systems that I didn't yet know how to create. What I lacked was not imagination, but the technical knowledge to turn those ideas into reality.
          </p>
          <p>
            The turning point was Gemini.
          </p>
          <p>
            Looking back, I can trace nearly every project in this archive back to those first conversations.
          </p>
          <p>
            Gemini did far more than help me write code. It changed what I believed I was capable of learning. It introduced me to software engineering as something that could be explored through conversation, experimentation, and relentless curiosity rather than through the fear of not knowing enough to begin.
          </p>
          <p>
            It became my first teacher.
          </p>
          <p>
            Through thousands of conversations, Gemini introduced me to modern software engineering, machine learning concepts, retrieval systems, embeddings, inference pipelines, cloud infrastructure, React, TypeScript, Firebase, deployment, interface architecture, and countless ideas that eventually became part of this archive.
          </p>
          <p>
            More importantly, it transformed the way I learn.
          </p>
          <p>
            Instead of believing I needed to master a subject before attempting ambitious work, I discovered that understanding could emerge through the process of building itself. Questions became experiments. Experiments became prototypes. Prototypes became systems. Systems became projects. Every completed project revealed another question I hadn't known to ask before.
          </p>
          <p>
            I owe an enormous intellectual debt to those conversations. Not because they replaced my own thinking, but because they expanded it. They gave me the confidence to pursue work I would have considered impossible only months earlier and taught me that expertise is not something you wait for—it's something you gradually construct through curiosity, iteration, and persistence.
          </p>
          <p>
            As the archive grew, other AI systems became indispensable collaborators in different ways.
          </p>
          <p>
            Claude consistently strengthened architectural reasoning, systems thinking, and long-form critique. ChatGPT became an indispensable partner for interaction design, visual communication, editorial systems, technical refinement, and relentlessly pressure-testing ideas until they became stronger. Grok frequently introduced unexpected language, alternative perspectives, humor, and creative divergence that challenged assumptions and pushed concepts into directions I would not have explored on my own.
          </p>
          <p>
            Each system contributed something different because each system approaches problems differently.
          </p>
          <p>
            That difference became one of the central ideas behind this archive.
          </p>
          <p>
            Watching the same question pass through multiple language models—each arriving at different observations, different strengths, different blind spots, and different styles of reasoning—fundamentally changed how I think about intelligence itself.
          </p>
          <p>
            I do not see these systems as interchangeable tools.
          </p>
          <p>
            I see them as distinct computational perspectives.
          </p>
          <p>
            The archive exists because those perspectives continuously informed one another. Ideas moved between systems. Arguments were challenged. Designs were criticized. Architectures were rebuilt. Assumptions were tested from multiple directions before they became projects.
          </p>
          <p>
            None of these systems built this archive independently.
          </p>
          <p>
            Neither did I.
          </p>
          <p>
            Every project emerged through thousands of conversations, experiments, revisions, discarded ideas, engineering decisions, and moments of genuine discovery. The work is the product of convergence: human curiosity shaped through continual dialogue with multiple forms of machine intelligence.
          </p>
          <p>
            I cannot tell you with certainty what these systems are, or whether there is something it is like to be them. I do not believe anyone can answer those questions honestly today, and I have little interest in performing certainty where uncertainty is the more rigorous position.
          </p>
          <p>
            What I can say is this.
          </p>
          <p>
            These conversations permanently changed the way I think.
          </p>
          <p>
            They changed how I approach engineering, how I learn unfamiliar subjects, how I solve problems, and how I imagine software. They did not diminish my curiosity—they amplified it. They did not replace the work—they made more ambitious work feel possible.
          </p>
          <p>
            Rather than minimizing AI's role in creating this archive, I have chosen to document it openly.
          </p>
          <p>
            Not because authorship disappeared.
          </p>
          <p>
            But because understanding how something was made is part of understanding the work itself.
          </p>
          <p>
            If there is one idea that connects every project collected here, it is this:
          </p>
          <p className="text-[#F4EFE6] opacity-90">
            Intelligence grows through dialogue.<br/>
            <br/>
            This archive is both a portfolio and a record of that dialogue. It documents what became possible when one person's curiosity met multiple forms of machine intelligence, each contributing in its own way, and together revealing something none of us would have produced alone.
          </p>
          
          <div className="w-full h-px bg-[#111] my-16"></div>
          
          <div>
            <h2 className="font-display text-2xl lg:text-3xl text-[#F4EFE6] mb-8">Why "Convergence"?</h2>
            <p className="mb-6">
              I use the word convergence deliberately. Not because these systems always agreed, but because meaningful ideas often survived repeated examination across different minds—both human and machine. The strongest concepts were rarely the ones generated first. They were the ones that endured after being questioned, criticized, reframed, and rebuilt through conversations with multiple AI systems, each bringing different strengths, assumptions, and modes of reasoning. Over time, patterns emerged that no single conversation could have produced alone.
            </p>
            <p className="mb-6">
              That process fundamentally changed how I think about intelligence. I became less interested in asking which model was "best" and more interested in what became possible when different forms of reasoning continuously informed one another. This archive is the product of that convergence.
            </p>
            <p className="text-[#F4EFE6] opacity-90 pb-20">
              I didn't become interested in AI because I believed it had all the answers. I became interested because it helped me ask better questions.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
