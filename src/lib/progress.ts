import type { ProgressState, SkillStatus } from './types';

const STORAGE_KEY = 'devops-roadmap-2026:progress:v1';

type Listener = (state: ProgressState) => void;

let state: ProgressState = {};
let initialized = false;
const listeners = new Set<Listener>();

function readFromStorage(): ProgressState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as ProgressState;
    return {};
  } catch {
    return {};
  }
}

function writeToStorage(s: ProgressState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore quota / private mode errors
  }
}

function notify() {
  for (const l of listeners) l(state);
}

export function initProgress() {
  if (initialized) return state;
  initialized = true;
  state = readFromStorage();
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        state = readFromStorage();
        notify();
      }
    });
  }
  return state;
}

export function getProgress(): ProgressState {
  if (!initialized) initProgress();
  return state;
}

export function getStatus(skillId: string): SkillStatus {
  return getProgress()[skillId] ?? 'not-started';
}

export function setStatus(skillId: string, status: SkillStatus) {
  if (!initialized) initProgress();
  const next = { ...state };
  if (status === 'not-started') delete next[skillId];
  else next[skillId] = status;
  state = next;
  writeToStorage(state);
  notify();
}

export function toggleStatus(skillId: string) {
  const current = getStatus(skillId);
  const order: SkillStatus[] = ['not-started', 'learning', 'practiced', 'completed'];
  const next = order[(order.indexOf(current) + 1) % order.length];
  setStatus(skillId, next);
}

export function clearProgress() {
  state = {};
  writeToStorage(state);
  notify();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function countCompleted(): number {
  return Object.values(getProgress()).filter((s) => s === 'completed').length;
}
