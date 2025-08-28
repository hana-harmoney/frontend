export type imgUrlItem = {
  id: number;
  url: string;
};

export type fetchProfileResponse = {
  user_id: number;
  nickname: string;
  profile_img: string;
  category_ids: number[];
  description: string;
  img_url_detail: imgUrlItem[];
  trust: number;
  match_count: number;
  user_address: string;
};

export type CreateProfilePayload = {
  nickname: string;
  description?: string;
  categoryIds: (string | number)[];
  profileImage?: File | null;

  descImageUrls?: string[];

  descImageFiles?: File[];
};

export type EditProfilePayload = {
  nickname?: string;
  description?: string;
  categoryIds?: (string | number)[];
  current_password?: string;
  new_password?: string;
  profileImage?: File | null;
  descImagesDeleteIds?: number[];

  descImageUrls?: string[];

  descImageFiles?: File[];
};

export type UpdateProfilePayload = {
  nickname?: string;
  description?: string;
  categoryIds?: (number | string)[];
  password?: string;

  profileImage?: File | null;

  descImageFiles?: File[];
  descImageUrls?: string[];

  descImagesDeleteIds?: number[];
};
