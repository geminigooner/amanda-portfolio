const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldBtns = `            <div className="flex flex-col sm:flex-row gap-4 mt-8">
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
            </div>`;

const newBtns = `            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={() => {
                   const chatEl = document.querySelector('.contact-agent-input-area input');
                   if (chatEl) (chatEl as HTMLElement).focus();
                }}
                className="px-8 py-4 bg-[#eaeaea] text-[#030303] hover:bg-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group"
              >
                Ask the Archivist <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>
              
              <button 
                onClick={() => document.getElementById('crown-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#111] border border-[#333] hover:border-[#888] text-[#eaeaea] font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Explore Crown Works
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-6 text-xs font-mono text-[#888] uppercase tracking-wider">
              <button onClick={() => setIsConstellationOpen(true)} className="hover:text-[#06b6d4] transition-colors flex items-center gap-2"><Network className="w-3 h-3" /> Open Research Graph</button>
              <button onClick={() => document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#eaeaea] transition-colors flex items-center gap-2"><BookOpen className="w-3 h-3" /> View Publications</button>
              <button onClick={() => setIsContainmentWingOpen(true)} className="hover:text-[#d946ef] transition-colors flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Enter Restricted Wing</button>
            </div>`;

content = content.replace(oldBtns, newBtns);
fs.writeFileSync('src/App.tsx', content);
