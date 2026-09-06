'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const nav = [
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/skills', label: 'Skills' },
  { href: '/paths', label: 'Paths' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg-base/85 backdrop-blur border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-5 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-7 h-7 border border-border bg-bg-raised group-hover:border-accent transition-colors">
            <Terminal className="w-3.5 h-3.5 text-accent" />
          </span>
          <span className="text-mono text-sm font-medium tracking-tight">
            devops<span className="text-fg-muted">/</span>roadmap
            <span className="text-accent">.2026</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {nav.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + '/');
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  'px-3 py-1.5 border border-transparent text-fg-muted hover:text-fg-primary hover:border-border-subtle transition-colors',
                  active && 'text-fg-primary border-border bg-bg-raised'
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/roadmap"
            className="hidden sm:inline-flex items-center gap-1.5 text-mono text-xs px-3 py-1.5 border border-accent text-accent hover:bg-accent/10 transition-colors"
          >
            Start <span className="text-fg-muted">→</span>
          </Link>
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 border border-border-subtle"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border-subtle bg-bg-raised">
          <div className="mx-auto max-w-7xl px-5 py-2 flex flex-col">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-fg-muted hover:text-fg-primary border-b border-border-subtle last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
