import { TRENDS } from '@/lib';
import { TrendingUp } from 'lucide-react';

export const metadata = {
  title: '2026 Trends — DevOps Roadmap 2026',
  description: 'The eight trends that will shape DevOps, SRE, and Platform engineering in 2026.',
};

export default function TrendsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-5 py-8 sm:py-12">
      <header className="mb-10">
        <div className="eyebrow">// 2026 TRENDS</div>
        <h1 className="mt-2 text-h1 font-semibold tracking-tight">What is shifting this year</h1>
        <p className="mt-3 text-fg-muted max-w-2xl">
          Eight trends that will shape how DevOps, SRE, and Platform engineering get practiced in 2026.
        </p>
      </header>

      <div className="space-y-6">
        {TRENDS.map((t, i) => (
          <article key={t.id} className="border border-border-subtle bg-bg-raised p-6">
            <div className="flex items-start gap-4">
              <div className="text-mono text-xs text-fg-dim shrink-0 pt-0.5">
                T{String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-3 h-3 text-accent" />
                  <span className="text-mono text-[10px] text-fg-dim uppercase tracking-wider">
                    {t.year}
                  </span>
                </div>
                <h2 className="text-lg font-semibold leading-tight">{t.title}</h2>
                <p className="mt-2 text-sm text-fg-muted leading-relaxed">{t.summary}</p>
                <p className="mt-3 text-sm text-fg-primary leading-relaxed">{t.detail}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-mono text-[10px] px-1.5 py-0.5 border border-border-subtle text-fg-muted uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
