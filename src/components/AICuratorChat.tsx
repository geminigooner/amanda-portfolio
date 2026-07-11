import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ArrowRight, ShieldAlert, Database } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { PROJECTS } from '../data';
import { getVisitorMemory, trackQuestionClick } from '../firebase';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  artifacts?: { title: string; type: string }[];
};


const AnimatedStreamText = ({ text, prefersReducedMotion }: { text: string, prefersReducedMotion: boolean | null }) => {
  const allTokens = React.useMemo(() => text.match(/(\s+|\S+)/g) || [], [text]);
  const [displayedCount, setDisplayedCount] = React.useState(allTokens.length);

  React.useEffect(() => {
    if (displayedCount < allTokens.length) {
      const diff = allTokens.length - displayedCount;
      const catchUpAmount = diff > 10 ? 3 : (diff > 5 ? 2 : 1); 
      
      const timeout = setTimeout(() => {
        setDisplayedCount(prev => Math.min(prev + catchUpAmount, allTokens.length));
      }, 25);
      return () => clearTimeout(timeout);
    }
  }, [allTokens.length, displayedCount]);

  const displayedTokens = allTokens.slice(0, displayedCount);

  return (
    <>
      {displayedTokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return <span key={i}>{token}</span>;
        }
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {token}
          </motion.span>
        );
      })}
    </>
  );
};

