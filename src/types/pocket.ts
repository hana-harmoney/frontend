import { ApiResponse } from './apiResponse';

export interface Pocket {
  pocketId: number;
  name: string;
  amount: number;
}

export interface AccountInfo {
  totalAssets: number;
  account: string;
  accountBalance: number;
  pocketLists: Pocket[];
}

export type PocketListResponse = ApiResponse<AccountInfo>;
