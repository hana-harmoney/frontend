'use client';
import Balance from '@/components/home/Balance';
import { copyAccountNumber, formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import BalanceCard from '@/components/home/BalanceCard';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();
  const accountNumber = '592-910508-29671';

  return (
    <div className="flex w-full flex-col gap-6 px-6">
      <div className="flex flex-col gap-8">
        <Balance balance={1184805} isAccount={true} bgColor={'bg-[#EBEBEB]'} />
      </div>
      <div className="bg-hana-green-light flex flex-col gap-8 rounded-2xl px-4 py-9 text-2xl font-semibold">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">하모니 계좌</span>
            <span
              className="text-gray text-xl font-light"
              onClick={() => {
                router.push('/home/account');
              }}
            >
              상세보기 &gt;
            </span>
          </div>
          <div className="text-gray flex items-end gap-2 font-light">
            <span className="text-2xl">{accountNumber}</span>
            <button
              type="button"
              onClick={() => copyAccountNumber(accountNumber)}
              className="text-xl underline"
              aria-label="계좌번호 복사"
            >
              복사
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {formatNumber(13456778)}
          <span className="font-light">원</span>
        </div>
        <Button
          className="py-7 text-xl font-semibold"
          onClick={() => {
            router.push('/home/send/step1');
          }}
        >
          송금하기
        </Button>
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
      <Button
        className="py-7 text-xl font-semibold"
        onClick={() => {
          router.push('/home/pocket/new');
        }}
      >
        주머니 만들기
      </Button>
    </div>
  );
};

export default HomePage;
