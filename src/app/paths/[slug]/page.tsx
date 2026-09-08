import Link from 'next/link';
import { LEARNING_PATHS, getPath, getSkill, CATEGORY_META } from '@/lib';
import { ArrowRight, Clock, GraduationCap, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return LEARNING_PATHS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPath(slug);
  if (!p) return { title: 'Path not found' };
  return { title: `${p.name} — DevOps Roadmap 2026`, description: p.summary };
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const path = getPath(slug);
  if (!path) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-5 py-8 sm:py-12">
      <Link
        href="/paths"
        className="inline-flex items-center gap-1.5 text-mono text-xs text-fg-muted hover:text-fg-primary mb-6"
      >
        ← all paths
      </Link>

      <header className="border border-border-subtle bg-bg-raised p-6">
        <div className="eyebrow text-accent">LEARNING PATH</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">{path.name}</h1>
        <p className="mt-2 text-fg-muted text-sm">{path.audience}</p>
        <p className="mt-4 text-fg-primary leading-relaxed">{path.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-mono text-xs">
          <span className="px-2.5 py-1 border border-border-subtle bg-bg-overlay">
            <Clock className="inline w-3 h-3 mr-1" /> ~{path.estimatedHours}h
          </span>
          <span className="px-2.5 py-1 border border-border-subtle bg-bg-overlay">
            <BookOpen className="inline w-3 h-3 mr-1" /> {path.skillSequence.length} skills
          </span>
        </div>
      </header>

      <section className="mt-10">
        <div className="eyebrow text-fg-muted mb-4">// OUTCOMES</div>
        <ul className="space-y-2">
          {path.outcomes.map((o, i) => (
            <li key={i} className="flex gap-3 text-sm border-l border-accent pl-3 py-1">
              <span className="text-accent font-mono text-xs">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-fg-primary">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="eyebrow text-fg-muted mb-4">// SKILL SEQUENCE</div>
        <ol className="space-y-2">
          {path.skillSequence.map((id, i) => {
            const skill = getSkill(id);
            if (!skill) return null;
            const meta = CATEGORY_META[skill.category];
            return (
              <li key={id}>
                <Link
                  href={`/skills/${skill.slug}`}
                  className="group flex items-center gap-3 sm:gap-4 border border-border-subtle bg-bg-raised hover:border-accent p-3 transition-colors"
                >
                  <span className="text-mono text-xs text-fg-dim w-7 sm:w-8 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="hidden sm:inline text-mono text-[10px] uppercase tracking-wider w-32 shrink-0 truncate"
                    style={{ color: meta.color }}
                  >
                    {meta.label}
                  </span>
                  <span className="flex-1 min-w-0 text-sm font-medium text-fg-primary group-hover:text-accent truncate">
                    {skill.name}
                  </span>
                  <span className="text-mono text-[10px] text-fg-dim hidden md:inline">
                    L{skill.difficulty} · {skill.estimatedHours}h
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-fg-dim group-hover:text-accent shrink-0" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-12 border border-border-subtle bg-bg-raised p-6 text-center">
        <GraduationCap className="w-5 h-5 text-accent mx-auto" />
        <h3 className="mt-3 text-lg font-semibold">Ready to start?</h3>
        <p className="mt-1 text-sm text-fg-muted">Mark skills as you complete them. Progress is saved in your browser.</p>
        <Link
          href="/roadmap"
          className="mt-4 inline-flex items-center gap-2 text-mono text-xs px-4 py-2 border border-accent text-accent hover:bg-accent/10"
        >
          Open the interactive roadmap <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
