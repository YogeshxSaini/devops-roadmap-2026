'use client';

import { useState } from 'react';
import { FAQ } from '@/lib';
import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <header className="mb-10">
        <div className="eyebrow">// FAQ</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">Common questions</h1>
        <p className="mt-3 text-fg-muted">
          What most people ask when they start. If yours isn&apos;t here, open an issue.
        </p>
      </header>

      <div className="border border-border-subtle divide-y divide-border-subtle">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left flex items-start gap-3 p-4 hover:bg-bg-raised transition-colors"
                aria-expanded={isOpen}
              >
                <Plus
                  className={cn(
                    'w-4 h-4 text-accent mt-0.5 shrink-0 transition-transform',
                    isOpen && 'rotate-45'
                  )}
                />
                <span className="flex-1 text-sm font-medium text-fg-primary">{item.q}</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 text-fg-muted shrink-0 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-11 text-sm text-fg-muted leading-relaxed">{item.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
