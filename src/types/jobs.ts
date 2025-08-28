import { ApiResponse } from './apiResponse';

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
  phone?: string;
  mine?: boolean;
} & Pick<JobDetailProps, 'nickname' | 'trust' | 'profileUrl'>;

export type RegisterData = {
  title: string;
  content: string;
  categoryId: number;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  imageUrl: string;
  wage: number;
  image?: File | null;
};

export type JobListResponse = ApiResponse<{ boardList: JobBoard[] }>;

export type JobDetailResponse = ApiResponse<JobBoard>;

export type JobCreateRequest = Omit<RegisterData, 'phone' | 'imageUrl'>;
