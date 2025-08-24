import { JobListResponse } from '@/types/jobs';

import { apiClient } from './client';

export const fetchJobList = async (): Promise<JobListResponse> => {
  const res = await apiClient('/board');
  if (!res.ok) throw new Error('Failed to fetch job list');
  return res.json();
};
