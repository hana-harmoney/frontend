'use client';
import { BalanceCardProps } from '@/types/home';
import Balance from '@/components/home/Balance';

const BalanceCard = ({
  id,
  balance,
  bgColor,
  pocketName,
}: BalanceCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-2xl font-semibold">
        {pocketName} 주머니
        <span
          className="text-gray text-xl font-light"
          onClick={() => {
            console.log('id : ', id); // 나중에 라우팅에 사용
          }}
        >
          상세보기 &gt;
        </span>
      </div>
      <Balance
        balance={balance}
        isAccount={false}
        bgColor={bgColor}
        onClick={() => {
          console.log('id : ', id); // 나중에 라우팅에 사용
        }}
      />
    </div>
  );
};

export default BalanceCard;