export function AICuratorChat({ activeSection = '', onOpenContainmentWing, onOpenConvergence }: { activeSection?: string, onOpenContainmentWing?: () => void, onOpenConvergence?: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useFocusTrap(isOpen);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent('close-index'));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleCloseValen = () => setIsOpen(false);
    window.addEventListener('close-valen', handleCloseValen);
    window.addEventListener('open-index', handleCloseValen);
    return () => {
      window.removeEventListener('close-valen', handleCloseValen);
      window.removeEventListener('open-index', handleCloseValen);
    }
  }, []);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: isStreaming ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const observer = new MutationObserver(() => {
      if (isStreaming) {
         scrollToBottom();
      }
    });
    observer.observe(scrollContainerRef.current, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [isStreaming]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-valen', handleOpen);
    return () => window.removeEventListener('open-valen', handleOpen);
  }, []);

    useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoading && !isStreaming) {
      triggerInitialGreeting();
    }
  }, [isOpen, messages.length]);

  const triggerInitialGreeting = async () => {
    setIsLoading(true);
    try {
      const projectContext = `Visitor is currently observing section: ${activeSection}\n\n` + PROJECTS.map(p => `${p.title} (${p.wing}): ${p.desc} [Tags: ${p.tags.join(', ')}]${(p as any).sourceLink ? ' [Source code available]' : ''}`).join('\n');
      const visitorMemory = await getVisitorMemory();
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          projectContext,
          visitorMemory,
          isInitialGreeting: true
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setIsLoading(false);
      setIsStreaming(true);
      
      const assistantMessageId = Date.now().toString();
      setMessages([{
        id: assistantMessageId,
        role: 'assistant',
        content: ''
      }]);

      let assistantMessageContent = '';
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') break;
                            try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  assistantMessageContent += parsed.error;
                  setMessages(prev => 
                    prev.map(m => m.id === assistantMessageId ? { ...m, content: assistantMessageContent } : m)
                  );
                } else if (parsed.content) {
                  assistantMessageContent += parsed.content;
                  setMessages(prev => 
                    prev.map(m => m.id === assistantMessageId ? { ...m, content: assistantMessageContent } : m)
                  );
                }
              } catch (e) {}
            }
          }
        }
      }
      setIsStreaming(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, directMessage?: string) => {
    e?.preventDefault();
    
    const contentToSend = directMessage || inputValue.trim();
    if (!contentToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: contentToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const projectContext = `Visitor is currently observing section: ${activeSection}\n\n` + PROJECTS.map(p => `${p.title} (${p.wing}): ${p.desc} [Tags: ${p.tags.join(', ')}]${(p as any).sourceLink ? ' [Source code available]' : ''}`).join('\n');
      const visitorMemory = await getVisitorMemory();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          projectContext,
          visitorMemory
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setIsLoading(false);
      setIsStreaming(true);
      
      const assistantMessageId = (Date.now() + 1).toString();
      
      const mockArtifacts: {title: string, type: string}[] = [];
      const lowerContent = contentToSend.toLowerCase();
      if (lowerContent.includes('vestige')) mockArtifacts.push({ title: 'Vestige', type: 'Investigation' });
      if (lowerContent.includes('court')) mockArtifacts.push({ title: 'AI Court', type: 'Observation' });
      if (lowerContent.includes('containment') || lowerContent.includes('chaos') || lowerContent.includes('fail') || lowerContent.includes('weird') || lowerContent.includes('funny')) mockArtifacts.push({ title: 'Containment Wing', type: 'Restricted' });
      if (lowerContent.includes('convergence')) mockArtifacts.push({ title: 'Convergence', type: 'Note' });

      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        artifacts: mockArtifacts.length > 0 ? mockArtifacts : undefined
      }]);

      let assistantMessageContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') break;
                            try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  assistantMessageContent += parsed.error;
                  setMessages(prev => 
                    prev.map(m => m.id === assistantMessageId ? { ...m, content: assistantMessageContent } : m)
                  );
                } else if (parsed.content) {
                  assistantMessageContent += parsed.content;
                  setMessages(prev => 
                    prev.map(m => m.id === assistantMessageId ? { ...m, content: assistantMessageContent } : m)
                  );
                }
              } catch (e) {
                // Ignore incomplete JSON chunks
              }
            }
          }
        }
      }
      setIsStreaming(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsStreaming(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "The archive is not responding cleanly. Please try again in a moment."
      }]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, ease: "easeOut" }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[99999] group cursor-pointer"
          >
             <span className="font-mono text-[9px] tracking-[0.4em] text-[#555] hover:text-[#A59B8C] transition-colors uppercase">
               [VΛLEN]
             </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            ref={modalRef as any}
          tabIndex={-1}
          className="fixed bottom-6 right-6 h-[75vh] min-h-[400px] max-h-[800px] w-[calc(100vw-3rem)] md:w-[420px] flex flex-col border border-[#111] bg-[#050505] z-[99999] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#111]">
               <h2 className="font-mono text-[9px] tracking-[0.4em] text-[#555] uppercase">
                 VΛLEN
               </h2>
               <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#555] hover:text-[#A59B8C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label="Close Chat"
                >
                  <X aria-hidden="true" className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-10 relative z-10 scrollbar-hide" aria-live="polite" aria-relevant="additions text">
              {messages.length === 0 && !isLoading && (
                <div className="flex-1 flex items-end justify-start pb-4 opacity-30">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#555]">Archive available.</span>
                </div>
              )}
              {messages.map((message) => (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={message.id}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'text-[#F4EFE6]'
                      : 'text-[#A59B8C]'
                  }`}>
                    {message.role === 'user' ? (
                      <p className="text-[13px] leading-[1.8] whitespace-pre-wrap font-light tracking-wide">{message.content}</p>
                    ) : (
                      <div className="text-[14px] leading-[1.9] whitespace-pre-wrap font-light tracking-wide">
                        {message.content.split(/(\[ARTIFACT:[^\]]+\])/).map((part, i) => {
                          if (part.startsWith('[ARTIFACT:') && part.endsWith(']')) {
                            const projectName = part.slice(10, -1);
                            
                            if (projectName === 'ContainmentWing') {
                              return (
                                <button
                                  key={i}
                                  onClick={() => onOpenContainmentWing?.()}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 mx-1 border-b border-[#B76E79]/30 hover:border-[#B76E79] text-[#B76E79] font-mono text-[10px] uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
                                >
                                  Access Containment Wing
                                  <ArrowRight aria-hidden="true" className="w-3 h-3" />
                                </button>
                              );
                            }
                            
                            if (projectName === 'Convergence') {
                              return (
                                <button
                                  key={i}
                                  onClick={() => onOpenConvergence?.()}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 mx-1 border-b border-[#A59B8C]/30 hover:border-[#A59B8C] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]"
                                >
                                  Read Convergence Note
                                  <ArrowRight aria-hidden="true" className="w-3 h-3" />
                                </button>
                              );
                            }
                            
                            if (projectName === 'Valen') {
                              return (
                                <button
                                  key={i}
                                  onClick={() => window.dispatchEvent(new CustomEvent('open-valen-page'))}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 mx-1 border-b border-[#0F766E]/30 hover:border-[#0F766E] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
                                >
                                  About VΛLEN
                                  <ArrowRight aria-hidden="true" className="w-3 h-3" />
                                </button>
                              );
                            }

                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  const el = document.getElementById(projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  }
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 mx-1 border-b border-[#A59B8C]/30 hover:border-[#A59B8C] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]"
                              >
                                {projectName}
                                <ArrowRight aria-hidden="true" className="w-3 h-3" />
                              </button>
                            );
                          }
                          return <AnimatedStreamText key={i} text={part} prefersReducedMotion={prefersReducedMotion} />;
                        })}
                        {message.role === 'assistant' && message.id === messages[messages.length - 1]?.id && isStreaming && (
                          <span className="inline-block w-1.5 h-3 ml-2 bg-[#555] motion-safe:animate-pulse align-middle" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start max-w-[85%]"
                >
                  <span className="inline-block w-1.5 h-3 bg-[#333] motion-safe:animate-pulse" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="px-6 py-5 border-t border-[#111]">
              <div className="relative flex items-center">
                <input aria-label="Message Valen"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="..."
                  className="w-full bg-transparent border-none text-[13px] font-light tracking-wide text-[#F4EFE6] placeholder-[#333] focus:outline-none transition-all duration-300"
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

