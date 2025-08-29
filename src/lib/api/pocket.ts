import { PocketCreateRequest, PocketResponse } from '@/types/pocket';
import { apiClient } from './client';

export const createPocket = async (
  data: PocketCreateRequest,
): Promise<PocketResponse> => {
  const res = await apiClient('/home/pocket', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.code !== '200') throw new Error('주머니 생성 실패');
  return res;
};
