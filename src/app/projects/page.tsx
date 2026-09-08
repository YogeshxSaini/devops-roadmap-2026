import Link from 'next/link';
import { PROJECTS } from '@/lib';
import { ArrowRight, Clock, BarChart3, Layers } from 'lucide-react';

export const metadata = {
  title: 'Projects — DevOps Roadmap 2026',
  description: 'Eight progressively harder projects that prove you can build real systems.',
};

const DIFFICULTY_DOTS: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

export default function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-5 py-8 sm:py-12">
      <header className="mb-10">
        <div className="eyebrow">// PROJECTS</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">Build real systems</h1>
        <p className="mt-3 text-fg-muted max-w-2xl">
          Eight progressively harder projects. Each one proves a real-world capability. None are toy problems.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {PROJECTS.map((p, i) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="group block border border-border-subtle bg-bg-raised hover:border-accent active:border-accent p-4 sm:p-6 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3">
              <span className="text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                P{String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-0.5" aria-label={`Difficulty ${p.difficulty} of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`w-2 h-2 sm:w-1.5 sm:h-1.5 ${
                      n <= DIFFICULTY_DOTS[p.difficulty] ? 'bg-amber' : 'bg-fg-dim/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-semibold group-hover:text-accent transition-colors leading-tight">
              {p.name}
            </h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed line-clamp-3 sm:line-clamp-none">{p.summary}</p>
            <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 text-mono text-[10px]">
              <span className="inline-flex items-center px-2 py-1 border border-border-subtle bg-bg-overlay">
                <Clock className="inline w-3 h-3 mr-1" /> ~{p.estimatedHours}h
              </span>
              <span className="inline-flex items-center px-2 py-1 border border-border-subtle bg-bg-overlay">
                <Layers className="inline w-3 h-3 mr-1" /> {p.milestones.length} milestones
              </span>
              <span className="inline-flex items-center px-2 py-1 border border-border-subtle bg-bg-overlay">
                <BarChart3 className="inline w-3 h-3 mr-1" /> L{p.difficulty}
              </span>
            </div>
            <div className="mt-3 sm:mt-4 text-mono text-[10px] text-fg-dim line-clamp-1 sm:line-clamp-none">
              {p.technologies.map((t) => t.name).join(' · ')}
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 text-mono text-xs text-accent">
              open project <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
