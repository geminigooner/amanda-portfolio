import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Square, Volume2 } from 'lucide-react';
import { MUSIC } from '../data';

export function GlobalAudio() {
  const [activeSong, setActiveSong] = useState<typeof MUSIC[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Expose play function to window for the Synthetic Media Lab to use
  useEffect(() => {
    (window as any).playTrack = (songId: string) => {
      const song = MUSIC.find(s => s.id === songId);
      if (!song || !audioRef.current) return;

      if (activeSong?.id === song.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioRef.current.src = song.url;
        audioRef.current.play();
        setActiveSong(song);
        setIsPlaying(true);
      }
    };
  }, [activeSong, isPlaying]);

  return (
    <AnimatePresence>
      {activeSong && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed top-8 right-8 z-[100] w-72 bg-[#0a0a0a] border border-[#222] rounded-sm p-4 font-mono overflow-hidden shadow-2xl"
          style={{
            boxShadow: isPlaying ? `0 0 40px ${activeSong.color}20, inset 0 0 20px ${activeSong.color}10` : 'none'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 size={12} className="text-[#A59B8C]" />
              <span className="text-[9px] tracking-widest text-[#A59B8C] uppercase">
                Facility Audio
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div 
                className="w-1.5 h-1.5 rounded-full motion-safe:animate-pulse" 
                style={{ backgroundColor: activeSong.color }} 
              />
              <span className="text-[9px] tracking-wider" style={{ color: activeSong.color }}>
                {isPlaying ? 'ACTIVE' : 'PAUSED'}
              </span>
            </div>
          </div>

          <div className="mb-1 truncate text-xs font-bold text-[#F4EFE6]">
            {activeSong.title}
          </div>
          <div className="truncate text-[10px] text-[#555] mb-4">
            {activeSong.vibe}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (window as any).playTrack(activeSong.id)}
              className="w-8 h-8 rounded-sm flex items-center justify-center bg-[#111] hover:bg-[#222] transition-colors border border-[#333] hover:border-[#555] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label={isPlaying ? "Pause music" : "Play music"}
              style={{ color: activeSong.color }}
            >
              {isPlaying ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
            </button>
            <div className="flex-1 h-1 bg-[#222] overflow-hidden">
              <motion.div 
                className="h-full"
                style={{ backgroundColor: activeSong.color }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
