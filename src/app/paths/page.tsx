import Link from 'next/link';
import { LEARNING_PATHS } from '@/lib';
import { ArrowRight, Clock, BookOpen, Users } from 'lucide-react';

export const metadata = {
  title: 'Learning Paths — DevOps Roadmap 2026',
  description: 'Four curated paths from beginner to job-ready DevOps, SRE, and Platform engineer.',
};

export default function PathsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-5 py-8 sm:py-12">
      <header className="mb-10">
        <div className="eyebrow">// LEARNING PATHS</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">Choose your path</h1>
        <p className="mt-3 text-fg-muted max-w-2xl">
          Four opinionated sequences through the full skill graph. Pick the one that matches your background and your target role.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {LEARNING_PATHS.map((p, i) => (
          <Link
            key={p.id}
            href={`/paths/${p.slug}`}
            className="group block border border-border-subtle bg-bg-raised hover:border-accent p-6 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                Path {String(i + 1).padStart(2, '0')}
              </div>
              <ArrowRight className="w-4 h-4 text-fg-dim group-hover:text-accent" />
            </div>
            <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">{p.name}</h2>
            <p className="mt-1 text-sm text-fg-muted">{p.audience}</p>
            <p className="mt-3 text-sm text-fg-primary leading-relaxed">{p.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-mono text-[10px]">
              <span className="px-2 py-1 border border-border-subtle bg-bg-overlay">
                <Clock className="inline w-3 h-3 mr-1" /> ~{p.estimatedHours}h
              </span>
              <span className="px-2 py-1 border border-border-subtle bg-bg-overlay">
                <BookOpen className="inline w-3 h-3 mr-1" /> {p.skillSequence.length} skills
              </span>
              <span className="px-2 py-1 border border-border-subtle bg-bg-overlay">
                <Users className="inline w-3 h-3 mr-1" /> {p.outcomes.length} outcomes
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
