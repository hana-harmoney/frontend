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
