'use client';

import Header from '@/components/common/header';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { sampleHistories } from '@/lib/utils';
import History from '@/components/home/History';

const AccountPage = () => {
  const router = useRouter();
  return (
    <div className="px-6">
      <Header title="내 계좌" centerTitle={false} showBackButton={true} />
      <div className="flex w-full flex-col gap-11">
        <div className="flex flex-col gap-6">
          <div className="bg-hana-green-light flex flex-col gap-8 rounded-2xl px-4 py-9 text-2xl font-semibold">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">하모니 계좌</span>
                <span className="text-gray text-xl font-light">
                  상세보기 &gt;
                </span>
              </div>
              <div className="text-gray flex items-end gap-2 font-light">
                <span className="text-2xl">592-910508-29670</span>
                <span className="text-xl underline">복사</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {formatNumber(13456778)}
              <span className="font-light">원</span>
            </div>
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
        <div className="flex w-full flex-col gap-6 font-semibold">
          <h1 className="text-3xl">거래 내역</h1>
          <div className="flex flex-col gap-6">
            {sampleHistories.map((item, idx) => (
              <History key={idx} date={item.date} histories={item.histories} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
