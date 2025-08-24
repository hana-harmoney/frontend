import { JobDetailResponse, JobListResponse } from '@/types/jobs';

import { apiClient } from './client';

export const fetchJobList = async (): Promise<JobListResponse> => {
  const res = await apiClient('/board');
  if (!res.ok) throw new Error('Failed to fetch job list');
  return res.json();
};

export const fetchJobDetail = async (
  id: number,
): Promise<JobDetailResponse> => {
  const res = await apiClient(`/board/${id}`);
  if (!res.ok) throw new Error('Failed to fetch job detail');
  return res.json();
};
