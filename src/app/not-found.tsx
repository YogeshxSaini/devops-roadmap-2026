import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';
import { ButtonLink } from '@/components/ui';

export const metadata = {
  title: '404 — DevOps Roadmap 2026',
};

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(232, 184, 109, 0.08), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-5 py-16 sm:py-28 text-center">
        <div className="inline-flex items-center gap-2 text-mono text-xs text-fg-dim border border-border-subtle bg-bg-raised px-3 py-1.5">
          <Terminal className="w-3 h-3 text-amber" />
          <span>$ route --resolve</span>
        </div>
        <h1 className="mt-8 text-display font-semibold tracking-tight">
          404<span className="text-fg-muted">.</span>
        </h1>
        <p className="mt-4 text-fg-muted text-sm max-w-md mx-auto leading-relaxed">
          That path does not exist in the roadmap. The skill or project you are looking for may have
          moved, or the link is wrong.
        </p>

        <div className="mt-10 border border-border-subtle bg-bg-raised max-w-xl mx-auto text-left">
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border-subtle">
            <span className="w-2 h-2 bg-rose" />
            <span className="w-2 h-2 bg-amber" />
            <span className="w-2 h-2 bg-accent" />
            <span className="text-mono text-[10px] text-fg-dim ml-2">~/devops-roadmap-2026</span>
          </div>
          <pre className="px-4 py-4 text-mono text-xs leading-relaxed text-fg-primary overflow-x-auto">
            <code>
              <span className="text-fg-dim">$</span> <span className="text-amber">grep</span> -r &quot;{`{your query}`}&quot; /roadmap{'\n'}
              <span className="text-rose">error</span>: no matches found{'\n'}
              <span className="text-fg-dim">→</span> try one of these:
            </code>
          </pre>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink variant="primary" size="lg">
            <Link href="/roadmap" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to the roadmap
            </Link>
          </ButtonLink>
          <ButtonLink variant="secondary" size="lg">
            <Link href="/skills" className="inline-flex items-center gap-2">
              Browse all skills
            </Link>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
