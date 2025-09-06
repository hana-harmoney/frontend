'use client';

import BottomSheet from '@/components/common/bottomSheet';
import ManualSlider from '@/components/manual/ManualSlider';
import { MANUAL_IMAGES, ManualType } from '@/types/manual';

type Props = {
  open: boolean;
  onClose: () => void;
  type: ManualType;
};

export default function ManualBottomSheet({ open, onClose, type }: Props) {
  const images = MANUAL_IMAGES[type];

  return (
    <BottomSheet open={open} onClose={onClose} buttonClassName="bg-main">
      <div className="flex h-full w-full flex-col items-center justify-center pb-30">
        <ManualSlider images={images} />
      </div>
    </BottomSheet>
  );
}
