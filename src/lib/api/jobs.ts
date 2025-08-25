import {
  JobCreateRequest,
  JobDetailResponse,
  JobListResponse,
} from '@/types/jobs';

import { apiClient } from './client';

export const fetchJobList = async (): Promise<JobListResponse> => {
  const res = await apiClient('/board');

  if (res.code !== '200') throw new Error('일자리 조회 실패');
  return res;
};

export const fetchJobDetail = async (
  id: number,
): Promise<JobDetailResponse> => {
  const res = await apiClient(`/board/${id}`);
  if (res.code !== '200') throw new Error('일자리 상세 조회 실패');
  return res;
};

export async function createJob(job: JobCreateRequest) {
  const res = await apiClient('/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
  if (res.code !== '200') throw new Error('일자리 등록 실패');

  return res;
}

export const deleteJob = async (id: number): Promise<JobDetailResponse> => {
  const res = await apiClient(`/board/${id}`, {
    method: 'DELETE',
  });
  if (res.code !== '200') throw new Error('일자리 삭제 실패');
  return res;
};
