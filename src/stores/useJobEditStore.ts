import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { RegisterData } from '@/types/jobs';

type JobEditDraft = {
  data: RegisterData;
  setData: (next: Partial<RegisterData>) => void;
  reset: () => void;
};

const initial: RegisterData = {
  title: '',
  content: '',
  categoryId: 0,
  address: '',
  latitude: 37.5448361732145,
  longitude: 127.056563379345,
  phone: '',
  imageUrl: '',
  wage: 0,
};

export const useJobEditStore = create<JobEditDraft>()(
  persist(
    (set) => ({
      data: initial,
      setData: (next) => set((s) => ({ data: { ...s.data, ...next } })),
      reset: () => set({ data: initial }),
    }),
    {
      name: 'job-edit-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
