import { apiClient } from '@/lib/api/client';

export const requestToken = async (token: string) => {
  const data = { fcmToken: token };

  const res = await apiClient('/fcm/deviceToken', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.code !== '200') throw new Error('토큰 등록 실패');
  return res;
};
