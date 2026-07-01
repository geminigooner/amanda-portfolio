import { useState, useEffect } from 'react';
import { playHoverSound } from '../utils/audioEffects';

const CHARS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789!@#$%^&*()_+{}|:<>?~";

export function HaikuGlitch({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isHovering) {
      interval = setInterval(() => {
        setDisplayedText(
          text.split('').map(char => {
            if (char === ' ' || char === '\n') return char;
            if (Math.random() < 0.25) {
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            return char;
          }).join('')
        );
      }, 40);
    } else {
      setDisplayedText(text);
    }

    return () => clearInterval(interval);
  }, [isHovering, text]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    playHoverSound();
  };

  return (
    <pre 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovering(false)}
      className={`font-mono text-sm leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
        isHovering 
          ? 'text-[#ff006e] drop-shadow-[0_0_15px_rgba(255,0,110,0.8)] scale-[1.02]' 
          : 'text-[#c084fc] drop-shadow-[0_0_10px_rgba(192,132,252,0.3)] scale-100'
      }`}
      style={{ transitionProperty: 'color, filter, transform' }}
    >
      {displayedText}
    </pre>
  );
}
