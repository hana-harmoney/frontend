'use client';
import { BalanceCardProps } from '@/types/home';
import Balance from '@/components/home/Balance';
import { useRouter } from 'next/navigation';

const BalanceCard = ({
  id,
  balance,
  bgColor,
  pocketName,
}: BalanceCardProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-2xl font-semibold">
        {pocketName} 주머니
        <span
          className="text-gray text-xl font-light"
          onClick={() => {
            router.push(`/home/pocket/${id}`);
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
          router.push(`/home/pocket/${id}`);
        }}
      />
    </div>
  );
};

export default BalanceCard;
