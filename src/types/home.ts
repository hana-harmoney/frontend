import { AccountHistoryItem } from './accountDetail';
import { PocketTransaction } from './pocket';

export type BalanceProps = {
  balance: number;
  isAccount: boolean;
  bgColor: string;
  onClick?: () => void;
};

export interface BalanceCardProps extends BalanceProps {
  id: number;
  pocketName: string;
}

export type HistoryCardProps = {
  id: number;
  time: string;
  amountSigned: string; // "+5,000" / "-15,000"
  isDeposit: boolean;
  counterparty: string;
};

export type HistoryProps = {
  id: number;
  date: string;
  histories: (AccountHistoryItem | PocketTransaction)[];
};

export type Tab = {
  id: number;
  name: string;
};

export type TabBarProps = {
  selectedId: number;
  tabs: Tab[];
  clickTab: (id: number) => void;
};
