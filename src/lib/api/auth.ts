import { apiClient } from './client';
import { CreateProfilePayload, SignupPayload } from '@/types/auth';
const CATEGORY_ID_MAP: Record<string, number> = {
  요리: 1,
  육아: 2,
  농업: 3,
  청소: 4,
  기술: 5,
  기타: 6,
};

export async function createProfile({
  nickname,
  description,
  categoryIds,
  profileImage,
  descImageUrls = [],
  descImageFiles = [],
}: CreateProfilePayload) {
  const fd = new FormData();

  fd.append('nickname', nickname);
  if (description?.trim()) fd.append('description', description.trim());

  const normIds = categoryIds
    .map((v) => (typeof v === 'number' ? v : CATEGORY_ID_MAP[v]))
    .filter((v): v is number => Number.isFinite(v));

  normIds.forEach((id) => fd.append('category_ids', String(id)));

  if (profileImage) {
    fd.append('profile_img', profileImage);
  }

  if (descImageUrls.length > 0 && descImageFiles.length === 0) {
    descImageUrls
      .filter((u) => /^https?:\/\//i.test(u)) // blob: 제외
      .forEach((u) => fd.append('desc_images', u));
  }

  if (descImageFiles.length > 0) {
    descImageFiles.forEach((file) => fd.append('desc_images', file));
  }

  return apiClient('/profile', {
    method: 'POST',
    body: fd,
  });
}

export async function signupUser(payload: SignupPayload) {
  try {
    const res = await apiClient('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.code !== '200') {
      throw new Error(res?.message ?? '회원가입 실패');
    }

    return res;
  } catch (error) {
    console.error('회원가입 요청 오류:', error);
    throw error;
  }
}
