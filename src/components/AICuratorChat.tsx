import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ShieldAlert, Database } from 'lucide-react';
import { PROJECTS } from '../data';
import { getVisitorMemory, trackQuestionClick } from '../firebase';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  artifacts?: { title: string; type: string }[];
};

export function AICuratorChat({ activeSection = '', onOpenContainmentWing }: { activeSection?: string, onOpenContainmentWing?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-valen', handleOpen);
    return () => window.removeEventListener('open-valen', handleOpen);
  }, []);

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

      await new Promise(r => setTimeout(r, 1000)); // Slight pause

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
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Silence."
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
            transition={{ duration: 1, ease: "easeOut" }}
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 h-[75vh] min-h-[400px] max-h-[800px] w-[calc(100vw-3rem)] md:w-[420px] flex flex-col border border-[#111] bg-[#050505] z-[99999] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#111]">
               <div className="font-mono text-[9px] tracking-[0.4em] text-[#555] uppercase">
                 VΛLEN
               </div>
               <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#555] hover:text-[#A59B8C] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-10 relative z-10 scrollbar-hide">
              {messages.length === 0 && !isLoading && (
                <div className="flex-1 flex items-end justify-start pb-4 opacity-30">
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#555]">Archive available.</span>
                </div>
              )}
              {messages.map((message) => (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
                                  className="inline-flex items-center gap-2 px-3 py-1.5 mx-1 border-b border-[#B76E79]/30 hover:border-[#B76E79] text-[#B76E79] font-mono text-[10px] uppercase tracking-widest transition-all"
                                >
                                  Access Containment Wing
                                  <ArrowRight className="w-3 h-3" />
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
                                className="inline-flex items-center gap-2 px-3 py-1.5 mx-1 border-b border-[#A59B8C]/30 hover:border-[#A59B8C] text-[#F4EFE6] font-mono text-[10px] uppercase tracking-widest transition-all"
                              >
                                {projectName}
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                        {message.role === 'assistant' && message.id === messages[messages.length - 1]?.id && isStreaming && (
                          <span className="inline-block w-1.5 h-3 ml-2 bg-[#555] animate-pulse align-middle" />
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
                  <span className="inline-block w-1.5 h-3 bg-[#333] animate-pulse" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-6 py-5 border-t border-[#111]">
              <div className="relative flex items-center">
                <input
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

