export type JobsProps = {
  boardId: string;
  title: string;
  category: string;
  created: string; // 등록된 날짜
  content: string;
  address: string;
  wage: number;
  imageUrl: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
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
} & Pick<JobDetailProps, 'nickname' | 'trust' | 'profileUrl'>;

export interface ApiResponse<T> {
  code: string;
  message: string;
  result: T;
}

export type JobListResponse = ApiResponse<{ boardList: JobBoard[] }>;

export type JobDetailResponse = ApiResponse<JobBoard>;
