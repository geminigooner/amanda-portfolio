import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function InfoModal({ isOpen, onClose, title, children }: InfoModalProps) {
  const modalRef = useFocusTrap(isOpen);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#050002]/80 cursor-pointer pointer-events-auto"
            onClick={onClose}
          />
          <motion.div
            ref={modalRef as any}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#080706] border border-[#222] rounded-sm flex flex-col pointer-events-auto shadow-2xl max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-[#222]">
              <h2 className="font-mono text-xs tracking-widest text-[#A59B8C] uppercase">{title}</h2>
              <button
                onClick={onClose}
                className="text-[#555] hover:text-[#A59B8C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C] p-1"
                aria-label={`Close ${title}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto text-[#D8CFC0] font-light leading-relaxed text-sm md:text-base space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
