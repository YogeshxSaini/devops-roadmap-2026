'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProgress } from './ProgressProvider';
import { totalSkillCount } from '@/lib/data/skills';

export function ProgressIndicator() {
  const { progress, hydrated } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const completed = Object.values(progress).filter((s) => s === 'completed').length;
  const inProgress = Object.values(progress).filter(
    (s) => s === 'learning' || s === 'practiced'
  ).length;
  const total = totalSkillCount();
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <Link
      href="/roadmap"
      className="fixed bottom-4 right-4 z-30 hidden sm:flex items-center gap-3 bg-bg-raised border border-border hover:border-accent px-3 py-2 shadow-glow transition-colors"
      aria-label={`Progress: ${completed} of ${total} skills completed`}
    >
      <div className="text-mono text-xs">
        <span className="text-accent">{completed}</span>
        <span className="text-fg-dim"> / {total}</span>
      </div>
      <div className="w-20 h-1 bg-bg-inset border border-border-subtle">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-mono text-xs text-fg-muted">{pct}%</div>
      {inProgress > 0 && (
        <div className="text-mono text-[10px] text-amber border-l border-border-subtle pl-3">
          {inProgress} active
        </div>
      )}
    </Link>
  );
}
