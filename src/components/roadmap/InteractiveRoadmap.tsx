'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/components/layout/ProgressProvider';
import { setStatus } from '@/lib/progress';
import { getRoadmapLayout, NODE_DIMENSIONS } from './layout';
import type { SkillStatus } from '@/lib/types';
import { CATEGORY_META } from '@/lib';
import { ZoomIn, ZoomOut, Maximize2, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_COLOR: Record<SkillStatus, string> = {
  'not-started': '#3A3A42',
  learning: '#E8B86D',
  practiced: '#7AB8E8',
  completed: '#7DD3A0',
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  'not-started': 'Not started',
  learning: 'Learning',
  practiced: 'Practiced',
  completed: 'Completed',
};

export function InteractiveRoadmap() {
  const router = useRouter();
  const { progress, hydrated } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.55);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });
  const [filter, setFilter] = useState<'all' | SkillStatus>('all');
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const layout = useMemo(() => getRoadmapLayout(progress), [progress]);

  const visibleNodes = useMemo(() => {
    if (filter === 'all') return layout.nodes;
    return layout.nodes.filter((n) => n.status === filter);
  }, [layout, filter]);

  const handleFit = () => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    const zX = (cw - 80) / layout.bounds.width;
    const zY = (ch - 80) / layout.bounds.height;
    setZoom(Math.min(zX, zY, 1));
    setPan({
      x: (cw - layout.bounds.width * Math.min(zX, zY, 1)) / 2,
      y: 40,
    });
  };

  useEffect(() => {
    handleFit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.bounds.width, layout.bounds.height]);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button[data-node]')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({ x: panStart.panX + (e.clientX - panStart.x), y: panStart.panY + (e.clientY - panStart.y) });
  };

  const onMouseUp = () => setIsPanning(false);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((z) => Math.min(1.5, Math.max(0.15, z + delta)));
  };

  const onNodeClick = (id: string) => {
    setSelected(id);
  };

  const onNodeDouble = (id: string) => {
    router.push(`/skills/${id}`);
  };

  const setNodeStatus = (id: string, status: SkillStatus) => {
    setStatus(id, status);
  };

  const selectedNode = selected ? layout.nodes.find((n) => n.id === selected) : null;

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] bg-bg-base border border-border-subtle overflow-hidden">
      {/* Header / controls */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 px-4 py-2 bg-bg-base/90 backdrop-blur border-b border-border-subtle">
        <div className="text-mono text-xs text-fg-muted">
          <span className="text-fg-primary">$ roadmap</span> --interactive
          <span className="text-fg-dim ml-2">[{hydrated ? 'live' : 'loading'}]</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {(['all', 'not-started', 'learning', 'practiced', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-mono text-[10px] px-2 py-1 border transition-colors uppercase tracking-wider',
                filter === f
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-border text-fg-muted hover:text-fg-primary'
              )}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-border-subtle mx-1" />
        <button
          onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
          className="p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.15, z - 0.1))}
          className="p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleFit}
          className="p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary"
          aria-label="Fit"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <div className="text-mono text-[10px] text-fg-dim px-2">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className={cn('absolute inset-0 pt-12 cursor-grab', isPanning && 'cursor-grabbing')}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: layout.bounds.width,
            height: layout.bounds.height,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <svg
            width={layout.bounds.width}
            height={layout.bounds.height}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#2A2A30" />
              </marker>
            </defs>
            {layout.edges.map((e, i) => {
              const from = layout.nodes.find((n) => n.id === e.from);
              const to = layout.nodes.find((n) => n.id === e.to);
              if (!from || !to) return null;
              if (filter !== 'all' && (from.status !== filter || to.status !== filter)) return null;
              const fx = from.x + NODE_DIMENSIONS.width;
              const fy = from.y + NODE_DIMENSIONS.height / 2;
              const tx = to.x;
              const ty = to.y + NODE_DIMENSIONS.height / 2;
              const dx = (tx - fx) * 0.5;
              return (
                <path
                  key={i}
                  d={`M ${fx} ${fy} C ${fx + dx} ${fy}, ${tx - dx} ${ty}, ${tx} ${ty}`}
                  stroke={from.status === 'completed' && to.status === 'completed' ? '#3A6B4F' : '#1F1F23'}
                  strokeWidth={1.2}
                  fill="none"
                  markerEnd="url(#arrow)"
                />
              );
            })}
          </svg>

          {layout.clusters.map((c) => (
            <div
              key={c.category}
              className="absolute"
              style={{
                left: c.x,
                top: c.y,
                width: c.width,
                height: c.height,
              }}
            >
              <div
                className="absolute inset-0 border border-dashed"
                style={{ borderColor: 'var(--border-subtle)', background: 'transparent' }}
              />
              <div className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center gap-2 text-mono text-[10px] tracking-widest uppercase"
                style={{ color: c.color }}
              >
                <span style={{ background: c.color, width: 6, height: 6, display: 'inline-block' }} />
                <span>{String(c.order).padStart(2, '0')} · {c.label}</span>
                <span className="ml-auto text-fg-dim normal-case tracking-normal">
                  {layout.nodes.filter((n) => n.category === c.category).length} skills
                </span>
              </div>
            </div>
          ))}

          {visibleNodes.map((n) => {
            const sc = STATUS_COLOR[n.status];
            const isHovered = hovered === n.id;
            return (
              <button
                key={n.id}
                data-node
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                onClick={() => onNodeClick(n.id)}
                onDoubleClick={() => onNodeDouble(n.id)}
                className={cn(
                  'absolute text-left transition-shadow border',
                  isHovered && 'shadow-glow'
                )}
                style={{
                  left: n.x,
                  top: n.y,
                  width: NODE_DIMENSIONS.width,
                  height: NODE_DIMENSIONS.height,
                  borderColor: isHovered ? 'var(--accent)' : sc,
                  background: isHovered ? 'var(--bg-overlay)' : 'var(--bg-raised)',
                }}
              >
                <div className="flex items-center gap-1.5 px-2.5 pt-1.5">
                  <span style={{ width: 6, height: 6, background: sc, display: 'inline-block' }} />
                  <span className="text-mono text-[9px] text-fg-dim uppercase tracking-wider">
                    L{n.difficulty} · {n.hours}h
                  </span>
                  <span className="ml-auto text-mono text-[9px]" style={{ color: sc }}>
                    {STATUS_LABEL[n.status]}
                  </span>
                </div>
                <div className="px-2.5 pb-1.5 pt-0.5 text-[12px] leading-tight font-medium text-fg-primary truncate">
                  {n.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected node panel */}
      {selectedNode && (
        <div className="absolute right-0 top-12 bottom-0 w-80 bg-bg-raised border-l border-border-subtle z-20 overflow-y-auto">
          <div className="p-4 border-b border-border-subtle flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="eyebrow text-fg-muted">{CATEGORY_META[selectedNode.category].label}</div>
              <h3 className="text-base font-semibold mt-1 leading-tight">{selectedNode.skill.name}</h3>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="p-1 border border-border-subtle text-fg-muted hover:text-fg-primary"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="p-4 space-y-4 text-sm">
            <p className="text-fg-muted leading-relaxed">{selectedNode.skill.summary}</p>
            <div className="grid grid-cols-2 gap-2 text-mono text-xs">
              <div className="border border-border-subtle p-2">
                <div className="text-fg-dim text-[10px]">DIFFICULTY</div>
                <div>{selectedNode.skill.difficulty}/5</div>
              </div>
              <div className="border border-border-subtle p-2">
                <div className="text-fg-dim text-[10px]">HOURS</div>
                <div>{selectedNode.skill.estimatedHours}h</div>
              </div>
            </div>

            <div>
              <div className="eyebrow mb-2 text-fg-muted">STATUS</div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['not-started', 'learning', 'practiced', 'completed'] as SkillStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setNodeStatus(selectedNode.id, s)}
                    className={cn(
                      'text-mono text-[10px] py-1.5 border uppercase tracking-wider',
                      selectedNode.status === s
                        ? 'border-accent text-accent bg-accent/10'
                        : 'border-border-subtle text-fg-muted hover:text-fg-primary'
                    )}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="eyebrow mb-2 text-fg-muted">TOPICS</div>
              <ul className="text-xs space-y-1 text-fg-muted">
                {selectedNode.skill.topics.slice(0, 5).map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-fg-dim">›</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => router.push(`/skills/${selectedNode.id}`)}
              className="w-full text-mono text-xs py-2 border border-accent text-accent hover:bg-accent/10"
            >
              OPEN SKILL DETAIL →
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-bg-raised border border-border-subtle p-3 text-mono text-[10px] uppercase tracking-wider space-y-1">
        <div className="text-fg-dim mb-1.5">STATUS</div>
        {(['not-started', 'learning', 'practiced', 'completed'] as SkillStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span style={{ width: 8, height: 8, background: STATUS_COLOR[s], display: 'inline-block' }} />
            <span className="text-fg-muted">{STATUS_LABEL[s]}</span>
          </div>
        ))}
        <div className="text-fg-dim mt-2 pt-2 border-t border-border-subtle">
          CLICK · status · DBLCLICK · open
        </div>
      </div>
    </div>
  );
}
