import { CreateProfilePayload, EditProfilePayload } from '@/types/profile';
import { apiClient } from '@/lib/api/client';

const CATEGORY_ID_MAP: Record<string, number> = {
  요리: 1,
  육아: 2,
  농업: 3,
  청소: 4,
  기술: 5,
  기타: 6,
};

export async function urlToFile(
  url: string,
  filenameHint = 'image',
): Promise<File> {
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
  console.log('res : ', res);
  return res.result;
};

export async function updateProfile(payload: EditProfilePayload) {
  const {
    nickname,
    description,
    categoryIds = [],
    password,

    profileImage,

    descImageFiles = [],
    descImageUrls = [],

    descImagesDeleteIds = [],
  } = payload;

  const fd = new FormData();

  if (nickname?.trim()) fd.append('nickname', nickname.trim());
  if (description?.trim()) fd.append('description', description.trim());
  if (password?.trim()) fd.append('password', password.trim());

  const normIds = categoryIds
    .map((v) => (typeof v === 'number' ? v : CATEGORY_ID_MAP[v]))
    .filter((v): v is number => Number.isFinite(v));
  normIds.forEach((id) => fd.append('category_ids', String(id)));

  descImagesDeleteIds.forEach((id) =>
    fd.append('desc_images_delete_ids', String(id)),
  );

  if (profileImage) fd.append('profile_img', profileImage);

  descImageFiles.forEach((file) => fd.append('desc_images', file));

  console.log('descImageUrls : ', descImageUrls);
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
  const res = await apiClient('/profile', {
    method: 'PATCH',
    body: fd,
  });

  if (res.code !== '200') throw new Error(res?.message ?? '프로필 수정 실패');

  return res;
}
