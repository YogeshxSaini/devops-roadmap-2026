import type { Skill } from '../types';
import { linuxCli } from './skills.linux-cli';
import { networking } from './skills.networking';
import { gitGithub } from './skills.git-github';
import { automation } from './skills.automation';
import { cloudFundamentals } from './skills.cloud-fundamentals';
import { aws } from './skills.aws';
import { containers } from './skills.containers';
import { cicd } from './skills.cicd';
import { kubernetes } from './skills.kubernetes';
import { helm } from './skills.helm';
import { terraform } from './skills.terraform';
import { gitops } from './skills.gitops';
import { observability } from './skills.observability';
import { devsecops } from './skills.devsecops';
import { platformEngineering } from './skills.platform-engineering';
import { aiDevops } from './skills.ai-devops';

export const ALL_SKILLS: Skill[] = [
  ...linuxCli,
  ...networking,
  ...gitGithub,
  ...automation,
  ...cloudFundamentals,
  ...aws,
  ...containers,
  ...cicd,
  ...kubernetes,
  ...helm,
  ...terraform,
  ...gitops,
  ...observability,
  ...devsecops,
  ...platformEngineering,
  ...aiDevops,
];

export const SKILLS_BY_ID: Record<string, Skill> = Object.fromEntries(
  ALL_SKILLS.map((s) => [s.id, s])
);

export const SKILLS_BY_CATEGORY: Record<string, Skill[]> = {};
for (const s of ALL_SKILLS) {
  if (!SKILLS_BY_CATEGORY[s.category]) SKILLS_BY_CATEGORY[s.category] = [];
  SKILLS_BY_CATEGORY[s.category].push(s);
}

export function totalSkillCount(): number {
  return ALL_SKILLS.length;
}

export function getSkill(id: string): Skill | undefined {
  return SKILLS_BY_ID[id];
}

export function getSkillBySlug(slug: string): Skill | undefined {
  return ALL_SKILLS.find((s) => s.slug === slug);
}

export function getRelatedSkills(skill: Skill, limit = 6): Skill[] {
  const related = new Set<string>();
  for (const p of skill.prerequisites) related.add(p);
  for (const n of skill.nextSkillIds) related.add(n);
  for (const s of skill.pathIds) {
    // add other skills in the same path that are nearby
  }
  // category siblings
  SKILLS_BY_CATEGORY[skill.category]?.forEach((s) => {
    if (s.id !== skill.id) related.add(s.id);
  });
  return Array.from(related)
    .map((id) => SKILLS_BY_ID[id])
    .filter(Boolean)
    .slice(0, limit);
}
