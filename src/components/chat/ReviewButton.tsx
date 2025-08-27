'use client';

import ChatDialogButton from './ChatDialogButton';
import { ComponentType, SVGProps, useState } from 'react';
import { Button } from '../ui/button';
import BadBoy from '@/assets/images/bad_starboy.svg';
import ThumbsUpBoy from '@/assets/images/thumbsup_starboy.svg';
import HeartBoy from '@/assets/images/heart_starboy.svg';
import { cn } from '@/lib/utils';

type Props = {
  roomId: number;
};

type ReviewItem = {
  id: number;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  score: number;
};

const reviewCandidate: ReviewItem[] = [
  { id: 1, label: '별로에요', Icon: BadBoy, score: -0.5 },
  { id: 2, label: '좋아요', Icon: ThumbsUpBoy, score: 0.5 },
  { id: 3, label: '최고에요', Icon: HeartBoy, score: 1 },
];
export default function ReviewButton({ roomId }: Props) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selected, setSelected] = useState<number | null>();

  const openReviewDialog = () => {
    setShowReviewDialog(true);
  };

  const closeReviewDialog = () => {
    setSelected(null);

    setShowReviewDialog(false);
  };

  const handleReportUser = async () => {};

  return (
    <div>
      <Button
        className="text-xl font-medium"
        variant={'secondary'}
        onClick={openReviewDialog}
      >
        후기 쓰기
      </Button>

      {/* 후기 쓰기 다이알로그 */}
      <ChatDialogButton
        title={'후기 쓰기'}
        desc={'후기를 남겨주세요!'}
        open={showReviewDialog}
        onAction={handleReportUser}
        onClose={closeReviewDialog}
        actionButtonText="완료"
        closeButtonText="닫기"
      >
        <div className="flex gap-4">
          {reviewCandidate.map((candi) => {
            const { Icon } = candi;
            const isActive = selected === candi.id;
            return (
              <button
                key={candi.id}
                type="button"
                onClick={() => setSelected(candi.id)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border-2 p-3',
                  isActive ? 'border-main' : 'border-teduri',
                )}
              >
                <Icon className="size-24" />
                <p className="text-base font-normal text-black">
                  {candi.label}
                </p>
              </button>
            );
          })}
        </div>
      </ChatDialogButton>
    </div>
  );
}
