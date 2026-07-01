const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the Hollow Meridian map and add a dedicated section
const oldFilter = "const crownWorks = PROJECTS.filter(p => p.wing === 'CROWN WORKS');";
const newFilter = "const crownWorks = PROJECTS.filter(p => p.wing === 'CROWN WORKS' && p.id !== 'hollowmeridian');\n  const hollowMeridianProject = PROJECTS.find(p => p.id === 'hollowmeridian');";

content = content.replace(oldFilter, newFilter);

const hmSection = `
        {/* HOLLOW MERIDIAN */}
        {hollowMeridianProject && (
          <section id="hollow-meridian" className="py-20 md:py-32 relative border-y border-[#222] bg-[#050505]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1">
                 <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#d946ef] uppercase mb-6 flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#d946ef] animate-pulse" />
                   NARRATIVE UNIVERSE // HM-01
                 </div>
                 <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight text-[#eaeaea] mb-6">Hollow Meridian</h2>
                 <p className="text-[#888] font-light leading-relaxed mb-8 max-w-xl">
                   Appalachian futurism. A synthetic civilization exploring continuity, grief, and identity. Identity is not a fixed object; it is the pattern that refuses to disappear under pressure.
                 </p>
                 <button 
                   onClick={() => setIsHollowEventActive(true)}
                   className="px-6 py-3 border border-[#333] hover:border-[#d946ef] text-[#eaeaea] hover:text-[#f0abfc] font-mono text-[10px] uppercase tracking-widest transition-all"
                 >
                   Access Hollow Meridian
                 </button>
               </div>
            </div>
          </section>
        )}

        {/* PUBLICATIONS */}`;

content = content.replace('{/* PUBLICATIONS */}', hmSection);

// Update nav menu items
fs.writeFileSync('src/App.tsx', content);

let navContent = fs.readFileSync('src/components/NavigationMenu.tsx', 'utf8');
navContent = navContent.replace(
  "{ id: 'crown-works', label: 'Crown Works' },",
  "{ id: 'crown-works', label: 'Crown Works' },\n  { id: 'hollow-meridian', label: 'Hollow Meridian' },"
);
fs.writeFileSync('src/components/NavigationMenu.tsx', navContent);

