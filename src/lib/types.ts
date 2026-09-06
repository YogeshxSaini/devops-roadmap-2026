export type SkillStatus = 'not-started' | 'learning' | 'practiced' | 'completed';

export type SkillCategory =
  | 'linux-cli'
  | 'networking'
  | 'git-github'
  | 'automation'
  | 'cloud-fundamentals'
  | 'aws'
  | 'containers'
  | 'cicd'
  | 'kubernetes'
  | 'helm'
  | 'iac-terraform'
  | 'gitops'
  | 'observability'
  | 'devsecops'
  | 'platform-engineering'
  | 'ai-devops';

export type PathId = 'beginner' | 'devops-engineer' | 'sre' | 'platform-engineer';

export interface Skill {
  id: string;
  slug: string;
  name: string;
  category: SkillCategory;
  summary: string;
  description: string;
  whyItMatters: string;
  prerequisites: string[];
  topics: string[];
  exercises: { title: string; description: string }[];
  tools: { name: string; purpose: string }[];
  projectSlugs: string[];
  nextSkillIds: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedHours: number;
  pathIds: PathId[];
}

export interface LearningPath {
  id: PathId;
  slug: string;
  name: string;
  audience: string;
  summary: string;
  skillSequence: string[];
  estimatedHours: number;
  outcomes: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  summary: string;
  architecture: string;
  prerequisites: string[];
  technologies: { name: string; role: string }[];
  requirements: string[];
  milestones: { title: string; description: string }[];
  outcome: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedHours: number;
}

export interface Resource {
  id: string;
  type: 'doc' | 'video' | 'course' | 'book' | 'tool' | 'repo';
  title: string;
  url: string;
  description: string;
  skillIds: string[];
  free: boolean;
}

export type ProgressState = Record<string, SkillStatus>;

export const CATEGORY_META: Record<
  SkillCategory,
  { label: string; short: string; color: string; order: number }
> = {
  'linux-cli': { label: 'Linux & CLI', short: 'LIN', color: '#7DD3A0', order: 1 },
  networking: { label: 'Networking', short: 'NET', color: '#7AB8E8', order: 2 },
  'git-github': { label: 'Git & GitHub', short: 'GIT', color: '#E8B86D', order: 3 },
  automation: { label: 'Bash / Python', short: 'AUT', color: '#C4A8E8', order: 4 },
  'cloud-fundamentals': { label: 'Cloud Fundamentals', short: 'CLD', color: '#8DD3E8', order: 5 },
  aws: { label: 'AWS', short: 'AWS', color: '#E8B86D', order: 6 },
  containers: { label: 'Docker & Containers', short: 'DOK', color: '#7AB8E8', order: 7 },
  cicd: { label: 'CI/CD', short: 'CIC', color: '#7DD3A0', order: 8 },
  kubernetes: { label: 'Kubernetes', short: 'K8S', color: '#7AB8E8', order: 9 },
  helm: { label: 'Helm', short: 'HLM', color: '#C4A8E8', order: 10 },
  'iac-terraform': { label: 'Terraform / IaC', short: 'TFR', color: '#E88A8A', order: 11 },
  gitops: { label: 'GitOps', short: 'GOP', color: '#7DD3A0', order: 12 },
  observability: { label: 'Observability', short: 'OBS', color: '#E8B86D', order: 13 },
  devsecops: { label: 'DevSecOps', short: 'SEC', color: '#E88A8A', order: 14 },
  'platform-engineering': { label: 'Platform Engineering', short: 'PLT', color: '#C4A8E8', order: 15 },
  'ai-devops': { label: 'AI × DevOps', short: 'AIO', color: '#8DD3E8', order: 16 },
};
