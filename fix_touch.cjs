const fs = require('fs');

let content = fs.readFileSync('src/components/ProjectDetailModal.tsx', 'utf8');

content = content.replace(
  '  const [isMagnifying, setIsMagnifying] = useState(false);\n  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });',
  `  const [isMagnifying, setIsMagnifying] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };`
);

content = content.replace(
  'const nextImage = (e?: React.MouseEvent) => {',
  'const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {'
);

content = content.replace(
  'const prevImage = (e?: React.MouseEvent) => {',
  'const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {'
);

content = content.replace(
  `                      <div \n                        className="relative aspect-video rounded-sm overflow-hidden border border-[#111] group bg-[#111] flex items-center justify-center cursor-crosshair"\n                        onMouseEnter={() => setIsMagnifying(true)}\n                        onMouseLeave={() => setIsMagnifying(false)}\n                        onMouseMove={handleMouseMove}\n                      >`,
  `                      <div \n                        className="relative aspect-video rounded-sm overflow-hidden border border-[#111] group bg-[#111] flex items-center justify-center cursor-crosshair touch-pan-y"\n                        onMouseEnter={() => setIsMagnifying(true)}\n                        onMouseLeave={() => setIsMagnifying(false)}\n                        onMouseMove={handleMouseMove}\n                        onTouchStart={onTouchStart}\n                        onTouchMove={onTouchMove}\n                        onTouchEnd={onTouchEnd}\n                      >`
);

content = content.replace(
  `                            <button \n                              onClick={prevImage}\n                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100" aria-label="Previous image"\n                            >`,
  `                            <button \n                              onClick={prevImage}\n                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100" aria-label="Previous image"\n                            >`
);

content = content.replace(
  `                            <button \n                              onClick={nextImage}\n                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100" aria-label="Next image"\n                            >`,
  `                            <button \n                              onClick={nextImage}\n                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 backdrop-blur opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-100" aria-label="Next image"\n                            >`
);

fs.writeFileSync('src/components/ProjectDetailModal.tsx', content);
console.log('done');
