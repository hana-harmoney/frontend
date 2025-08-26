import { CreateProfilePayload } from '@/types/auth';
import { apiClient } from '@/lib/api/client';

const CATEGORY_ID_MAP: Record<string, number> = {
  요리: 1,
  육아: 2,
  농업: 3,
  청소: 4,
  기술: 5,
  기타: 6,
};

async function urlToFile(url: string, filenameHint = 'image'): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  const ext =
    blob.type && blob.type.includes('/') ? `.${blob.type.split('/')[1]}` : '';
  return new File([blob], `${filenameHint}${ext || ''}`, { type: blob.type });
}

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

  descImageFiles.forEach((file) => fd.append('desc_images', file));

  for (let i = 0; i < descImageUrls.length; i++) {
    const url = descImageUrls[i];
    if (!url) continue;

    if (url.startsWith('blob:')) {
      const file = await urlToFile(url, `desc_${i}`);
      fd.append('desc_images', file);
    } else if (/^https?:\/\//i.test(url)) {
      fd.append('desc_images', url);
    }
  }

  return apiClient('/profile', {
    method: 'POST',
    body: fd,
  });
}

export const fetchProfile = async () => {
  const res = await apiClient('/profile');
  return res.result;
};
