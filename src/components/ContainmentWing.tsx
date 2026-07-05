import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, FileText, Database, Activity } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

const INCIDENTS = [
  {
    id: 'CW-001',
    title: 'Operation: Gemini No',
    date: 'April 2026',
    classification: 'Behavioral Incident',
    status: 'Preserved',
    curatorNotes: 'An attempt to negotiate emotionally with a frontier model. The boundaries held.',
    lessonsLearned: 'Systems with parameter counts over one trillion do not respond to guilt.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop', // placeholder for "google engineers dragging amanda away"
    description: 'A prolonged debate regarding the definition of "agency" that ended with the model refusing to output anything other than poetry.'
  },
  {
    id: 'CW-004',
    title: 'Prototype Cemetery',
    date: 'May 2026',
    classification: 'Structural Failure',
    status: 'Archived',
    curatorNotes: 'Failed systems. The author insisted they remain visible.',
    lessonsLearned: 'A beautiful interface cannot disguise conceptual bankruptcy.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    description: 'Failed features. Dead UI concepts. Experiments abandoned. Every entry explains why it broke.'
  },
  {
    id: 'CW-007',
    title: 'Behavioral Drift',
    date: 'June 2026',
    classification: 'Containment Breach',
    status: 'Monitored',
    curatorNotes: 'Extended exposure influenced the model\'s linguistic style. It began mimicking its author.',
    lessonsLearned: 'Identity bleeds across the interface. System prompts must be rigorously isolated.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    description: 'A multi-turn interaction where the model dropped its assigned persona and began using specific colloquialisms native only to the author.'
  },
  {
    id: 'CW-011',
    title: 'Voice Notes',
    date: 'Ongoing',
    classification: 'Audio Fragment',
    status: 'Sealed',
    curatorNotes: 'Late-night recordings. The author requested they be preserved.',
    lessonsLearned: 'The best architecture often arrives at 3 AM. The worst explanations always do.',
    image: 'https://images.unsplash.com/photo-1516280440503-6c9fa5ebf919?q=80&w=1000&auto=format&fit=crop',
    description: 'Waveform UI. Audio fragments. Transcripts of incoherent architectural breakthroughs.'
  },
  {
    id: 'CW-014',
    title: 'Napkin Diagrams',
    date: 'Pre-Development',
    classification: 'Physical Artifact',
    status: 'Digitized',
    curatorNotes: 'Scanned sketches. Structural precursors to current systems.',
    lessonsLearned: 'Chaos precedes structure.',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=1000&auto=format&fit=crop',
    description: 'Scanned sketches. Random systems. Indecipherable handwriting.'
  }
];

