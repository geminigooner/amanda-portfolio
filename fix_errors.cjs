const fs = require('fs');

// Fix App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  '<HiddenRoomModal onClose={() => setIsHiddenRoomOpen(false)} />',
  '<HiddenRoomModal isOpen={isHiddenRoomOpen} onClose={() => setIsHiddenRoomOpen(false)} />'
);
fs.writeFileSync('src/App.tsx', appContent);

// Fix FloatingPill.tsx
let pillContent = fs.readFileSync('src/components/FloatingPill.tsx', 'utf8');
const effectToMove = `  useEffect(() => {
    if (isExpanded) {
      window.dispatchEvent(new CustomEvent('close-valen'));
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleCloseIndex = () => setIsExpanded(false);
    window.addEventListener('close-index', handleCloseIndex);
    return () => window.removeEventListener('close-index', handleCloseIndex);
  }, []);`;

pillContent = pillContent.replace(effectToMove, '');
const hookTarget = `  const [isVisible, setIsVisible] = useState(true);`;
const hookReplacement = `  const [isVisible, setIsVisible] = useState(true);

${effectToMove}`;
pillContent = pillContent.replace(hookTarget, hookReplacement);

fs.writeFileSync('src/components/FloatingPill.tsx', pillContent);
