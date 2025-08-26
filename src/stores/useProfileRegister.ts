import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ProfileRegisterState = {
  nickname: string;
  profileImageFile: File | null;
  profileImageUrl: string;
  categories: string[];
  bio: string;
  introImageFiles: File[];
  introImageUrls: string[];
};

type SetField = <K extends keyof ProfileRegisterState>(
  field: K,
  value: ProfileRegisterState[K],
) => void;

type ProfileRegisterActions = {
  setProfileField: SetField;
  reset: () => void;

  toggleCategory: (cat: string) => void;
  setCategories: (cats: string[]) => void;
  clearCategories: () => void;

  setProfileImage: (file: File) => void;
  clearProfileImage: () => void;

  addIntroImages: (files: File[] | FileList) => void;
  removeIntroImage: (index: number) => void;
  clearIntroImages: () => void;
};

const initialState: ProfileRegisterState = {
  nickname: '',
  profileImageFile: null,
  profileImageUrl: '',

  categories: [],

  bio: '',

  introImageFiles: [],
  introImageUrls: [],
};

export const useProfileRegister = create<
  ProfileRegisterState & ProfileRegisterActions
>()(
  persist(
    (set, get) => ({
      ...initialState,

      setProfileField: (field, value) =>
        set((state) => ({
          ...state,
          [field]: value,
        })),

      reset: () => set({ ...initialState }),

      toggleCategory: (cat) =>
        set((state) => {
          const exists = state.categories.includes(cat);
          return {
            ...state,
            categories: exists
              ? state.categories.filter((c) => c !== cat)
              : [...state.categories, cat],
          };
        }),
      setCategories: (cats) =>
        set((state) => ({ ...state, categories: [...cats] })),
      clearCategories: () => set((state) => ({ ...state, categories: [] })),

      setProfileImage: (file) =>
        set((state) => {
          const url = URL.createObjectURL(file);
          if (state.profileImageUrl) URL.revokeObjectURL(state.profileImageUrl);
          return {
            ...state,
            profileImageFile: file,
            profileImageUrl: url,
          };
        }),
      clearProfileImage: () =>
        set((state) => {
          if (state.profileImageUrl) URL.revokeObjectURL(state.profileImageUrl);
          return {
            ...state,
            profileImageFile: null,
            profileImageUrl: '',
          };
        }),

      addIntroImages: (files) =>
        set((state) => {
          const list = Array.from(files);
          const urls = list.map((f) => URL.createObjectURL(f));
          return {
            ...state,
            introImageFiles: [...state.introImageFiles, ...list],
            introImageUrls: [...state.introImageUrls, ...urls],
          };
        }),
      removeIntroImage: (index) =>
        set((state) => {
          const files = [...state.introImageFiles];
          const urls = [...state.introImageUrls];
          const urlToRevoke = urls[index];
          if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
          files.splice(index, 1);
          urls.splice(index, 1);
          return { ...state, introImageFiles: files, introImageUrls: urls };
        }),
      clearIntroImages: () =>
        set((state) => {
          state.introImageUrls.forEach((u) => URL.revokeObjectURL(u));
          return { ...state, introImageFiles: [], introImageUrls: [] };
        }),
    }),
    {
      name: 'profile-register',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        nickname: state.nickname,
        profileImageUrl: state.profileImageUrl,
        categories: state.categories,
        bio: state.bio,
        introImageUrls: state.introImageUrls,
      }),
    },
  ),
);
