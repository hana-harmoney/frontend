import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type RegisterData = {
  title: string;
  content: string;
  category: number | null;
  address: string;
  lat?: number;
  lng?: number;
  phone?: string;
  image: string;
};

type DraftStore = {
  data: RegisterData;
  setData: (next: Partial<RegisterData>) => void;
  reset: () => void;
};

const initial: RegisterData = {
  title: '',
  content: '',
  category: null,
  address: '',
  lat: undefined,
  lng: undefined,
  phone: '',
  image: '',
};

export const useJobDraft = create<DraftStore>()(
  persist(
    (set) => ({
      data: initial,
      setData: (next) => set((s) => ({ data: { ...s.data, ...next } })),
      reset: () => set({ data: initial }),
    }),
    {
      name: 'job-draft',
      storage: createJSONStorage(() => sessionStorage), // 세션 유지
    },
  ),
);
