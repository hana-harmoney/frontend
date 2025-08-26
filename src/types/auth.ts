export type AgreementKey =
  | 'service'
  | 'privacy'
  | 'mydata'
  | 'account'
  | 'marketing';

export type CreateProfilePayload = {
  nickname: string;
  description?: string;
  categoryIds: (string | number)[];
  profileImage?: File | null;

  descImageUrls?: string[];

  descImageFiles?: File[];
};
export interface SignupPayload {
  loginId: string;
  password: string;
  name: string;
  birth: string;
  gender: 'MALE' | 'FEMALE';
  address: string;
  phone: string;
}
