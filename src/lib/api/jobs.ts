import {
  JobCreateRequest,
  JobDetailResponse,
  JobListResponse,
} from '@/types/jobs';

import { apiClient } from './client';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
export const fetchJobList = async (): Promise<JobListResponse> => {
  const accessToken = getCookie('accessToken');
  const res = await apiClient('/board', {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });
  if (!res.ok) throw new Error('일자리 조회 실패');
  return res.json();
};

export const fetchJobDetail = async (
  id: number,
): Promise<JobDetailResponse> => {
  const accessToken = getCookie('accessToken');
  const res = await apiClient(`/board/${id}`, {
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });
  if (!res.ok) throw new Error('일자리 상세 조회 실패');
  return res.json();
};

export async function createJob(job: JobCreateRequest) {
  const accessToken = getCookie('accessToken');
  const res = await apiClient('/board', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(job),
  });
  if (!res.ok) throw new Error('일자리 등록 실패');

  return res.json();
}
