import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { MessageSquare, MessageCircle, X, Send, Database, FileText, Share2, Activity, ShieldAlert, Zap, Layers } from 'lucide-react';
import { PROJECTS } from '../data';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  artifacts?: { title: string; type: string }[];
};

type CognitiveState = 'Idle' | 'Listening' | 'Observing' | 'Searching Archive' | 'Connecting Memories' | 'Dreaming' | 'Synthesizing' | 'Constructing Response' | 'Responding' | 'Archive Breach';

import { initVisitor, getVisitorMemory, trackQuestionClick } from '../firebase';

export function AICuratorChat({ activeSection = '' }: { activeSection?: string }) {
  const valenImageUrl = "https://pub-7964386cccf449249ceccc6f3cd70ac4.r2.dev/portfolio/F4FFE20F-69BB-4B99-B4E1-224AB27AF33A.png";

  const SUGGESTIONS = [
    "Explain Vestige",
    "Show me your newest project",
    "How do Amanda's projects connect?",
    "Explain Amanda's design philosophy"
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { scrollY } = useScroll();
  
  // Cognitive States
  const [cogState, setCogState] = useState<CognitiveState>('Idle');

  // React to section changes
  useEffect(() => {
    if (activeSection && activeSection !== 'hero' && !isLoading && !isStreaming) {
      setCogState('Observing');
      
      const timer = setTimeout(() => {
        setCogState('Idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Intentionally kept empty to preserve the hook without hiding the button
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome.\n\nI'm VΛLEN.\n\nCurator of Amanda's archive.\n\nNothing here was built by accident.\n\nTell me what you're curious about."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isLoading) {
      const states: CognitiveState[] = [
        'Searching Archive',
        'Connecting Memories',
        'Dreaming',
        'Synthesizing',
        'Constructing Response'
      ];
      let currentIndex = 0;
      setCogState(states[0]);
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % states.length;
        setCogState(states[currentIndex]);
      }, 2000);
      return () => clearInterval(interval);
    } else if (isStreaming) {
      setCogState('Responding');
    } else {
      // Return to Idle after a short delay
      const t = setTimeout(() => {
        setCogState('Idle');
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [isLoading, isStreaming]);

  // Minimize automatically when inactive for 5 minutes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        if (Date.now() - lastActivity > 300000) {
          setIsOpen(false);
        } else if (!isLoading && !isStreaming && Date.now() - lastActivity > 10000) {
          setCogState('Observing'); // Transition to observing if inactive
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isOpen, lastActivity, isLoading, isStreaming]);

  const handleActivity = () => {
    setLastActivity(Date.now());
    if (cogState === 'Observing' && !isLoading && !isStreaming) {
      setCogState('Listening');
    }
  };

  const getCogStateStyles = () => {
    switch(cogState) {
      case 'Listening': return 'border-teal-400/50 shadow-[0_0_20px_rgba(45,212,191,0.2)] bg-gradient-to-b from-[#0f172a]/95 to-[#050608]/95';
      case 'Searching Archive': return 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-gradient-to-b from-[#172554]/95 to-[#050608]/95';
      case 'Dreaming': return 'border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] bg-gradient-to-b from-[#2e1065]/95 to-[#050608]/95';
      case 'Synthesizing': return 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-gradient-to-b from-[#064e3b]/95 to-[#050608]/95';
      case 'Archive Breach': return 'border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.4)] bg-gradient-to-b from-[#450a0a]/95 to-[#050608]/95';
      default: return 'border-white/10 shadow-2xl bg-gradient-to-b from-[#0a0c10]/95 to-[#050608]/95';
    }
  };

  const handleSubmit = async (e: React.FormEvent, directMessage?: string) => {
    e?.preventDefault();
    handleActivity();
    
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
      const projectContext = `Visitor is currently observing section: ${activeSection}\n\n` + PROJECTS.map(p => `${p.title} (${p.wing}): ${p.desc} [Tags: ${p.tags.join(', ')}]`).join('\n');
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

      await new Promise(r => setTimeout(r, 2000)); // Enforced delay to show cognitive states

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setIsLoading(false);
      setIsStreaming(true);
      
      const assistantMessageId = (Date.now() + 1).toString();
      
      // Determine if artifacts should be attached based on context (simple mock for now based on project mentions)
      const mockArtifacts: {title: string, type: string}[] = [];
      const lowerContent = contentToSend.toLowerCase();
      if (lowerContent.includes('vestige')) mockArtifacts.push({ title: 'Vestige Architecture', type: 'Design Notes' });
      if (lowerContent.includes('court')) mockArtifacts.push({ title: 'AI Court Logs', type: 'Database' });

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
                if (parsed.content) {
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
      setCogState('Archive Breach');
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Archive connection unstable. Memory synchronization failed. Please try again."
      }]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && isButtonVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => {
              setIsOpen(true);
              handleActivity();
            }}
            className="fixed bottom-6 right-6 z-[99999] group cursor-pointer"
          >
            <div className="w-16 h-24 rounded-lg overflow-hidden border border-white/10 bg-[#050002]/90 backdrop-blur-xl shadow-[0_0_20px_rgba(20,184,166,0.15)] group-hover:border-teal-500/40 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-500 flex flex-col relative">
               <div className="absolute -right-2 top-1/4 w-1 h-1/2 bg-purple-500/50 blur-[8px]" />
               <div className="absolute -left-2 top-1/4 w-1 h-1/2 bg-teal-500/50 blur-[8px]" />
               <div className="flex-1 relative overflow-hidden">
                  <img src={valenImageUrl} alt="VΛLEN" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050002] via-transparent to-transparent opacity-90" />
               </div>
               <div className="h-6 flex items-center justify-center bg-[#050002] border-t border-white/5">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-white/60 group-hover:text-teal-400 transition-colors uppercase">
                    VΛLEN
                  </span>
               </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-6 right-6 h-[85vh] min-h-[400px] max-h-[850px] w-[calc(100vw-3rem)] md:w-[420px] flex flex-col backdrop-blur-3xl rounded-3xl border z-[99999] overflow-hidden transition-colors duration-1000 ${getCogStateStyles()}`}
            onMouseMove={handleActivity}
            onKeyDown={handleActivity}
          >
            {/* Living Archive Ambient Background within Window */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
               <motion.div 
                 animate={{
                   y: [0, -10, 0],
                   opacity: [0.3, 0.6, 0.3]
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] bg-gradient-to-br from-white/5 to-transparent rounded-full blur-[100px]"
               />
               <motion.div 
                 animate={{
                   x: [0, 15, 0],
                   opacity: [0.2, 0.5, 0.2]
                 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute -bottom-[20%] -left-[20%] w-[80%] h-[80%] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[120px]"
               />
            </div>

            {/* Header */}
            <div className="flex flex-col items-center justify-center p-6 border-b border-white/5 bg-gradient-to-b from-black/40 to-transparent relative z-10 pt-10">
               <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              
               <div className="relative mb-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-1000 overflow-hidden ${isLoading ? 'border-teal-400/80 shadow-[0_0_20px_rgba(45,212,191,0.6)]' : 'border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.3)]'}`}>
                      {valenImageUrl ? (
                        <img src={valenImageUrl} alt="VΛLEN" className={`w-full h-full object-cover opacity-90 ${isLoading ? 'animate-pulse' : ''}`} />
                      ) : (
                        <Layers className={`w-4 h-4 text-white/80 ${isLoading ? 'animate-spin-slow' : ''}`} />
                      )}
                  </div>
               </div>
               
               <h3 className="font-mono text-sm tracking-[0.2em] text-white/90 uppercase mb-1">VΛLEN</h3>
               <div className="font-mono text-[9px] tracking-widest text-teal-400 uppercase flex items-center gap-1.5 transition-all duration-500">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                  ONLINE
               </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10 scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={message.id}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-5 ${
                    message.role === 'user'
                      ? 'bg-white/5 border border-white/10 text-white/90 backdrop-blur-md'
                      : 'bg-black/20 border border-white/[0.03] text-white/70'
                  }`}>
                    {message.role === 'user' ? (
                      <p className="text-[13px] leading-[1.8] whitespace-pre-wrap font-light tracking-wide">{message.content}</p>
                    ) : (
                      <div className="text-[13px] leading-[1.8] whitespace-pre-wrap font-light tracking-wide">
                        {message.content.split(/(\[ARTIFACT:[^\]]+\])/).map((part, i) => {
                          if (part.startsWith('[ARTIFACT:') && part.endsWith(']')) {
                            const projectName = part.slice(10, -1);
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  const el = document.getElementById(projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                                  if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    // Semantic Camera - Flash the element
                                    el.classList.add('ring-2', 'ring-teal-400', 'ring-offset-4', 'ring-offset-[#050002]', 'animate-pulse');
                                    setTimeout(() => el.classList.remove('ring-2', 'ring-teal-400', 'ring-offset-4', 'ring-offset-[#050002]', 'animate-pulse'), 2000);
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 mx-1 rounded-md bg-white/10 hover:bg-teal-900/30 border border-white/20 hover:border-teal-400/50 text-teal-100 hover:text-teal-300 font-mono text-[10px] uppercase tracking-widest transition-all"
                              >
                                <Database className="w-3 h-3" />
                                {projectName}
                              </button>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                        {message.role === 'assistant' && message.id === messages[messages.length - 1]?.id && isStreaming && (
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-white/70 animate-pulse align-middle" />
                        )}
                      </div>
                    )}
                    
                    {/* Excavated Artifacts */}
                    {message.artifacts && message.artifacts.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase">Recovered Artifacts</span>
                        {message.artifacts.map((art, idx) => (
                           <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                             <FileText className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                             <div>
                               <div className="text-[11px] font-mono text-white/80 uppercase tracking-wider">{art.title}</div>
                               <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{art.type}</div>
                             </div>
                           </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start gap-2 max-w-[85%] mt-2 pl-2"
                >
                  <div className="font-mono text-[9px] tracking-widest text-teal-400/70 uppercase animate-pulse">
                    [{cogState.toUpperCase()}]
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    <span className="w-1 h-1 bg-teal-400/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 bg-teal-400/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 bg-teal-400/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {messages.length === 1 && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 1.5, delay: 1 }}
                  className="flex flex-col gap-2 mt-4"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase pl-1">Suggested Paths</span>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          trackQuestionClick();
                          handleSubmit(e as any, suggestion);
                        }}
                        className="text-[11px] font-light tracking-wide bg-white/[0.03] hover:bg-white/10 text-white/60 hover:text-white border border-white/5 rounded-full px-4 py-2 transition-all duration-500 text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-white/5 bg-black/40 relative z-10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (cogState === 'Idle') setCogState('Listening');
                  }}
                  onFocus={() => {
                    if (cogState === 'Idle') setCogState('Listening');
                  }}
                  onBlur={() => {
                    if (cogState === 'Listening' && !inputValue) setCogState('Idle');
                  }}
                  placeholder="Ask VΛLEN..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-5 pr-12 py-4 text-[13px] font-light tracking-wide text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-3 p-2 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

