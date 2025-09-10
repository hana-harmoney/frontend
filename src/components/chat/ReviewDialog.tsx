'use client';

import { useState, ComponentType, SVGProps } from 'react';
import ChatDialogButton from './ChatDialogButton';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { writeReview } from '@/lib/api/chat';

import BadBoy from '@/assets/images/bad_starboy.svg';
import ThumbsUpBoy from '@/assets/images/thumbsup_starboy.svg';
import HeartBoy from '@/assets/images/heart_starboy.svg';

type ReviewItem = {
  id: number;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  score: number;
};

const items: ReviewItem[] = [
  { id: 1, label: '별로에요', Icon: BadBoy, score: -0.5 },
  { id: 2, label: '좋아요', Icon: ThumbsUpBoy, score: 0.5 },
  { id: 3, label: '최고에요', Icon: HeartBoy, score: 1 },
];

type Props = {
  roomId: number;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
  onClose?: () => void;
};

export default function ReviewDialog({
  roomId,
  open,
  onOpenChange,
  onSuccess,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = () => {
    setSelected(null);
    onOpenChange(false);
    onClose?.();
  };

  const handleWriteReview = async () => {
    if (selected === null) return;
    try {
      const score = items.find((i) => i.id === selected)!.score;
      await writeReview(roomId, score);
      toast.success('후기 쓰기가 완료되었습니다.');
      close();
      onSuccess?.();
    } catch {
      toast.error('후기 쓰기에 실패했습니다.');
    }
  };

  return (
    <ChatDialogButton
      title="후기 쓰기"
      desc="후기를 남겨주세요!"
      open={open}
      onAction={handleWriteReview}
      onClose={close}
      actionDisabled={selected === null}
      actionButtonText="완료"
      closeButtonText="닫기"
    >
      <div className="flex justify-center gap-4">
        {items.map((candi) => {
          const { Icon } = candi;
          const isActive = selected === candi.id;
          return (
            <button
              key={candi.id}
              type="button"
              onClick={() => setSelected(candi.id)}
              className={cn(
                'flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-3',
                isActive ? 'border-main' : 'border-teduri',
              )}
            >
              <Icon className="h-full max-h-24 w-full max-w-24" />
              <p className="text-base font-normal text-black">{candi.label}</p>
            </button>
          );
        })}
      </div>
    </ChatDialogButton>
  );
}