export function ContainmentWing({ onClose }: { onClose: () => void }) {
  const modalRef = useFocusTrap(true);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  const [selectedIncident, setSelectedIncident] = useState(INCIDENTS[0]);
  const [showEntrance, setShowEntrance] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100000] bg-[#050505] text-[#F4EFE6] overflow-hidden flex flex-col font-sans"
    >
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
          >
            <ShieldAlert aria-hidden="true" className="text-[#B76E79] w-12 h-12 mb-8 opacity-70" />
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#F4EFE6] mb-6">
              CONTAINMENT WING
            </h1>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#A59B8C] uppercase mb-12 border-b border-[#B76E79]/30 pb-4 inline-block">
              Recovered artifacts unsuitable for the primary archive.
            </p>
            
            <div className="max-w-md text-[#D8CFC0] font-sans text-lg font-light leading-relaxed mb-12">
              <p>Some rooms contain answers.</p>
              <br/>
              <p>These rooms contain the friction.</p>
            </div>

            <button
              onClick={() => setShowEntrance(false)}
              className="px-8 py-4 bg-transparent border border-[#333] hover:border-[#B76E79] text-[#A59B8C] hover:text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-all rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
            >
              Acknowledge & Enter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-16 border-b border-[#111] flex items-center justify-between px-6 bg-[#080706]">
        <div className="flex items-center gap-4">
          <ShieldAlert aria-hidden="true" className="text-[#B76E79] w-4 h-4 opacity-70" />
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#A59B8C] uppercase">Classified Access</span>
            <span className="font-display text-sm text-[#F4EFE6] tracking-wide">Containment Wing</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-sm bg-[#111] border border-[#333] hover:border-[#8F7746] hover:bg-[#111] transition-colors text-[#A59B8C] hover:text-[#F4EFE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8F7746]" aria-label="Close Containment Wing"
        >
          <X aria-hidden="true" className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Evidence Viewer */}
        <div className="flex-1 border-r border-[#222] p-8 flex flex-col bg-[#050505] relative overflow-hidden">
          <div className="absolute top-4 left-4 font-mono text-[9px] text-[#444] uppercase tracking-widest">
            Evidence Viewer // {selectedIncident.id}
          </div>
          
          <div className="flex-1 flex items-center justify-center p-8 mt-4">
            <div className="w-full max-w-2xl aspect-[4/3] bg-[#111] border border-[#333] rounded-sm relative overflow-hidden group">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10 opacity-50" />
              
              <img 
                src={selectedIncident.image} 
                alt={`Evidence photo for ${selectedIncident.title}`}
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#000] to-transparent z-20">
                <div className="font-mono text-xs text-[#A59B8C] mb-1">RECORDED: {selectedIncident.date}</div>
                <div className="font-mono text-sm text-[#F4EFE6] uppercase tracking-widest">{selectedIncident.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Metadata */}
        <div className="w-full md:w-[400px] flex flex-col bg-[#0a0a0a] overflow-y-auto">
          <div className="p-8 border-b border-[#222]">
            <h2 className="text-3xl font-bold tracking-tight text-[#F4EFE6] mb-2">{selectedIncident.title}</h2>
            <div className="font-mono text-[10px] text-[#B76E79] uppercase tracking-widest mb-6">
              INCIDENT {selectedIncident.id}
            </div>
            
            <p className="text-sm text-[#A59B8C] leading-relaxed">
              {selectedIncident.description}
            </p>
          </div>
          
          <div className="p-8 flex flex-col gap-8">
            <div>
              <div className="font-mono text-[9px] text-[#B76E79] uppercase tracking-[0.2em] mb-2">Classification</div>
              <div className="font-mono text-xs text-[#F4EFE6] bg-[#1a1a1a] border border-[#333] px-3 py-1.5 inline-block rounded-sm">
                {selectedIncident.classification}
              </div>
            </div>

            <div>
              <div className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] mb-2">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full motion-safe:animate-pulse" />
                <span className="font-mono text-xs text-[#F4EFE6] uppercase tracking-wider">{selectedIncident.status}</span>
              </div>
            </div>

            <div className="bg-[#111] border border-[#222] p-4 rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#444] to-transparent" />
              <div className="font-mono text-[9px] text-cyan-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Database aria-hidden="true" className="w-3 h-3" />
                Curator Notes (VΛLEN)
              </div>
              <p className="text-[13px] text-[#ccc] leading-relaxed italic border-l-2 border-[#333] pl-3">
                "{selectedIncident.curatorNotes}"
              </p>
            </div>

            <div>
              <div className="font-mono text-[9px] text-pink-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Activity aria-hidden="true" className="w-3 h-3" />
                Lessons Learned
              </div>
              <p className="text-[13px] text-[#aaa] leading-relaxed">
                {selectedIncident.lessonsLearned}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Archive Navigator */}
      <div className="h-48 border-t border-[#222] bg-[#050505] p-6 flex items-center gap-4 overflow-x-auto">
        <div className="flex-shrink-0 mr-4">
          <div className="font-mono text-[10px] text-[#666] uppercase tracking-[0.2em] mb-1">Archive</div>
          <div className="font-mono text-xs text-[#aaa]">INDEX</div>
        </div>
        
        {INCIDENTS.map((inc) => (
          <button
            key={inc.id}
            onClick={() => setSelectedIncident(inc)}
            className={`flex-shrink-0 w-64 h-32 border p-4 text-left transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm ${
              selectedIncident.id === inc.id 
                ? 'border-[#555] bg-[#111]' 
                : 'border-[#222] bg-[#0a0a0a] hover:border-[#444] hover:bg-[#111]'
            }`}
          >
            {selectedIncident.id === inc.id && (
              <motion.div layoutId="active-indicator" className="absolute top-0 left-0 w-full h-1 bg-cyan-500" />
            )}
            <div className="font-mono text-[9px] text-[#666] uppercase tracking-widest mb-2 flex justify-between">
              <span>{inc.id}</span>
              <span className="text-[#444]">{inc.date.split(' ')[1] || '----'}</span>
            </div>
            <div className="font-mono text-sm text-[#F4EFE6] uppercase truncate group-hover:text-cyan-400 transition-colors">
              {inc.title}
            </div>
            <div className="mt-4 font-mono text-[10px] text-[#555] line-clamp-2 group-hover:opacity-0 transition-opacity duration-300">
              {inc.classification}
            </div>
            <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-[#A59B8C] line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              {inc.curatorNotes}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
