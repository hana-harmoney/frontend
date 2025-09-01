import { create } from 'zustand';
import { AgreementKey } from '@/types/auth';
type RegisterData = {
  name: string;
  birth: Date | null;
  gender: '남자' | '여자' | null;
  phone: string;
  address: string;
  loginId: string;
  password: string;
  agreements: Record<AgreementKey, boolean>;
  latitude: string;
  longitude: string;
};

type RegisterStore = {
  data: RegisterData;
  setField: <K extends keyof RegisterData>(
    field: K,
    value: RegisterData[K],
  ) => void;
  toggleAgreement: (key: AgreementKey) => void;
  reset: () => void;
};

const initialAgreements: Record<AgreementKey, boolean> = {
  service: false,
  privacy: false,
  mydata: false,
  account: false,
  marketing: false,
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
    agreements: initialAgreements,
    latitude: '',
    longitude: '',
  },
  setField: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
  toggleAgreement: (key) =>
    set((state) => ({
      data: {
        ...state.data,
        agreements: {
          ...state.data.agreements,
          [key]: !state.data.agreements[key],
        },
      },
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
        agreements: initialAgreements,
        latitude: '',
        longitude: '',
      },
    }),
}));
