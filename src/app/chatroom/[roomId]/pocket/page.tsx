'use client';

import ChatPocketCard from '@/components/chat/ChatPocketCard';
import ReviewDialog from '@/components/chat/ReviewDialog';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/hooks/useAccount';
import { fillPocket } from '@/lib/api/home';
import { useChatAmountStore } from '@/stores/useChatRoomsStore';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ChatPocketPage() {
  const params = useParams();
  const roomId = Number(params.roomId);
  const { data: account } = useAccount();
  const [openReview, setOpenReview] = useState(false);
  const [selected, setSelected] = useState<number>();
  const amount = useChatAmountStore((state) => state.amount);
  const router = useRouter();

  const selectPocket = (id: number) => {
    setSelected(id);
  };

  const handleFillPocket = async () => {
    if (!selected) return;
    if (amount === 0) {
      toast.error('0원은 옮길 수 없습니다.');
      return;
    }
    try {
      await fillPocket(selected, amount);

      toast.success('주머니로 옮기기가 완료되었습니다.');
      setOpenReview(true);
    } catch {
      toast.error('주머니로 옮기기가 실패했습니다.');
    }
  };

  return (
    <div>
      <Header title="주머니로 옮기기" centerTitle={false} />
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
          onClick={handleFillPocket}
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
