export type AgreementKey =
  | 'service'
  | 'privacy'
  | 'mydata'
  | 'account'
  | 'marketing';

export interface SignupPayload {
  loginId: string;
  password: string;
  name: string;
  birth: string;
  gender: 'MALE' | 'FEMALE';
  address: string;
  phone: string;
  longitude: string;
  latitude: string;
}
