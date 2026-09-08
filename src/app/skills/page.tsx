'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ALL_SKILLS, CATEGORY_META, type SkillCategory } from '@/lib';
import { SkillStatusToggle } from '@/components/skills/SkillStatusToggle';
import { useProgress } from '@/components/layout/ProgressProvider';
import { Search, Clock, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SkillStatus } from '@/lib/types';

const STATUS_DOT: Record<SkillStatus, string> = {
  'not-started': 'bg-fg-dim',
  learning: 'bg-amber',
  practiced: 'bg-sky',
  completed: 'bg-accent',
};

const CATEGORY_TO_KEY: Record<string, SkillCategory> = {
  'Linux & CLI': 'linux-cli',
  'Networking': 'networking',
  'Git & GitHub': 'git-github',
  'Bash / Python': 'automation',
  'Cloud Fundamentals': 'cloud-fundamentals',
  'AWS': 'aws',
  'Docker & Containers': 'containers',
  'CI/CD': 'cicd',
  'Kubernetes': 'kubernetes',
  'Helm': 'helm',
  'Terraform / IaC': 'iac-terraform',
  'GitOps': 'gitops',
  'Observability': 'observability',
  'DevSecOps': 'devsecops',
  'Platform Engineering': 'platform-engineering',
  'AI × DevOps': 'ai-devops',
};

export default function SkillsPage() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<SkillCategory | 'all'>('all');
  const { progress, hydrated } = useProgress();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: ALL_SKILLS.length };
    for (const s of ALL_SKILLS) c[s.category] = (c[s.category] ?? 0) + 1;
    return c;
  }, []);

  const filtered = useMemo(() => {
    return ALL_SKILLS.filter((s) => {
      if (activeCat !== 'all' && s.category !== activeCat) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, activeCat]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-5 py-8 sm:py-12">
      <header className="mb-8">
        <div className="eyebrow">// SKILLS</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">All Skills</h1>
        <p className="mt-3 text-fg-muted max-w-2xl">
          Every concept, tool, and practice in the 2026 roadmap. Filter by category, search by topic,
          and track your progress as you go.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-fg-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, topics, descriptions…"
            className="w-full bg-bg-raised border border-border-subtle pl-9 pr-3 py-2 text-sm focus:border-accent focus:outline-none placeholder:text-fg-dim"
          />
        </div>
        <div className="text-mono text-xs text-fg-muted px-3 py-2 border border-border-subtle bg-bg-raised">
          <span className="text-fg-primary">
            {hydrated ? Object.values(progress).filter((s) => s === 'completed').length : 0}
          </span>
          <span className="text-fg-dim"> / {ALL_SKILLS.length} completed</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8">
        <button
          onClick={() => setActiveCat('all')}
          className={cn(
            'text-mono text-[10px] px-2.5 py-1 border uppercase tracking-wider',
            activeCat === 'all'
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border-subtle text-fg-muted hover:text-fg-primary'
          )}
        >
          All ({counts.all})
        </button>
        {Object.values(CATEGORY_META)
          .sort((a, b) => a.order - b.order)
          .map((c) => {
            const key = CATEGORY_TO_KEY[c.label];
            const isActive = activeCat === key;
            return (
              <button
                key={c.label}
                onClick={() => setActiveCat(key)}
                className={cn(
                  'text-mono text-[10px] px-2.5 py-1 border uppercase tracking-wider transition-colors',
                  isActive
                    ? 'text-fg-primary border-border bg-bg-raised'
                    : 'border-border-subtle text-fg-muted hover:text-fg-primary'
                )}
                style={isActive ? { color: c.color, borderColor: c.color } : {}}
              >
                {String(c.order).padStart(2, '0')} · {c.label} ({counts[key] ?? 0})
              </button>
            );
          })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((s) => {
          const meta = CATEGORY_META[s.category];
          const status: SkillStatus = (hydrated ? (progress[s.id] as SkillStatus | undefined) : null) ?? 'not-started';
          return (
            <div
              key={s.id}
              className="group border border-border-subtle bg-bg-raised hover:border-border p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className="text-mono text-[10px] uppercase tracking-wider"
                  style={{ color: meta.color }}
                >
                  {String(meta.order).padStart(2, '0')} · {meta.label}
                </span>
                <span className={cn('w-2 h-2', STATUS_DOT[status])} />
              </div>
              <Link href={`/skills/${s.slug}`} className="block">
                <h3 className="text-sm font-semibold leading-tight group-hover:text-accent transition-colors">
                  {s.name}
                </h3>
                <p className="mt-1.5 text-xs text-fg-muted line-clamp-2 leading-relaxed">
                  {s.summary}
                </p>
              </Link>
              <div className="mt-3 flex items-center justify-between gap-2 text-mono text-[10px] text-fg-dim">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" /> L{s.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {s.estimatedHours}h
                  </span>
                </div>
                <SkillStatusToggle skillId={s.id} compact />
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-fg-muted text-mono text-sm">
          // no skills match &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}
