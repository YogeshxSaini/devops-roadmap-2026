'use client';

import { useEffect, useRef, useState } from 'react';

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
          theme: 'dark',
          themeVariables: {
            background: '#0A0A0B',
            primaryColor: '#111114',
            primaryTextColor: '#ECECEA',
            primaryBorderColor: '#2A2A30',
            lineColor: '#7DD3A0',
            secondaryColor: '#16161A',
            tertiaryColor: '#0D0D10',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: '12px',
          },
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
    return () => {
      cancelled = true;
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
