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
  time: string;
  title: string;
  money: number;
};

export type HistoryProps = {
  date: string;
  histories: HistoryCardProps[];
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
