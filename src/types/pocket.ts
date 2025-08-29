import { ApiResponse } from './apiResponse';

export interface Pocket {
  pocketId: number;
  name: string;
  amount: number;
}

export interface PocketCreateRequest {
  name: string;
  targetAmount: number;
  initialAmount?: number;
}

export interface PocketResponse {
  pocketName: string;
  targetAmount: number;
  currentAmount: number;
}

export interface AccountInfo {
  totalAssets: number;
  account: string;
  accountId: number;
  accountBalance: number;
  pocketLists: Pocket[];
}

export type PocketListResponse = ApiResponse<AccountInfo>;
