const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(true)} />
        )}
      </AnimatePresence>
      
      <main className="relative z-10">`;

const replacement = `      <AnimatePresence>
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
        {isHiddenRoomOpen && (
          <HiddenRoomModal onClose={() => setIsHiddenRoomOpen(false)} />
        )}
      </AnimatePresence>

      <main className="relative z-10">`;

content = content.replace(target, replacement);

const target2 = `      <AnimatePresence>
        {selectedProject?.id === 'vestige' ? (
        ) : (
        )}
      </AnimatePresence>`;
const replacement2 = `      <AnimatePresence>
        {selectedProject?.id === 'vestige' ? (
          <VestigeExperience key="vestige-exp" onClose={() => setSelectedProject(null)} />
        ) : (
          selectedProject && <ProjectDetailModal key="project-modal" project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>`;

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
}

fs.writeFileSync('src/App.tsx', content);
