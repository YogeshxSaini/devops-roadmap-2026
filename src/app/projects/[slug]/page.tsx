import Link from 'next/link';
import { PROJECTS, getProject, getSkill } from '@/lib';
import { ArrowLeft, Clock, BarChart3, Layers, Wrench, Target, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Mermaid } from '@/components/shared/Mermaid';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) return { title: 'Project not found' };
  return { title: `${p.name} — DevOps Roadmap 2026`, description: p.summary };
}

const DIFFICULTY_LABEL = ['', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-mono text-xs text-fg-muted hover:text-fg-primary mb-6"
      >
        <ArrowLeft className="w-3 h-3" /> all projects
      </Link>

      <header className="border border-border-subtle bg-bg-raised p-6">
        <div className="eyebrow text-amber">PROJECT</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">{project.name}</h1>
        <p className="mt-3 text-fg-muted max-w-2xl leading-relaxed">{project.summary}</p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-mono text-xs">
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Difficulty</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3" /> L{project.difficulty} · {DIFFICULTY_LABEL[project.difficulty]}
            </div>
          </div>
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Time</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> ~{project.estimatedHours}h
            </div>
          </div>
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Milestones</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <Target className="w-3 h-3" /> {project.milestones.length}
            </div>
          </div>
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Tech</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <Wrench className="w-3 h-3" /> {project.technologies.length}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-3.5 h-3.5 text-accent" />
          <h2 className="eyebrow text-fg-muted">Architecture</h2>
        </div>
        <Mermaid chart={project.architecture} />
      </section>

      <div className="mt-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <div className="eyebrow text-fg-muted mb-3">// MILESTONES</div>
            <ol className="space-y-3">
              {project.milestones.map((m, i) => (
                <li key={i} className="border border-border-subtle bg-bg-raised p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-mono text-xs text-accent shrink-0 mt-0.5">
                      M{String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold">{m.title}</h4>
                      <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <div className="eyebrow text-fg-muted mb-3">// EXPECTED OUTCOME</div>
            <div className="border border-accent/30 bg-accent/5 p-4 flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="text-sm text-fg-primary leading-relaxed">{project.outcome}</p>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="border border-border-subtle bg-bg-raised p-4">
            <div className="eyebrow text-fg-muted">Technologies</div>
            <ul className="mt-3 space-y-2.5">
              {project.technologies.map((t, i) => (
                <li key={i} className="text-sm">
                  <div className="font-mono text-accent text-xs">{t.name}</div>
                  <div className="text-fg-muted text-xs mt-0.5">{t.role}</div>
                </li>
              ))}
            </ul>
          </div>

          {project.requirements.length > 0 && (
            <div className="border border-border-subtle bg-bg-raised p-4">
              <div className="eyebrow text-fg-muted">Requirements</div>
              <ul className="mt-3 space-y-1.5 text-xs text-fg-muted">
                {project.requirements.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-fg-dim">›</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.prerequisites.length > 0 && (
            <div className="border border-border-subtle bg-bg-raised p-4">
              <div className="eyebrow text-fg-muted">Prerequisite skills</div>
              <ul className="mt-3 space-y-1.5">
                {project.prerequisites.map((id) => {
                  const skill = getSkill(id);
                  if (!skill) return null;
                  return (
                    <li key={id}>
                      <Link
                        href={`/skills/${skill.slug}`}
                        className="text-xs text-fg-muted hover:text-accent flex items-center gap-1.5"
                      >
                        <span className="text-fg-dim">›</span> {skill.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
