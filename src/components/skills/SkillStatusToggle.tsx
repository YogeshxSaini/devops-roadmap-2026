'use client';

import { setStatus } from '@/lib/progress';
import { useSkillStatus } from '@/components/layout/ProgressProvider';
import type { SkillStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check, Play, BookOpen, Circle } from 'lucide-react';

const STATUS: { value: SkillStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'not-started', label: 'Not started', icon: Circle },
  { value: 'learning', label: 'Learning', icon: Play },
  { value: 'practiced', label: 'Practiced', icon: BookOpen },
  { value: 'completed', label: 'Completed', icon: Check },
];

export function SkillStatusToggle({ skillId, compact }: { skillId: string; compact?: boolean }) {
  const { status, hydrated } = useSkillStatus(skillId);

  if (!hydrated) {
    return <div className="h-9 w-64 bg-bg-inset border border-border-subtle" />;
  }

  return (
    <div className={cn(
      'inline-flex border border-border-subtle bg-bg-raised',
      compact ? 'text-[10px]' : 'text-xs'
    )}>
      {STATUS.map((s) => {
        const Icon = s.icon;
        const active = status === s.value;
        return (
          <button
            key={s.value}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setStatus(skillId, s.value);
            }}
            title={s.label}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1.5 border-r border-border-subtle last:border-r-0 transition-colors',
              active
                ? 'bg-accent/10 text-accent'
                : 'text-fg-muted hover:text-fg-primary hover:bg-bg-overlay'
            )}
          >
            <Icon className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
            {!compact && <span className="font-mono uppercase tracking-wider">{s.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
