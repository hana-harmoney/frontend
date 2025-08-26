export type imgUrlItem = {
  id: number;
  url: string;
};

export type fetchProfileResponse = {
  nickname: string;
  profile_img: string;
  category_ids: number[];
  description: string;
  img_url_detail: imgUrlItem[];
  trust: number;
  match_count: number;
  user_address: string;
};
