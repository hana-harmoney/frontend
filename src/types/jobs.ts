export type JobsProps = {
  title: string;
  category: string;
  created: string; // 등록된 날짜
  content: string;
  address: string;
  wage: number;
  imageUrl: string;
};

export type JobDetailProps = Partial<JobsProps> & {
  nickname: string;
  profile_url: string;
  trust: number;
};
