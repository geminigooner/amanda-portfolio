const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `<div className="min-h-screen bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white overflow-x-hidden font-sans">
      
      <AnimatePresence>`;

const replacement = `<div className="min-h-screen bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white overflow-x-hidden font-sans">
      <Cursor />
      <GlobalAudio />
      <ArchiveBackground />
      <FloatingPill />
      <AICuratorChat activeSection={activeSection} />
      <ProgressIndicator />
      <HollowMeridianEvent isActive={isHollowEventActive} onClose={() => setIsHollowEventActive(false)} />
      
      <AnimatePresence>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/App.tsx', content);
