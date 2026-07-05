import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3-force';
import { PROJECTS, Project } from '../data';
import { X, Network } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ConstellationGraphProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  project: Project;
  radius: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  sharedTags: string[];
}

export function ConstellationGraph({ isOpen, onClose, onSelectProject }: ConstellationGraphProps) {
  const modalRef = useFocusTrap(isOpen);
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const newNodes: Node[] = PROJECTS.map(p => ({
      id: p.id,
      project: p,
      radius: p.wing === 'FLAGSHIP INVESTIGATIONS' ? 6 : ['EXPERIMENTAL SYSTEMS', 'PRACTICAL ENGINEERING'].includes(p.wing) ? 5 : p.wing === 'FIELD NOTES' ? 4 : 3,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));

    const newLinks: Link[] = [];
    for (let i = 0; i < newNodes.length; i++) {
      for (let j = i + 1; j < newNodes.length; j++) {
        const sharedTags = newNodes[i].project.tags.filter(t => newNodes[j].project.tags.includes(t));
        if (sharedTags.length > 0) {
          newLinks.push({
            source: newNodes[i].id,
            target: newNodes[j].id,
            sharedTags
          });
        }
      }
    }

    const simulation = d3.forceSimulation<Node>(newNodes)
      .force('link', d3.forceLink<Node, Link>(newLinks).id(d => d.id).distance(120).strength(0.2))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))
      .force('collision', d3.forceCollide().radius(d => (d as Node).radius + 30))
      .on('tick', () => {
        setNodes([...simulation.nodes()]);
        setLinks([...newLinks]);
      });

    if (prefersReducedMotion) {
      simulation.tick(300);
      setNodes([...simulation.nodes()]);
      setLinks([...newLinks]);
      simulation.stop();
    } else {
      simulation.alpha(1).restart();
    }
    return () => { simulation.stop(); };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col font-sans"
      >
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-10 pointer-events-none">
          <div className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-3 text-[#C8A96A]">
              <Network className="w-5 h-5" />
              <h2 className="font-mono text-sm tracking-[0.2em] uppercase">Constellation</h2>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-[#A59B8C] uppercase leading-relaxed">
              This is not a mind map.<br/>
              It is a record of how questions become systems.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-[#A59B8C] hover:text-[#F4EFE6] pointer-events-auto transition-colors bg-[#111] hover:bg-[#222] border border-[#333] rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A59B8C]" aria-label="Close Constellation Graph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 w-full h-full relative" ref={containerRef}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <g>
              {links.map((link, i) => {
                const source = link.source as Node;
                const target = link.target as Node;
                if (!source.x || !source.y || !target.x || !target.y) return null;
                
                const isHighlighted = hoveredNode === source.id || hoveredNode === target.id;
                const isDimmed = hoveredNode && !isHighlighted;
                
                return (
                  <line
                    key={i}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={isHighlighted ? "#C8A96A" : "#333"}
                    strokeWidth={isHighlighted ? 1 : 0.5}
                    strokeOpacity={isDimmed ? 0.05 : isHighlighted ? 0.6 : 0.2}
                    className="transition-all duration-500"
                  />
                );
              })}

              {nodes.map((node) => {
                if (!node.x || !node.y) return null;
                
                const isHighlighted = hoveredNode === node.id || links.some(l => 
                  (l.source as Node).id === node.id && (l.target as Node).id === hoveredNode ||
                  (l.target as Node).id === node.id && (l.source as Node).id === hoveredNode
                );
                const isDimmed = hoveredNode && !isHighlighted;

                // Color mappings based on wing
                const getFillColor = () => {
                  if (node.project.wing === 'FLAGSHIP INVESTIGATIONS') return '#F4EFE6';
                  if (node.project.wing === 'COMMERCIAL SYSTEMS') return '#C8A96A';
                  if (node.project.wing === 'PHILOSOPHY') return '#0F766E';
                  if (node.project.wing === 'SYNTHETIC MEDIA') return '#B76E79';
                  return '#8F7746';
                };

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x},${node.y})`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => {
                      onClose();
                      onSelectProject(node.project);
                    }}
                    className="cursor-pointer transition-opacity duration-500 group"
                    style={{ opacity: isDimmed ? 0.2 : 1 }}
                  >
                    <circle
                      r={node.radius + (isHighlighted ? 2 : 0)}
                      fill={getFillColor()}
                      className="transition-all duration-300"
                    />
                    <circle
                      r={node.radius * 4}
                      fill="transparent"
                    />
                    
                    <text
                      y={node.radius + 14}
                      textAnchor="middle"
                      fill={isHighlighted ? "#F4EFE6" : "#A59B8C"}
                      className={`font-mono text-[9px] tracking-widest uppercase transition-all duration-300 pointer-events-none ${isHighlighted ? 'opacity-100 font-bold' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      {node.project.title}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
        
        {/* Mobile Fallback hint */}
        <div className="absolute bottom-6 left-6 right-6 text-center md:hidden pointer-events-none">
           <div className="inline-block bg-[#111]/80 backdrop-blur border border-[#333] px-4 py-2 rounded-sm font-mono text-[9px] text-[#A59B8C] uppercase tracking-widest">
             Pan & Zoom to explore • Tap node to open
           </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
