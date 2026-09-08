import Link from 'next/link';
import { LEARNING_PATHS, PROJECTS, ALL_SKILLS, CATEGORY_META, TRENDS, totalSkillCount } from '@/lib';
import { ArrowRight, Terminal, BookOpen, Hammer, Wrench, Award, BookOpenCheck, Boxes, Activity } from 'lucide-react';
import { FadeUp, Stagger } from '@/components/shared/Reveal';

export default function Home() {
  const totalSkills = totalSkillCount();
  const totalCategories = Object.keys(CATEGORY_META).length;
  const totalPaths = LEARNING_PATHS.length;
  const totalProjects = PROJECTS.length;

  return (
    <>
      <Hero totalSkills={totalSkills} />
      <Philosophy />
      <RoadmapPreview />
      <ChoosePath />
      <SkillProgression />
      <ProjectsPreview />
      <TrendsPreview />
      <FaqTeaser />
      <FinalCta />
    </>
  );
}

function Hero({ totalSkills }: { totalSkills: number }) {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(125, 211, 160, 0.08), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <FadeUp>
          <div className="text-mono text-xs text-fg-dim mb-6">
            <span className="text-accent">●</span> v2026.09 — {totalSkills} skills · 4 paths · 8 projects
          </div>

          <h1 className="text-display font-semibold tracking-tight max-w-4xl">
            DevOps <span className="text-fg-muted">Roadmap</span> <span className="text-accent">2026</span>
          </h1>

          <p className="mt-6 text-xl text-fg-muted max-w-2xl leading-relaxed">
            Learn the skills. Build real systems. Become production-ready.
          </p>

          <p className="mt-6 text-sm text-fg-dim max-w-2xl leading-relaxed">
            An opinionated, interactive path through DevOps, SRE, and Platform engineering.
            Concepts first. Tools second. No fluff, no upsell, no purple gradients.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-mono text-sm px-5 py-2.5 border border-accent text-accent hover:bg-accent/10"
            >
              Start the Roadmap <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-mono text-sm px-5 py-2.5 border border-border bg-bg-raised text-fg-primary hover:border-accent"
            >
              Explore the Skills
            </Link>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-16 border border-border-subtle bg-bg-raised max-w-3xl">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border-subtle">
              <span className="w-2 h-2 bg-rose" />
              <span className="w-2 h-2 bg-amber" />
              <span className="w-2 h-2 bg-accent" />
              <span className="text-mono text-[10px] text-fg-dim ml-2">~/devops-roadmap-2026</span>
            </div>
            <pre className="px-4 py-4 text-mono text-xs leading-relaxed text-fg-primary overflow-x-auto">
              <code>
                <span className="text-fg-dim">$</span> <span className="text-accent">./start</span> --path=devops-engineer{'\n'}
                <span className="text-fg-dim">→</span> Loaded <span className="text-amber">{totalSkills}</span> skills across 16 categories{'\n'}
                <span className="text-fg-dim">→</span> Estimated time: <span className="text-sky">~700h</span> · spread over 6-12 months{'\n'}
                <span className="text-fg-dim">→</span> Begin with: <span className="text-accent">Linux & the Shell</span>
                <span className="cursor-blink" />
              </code>
            </pre>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Philosophy() {
  const pillars = [
    {
      icon: BookOpen,
      title: 'Learn',
      color: '#7DD3A0',
      body: 'Concepts first, then tools. Every skill comes with the why before the how.',
    },
    {
      icon: Hammer,
      title: 'Practice',
      color: '#E8B86D',
      body: 'Hands-on exercises for every skill. You do not move on until you have done it.',
    },
    {
      icon: Wrench,
      title: 'Build',
      color: '#7AB8E8',
      body: 'Eight progressively harder projects. From "ship a static site" to "build a platform".',
    },
    {
      icon: Award,
      title: 'Prove',
      color: '#C4A8E8',
      body: 'A portfolio of working systems. A track record. Things you can show in an interview.',
    },
  ];
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          <FadeUp>
            <div>
              <div className="eyebrow">// PHILOSOPHY</div>
              <h2 className="mt-2 text-h2 font-semibold tracking-tight">Learn → Practice → Build → Prove</h2>
              <p className="mt-3 text-sm text-fg-muted leading-relaxed">
                The loop that turns a curious engineer into a job-ready one. Every skill in this roadmap
                is tagged with at least one exercise, and at least one project proves it in context.
              </p>
            </div>
          </FadeUp>
          <Stagger className="grid sm:grid-cols-2 gap-3">
            {pillars.map((p, i) => (
              <div key={i} className="border border-border-subtle bg-bg-raised p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5" style={{ background: p.color }} />
                  <span className="text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p.icon className="w-5 h-5 mb-3" style={{ color: p.color }} />
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function RoadmapPreview() {
  const cats = Object.values(CATEGORY_META).sort((a, b) => a.order - b.order);
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="eyebrow">// INTERACTIVE ROADMAP</div>
            <h2 className="mt-2 text-h2 font-semibold tracking-tight">16 categories, 142 skills</h2>
            <p className="mt-3 text-fg-muted max-w-2xl text-sm leading-relaxed">
              Pan, zoom, click. Mark skills as you go. The full graph is one click away.
            </p>
          </div>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 text-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent/10"
          >
            Open full roadmap <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="border border-border-subtle bg-bg-raised p-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-border-subtle">
            {cats.map((c) => {
              const count = ALL_SKILLS.filter((s) => s.category === (
                c.label === 'Linux & CLI' ? 'linux-cli' :
                c.label === 'Networking' ? 'networking' :
                c.label === 'Git & GitHub' ? 'git-github' :
                c.label === 'Bash / Python' ? 'automation' :
                c.label === 'Cloud Fundamentals' ? 'cloud-fundamentals' :
                c.label === 'AWS' ? 'aws' :
                c.label === 'Docker & Containers' ? 'containers' :
                c.label === 'CI/CD' ? 'cicd' :
                c.label === 'Kubernetes' ? 'kubernetes' :
                c.label === 'Helm' ? 'helm' :
                c.label === 'Terraform / IaC' ? 'iac-terraform' :
                c.label === 'GitOps' ? 'gitops' :
                c.label === 'Observability' ? 'observability' :
                c.label === 'DevSecOps' ? 'devsecops' :
                c.label === 'Platform Engineering' ? 'platform-engineering' :
                'ai-devops'
              )).length;
              return (
                <Link
                  key={c.label}
                  href="/roadmap"
                  className="bg-bg-raised p-3 hover:bg-bg-overlay transition-colors text-left"
                >
                  <div className="text-mono text-[9px] text-fg-dim mb-1">
                    {String(c.order).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-mono" style={{ color: c.color }}>
                    {c.short}
                  </div>
                  <div className="text-[10px] text-fg-muted mt-1 truncate">{c.label}</div>
                  <div className="text-mono text-[9px] text-fg-dim mt-1">{count} skills</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChoosePath() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-20">
        <div className="mb-10">
          <div className="eyebrow">// CHOOSE YOUR PATH</div>
          <h2 className="mt-2 text-h2 font-semibold tracking-tight">Four ways in</h2>
          <p className="mt-3 text-fg-muted max-w-2xl text-sm leading-relaxed">
            Different starting points, different end goals. Pick the one that matches where you are and where you want to go.
          </p>
        </div>

        <Stagger className="grid md:grid-cols-2 gap-4">
          {LEARNING_PATHS.map((p, i) => (
            <Link
              key={p.id}
              href={`/paths/${p.slug}`}
              className="group block border border-border-subtle bg-bg-raised hover:border-accent p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                  Path {String(i + 1).padStart(2, '0')}
                </div>
                <ArrowRight className="w-4 h-4 text-fg-dim group-hover:text-accent" />
              </div>
              <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {p.name}
              </h3>
              <p className="mt-1 text-xs text-fg-muted">{p.audience}</p>
              <p className="mt-3 text-sm text-fg-primary leading-relaxed">{p.summary}</p>
              <div className="mt-4 text-mono text-[10px] text-fg-dim">
                {p.skillSequence.length} skills · ~{p.estimatedHours}h
              </div>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SkillProgression() {
  const sample = [
    { name: 'Linux & the Shell', status: 'completed', cat: 'linux-cli' },
    { name: 'Git Fundamentals', status: 'completed', cat: 'git-github' },
    { name: 'Docker Fundamentals', status: 'practiced', cat: 'containers' },
    { name: 'Kubernetes Architecture', status: 'learning', cat: 'kubernetes' },
    { name: 'Terraform Fundamentals', status: 'not-started', cat: 'iac-terraform' },
  ];
  const dot = (s: string) =>
    s === 'completed' ? 'bg-accent' : s === 'practiced' ? 'bg-sky' : s === 'learning' ? 'bg-amber' : 'bg-fg-dim';
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <div className="eyebrow">// SKILL PROGRESSION</div>
            <h2 className="mt-2 text-h2 font-semibold tracking-tight">A track record, not a checklist</h2>
            <p className="mt-3 text-fg-muted text-sm leading-relaxed">
              Every skill has four states: <span className="text-fg-dim">Not started</span>,{' '}
              <span className="text-amber">Learning</span>,{' '}
              <span className="text-sky">Practiced</span>,{' '}
              <span className="text-accent">Completed</span>. Progress is saved locally; no account needed.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-accent">›</span> <span>Track 142+ skills across 16 categories</span></li>
              <li className="flex gap-2"><span className="text-accent">›</span> <span>See overall progress in the header</span></li>
              <li className="flex gap-2"><span className="text-accent">›</span> <span>Filter the roadmap by what you have finished</span></li>
            </ul>
          </div>
          <div className="border border-border-subtle bg-bg-raised p-4">
            <div className="text-mono text-[10px] text-fg-dim mb-3">SAMPLE LEARNER</div>
            <div className="space-y-2">
              {sample.map((s) => (
                <div key={s.name} className="flex items-center gap-3 border border-border-subtle p-2.5">
                  <span className={`w-2 h-2 ${dot(s.status)}`} />
                  <span className="flex-1 text-sm">{s.name}</span>
                  <span className="text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                    {s.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border-subtle text-mono text-xs text-fg-muted flex justify-between">
              <span>2 / 5 completed</span>
              <span className="text-accent">40%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="eyebrow">// PROJECTS</div>
            <h2 className="mt-2 text-h2 font-semibold tracking-tight">Eight projects, real systems</h2>
            <p className="mt-3 text-fg-muted max-w-2xl text-sm leading-relaxed">
              Not toy problems. Each project proves a real-world capability, with milestones, an architecture diagram, and an expected outcome.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent/10"
          >
            See all projects <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROJECTS.slice(0, 4).map((p, i) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="group block border border-border-subtle bg-bg-raised hover:border-accent p-4 transition-colors"
            >
              <div className="text-mono text-[10px] text-fg-dim mb-2">P{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-sm font-semibold leading-tight group-hover:text-accent transition-colors min-h-[2.5em]">
                {p.name}
              </h3>
              <p className="mt-2 text-xs text-fg-muted line-clamp-2 leading-relaxed">{p.summary}</p>
              <div className="mt-3 text-mono text-[10px] text-fg-dim">
                ~{p.estimatedHours}h · L{p.difficulty}
              </div>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function TrendsPreview() {
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 py-20">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
          <div>
            <div className="eyebrow">// 2026 TRENDS</div>
            <h2 className="mt-2 text-h2 font-semibold tracking-tight">What is shifting this year</h2>
            <p className="mt-3 text-fg-muted text-sm leading-relaxed">
              The roadmap is built for 2026, not 2022. Eight trends that change how DevOps, SRE, and Platform engineering get practiced.
            </p>
            <Link
              href="/trends"
              className="mt-5 inline-flex items-center gap-2 text-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent/10"
            >
              Read all 8 trends <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <Stagger className="space-y-2">
            {TRENDS.slice(0, 4).map((t) => (
              <div key={t.id} className="border border-border-subtle bg-bg-raised p-4">
                <div className="text-mono text-[10px] text-fg-dim uppercase tracking-wider mb-1">
                  {t.year} · {t.tags.join(' · ')}
                </div>
                <h3 className="text-sm font-semibold leading-tight">{t.title}</h3>
                <p className="mt-1.5 text-xs text-fg-muted line-clamp-2 leading-relaxed">{t.summary}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function FaqTeaser() {
  const faqs = [
    { q: 'How long will this take?', a: '6-12 months of focused study for the full path.' },
    { q: 'Do I need to pay for anything?', a: 'No. Every skill can be learned with free tools and free tiers.' },
    { q: 'Why concepts before tools?', a: 'Concepts outlast tools. Pick up new tools in a week, not a quarter.' },
  ];
  return (
    <section className="border-b border-border-subtle">
      <div className="mx-auto max-w-4xl px-4 sm:px-5 py-20">
        <div className="eyebrow">// FAQ</div>
        <h2 className="mt-2 text-h2 font-semibold tracking-tight">Common questions</h2>
        <div className="mt-6 border border-border-subtle divide-y divide-border-subtle">
          {faqs.map((f, i) => (
            <details key={i} className="group">
              <summary className="cursor-pointer p-4 flex items-center justify-between gap-3 text-sm font-medium hover:bg-bg-raised">
                <span>{f.q}</span>
                <span className="text-fg-dim group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-fg-muted leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-6 inline-flex items-center gap-2 text-mono text-xs text-fg-muted hover:text-fg-primary"
        >
          See all questions <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-5 py-20 sm:py-28 text-center">
        <div className="inline-block border border-accent text-accent text-mono text-xs px-3 py-1.5 uppercase tracking-wider">
          ready to start?
        </div>
        <h2 className="mt-6 text-h1 font-semibold tracking-tight">
          Production-ready in 12 months.
        </h2>
        <p className="mt-4 text-fg-muted max-w-xl mx-auto text-sm leading-relaxed">
          No fluff. No purple gradients. No upsell. Just the skills, the projects, and the path.
        </p>
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 text-mono text-sm px-5 py-2.5 border border-accent text-accent hover:bg-accent/10"
          >
            Start the Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/paths"
            className="inline-flex items-center gap-2 text-mono text-sm px-5 py-2.5 border border-border bg-bg-raised text-fg-primary hover:border-accent"
          >
            Choose a Path
          </Link>
        </div>
      </div>
    </section>
  );
}
