// Compact skill authoring helper. All skills must end up typed as Skill[].
// The arrays below are intentionally terse; they're expanded into full Skill objects.

import type { Skill, SkillCategory, PathId, SkillStatus } from '../types';

export type CompactSkill = {
  id: string;
  name: string;
  summary: string;
  category: SkillCategory;
  description: string;
  whyItMatters: string;
  prerequisites: string[];
  topics: string[];
  exercises: { title: string; description: string }[];
  tools: { name: string; purpose: string }[];
  projectSlugs: string[];
  nextSkillIds: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  hours: number;
  paths: PathId[];
};

export function expand(c: CompactSkill): Skill {
  return {
    id: c.id,
    slug: c.id,
    name: c.name,
    category: c.category,
    summary: c.summary,
    description: c.description,
    whyItMatters: c.whyItMatters,
    prerequisites: c.prerequisites,
    topics: c.topics,
    exercises: c.exercises,
    tools: c.tools,
    projectSlugs: c.projectSlugs,
    nextSkillIds: c.nextSkillIds,
    difficulty: c.difficulty,
    estimatedHours: c.hours,
    pathIds: c.paths,
  };
}
