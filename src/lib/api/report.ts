import { HarmoneyIncome } from '@/types/report';
import { apiClient } from './client';

export const fetchPastHarmoneyIncome = async (): Promise<HarmoneyIncome[]> => {
  const res = await apiClient(`/report/list`);

  if (res.code !== '200') throw new Error('하모니 수입 목록 조회 실패');
  return res.result.reportList;
};
