import { ApiResponse } from './apiResponse';

export interface Pocket {
  pocketId: number;
  name: string;
  amount: number;
  targetAmount: number;
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

// 주머니 내역 상세조회
export const TX_DIRECTIONS = ['입금', '출금'] as const;
export type TxDirection = (typeof TX_DIRECTIONS)[number];

export interface PocketTransaction {
  txId: number;
  direction: TxDirection;
  amount: number;
  day: string;
  time: string;
  fromPocketId: number | null;
  fromAccountId: number | null;
  toPocketId: number | null;
  toAccountId: number | null;
  fromName: string;
  toName: string;
}

export interface PocketDetail {
  pocketId: number;
  pocketName: string;
  targetAmount: number;
  currentAmount: number;
  transactions: PocketTransaction[];
}

export type PocketDetailResponse = ApiResponse<PocketDetail>;

// 계좌 + 주머니 조회
export interface AccountInfo {
  totalAssets: number;
  account: string;
  accountId: number;
  accountBalance: number;
  pocketLists: Pocket[];
}

export type PocketListResponse = ApiResponse<AccountInfo>;
