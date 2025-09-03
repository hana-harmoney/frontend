'use client';

import ChatPocketCard from '@/components/chat/ChatPocketCard';
import ReviewDialog from '@/components/chat/ReviewDialog';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/hooks/useAccount';
import { useChatAmountStore } from '@/stores/useChatRoomsStore';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import NoData from '@/assets/images/no-data.svg';
import { plusPocket } from '@/lib/api/transfer';
import { usePocketAchieveStore } from '@/stores/usePocketAchieveStore';

export default function ChatPocketPage() {
  const params = useParams();
  const roomId = Number(params.roomId);
  const { data: account, isLoading, isError } = useAccount();
  const [openReview, setOpenReview] = useState(false);
  const [selected, setSelected] = useState<number>();
  const amount = useChatAmountStore((state) => state.amount);
  const setIsAchieved = usePocketAchieveStore((state) => state.setIsAchieved);
  const router = useRouter();

  const selectPocket = (id: number) => {
    setSelected(id);
  };

  const handlePlusPocket = async () => {
    if (!selected) return;
    if (amount === 0) {
      toast.error('0원은 옮길 수 없습니다.');
      return;
    }
    try {
      const res = await plusPocket(amount, selected);
      const ok = res?.ok ?? (res?.code === 200 || res?.code === '200');

      if (!ok) throw Error();
      toast.success('주머니로 옮기기가 완료되었습니다.');
      if (res.result.pocketAmount >= res.result.targetAmount) {
        setIsAchieved(true);
      }

      setOpenReview(true);
    } catch {
      toast.error('주머니로 옮기기가 실패했습니다.');
    }
  };

  if (isLoading || isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-48 text-2xl text-gray-500">
        {isLoading ? '주머니 불러오는 중...' : '에러 발생'}
        {isLoading && <NoData className="size-24" />}
      </div>
    );
  }

  if (account?.pocketLists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-48 text-2xl text-gray-500">
        아직 만들어진 주머니가 없습니다.
        <Link href={'/home/pocket/new'}>
          <Button className="h-10 p-6 text-2xl">주머니 만들러 가기</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-6 p-6">
        {account?.pocketLists.map((pocket) => (
          <ChatPocketCard
            key={pocket.pocketId}
            pocket={pocket}
            isSelected={selected === pocket.pocketId}
            onSelect={selectPocket}
          />
        ))}
        <Button
          className="h-14 text-xl font-semibold"
          disabled={!selected}
          onClick={handlePlusPocket}
        >
          주머니로 옮기기
        </Button>
      </div>
      <ReviewDialog
        roomId={roomId}
        open={openReview}
        onOpenChange={setOpenReview}
        onClose={() => router.back()}
      />
    </div>
  );
}
