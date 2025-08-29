import { PocketListResponse } from '@/types/pocket';
import { apiClient } from './client';

export const fetchPocketList = async (): Promise<PocketListResponse> => {
  const res = await apiClient('/home');

  if (res.code !== '200') throw new Error('주머니 조회 실패');
  return res;
};

export async function fillPocket(
  pocketId: number,
  amount: number,
): Promise<void> {
  await apiClient(`/transfer/${pocketId}/plus`, {
    method: 'PATCH',
    body: JSON.stringify({ amount: amount }),
  });
}
