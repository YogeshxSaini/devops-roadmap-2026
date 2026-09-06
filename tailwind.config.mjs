/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0B',
          raised: '#111114',
          overlay: '#16161A',
          inset: '#0D0D10',
        },
        border: {
          subtle: '#1F1F23',
          DEFAULT: '#2A2A30',
          strong: '#3A3A42',
        },
        fg: {
          primary: '#ECECEA',
          muted: '#8C8C88',
          dim: '#5A5A55',
        },
        accent: {
          DEFAULT: '#7DD3A0',
          hover: '#92DBB0',
          muted: '#3A6B4F',
        },
        amber: { DEFAULT: '#E8B86D', muted: '#6B4F1F' },
        sky: { DEFAULT: '#7AB8E8', muted: '#1F4A6B' },
        rose: { DEFAULT: '#E88A8A', muted: '#6B1F1F' },
        status: {
          'not-started': '#5A5A55',
          learning: '#E8B86D',
          practiced: '#7AB8E8',
          completed: '#7DD3A0',
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
        glow: '0 0 0 1px rgba(125, 211, 160, 0.2), 0 0 20px -4px rgba(125, 211, 160, 0.15)',
      },
    },
  },
  plugins: [],
};
