'use client';
import { formatNumber } from '@/lib/utils';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { sampleHistories } from '@/lib/utils';
import History from '@/components/home/History';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
const PocketDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const target = 100000;
  const amount = 500000;

  return (
    <div className="px-6">
      <Header title={'주머니'} showBackButton={true} centerTitle={false} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 font-semibold">
          <span className="text-3xl">손주 용돈 주머니</span>
          <div className="flex items-center gap-1 text-xl">
            <span className="text-[#4C525D]">목표 금액</span>
            <span>{formatNumber(target)} 원</span>
          </div>
        </div>
        {/* 잔고 표시 */}
        <div className="bg-hana-green-light flex w-full flex-col gap-2 rounded-xl px-6 py-5 font-semibold">
          <span className="text-2xl">현재 금액</span>
          <div className="flex gap-2">
            <span className="text-3xl">{formatNumber(amount)}</span>
            <span className="text-2xl font-light">원</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1 py-6 text-xl"
            onClick={() => {
              router.push(`/home/pocket/${id}/take`);
            }}
          >
            꺼내기
          </Button>
          <Button
            variant="destructive"
            className="flex-1 py-6 text-xl"
            onClick={() => {
              router.push(`/home/pocket/${id}/fill`);
            }}
          >
            채우기
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
export default PocketDetailPage;
