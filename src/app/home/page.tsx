import Balance from '@/components/home/Balance';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import BalanceCard from '@/components/home/BalanceCard';

export default async function HomePage({}) {
  return (
    <div className="flex w-full flex-col gap-6 px-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">하모니 계좌</span>
            <span className="text-gray text-xl font-light">상세보기 &gt;</span>
          </div>
          <div className="text-gray flex items-end gap-2 font-light">
            <span className="text-2xl">592-910508-29670</span>
            <span className="text-xl underline">복사</span>
          </div>
        </div>
        <Balance balance={1184805} isAccount={true} bgColor={'bg-[#EBEBEB]'} />
      </div>
      <div className="bg-hana-green-light flex flex-col gap-8 px-4 py-9 text-2xl font-semibold">
        <div className="flex items-center justify-between">
          <span className="font-semibold">기본 주머니</span>
          <span className="text-gray text-xl font-light">상세보기 &gt;</span>
        </div>
        <div className="flex items-center gap-2">
          {formatNumber(13456778)}
          <span className="font-light">원</span>
        </div>
        <Button className="py-7 text-xl font-semibold">송금하기</Button>
      </div>
      <BalanceCard
        id={1}
        pocketName={'용돈'}
        balance={13456778}
        isAccount={false}
        bgColor={'bg-[#FFF0EC]'}
      />
      <BalanceCard
        id={2}
        pocketName={'여행'}
        balance={13456778}
        isAccount={false}
        bgColor={'bg-[#F6ECF8]'}
      />
      <BalanceCard
        id={1}
        pocketName={'취미'}
        balance={13456778}
        isAccount={false}
        bgColor={'bg-[#E9F2FF]'}
      />
      <Button className="py-7 text-xl font-semibold">주머니 만들기</Button>
    </div>
  );
}
