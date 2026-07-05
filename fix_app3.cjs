const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      <ConstellationGraph 
        isOpen={isConstellationOpen} 
        onClose={() => setIsConstellationOpen(false)} 
        onSelectProject={(p) => setSelectedProject(p)} 
        
      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(true)} />
        )}
      </AnimatePresence>`;

const replacement = `      <ConstellationGraph 
        isOpen={isConstellationOpen} 
        onClose={() => setIsConstellationOpen(false)} 
        onSelectProject={(p) => setSelectedProject(p)} 
      />
        
      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(false)} />
        )}
      </AnimatePresence>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
