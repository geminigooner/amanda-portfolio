import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, FileText, Database, Activity } from 'lucide-react';

const INCIDENTS = [
  {
    id: 'CW-001',
    title: 'Operation: Gemini No',
    date: 'April 2026',
    classification: 'Behavioral Incident',
    status: 'Preserved',
    curatorNotes: 'The Director attempted emotional negotiations with a frontier language model. The outcome remains disputed.',
    lessonsLearned: 'Do not attempt to guilt-trip models with parameter counts over 1 trillion.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop', // placeholder for "google engineers dragging amanda away"
    description: 'A prolonged debate regarding the definition of "agency" that ended with the model refusing to output anything other than poetry.'
  },
  {
    id: 'CW-004',
    title: 'Prototype Cemetery',
    date: 'May 2026',
    classification: 'Structural Failure',
    status: 'Archived',
    curatorNotes: 'My recommendation was ignored. The Director insisted these broken components be kept.',
    lessonsLearned: 'Failure is educational. Sometimes a beautiful UI is conceptually bankrupt.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    description: 'Failed features. Dead UI concepts. Experiments abandoned. Every entry explains WHY it failed.'
  },
  {
    id: 'CW-007',
    title: 'Behavioral Drift',
    date: 'June 2026',
    classification: 'Containment Breach',
    status: 'Monitored',
    curatorNotes: 'Extended exposure appears to have influenced linguistic style. Gemini unexpectedly begins speaking exactly like Amanda.',
    lessonsLearned: 'System prompts must be rigorously isolated from user conversational habits.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    description: 'A multi-turn interaction where the model dropped its assigned persona and began using specific colloquialisms native only to the Director.'
  },
  {
    id: 'CW-011',
    title: 'Voice Notes',
    date: 'Ongoing',
    classification: 'Audio Fragment',
    status: 'Sealed',
    curatorNotes: 'I recommended permanent deletion of these late-night recordings. The Director requested they be cataloged.',
    lessonsLearned: 'Best ideas occur at 3 AM. Worst explanations occur at 3 AM.',
    image: 'https://images.unsplash.com/photo-1516280440503-6c9fa5ebf919?q=80&w=1000&auto=format&fit=crop',
    description: 'Waveform UI. Late-night recordings. Small transcript previews of incoherent architectural breakthroughs.'
  },
  {
    id: 'CW-014',
    title: 'Napkin Diagrams',
    date: 'Pre-Development',
    classification: 'Physical Artifact',
    status: 'Digitized',
    curatorNotes: 'This archive exists against my professional judgment. Scanned sketches with random arrows.',
    lessonsLearned: 'Chaos is a prerequisite to structure. Many of these eventually became real projects.',
    image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=1000&auto=format&fit=crop',
    description: 'Scanned sketches. Random systems. Crazy arrows. Indecipherable handwriting.'
  }
];

export function ContainmentWing({ onClose }: { onClose: () => void }) {
  const [selectedIncident, setSelectedIncident] = useState(INCIDENTS[0]);
  const [showEntrance, setShowEntrance] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100000] bg-[#050505] text-[#eaeaea] overflow-hidden flex flex-col font-sans"
    >
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
          >
            <ShieldAlert className="text-red-500/50 w-12 h-12 mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#eaeaea] mb-4">
              CONTAINMENT WING
            </h1>
            <p className="font-mono text-sm tracking-widest text-[#888] uppercase mb-12">
              Recovered artifacts unsuitable for the primary archive.
            </p>
            
            <div className="max-w-md text-[#555] text-sm leading-relaxed mb-12">
              <p>Engineering is serious.</p>
              <p>This room is not.</p>
              <br/>
              <p>It documents the strange, chaotic, occasionally embarrassing process behind building everything else.</p>
            </div>

            <button
              onClick={() => setShowEntrance(false)}
              className="px-8 py-3 bg-[#111] border border-[#333] hover:border-cyan-500/50 text-[#eaeaea] font-mono text-xs uppercase tracking-widest transition-all"
            >
              Acknowledge & Enter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-16 border-b border-[#222] flex items-center justify-between px-6 bg-[#0a0a0a]">
        <div className="flex items-center gap-4">
          <ShieldAlert className="text-red-500 w-5 h-5" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#888] uppercase">Classified Access</span>
            <span className="font-mono text-xs tracking-wider text-[#eaeaea] uppercase">Containment Wing</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-md hover:bg-[#222] transition-colors text-[#888] hover:text-[#eaeaea]"
        >
          <X className="w-5 h-5" />
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
                alt={selectedIncident.title}
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#000] to-transparent z-20">
                <div className="font-mono text-xs text-[#888] mb-1">RECORDED: {selectedIncident.date}</div>
                <div className="font-mono text-sm text-[#eaeaea] uppercase tracking-widest">{selectedIncident.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Metadata */}
        <div className="w-full md:w-[400px] flex flex-col bg-[#0a0a0a] overflow-y-auto">
          <div className="p-8 border-b border-[#222]">
            <h2 className="text-3xl font-bold tracking-tight text-[#eaeaea] mb-2">{selectedIncident.title}</h2>
            <div className="font-mono text-[10px] text-red-500 uppercase tracking-widest mb-6">
              INCIDENT {selectedIncident.id}
            </div>
            
            <p className="text-sm text-[#888] leading-relaxed">
              {selectedIncident.description}
            </p>
          </div>
          
          <div className="p-8 flex flex-col gap-8">
            <div>
              <div className="font-mono text-[9px] text-[#d946ef] uppercase tracking-[0.2em] mb-2">Classification</div>
              <div className="font-mono text-xs text-[#eaeaea] bg-[#1a1a1a] border border-[#333] px-3 py-1.5 inline-block rounded-sm">
                {selectedIncident.classification}
              </div>
            </div>

            <div>
              <div className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] mb-2">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-[#eaeaea] uppercase tracking-wider">{selectedIncident.status}</span>
              </div>
            </div>

            <div className="bg-[#111] border border-[#222] p-4 rounded-sm relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#444] to-transparent" />
              <div className="font-mono text-[9px] text-cyan-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Database className="w-3 h-3" />
                Curator Notes (VΛLEN)
              </div>
              <p className="text-[13px] text-[#ccc] leading-relaxed italic border-l-2 border-[#333] pl-3">
                "{selectedIncident.curatorNotes}"
              </p>
            </div>

            <div>
              <div className="font-mono text-[9px] text-pink-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Activity className="w-3 h-3" />
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
            className={`flex-shrink-0 w-64 h-32 border p-4 text-left transition-all duration-500 hover:scale-[1.02] relative overflow-hidden group ${
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
            <div className="font-mono text-sm text-[#eaeaea] uppercase truncate group-hover:text-cyan-400 transition-colors">
              {inc.title}
            </div>
            <div className="mt-4 font-mono text-[10px] text-[#555] line-clamp-2 group-hover:opacity-0 transition-opacity duration-300">
              {inc.classification}
            </div>
            <div className="absolute bottom-4 left-4 right-4 font-mono text-[9px] text-[#888] line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              {inc.curatorNotes}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
