'use client';
import { formatNumber } from '@/lib/utils';
import Header from '@/components/common/header';
import History from '@/components/home/History';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deletePocket, fetchPocketDetail } from '@/lib/api/pocket';
import { PocketDetail } from '@/types/pocket';
import { groupHistoryByDay } from '@/lib/groupHistoryByDay';
import toast from 'react-hot-toast';
const PocketDetailPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [pocket, setPocket] = useState<PocketDetail>({
    pocketId: 0,
    pocketName: '',
    targetAmount: 0,
    currentAmount: 0,
    transactions: [],
  });

  useEffect(() => {
    (async () => {
      const res = await fetchPocketDetail(Number(id));
      setPocket(res.result);
    })();
  }, [id]);

  const groupedByday = groupHistoryByDay(pocket?.transactions);

  const handleDelete = async (pocketId: number) => {
    if (pocket.currentAmount > 0) {
      toast.error('잔액이 있어 삭제할 수 없습니다.');
      return;
    }
    try {
      await deletePocket(pocketId);

      toast.success(`${pocket.pocketName} 주머니가 삭제되었습니다.`);
      router.push('/home');
    } catch {
      toast.error(`${pocket.pocketName} 주머니 삭제에 실패했습니다.`);
    }
  };

  return (
    <div className="px-6">
      <Header title={'주머니'} showBackButton={true} centerTitle={false} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 font-semibold">
          <div className="flex flex-row items-baseline justify-start gap-3">
            <span className="text-3xl">{pocket.pocketName} 주머니</span>
            <span
              onClick={() => handleDelete(Number(id))}
              className="text-hanagreen-normal cursor-pointer text-[1.3rem] font-normal underline"
            >
              삭제하기
            </span>
          </div>

          <div className="mt-2 -mb-2 flex items-center gap-1 text-xl">
            <span className="text-[#4C525D]">목표 금액</span>
            <span>{formatNumber(pocket.targetAmount)} 원</span>
          </div>
        </div>
        {/* 잔고 표시 */}
        <div className="bg-hana-green-light flex w-full flex-col gap-2 rounded-xl px-6 py-5 font-semibold">
          <span className="text-2xl">현재 금액</span>
          <div className="flex gap-2">
            <span className="text-3xl">
              {formatNumber(pocket.currentAmount)}
            </span>
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
            {groupedByday.map((item, idx) => (
              <History
                key={idx}
                id={item.id}
                date={item.date}
                histories={item.histories}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PocketDetailPage;
