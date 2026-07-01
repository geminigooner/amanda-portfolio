import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3-force';
import { PROJECTS, Project } from '../data';
import { X, Network } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Initialize graph data
  useEffect(() => {
    if (!isOpen) return;

    const newNodes: Node[] = PROJECTS.map(p => ({
      id: p.id,
      project: p,
      radius: 8,
    }));

    const newLinks: Link[] = [];
    for (let i = 0; i < PROJECTS.length; i++) {
      for (let j = i + 1; j < PROJECTS.length; j++) {
        const p1 = PROJECTS[i];
        const p2 = PROJECTS[j];
        const sharedTags = p1.tags.filter(t => p2.tags.includes(t));
        
        if (sharedTags.length > 0) {
          newLinks.push({
            source: p1.id,
            target: p2.id,
            sharedTags
          });
        }
      }
    }

    setNodes(newNodes);
    setLinks(newLinks);
  }, [isOpen]);

  // Run simulation
  useEffect(() => {
    if (!isOpen || nodes.length === 0 || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const isMobile = width < 768;

    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(isMobile ? 70 : 150))
      .force('charge', d3.forceManyBody().strength(isMobile ? -100 : -300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(isMobile ? 0.15 : 0.05))
      .force('y', d3.forceY(height / 2).strength(isMobile ? 0.15 : 0.05))
      .force('collide', d3.forceCollide().radius(isMobile ? 30 : 40))
      .on('tick', () => {
        const padding = 40;
        nodes.forEach(d => {
          if (d.x) d.x = Math.max(padding, Math.min(width - padding, d.x));
          if (d.y) d.y = Math.max(padding, Math.min(height - padding, d.y));
        });
        setNodes([...simulation.nodes()]);
        setLinks([...links]); // Trigger re-render for links
      });

    return () => {
      simulation.stop();
    };
  }, [isOpen, nodes.length]); // links is indirectly tracked via nodes initialization

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100000] bg-[#050002]/80 flex flex-col"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 pointer-events-none">
          <div className="flex items-center gap-3">
            <Network className="w-5 h-5 text-teal-400" />
            <h2 className="font-mono text-sm tracking-[0.2em] text-white/90 uppercase">Constellation Memory Graph</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-3 text-white/50 hover:text-white pointer-events-auto transition-colors bg-white/5 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Graph Area */}
        <div ref={containerRef} className="flex-1 relative overflow-hidden">
          <svg className="w-full h-full">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Edges */}
            {links.map((link, i) => {
              const sourceNode = link.source as Node;
              const targetNode = link.target as Node;
              if (!sourceNode.x || !sourceNode.y || !targetNode.x || !targetNode.y) return null;

              const isHighlighted = hoveredNode === sourceNode.id || hoveredNode === targetNode.id;
              const isDimmed = hoveredNode && !isHighlighted;

              return (
                <line
                  key={`link-${i}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? "rgba(45, 212, 191, 0.6)" : "rgba(255, 255, 255, 0.05)"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  className="transition-all duration-500"
                  style={{ filter: isHighlighted ? 'url(#glow)' : 'none', opacity: isDimmed ? 0.1 : 1 }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              if (!node.x || !node.y) return null;
              
              const isHighlighted = hoveredNode === node.id || links.some(l => 
                (hoveredNode === (l.source as Node).id && node.id === (l.target as Node).id) ||
                (hoveredNode === (l.target as Node).id && node.id === (l.source as Node).id)
              );
              const isDimmed = hoveredNode && !isHighlighted;

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
                    r={node.radius + (isHighlighted ? 4 : 0)}
                    fill={node.project.color || "#ffffff"}
                    className="transition-all duration-300"
                    style={{ filter: 'url(#glow)' }}
                  />
                  <circle
                    r={node.radius * 3}
                    fill="transparent"
                  />
                  
                  {/* Label */}
                  <text
                    y={20}
                    textAnchor="middle"
                    fill="white"
                    className={`font-mono text-[9px] tracking-widest uppercase transition-all duration-300 pointer-events-none ${isHighlighted ? 'opacity-100 font-bold' : 'opacity-40 group-hover:opacity-100'}`}
                  >
                    {node.project.title}
                  </text>
                  
                  {/* Tags Tooltip */}
                  {hoveredNode === node.id && (
                    <g transform="translate(0, 35)">
                      <rect 
                        x={-(node.project.tags.join(' • ').length * 3) - 10} 
                        y={-12} 
                        width={(node.project.tags.join(' • ').length * 6) + 20} 
                        height={24} 
                        fill="rgba(0,0,0,0.8)" 
                        rx={12} 
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <text
                        textAnchor="middle"
                        y={3}
                        fill="rgba(255,255,255,0.6)"
                        className="font-mono text-[8px] tracking-widest uppercase pointer-events-none"
                      >
                        {node.project.tags.join(' • ')}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
