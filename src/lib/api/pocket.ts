import {
  PocketCreateRequest,
  PocketDetailResponse,
  PocketResponse,
} from '@/types/pocket';
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

export const deletePocket = async (pocketId: number) => {
  const res = await apiClient(`home/pocket/${pocketId}`, {
    method: 'DELETE',
  });

  if (res.code !== '200') throw new Error('주머니 삭제 실패');
  return res;
};

export const fetchPocketDetail = async (
  pocketId: number,
): Promise<PocketDetailResponse> => {
  const res = await apiClient(`home/pocket/${pocketId}`);

  if (res.code !== '200') throw new Error('주머니 조회 실패');
  return res;
};
