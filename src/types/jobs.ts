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
  profileUrl: string;
  trust: number;
};

export type JobBoard = JobsProps & {
  boardId: number;
  latitude: number;
  longitude: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
} & Pick<JobDetailProps, 'nickname' | 'trust'>;

export interface JobListResponse {
  code: string;
  message: string;
  result: {
    boardList: JobBoard[];
  };
}
