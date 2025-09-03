'use client';
import { DelegatePageStatus } from '@/types/profile';
import { create } from 'zustand';

export const useDelegatePageStatus = create<{
  status: DelegatePageStatus;
  setStatus: (s: DelegatePageStatus) => void;
}>((set) => ({
  status: 'init',
  setStatus: (s) => set({ status: s }),
}));
