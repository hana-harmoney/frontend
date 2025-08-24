import {
  JobCreateRequest,
  JobDetailResponse,
  JobListResponse,
} from '@/types/jobs';

import { apiClient } from './client';

export const fetchJobList = async (): Promise<JobListResponse> => {
  const res = await apiClient('/board');
  if (!res.ok) throw new Error('일자리 조회 실패');
  return res.json();
};

export const fetchJobDetail = async (
  id: number,
): Promise<JobDetailResponse> => {
  const res = await apiClient(`/board/${id}`);
  if (!res.ok) throw new Error('일자리 상세 조회 실패');
  return res.json();
};

export async function createJob(job: JobCreateRequest, accessToken: string) {
  const res = await apiClient('/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error('일자리 등록 실패');

  return res.json();
}
