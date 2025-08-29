import type { ApiResponse } from './apiResponse';

export const TRANSACTION_TYPES = ['입금', '출금'] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export interface AccountHistoryItem {
  transactionId: number;
  transactionType: TransactionType;
  fromAccountNum: string | null;
  fromAccountName: string | null;
  toAccountNum: string | null;
  toAccountName: string | null;
  fromPocketId: number | null;
  fromPocketName: string | null;
  toPocketId: number | null;
  toPocketName: string | null;
  amount: number;
  day: string;
  time: string;
}

export interface AccountDetail {
  accountId: number;
  accountNum: string;
  ownerName: string;
  accountBalance: number;
  history: AccountHistoryItem[];
}

export type AccountDetailResponse = ApiResponse<AccountDetail>;
