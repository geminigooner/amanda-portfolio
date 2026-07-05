const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace empty map bodies with ProjectCard
content = content.replace(/\{flagship\.map\(\(project, index\) => \(\s*\)\)\}/g, 
  `{flagship.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}`);

content = content.replace(/\{experimental\.map\(\(project, index\) => \(\s*\)\)\}/g, 
  `{experimental.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}`);

content = content.replace(/\{practical\.map\(\(project, index\) => \(\s*\)\)\}/g, 
  `{practical.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}`);

content = content.replace(/\{fieldNotes\.map\(\(project, index\) => \(\s*\)\)\}/g, 
  `{fieldNotes.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}`);

content = content.replace(/\{researchNotebook\.map\(\(project, index\) => \(\s*\)\)\}/g, 
  `{researchNotebook.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onClick={() => setSelectedProject(project)} />
              ))}`);

// Replace the top-level app children
const appTarget = `    <div className="min-h-screen bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white overflow-x-hidden font-sans">
            <AnimatePresence>
        {selectedProject?.id === 'vestige' ? (
        ) : (
        )}
      </AnimatePresence>`;

const appReplacement = `    <div className="min-h-screen bg-[#050505] text-[#F4EFE6] selection:bg-[#B76E79]/30 selection:text-white overflow-x-hidden font-sans">
      <GlobalAudio />
      <ArchiveBackground />
      <FloatingPill />
      <AICuratorChat activeSection={activeSection} onOpenContainmentWing={() => setIsContainmentWingOpen(true)} onOpenConvergence={() => setIsConvergenceOpen(true)} />
      <ProgressIndicator />
      <HollowMeridianEvent isActive={isHollowEventActive} onClose={() => setIsHollowEventActive(false)} />
      
      <AnimatePresence>
        {selectedProject?.id === 'vestige' ? (
          <VestigeExperience key="vestige-exp" onClose={() => setSelectedProject(null)} />
        ) : (
          selectedProject && <ProjectDetailModal key="project-modal" project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>`;

content = content.replace(appTarget, appReplacement);

// Fix the missing self-closing components
const containmentTarget = `      <AnimatePresence>
        {isContainmentWingOpen && (
        )}
      </AnimatePresence>`;

const containmentReplacement = `      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(true)} />
        )}
      </AnimatePresence>`;

content = content.replace(containmentTarget, containmentReplacement);

fs.writeFileSync('src/App.tsx', content);
