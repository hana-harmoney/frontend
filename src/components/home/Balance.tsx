import { formatNumber } from '@/lib/utils';
import { BalanceProps } from '@/types/home';

const Balance = ({ balance, isAccount, bgColor, onClick }: BalanceProps) => {
  return (
    <div
      className={`${bgColor} ${isAccount ? 'justify-between' : 'justify-end'} flex items-center rounded-2xl px-5 py-6 text-2xl font-semibold`}
      onClick={onClick}
    >
      {isAccount && <span>총 자산</span>}
      <div className="flex items-center gap-2">
        {formatNumber(balance)}
        <span className="text-text">원</span>
      </div>
    </div>
  );
};

export default Balance;
