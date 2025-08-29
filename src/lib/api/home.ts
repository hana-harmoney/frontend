import { PocketListResponse } from '@/types/pocket';
import { apiClient } from './client';
import { AccountDetailResponse } from '@/types/accountDetail';

export const fetchPocketList = async (): Promise<PocketListResponse> => {
  const res = await apiClient('/home');

  if (res.code !== '200') throw new Error('주머니 조회 실패');
  return res;
};

export const fetchAccountDetail = async (
  accountId: number,
): Promise<AccountDetailResponse> => {
  const res = await apiClient('/home/history', {
    method: 'POST',
    body: JSON.stringify({ accountId }),
  });

  if (res.code !== '200') throw new Error('계좌 상세 조회 실패');
  return res;
};
