'use client';
import Header from '@/components/common/header';
import { NumericKeypad } from '@/components/home/NumericKeypad';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/lib/utils';
import TwoStepModal from '@/components/home/TwoStepModal';
import { useAccount } from '@/hooks/useAccount';
import { useChatRoomDetailStore } from '@/stores/useChatRoomsStore';
import { useParams, useRouter } from 'next/navigation';
import { transferInChatRoom } from '@/lib/api/chat';
import toast from 'react-hot-toast';

export default function ChatTransferPage() {
  const params = useParams();
  const roomId = Number(params.roomId);
  const roomInfo = useChatRoomDetailStore((state) => state.roomInfo);
  const { data: account } = useAccount();
  const [targetStr, setTargetStr] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {}, [account]);

  const increaseTarget = (value: number) => {
    const current = targetStr === '' ? 0 : Number(targetStr);
    const next = Math.min(current + value, account?.totalAssets ?? 0);
    setTargetStr(String(next));
  };

  const priceList = [
    { text: '+1만', value: 10000 },
    { text: '+5만', value: 50000 },
    { text: '+10만', value: 100000 },
    { text: '+20만', value: 200000 },
    { text: '+30만', value: 300000 },
  ];

  const openModal = () => {
    setOpen(true);
  };

  const clickComplete = () => {
    if (!targetStr) return;
    openModal();
  };

  const handleTransfer = async (amount: number) => {
    await transferInChatRoom(roomId, amount);
  };

  const handleComplete = () => {
    router.back();
  };

  return (
    <div className="flex w-full flex-col gap-6 px-6">
      <Header title="송금하기" centerTitle={false} showBackButton={true} />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col text-2xl">
          <div className="flex gap-2">
            <span className="font-semibold">{roomInfo?.name}</span>
            님에게
          </div>
          <div className="text-gray flex gap-1 text-xl font-light">
            잔액
            <span className="text-text font-semibold">
              {formatNumber(account?.totalAssets ?? 0)}
            </span>
            원
          </div>
        </div>
        <span className="w-full text-center text-3xl font-semibold">
          {targetStr.length == 0 ? (
            <>얼마를 보낼까요?</>
          ) : (
            <>{formatNumber(Number(targetStr))} 원</>
          )}
        </span>
        <div className="flex flex-col gap-11">
          <div className="flex gap-1">
            {priceList.map((item, idx) => (
              <div
                key={idx}
                className="flex-1 rounded-md bg-[#EFF0F4] px-3 py-2 text-center"
                onClick={() => {
                  increaseTarget(item.value);
                }}
              >
                {item.text}
              </div>
            ))}
          </div>
          <NumericKeypad
            value={targetStr}
            onChange={(v) => setTargetStr(v)}
            onSubmit={(v) => {
              setTargetStr(v);
            }}
            maxLength={9}
            shuffle={false}
            showWonSuffix={true}
            className="mt-2"
            isAccount={true}
            clickComplete={clickComplete}
            completeComment="완료"
          />
        </div>
      </div>
      <TwoStepModal
        open={open}
        type={'send'}
        name={roomInfo?.name}
        amount={Number(targetStr)}
        onClose={() => setOpen(false)}
        onSubmit={async ({ amount }) => {
          await handleTransfer(amount);
        }}
        onComplete={handleComplete}
      />
    </div>
  );
}
