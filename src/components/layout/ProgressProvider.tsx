'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { initProgress, getProgress, subscribe } from '@/lib/progress';
import type { ProgressState } from '@/lib/types';

type Ctx = {
  progress: ProgressState;
  hydrated: boolean;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initial = initProgress();
    setProgress(initial);
    setHydrated(true);
    const unsub = subscribe((p) => setProgress({ ...p }));
    return () => {
      unsub();
    };
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, hydrated }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}

export function useSkillStatus(skillId: string) {
  const { progress, hydrated } = useProgress();
  return { status: progress[skillId] ?? 'not-started', hydrated };
}
