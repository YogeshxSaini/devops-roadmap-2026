export const metadata = {
  title: 'About — DevOps Roadmap 2026',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-5 py-8 sm:py-12">
      <header className="mb-10">
        <div className="eyebrow">// ABOUT</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">A roadmap, not a curriculum</h1>
      </header>

      <div className="prose-custom space-y-6 text-fg-primary leading-relaxed">
        <p>
          DevOps Roadmap 2026 is an opinionated, interactive path through the skills that matter for
          DevOps, SRE, and Platform engineering in 2026. It is built on a single principle:
        </p>
        <blockquote className="border-l-2 border-accent pl-4 italic text-fg-muted">
          Concepts first. Tools second.
        </blockquote>
        <p>
          Tools change every year. Concepts — the OSI model, declarative state, reconciliation loops,
          the three pillars of observability, the shared responsibility model — outlast them. Once
          you understand the concept, a new tool is a week of learning, not a quarter.
        </p>

        <h2 className="text-h2 font-semibold mt-10">What this is not</h2>
        <ul className="space-y-2 text-fg-muted">
          <li>· It is not a course. There are no videos, no quizzes, no certificate.</li>
          <li>· It is not a job guarantee. It is a path, not a destination.</li>
          <li>· It is not vendor-affiliated. Every recommendation is on its merits.</li>
        </ul>

        <h2 className="text-h2 font-semibold mt-10">How to use it</h2>
        <p>
          Pick a path. Mark skills as you go. Build the projects. Read the resources. The interactive
          roadmap is the fastest way to see the whole shape; the skill pages are the slow way to go
          deep.
        </p>
        <p>
          The site is intentionally quiet. No popups, no emails, no upsell. Just the work.
        </p>

        <h2 className="text-h2 font-semibold mt-10">Contributing</h2>
        <p>
          The content is open source. Spot a mistake? Open an issue. Want to suggest a skill? Open a
          PR. The roadmap is what the community makes of it.
        </p>

        <div className="mt-12 border border-border-subtle bg-bg-raised p-6 text-mono text-xs text-fg-muted">
          <div className="text-fg-primary mb-2">// build info</div>
          <div>v2026.09 · next.js · typescript · tailwind</div>
          <div>skills: 142 · paths: 4 · projects: 8 · resources: 25</div>
        </div>
      </div>
    </div>
  );
}
