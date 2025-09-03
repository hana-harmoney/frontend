import { create } from 'zustand/react';

interface PocketAchieveState {
  isAchieved: boolean;
  setIsAchieved: (isAchieved: boolean) => void;
}

export const usePocketAchieveStore = create<PocketAchieveState>((set) => ({
  isAchieved: false,
  setIsAchieved: (isAchieved: boolean) => set({ isAchieved: isAchieved }),
}));
