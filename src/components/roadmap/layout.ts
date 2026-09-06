import { ALL_SKILLS, CATEGORY_META, type SkillCategory, type Skill } from '@/lib';
import type { SkillStatus } from '@/lib/types';

export interface RoadmapNode {
  id: string;
  name: string;
  category: SkillCategory;
  x: number;
  y: number;
  col: number;
  row: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hours: number;
  status: SkillStatus;
  skill: Skill;
}

export interface RoadmapCluster {
  category: SkillCategory;
  label: string;
  short: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  order: number;
}

export interface RoadmapEdge {
  from: string;
  to: string;
}

export interface RoadmapLayout {
  clusters: RoadmapCluster[];
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  bounds: { width: number; height: number };
}

const NODE_W = 220;
const NODE_H = 64;
const COL_GAP = 32;
const ROW_GAP = 16;
const CLUSTER_PAD = 28;
const CLUSTER_GAP_X = 60;
const CLUSTER_GAP_Y = 80;

function buildLayout(progress: Record<string, SkillStatus>): RoadmapLayout {
  const categories: SkillCategory[] = (Object.keys(CATEGORY_META) as SkillCategory[])
    .sort((a, b) => CATEGORY_META[a].order - CATEGORY_META[b].order);

  const clusters: RoadmapCluster[] = [];
  const nodes: RoadmapNode[] = [];
  const edges: RoadmapEdge[] = [];

  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;
  let maxX = 0;
  let maxY = 0;
  const COLS = 4;
  let col = 0;
  let row = 0;

  for (const cat of categories) {
    const meta = CATEGORY_META[cat];
    const skills = ALL_SKILLS.filter((s) => s.category === cat);

    const rows = Math.ceil(skills.length / COLS);
    const clusterW = COLS * NODE_W + (COLS - 1) * COL_GAP + CLUSTER_PAD * 2;
    const clusterH = rows * NODE_H + (rows - 1) * ROW_GAP + CLUSTER_PAD * 2 + 36; // 36 for title

    if (col >= COLS) {
      col = 0;
      row++;
    }

    const x = col * (clusterW + CLUSTER_GAP_X);
    const y = row * (clusterH + CLUSTER_GAP_Y);

    clusters.push({
      category: cat,
      label: meta.label,
      short: meta.short,
      color: meta.color,
      x,
      y,
      width: clusterW,
      height: clusterH,
      order: meta.order,
    });

    skills.forEach((s, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      const nx = x + CLUSTER_PAD + c * (NODE_W + COL_GAP);
      const ny = y + CLUSTER_PAD + 36 + r * (NODE_H + ROW_GAP);
      nodes.push({
        id: s.id,
        name: s.name,
        category: s.category,
        x: nx,
        y: ny,
        col: c,
        row: r,
        difficulty: s.difficulty,
        hours: s.estimatedHours,
        status: progress[s.id] ?? 'not-started',
        skill: s,
      });
      maxX = Math.max(maxX, nx + NODE_W);
      maxY = Math.max(maxY, ny + NODE_H);

      s.nextSkillIds.forEach((next) => {
        if (ALL_SKILLS.find((x) => x.id === next)) {
          edges.push({ from: s.id, to: next });
        }
      });
    });

    col++;
    maxX = Math.max(maxX, x + clusterW);
    maxY = Math.max(maxY, y + clusterH);
  }

  return {
    clusters,
    nodes,
    edges,
    bounds: { width: maxX + 40, height: maxY + 40 },
  };
}

export function getRoadmapLayout(progress: Record<string, SkillStatus>): RoadmapLayout {
  return buildLayout(progress);
}

export const NODE_DIMENSIONS = { width: NODE_W, height: NODE_H };
