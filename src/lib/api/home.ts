import { PocketListResponse } from '@/types/pocket';
import { apiClient } from './client';

export const fetchPocketList = async (): Promise<PocketListResponse> => {
  const res = await apiClient('/home');

  if (res.code !== '200') throw new Error('주머니 조회 실패');
  return res;
};
