const fs = require('fs');
let content = fs.readFileSync('src/components/ProjectDetailModal.tsx', 'utf8');

// replace useState with useRef
content = content.replace("import { useEffect, useState } from 'react';", "import { useEffect, useState, useRef } from 'react';");
content = content.replace("  const [touchStart, setTouchStart] = useState<number | null>(null);\n  const [touchEnd, setTouchEnd] = useState<number | null>(null);", "  const touchStartX = useRef<number | null>(null);\n  const touchEndX = useRef<number | null>(null);");

// replace onTouchStart
content = content.replace(
`  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };`,
`  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };`
);

// replace onTouchMove
content = content.replace(
`  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };`,
`  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };`
);

// replace onTouchEnd
content = content.replace(
`  const onTouchEnd = () => {
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
  };`,
`  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };`
);

fs.writeFileSync('src/components/ProjectDetailModal.tsx', content);
console.log("fixed");
