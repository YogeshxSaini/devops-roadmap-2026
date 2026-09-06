import Link from 'next/link';

const sections = [
  {
    title: 'Learn',
    items: [
      { href: '/roadmap', label: 'Roadmap' },
      { href: '/skills', label: 'Skills' },
      { href: '/paths', label: 'Learning Paths' },
    ],
  },
  {
    title: 'Build',
    items: [
      { href: '/projects', label: 'Projects' },
      { href: '/trends', label: '2026 Trends' },
    ],
  },
  {
    title: 'About',
    items: [
      { href: '/resources', label: 'Resources' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-32">
      <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="text-mono text-sm font-medium">
            devops<span className="text-fg-muted">/</span>roadmap
            <span className="text-accent">.2026</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted max-w-xs">
            A production-quality interactive roadmap for DevOps, SRE, and Platform engineers.
            Concepts first. Tools second.
          </p>
          <p className="mt-4 text-mono text-xs text-fg-dim">
            v2026.09 · built with care
          </p>
        </div>
        {sections.map((s) => (
          <div key={s.title}>
            <div className="eyebrow text-fg-muted">{s.title}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {s.items.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-fg-muted hover:text-fg-primary">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border-subtle">
        <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-mono text-xs text-fg-dim">
          <span>// {new Date().getFullYear()} — open roadmap, free forever</span>
          <span className="sm:ml-auto text-fg-muted">
            <span className="text-accent">●</span> status: open-source
          </span>
        </div>
      </div>
    </footer>
  );
}
