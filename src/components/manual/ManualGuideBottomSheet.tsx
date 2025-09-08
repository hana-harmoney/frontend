'use client';

import BottomSheet from '@/components/common/bottomSheet';
import CircleInfo from '@/assets/icons/circle_info.svg';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ManualGuideBottomSheet({ open, onClose }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      buttonClassName="bg-main"
      contentClassName="h-fit"
    >
      <div className="mt-10 flex h-full w-full flex-col items-center justify-center gap-10 pb-30">
        <CircleInfo className="size-32" />
        <p className="text-center text-2xl font-medium">
          앱 사용이 어려우시면 이 아이콘을
          <br />
          눌러 가이드를 참고하세요.
        </p>
      </div>
    </BottomSheet>
  );
}
