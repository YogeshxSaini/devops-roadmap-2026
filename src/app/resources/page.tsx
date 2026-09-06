import Link from 'next/link';
import { RESOURCES, ALL_SKILLS } from '@/lib';
import { ExternalLink, BookOpen, Video, FileText, Wrench, Github, GraduationCap } from 'lucide-react';
import type { Resource } from '@/lib/types';

export const metadata = {
  title: 'Resources — DevOps Roadmap 2026',
  description: 'Curated, opinionated learning resources. Books, docs, courses, tools — only the best.',
};

const ICON: Record<Resource['type'], React.ComponentType<{ className?: string }>> = {
  doc: FileText,
  video: Video,
  course: GraduationCap,
  book: BookOpen,
  tool: Wrench,
  repo: Github,
};

const TYPE_LABEL: Record<Resource['type'], string> = {
  doc: 'Doc',
  video: 'Video',
  course: 'Course',
  book: 'Book',
  tool: 'Tool',
  repo: 'Repo',
};

export default function ResourcesPage() {
  // group by type
  const byType: Record<string, Resource[]> = {};
  for (const r of RESOURCES) {
    if (!byType[r.type]) byType[r.type] = [];
    byType[r.type].push(r);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <header className="mb-10">
        <div className="eyebrow">// RESOURCES</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">Curated learning</h1>
        <p className="mt-3 text-fg-muted max-w-2xl">
          The books, docs, courses, and tools that are actually worth your time. Updated for 2026.
        </p>
      </header>

      {Object.entries(byType).map(([type, items]) => {
        const Icon = ICON[type as Resource['type']];
        return (
          <section key={type} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-3.5 h-3.5 text-accent" />
              <h2 className="eyebrow text-fg-muted">{TYPE_LABEL[type as Resource['type']]}s</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block border border-border-subtle bg-bg-raised hover:border-accent p-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold group-hover:text-accent transition-colors leading-tight">
                      {r.title}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-fg-dim group-hover:text-accent shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-fg-muted leading-relaxed">{r.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-mono text-[10px] px-1.5 py-0.5 border border-border-subtle uppercase tracking-wider">
                      {r.free ? 'free' : 'paid'}
                    </span>
                    {r.skillIds.slice(0, 3).map((id) => {
                      const s = ALL_SKILLS.find((x) => x.id === id);
                      if (!s) return null;
                      return (
                        <Link
                          key={id}
                          href={`/skills/${s.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-mono text-[10px] px-1.5 py-0.5 border border-border-subtle text-fg-muted hover:text-accent"
                        >
                          {s.name}
                        </Link>
                      );
                    })}
                    {r.skillIds.length > 3 && (
                      <span className="text-mono text-[10px] text-fg-dim">+{r.skillIds.length - 3}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
