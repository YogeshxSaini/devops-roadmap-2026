'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/components/layout/ProgressProvider';
import { setStatus } from '@/lib/progress';
import { getRoadmapLayout, NODE_DIMENSIONS } from './layout';
import type { SkillStatus } from '@/lib/types';
import { CATEGORY_META } from '@/lib';
import { ZoomIn, ZoomOut, Maximize2, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_COLOR: Record<SkillStatus, string> = {
  'not-started': 'var(--status-not-started)',
  learning: 'var(--status-learning)',
  practiced: 'var(--status-practiced)',
  completed: 'var(--status-completed)',
};

const STATUS_LABEL: Record<SkillStatus, string> = {
  'not-started': 'Not started',
  learning: 'Learning',
  practiced: 'Practiced',
  completed: 'Completed',
};

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_DIST = 18;

type Filter = 'all' | SkillStatus;
const FILTERS: readonly Filter[] = ['all', 'not-started', 'learning', 'practiced', 'completed'];

export function InteractiveRoadmap() {
  const router = useRouter();
  const { progress, hydrated } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.55);
  const [fitZoom, setFitZoom] = useState(0.55);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const [filter, setFilter] = useState<Filter>('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Pinch-to-zoom state, kept in refs so we can read the live values inside
  // touch event handlers without re-binding listeners on every change.
  const pinchRef = useRef<{ dist: number; zoom: number; pan: { x: number; y: number }; midX: number; midY: number } | null>(null);

  // Double-tap detection on touch: single tap selects, double tap opens.
  const lastTapRef = useRef<{ id: string | null; t: number; x: number; y: number }>({ id: null, t: 0, x: 0, y: 0 });

  const layout = useMemo(() => getRoadmapLayout(progress), [progress]);

  const visibleNodes = useMemo(() => {
    if (filter === 'all') return layout.nodes;
    return layout.nodes.filter((n) => n.status === filter);
  }, [layout, filter]);

  const handleFit = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    if (cw === 0 || ch === 0) return;
    const zX = (cw - 48) / layout.bounds.width;
    const zY = (ch - 80) / layout.bounds.height;
    const fit = Math.max(MIN_ZOOM, Math.min(zX, zY, 1));
    setFitZoom(fit);
    setZoom(fit);
    setPan({
      x: (cw - layout.bounds.width * fit) / 2,
      y: 48,
    });
  }, [layout.bounds.width, layout.bounds.height]);

  // Refit on first measurement and whenever the container resizes
  // (orientation change, browser chrome show/hide on mobile, layout shift).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    handleFit();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => handleFit());
    ro.observe(el);
    return () => ro.disconnect();
  }, [handleFit]);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button[data-node]')) return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: panStartRef.current.panX + (e.clientX - panStartRef.current.x),
      y: panStartRef.current.panY + (e.clientY - panStartRef.current.y),
    });
  };

  const onMouseUp = () => setIsPanning(false);

  // Touch: single-finger pans the canvas, two-finger pinch zooms. Tap on a
  // node still triggers the button's own click — we only intercept when the
  // touch starts on the background, and a quick double-tap on a node
  // navigates to the skill detail page.
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Start pinch: capture current distance and zoom.
      e.preventDefault();
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const midX = (a.clientX + b.clientX) / 2;
      const midY = (a.clientY + b.clientY) / 2;
      pinchRef.current = { dist, zoom, pan: { ...pan }, midX, midY };
      setIsPanning(false);
      return;
    }
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    // Don't pan if the user started on a node — let the button handle taps.
    if ((e.target as HTMLElement).closest('button[data-node]')) return;
    setIsPanning(true);
    panStartRef.current = { x: t.clientX, y: t.clientY, panX: pan.x, panY: pan.y };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const midX = (a.clientX + b.clientX) / 2;
      const midY = (a.clientY + b.clientY) / 2;
      const start = pinchRef.current;
      const ratio = dist / start.dist;
      const nextZoom = Math.max(fitZoom, Math.min(MAX_ZOOM, start.zoom * ratio));
      // Keep the pinch midpoint stable in screen space while zooming.
      const dx = (midX - start.midX) / nextZoom;
      const dy = (midY - start.midY) / nextZoom;
      setZoom(nextZoom);
      setPan({ x: start.pan.x - dx * nextZoom + (midX - start.midX), y: start.pan.y - dy * nextZoom + (midY - start.midY) });
      return;
    }
    if (!isPanning || e.touches.length !== 1) return;
    const t = e.touches[0];
    setPan({
      x: panStartRef.current.panX + (t.clientX - panStartRef.current.x),
      y: panStartRef.current.panY + (t.clientY - panStartRef.current.y),
    });
  };

  const onTouchEnd = () => {
    setIsPanning(false);
    pinchRef.current = null;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((z) => {
      const next = z + delta;
      return Math.max(fitZoom, Math.min(MAX_ZOOM, next));
    });
  };

  const onZoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + 0.1));
  const onZoomOut = () => setZoom((z) => Math.max(fitZoom, z - 0.1));

  // On touch devices the button's onClick fires after a successful double-tap
  // detection in onNodeTouchStart, so we only need to open the panel on tap.
  // On mouse, every click opens the panel; doubleClick is wired separately.
  const onNodeClick = (id: string) => {
    setSelected(id);
  };

  // Track tap coordinates for double-tap distance check. If the user double-
  // taps on the same node within DOUBLE_TAP_MS and within DOUBLE_TAP_DIST, we
  // navigate immediately and suppress the subsequent click that would just
  // open the panel.
  const onNodeTouchStart = (id: string, e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const now = Date.now();
    const t = e.touches[0];
    const last = lastTapRef.current;
    if (
      last.id === id &&
      now - last.t < DOUBLE_TAP_MS &&
      Math.hypot(t.clientX - last.x, t.clientY - last.y) < DOUBLE_TAP_DIST
    ) {
      e.preventDefault();
      lastTapRef.current = { id: null, t: 0, x: 0, y: 0 };
      router.push(`/skills/${id}`);
    } else {
      lastTapRef.current = { id, t: now, x: t.clientX, y: t.clientY };
    }
  };

  const onNodeDouble = (id: string) => {
    router.push(`/skills/${id}`);
  };

  const setNodeStatus = (id: string, status: SkillStatus) => {
    setStatus(id, status);
  };

  const selectedNode = selected ? layout.nodes.find((n) => n.id === selected) : null;

  const filterLabel = filter === 'all' ? 'All' : STATUS_LABEL[filter as SkillStatus];

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)] bg-bg-base border border-border-subtle overflow-hidden">
      {/* Header / controls */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-bg-base/90 backdrop-blur border-b border-border-subtle">
        <div className="text-mono text-xs text-fg-muted whitespace-nowrap">
          <span className="text-fg-primary">$ roadmap</span>
          <span className="hidden sm:inline"> --interactive</span>
          <span className="text-fg-dim ml-2">[{hydrated ? 'live' : 'loading'}]</span>
        </div>

        {/* Filter: dropdown on mobile (saves horizontal space), inline chips on sm+ */}
        <div className="ml-auto flex items-center gap-1">
          <div className="relative sm:hidden">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={filterOpen}
              className="inline-flex items-center justify-center gap-1 min-h-[36px] text-mono text-[10px] px-2.5 py-1 border border-border text-fg-muted uppercase tracking-wider"
            >
              <span>{filterLabel}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {filterOpen && (
              <>
                <button
                  aria-label="Close filter"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={() => setFilterOpen(false)}
                />
                <ul
                  role="listbox"
                  className="absolute right-0 top-full mt-1 z-20 min-w-[140px] bg-bg-raised border border-border-subtle shadow-lg"
                >
                  {FILTERS.map((f) => (
                    <li key={f}>
                      <button
                        onClick={() => {
                          setFilter(f);
                          setFilterOpen(false);
                        }}
                        className={cn(
                          'w-full text-left text-mono text-[11px] px-3 py-2 uppercase tracking-wider',
                          filter === f ? 'text-accent bg-accent/10' : 'text-fg-muted hover:text-fg-primary'
                        )}
                        role="option"
                        aria-selected={filter === f}
                      >
                        {f === 'all' ? 'All' : f.replace('-', ' ')}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="hidden sm:flex flex-wrap items-center gap-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'inline-flex items-center justify-center min-h-[32px] text-mono text-[10px] px-2 py-1 sm:py-1.5 border transition-colors uppercase tracking-wider',
                  filter === f
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-fg-muted hover:text-fg-primary'
                )}
              >
                {f === 'all' ? 'All' : f.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-px h-5 bg-border-subtle mx-1" />
        <div className="flex items-center gap-1">
          <button
            onClick={onZoomOut}
            disabled={zoom <= fitZoom + 0.001}
            className={cn(
              'inline-flex items-center justify-center min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary',
              zoom <= fitZoom + 0.001 && 'opacity-40 cursor-not-allowed hover:text-fg-muted'
            )}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={onZoomIn}
            className="inline-flex items-center justify-center min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
          <button
            onClick={handleFit}
            className="inline-flex items-center justify-center min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary"
            aria-label="Fit to view"
          >
            <Maximize2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>
        <div className="text-mono text-[10px] text-fg-dim px-2 whitespace-nowrap hidden xs:inline">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className={cn('absolute inset-0 pt-14 sm:pt-12 cursor-grab', isPanning && 'cursor-grabbing')}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        onWheel={onWheel}
        style={{
          touchAction: 'none',
          backgroundImage:
            'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
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
                style={{ borderColor: 'var(--border)', background: 'transparent' }}
              />
              <div className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center gap-2 text-mono text-[10px] tracking-widest uppercase"
                style={{ color: c.color }}
              >
                <span style={{ background: c.color, width: 6, height: 6, display: 'inline-block' }} />
                <span>{String(c.order).padStart(2, '0')} · {c.label}</span>
                <span className="ml-auto text-fg-muted normal-case tracking-normal">
                  {layout.nodes.filter((n) => n.category === c.category).length} skills
                </span>
              </div>
            </div>
          ))}

          {visibleNodes.map((n) => {
            const sc = STATUS_COLOR[n.status];
            const isHovered = hovered === n.id;
            const isSelected = selected === n.id;
            return (
              <button
                key={n.id}
                data-node
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered((h) => (h === n.id ? null : h))}
                onClick={() => onNodeClick(n.id)}
                onTouchStart={(e) => onNodeTouchStart(n.id, e)}
                onDoubleClick={() => onNodeDouble(n.id)}
                className={cn(
                  'absolute text-left transition-shadow border bg-bg-raised',
                  isHovered && 'shadow-glow',
                  isSelected && 'shadow-glow'
                )}
                style={{
                  left: n.x,
                  top: n.y,
                  width: NODE_DIMENSIONS.width,
                  height: NODE_DIMENSIONS.height,
                  borderColor: isHovered || isSelected ? 'var(--accent)' : sc,
                  background: 'var(--bg-raised)',
                }}
              >
                <div className="flex items-center gap-1.5 px-2.5 pt-1.5">
                  <span style={{ width: 6, height: 6, background: sc, display: 'inline-block' }} />
                  <span className="text-mono text-[9px] text-fg-muted uppercase tracking-wider">
                    L{n.difficulty} · {n.hours}h
                  </span>
                  <span className="ml-auto text-mono text-[9px] font-semibold" style={{ color: sc }}>
                    {STATUS_LABEL[n.status]}
                  </span>
                </div>
                <div className="px-2.5 pb-1.5 pt-0.5 text-[12px] leading-tight font-semibold text-fg-primary truncate">
                  {n.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected node panel — bottom sheet on mobile, side panel on sm+ */}
      {selectedNode && (
        <>
          <button
            aria-label="Close panel"
            onClick={() => setSelected(null)}
            className="sm:hidden fixed inset-0 z-10 bg-black/30 cursor-default"
          />
          <div className="absolute left-0 right-0 bottom-0 sm:left-auto sm:right-0 sm:top-12 sm:bottom-0 w-full sm:w-80 sm:max-w-none bg-bg-raised border-t sm:border-t-0 sm:border-l border-border-subtle z-20 overflow-y-auto max-h-[80vh] sm:max-h-none">
            <div className="p-4 border-b border-border-subtle flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="eyebrow text-fg-muted">{CATEGORY_META[selectedNode.category].label}</div>
                <h3 className="text-base font-semibold mt-1 leading-tight">{selectedNode.skill.name}</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="inline-flex items-center justify-center min-h-[32px] min-w-[32px] p-1.5 border border-border-subtle text-fg-muted hover:text-fg-primary"
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
                  <div className="text-fg-primary">{selectedNode.skill.difficulty}/5</div>
                </div>
                <div className="border border-border-subtle p-2">
                  <div className="text-fg-dim text-[10px]">HOURS</div>
                  <div className="text-fg-primary">{selectedNode.skill.estimatedHours}h</div>
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
                        'inline-flex items-center justify-center min-h-[36px] text-mono text-[10px] py-1.5 border uppercase tracking-wider',
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
                <ul className="text-xs space-y-1 text-fg-primary">
                  {selectedNode.skill.topics.slice(0, 5).map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-fg-muted">›</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => router.push(`/skills/${selectedNode.id}`)}
                className="inline-flex items-center justify-center w-full min-h-[40px] text-mono text-xs py-2 border border-accent text-accent hover:bg-accent/10"
              >
                OPEN SKILL DETAIL →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Legend */}
      <div className="hidden sm:block absolute bottom-4 left-4 z-20 bg-bg-raised border border-border-subtle p-3 text-mono text-[10px] uppercase tracking-wider space-y-1">
        <div className="text-fg-dim mb-1.5">STATUS</div>
        {(['not-started', 'learning', 'practiced', 'completed'] as SkillStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span style={{ width: 8, height: 8, background: STATUS_COLOR[s], display: 'inline-block' }} />
            <span className="text-fg-muted">{STATUS_LABEL[s]}</span>
          </div>
        ))}
        <div className="text-fg-dim mt-2 pt-2 border-t border-border-subtle">
          TAP · status · DBLTAP · open
        </div>
      </div>
    </div>
  );
}
