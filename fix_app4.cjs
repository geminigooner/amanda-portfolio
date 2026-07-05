const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      <AnimatePresence>
        {isContainmentWingOpen && (
          <ContainmentWing onClose={() => setIsContainmentWingOpen(true)} />
        )}
      </AnimatePresence>`;

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
      </AnimatePresence>`;

content = content.replace(target, replacement);
fs.writeFileSync('src/App.tsx', content);
