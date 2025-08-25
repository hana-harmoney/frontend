import { create } from 'zustand';

type RegisterData = {
  name: string;
  birth: Date | null;
  gender: '남자' | '여자' | null;
  phone: string;
  address: string;
  loginId: string;
  password: string;
};

type RegisterStore = {
  data: RegisterData;
  setField: <K extends keyof RegisterData>(
    field: K,
    value: RegisterData[K],
  ) => void;
  reset: () => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  data: {
    name: '',
    birth: null,
    gender: null,
    phone: '',
    address: '',
    loginId: '',
    password: '',
  },
  setField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
  reset: () =>
    set({
      data: {
        name: '',
        birth: null,
        gender: null,
        phone: '',
        address: '',
        loginId: '',
        password: '',
      },
    }),
}));
