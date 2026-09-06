import type { MetadataRoute } from 'next';
import { ALL_SKILLS, LEARNING_PATHS, PROJECTS } from '@/lib';

const SITE = 'https://devopsroadmap.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/roadmap`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/skills`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/paths`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/trends`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  const skillRoutes: MetadataRoute.Sitemap = ALL_SKILLS.map((s) => ({
    url: `${SITE}/skills/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const pathRoutes: MetadataRoute.Sitemap = LEARNING_PATHS.map((p) => ({
    url: `${SITE}/paths/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...skillRoutes, ...pathRoutes, ...projectRoutes];
}
