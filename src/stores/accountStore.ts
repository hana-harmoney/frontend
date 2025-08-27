import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AccountStore = {
  accountNumber: string;
  setAccountNumber: (num: string) => void;
  reset: () => void;
};

export const useAccountStore = create<AccountStore>()(
  persist(
    (set) => ({
      accountNumber: '',
      setAccountNumber: (num) => set({ accountNumber: num }),
      reset: () => set({ accountNumber: '' }),
    }),
    {
      name: 'account-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
