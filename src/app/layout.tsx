import type { Metadata } from 'next';
import './globals.css';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';
import { ProgressProvider } from '@/components/layout/ProgressProvider';

export const metadata: Metadata = {
  title: 'DevOps Roadmap 2026 — Learn, Build, Become Production-Ready',
  description:
    'An interactive, production-quality roadmap from beginner to job-ready DevOps, SRE, and Platform engineer. Concepts first. Tools second.',
  metadataBase: new URL('https://devopsroadmap.dev'),
  openGraph: {
    title: 'DevOps Roadmap 2026',
    description: 'Learn the skills. Build real systems. Become production-ready.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <ProgressProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-bg-raised focus:px-3 focus:py-2 focus:border focus:border-accent">
            Skip to content
          </a>
          <TopNav />
          <ProgressIndicator />
          <main id="main">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
