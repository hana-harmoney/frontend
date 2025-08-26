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

export async function createJob(job: JobCreateRequest, image: File) {
  const fd = new FormData();
  fd.append('request', JSON.stringify(job));
  fd.append('image', image);

  const res = await apiClient('/board', { method: 'POST', body: fd });
  if (res.code !== '200') throw new Error(res.message ?? '일자리 등록 실패');
  return res;
}

export const deleteJob = async (id: number): Promise<JobDetailResponse> => {
  const res = await apiClient(`/board/${id}`, {
    method: 'DELETE',
  });
  if (res.code !== '200') throw new Error('일자리 삭제 실패');
  return res;
};
