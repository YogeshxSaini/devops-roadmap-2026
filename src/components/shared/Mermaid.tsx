'use client';

import { useEffect, useRef, useState } from 'react';

function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function getThemeConfig(): { theme: 'base'; themeVariables: Record<string, string> } {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    return {
      theme: 'base',
      themeVariables: {
        background: readVar('--bg-raised', '#1E1E22'),
        primaryColor: readVar('--bg-overlay', '#26262B'),
        primaryTextColor: readVar('--fg-primary', '#F2F0EC'),
        primaryBorderColor: readVar('--border', '#44444B'),
        lineColor: readVar('--accent', '#7DD3A0'),
        secondaryColor: readVar('--bg-inset', '#1A1A1E'),
        tertiaryColor: readVar('--bg-base', '#141417'),
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: '12px',
      },
    };
  }
  return {
    theme: 'base',
    themeVariables: {
      background: readVar('--bg-raised', '#F8F6F2'),
      primaryColor: readVar('--bg-overlay', '#ECEAE5'),
      primaryTextColor: readVar('--fg-primary', '#1C1917'),
      primaryBorderColor: readVar('--border', '#B8B4AE'),
      lineColor: readVar('--accent', '#15803D'),
      secondaryColor: readVar('--bg-inset', '#E8E5DF'),
      tertiaryColor: readVar('--bg-base', '#F2F0EC'),
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: '12px',
    },
  };
}

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          ...getThemeConfig(),
          flowchart: { curve: 'basis', padding: 12 },
        });
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const out = await mermaid.render(id, chart);
        if (!cancelled) setSvg(out.svg);
      } catch (e: unknown) {
        if (!cancelled) setError(String(e));
      }
    }
    render();

    const observer = new MutationObserver(() => render());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [chart]);

  if (error) {
    return (
      <div className="text-mono text-xs text-rose border border-rose/30 p-3 bg-bg-raised">
        Diagram error: {error}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="mermaid-container border border-border-subtle bg-bg-raised p-4 overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
