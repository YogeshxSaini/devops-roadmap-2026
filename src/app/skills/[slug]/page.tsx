import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_SKILLS, CATEGORY_META, getSkillBySlug, getRelatedSkills, RESOURCES, PROJECTS } from '@/lib';
import { SkillStatusToggle } from '@/components/skills/SkillStatusToggle';
import { ArrowLeft, ArrowRight, ExternalLink, BookOpen, Hammer, Wrench, FileCode2, Sparkles, Clock, BarChart3, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return ALL_SKILLS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return { title: 'Skill not found' };
  return {
    title: `${skill.name} — DevOps Roadmap 2026`,
    description: skill.summary,
  };
}

const DIFFICULTY_LABEL = ['', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkillBySlug(params.slug);
  if (!skill) notFound();

  const meta = CATEGORY_META[skill.category];
  const related = getRelatedSkills(skill, 4);
  const resources = RESOURCES.filter((r) => r.skillIds.includes(skill.id));
  const projects = PROJECTS.filter((p) => p.prerequisites.includes(skill.id));
  const prereqSkills = skill.prerequisites.map((id) => getSkillBySlug(id)).filter(Boolean);
  const nextSkills = skill.nextSkillIds.map((id) => getSkillBySlug(id)).filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link
        href="/skills"
        className="inline-flex items-center gap-1.5 text-mono text-xs text-fg-muted hover:text-fg-primary mb-6"
      >
        <ArrowLeft className="w-3 h-3" /> back to skills
      </Link>

      <div className="border border-border-subtle bg-bg-raised p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div
              className="eyebrow"
              style={{ color: meta.color }}
            >
              {String(meta.order).padStart(2, '0')} · {meta.label}
            </div>
            <h1 className="mt-2 text-h1 font-semibold tracking-tight">{skill.name}</h1>
            <p className="mt-3 text-fg-muted max-w-2xl leading-relaxed">{skill.summary}</p>
          </div>
          <SkillStatusToggle skillId={skill.id} />
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-mono text-xs">
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Difficulty</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3" /> L{skill.difficulty} · {DIFFICULTY_LABEL[skill.difficulty]}
            </div>
          </div>
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Time</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> {skill.estimatedHours}h
            </div>
          </div>
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Topics</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <FileCode2 className="w-3 h-3" /> {skill.topics.length}
            </div>
          </div>
          <div className="border border-border-subtle p-2.5">
            <div className="text-fg-dim text-[10px] uppercase tracking-wider">Tools</div>
            <div className="mt-1 text-fg-primary flex items-center gap-1.5">
              <Wrench className="w-3 h-3" /> {skill.tools.length}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-10">
          <Section icon={BookOpen} title="Description">
            <p className="text-fg-muted leading-relaxed">{skill.description}</p>
          </Section>

          <Section icon={Target} title="Why it matters">
            <p className="text-fg-muted leading-relaxed">{skill.whyItMatters}</p>
          </Section>

          <Section icon={FileCode2} title="What to learn">
            <ul className="space-y-2 text-sm">
              {skill.topics.map((t, i) => (
                <li key={i} className="flex gap-3 border-l border-border-subtle pl-3 hover:border-accent transition-colors">
                  <span className="text-fg-dim text-mono text-xs w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-fg-primary">{t}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Hammer} title="Hands-on exercises">
            <div className="space-y-3">
              {skill.exercises.map((ex, i) => (
                <div key={i} className="border border-border-subtle bg-bg-raised p-4">
                  <div className="text-mono text-[10px] text-fg-dim uppercase tracking-wider mb-1">
                    Exercise {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="text-sm font-semibold">{ex.title}</h4>
                  <p className="mt-1.5 text-xs text-fg-muted leading-relaxed">{ex.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Wrench} title="Recommended tools">
            <div className="grid sm:grid-cols-2 gap-2">
              {skill.tools.map((t, i) => (
                <div key={i} className="border border-border-subtle p-3">
                  <div className="text-sm font-mono font-semibold text-accent">{t.name}</div>
                  <div className="text-xs text-fg-muted mt-1">{t.purpose}</div>
                </div>
              ))}
            </div>
          </Section>

          {projects.length > 0 && (
            <Section icon={Sparkles} title="Project ideas">
              <div className="space-y-2">
                {projects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="block border border-border-subtle bg-bg-raised p-3 hover:border-accent transition-colors"
                  >
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-fg-muted mt-1">{p.summary}</div>
                    <div className="mt-2 text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                      L{p.difficulty} · {p.estimatedHours}h
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          )}
        </div>

        <aside className="space-y-6">
          {prereqSkills.length > 0 && (
            <div className="border border-border-subtle bg-bg-raised p-4">
              <div className="eyebrow text-fg-muted">Prerequisites</div>
              <ul className="mt-3 space-y-1.5">
                {prereqSkills.map((s) => s && (
                  <li key={s.id}>
                    <Link
                      href={`/skills/${s.slug}`}
                      className="text-sm text-fg-muted hover:text-accent flex items-center gap-1.5"
                    >
                      <span className="text-fg-dim">›</span> {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {nextSkills.length > 0 && (
            <div className="border border-border-subtle bg-bg-raised p-4">
              <div className="eyebrow text-accent">Next skill</div>
              <ul className="mt-3 space-y-1.5">
                {nextSkills.map((s) => s && (
                  <li key={s.id}>
                    <Link
                      href={`/skills/${s.slug}`}
                      className="text-sm text-fg-primary hover:text-accent flex items-center gap-1.5"
                    >
                      <span className="text-accent">→</span> {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resources.length > 0 && (
            <div className="border border-border-subtle bg-bg-raised p-4">
              <div className="eyebrow text-fg-muted">Resources</div>
              <ul className="mt-3 space-y-2.5">
                {resources.map((r) => (
                  <li key={r.id}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-fg-primary hover:text-accent flex items-start gap-1.5 group"
                    >
                      <span className="mt-0.5 text-fg-dim group-hover:text-accent">
                        <ExternalLink className="w-3 h-3" />
                      </span>
                      <span>
                        {r.title}
                        <span className="block text-[10px] text-fg-dim uppercase tracking-wider font-mono">
                          {r.type}{r.free ? ' · free' : ''}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {related.length > 0 && (
            <div className="border border-border-subtle bg-bg-raised p-4">
              <div className="eyebrow text-fg-muted">Related</div>
              <ul className="mt-3 space-y-1.5">
                {related.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/skills/${s.slug}`}
                      className="text-sm text-fg-muted hover:text-accent flex items-center gap-1.5"
                    >
                      <span className="text-fg-dim">›</span> {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {(prereqSkills.length > 0 || nextSkills.length > 0) && (
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border-subtle">
          {prereqSkills[0] ? (
            <Link
              href={`/skills/${prereqSkills[0].slug}`}
              className="inline-flex items-center gap-2 text-mono text-xs text-fg-muted hover:text-fg-primary"
            >
              <ArrowLeft className="w-3 h-3" /> {prereqSkills[0].name}
            </Link>
          ) : <span />}
          {nextSkills[0] ? (
            <Link
              href={`/skills/${nextSkills[0].slug}`}
              className="inline-flex items-center gap-2 text-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent/10"
            >
              Next: {nextSkills[0].name} <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent/10"
            >
              Back to skills <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-3.5 h-3.5 text-accent" />
        <h2 className="eyebrow text-fg-muted">{title}</h2>
      </div>
      {children}
    </section>
  );
}
