/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          raised: 'var(--bg-raised)',
          overlay: 'var(--bg-overlay)',
          inset: 'var(--bg-inset)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        fg: {
          primary: 'var(--fg-primary)',
          muted: 'var(--fg-muted)',
          dim: 'var(--fg-dim)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          bright: 'var(--accent-bright)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
        },
        amber: { DEFAULT: 'var(--amber)', muted: 'var(--amber-muted)' },
        sky: { DEFAULT: 'var(--sky)', muted: 'var(--sky-muted)' },
        rose: { DEFAULT: 'var(--rose)', muted: 'var(--rose-muted)' },
        status: {
          'not-started': 'var(--status-not-started)',
          learning: 'var(--status-learning)',
          practiced: 'var(--status-practiced)',
          completed: 'var(--status-completed)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h1: ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5rem, 2.5vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        h3: ['1.25rem', { lineHeight: '1.3' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.08em' }],
      },
      borderRadius: { DEFAULT: '4px', md: '6px', lg: '8px' },
      boxShadow: {
        glow: '0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent), 0 0 20px -4px color-mix(in srgb, var(--accent) 15%, transparent)',
      },
    },
  },
  plugins: [],
};
