import { apiClient } from './client';
import { SignupPayload } from '@/types/auth';

export async function signupUser(payload: SignupPayload) {
  try {
    const res = await apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.code !== '200') {
      throw new Error(res?.message ?? '회원가입 실패');
    }

    return res;
  } catch (error) {
    console.error('회원가입 요청 오류:', error);
    throw error;
  }
}
