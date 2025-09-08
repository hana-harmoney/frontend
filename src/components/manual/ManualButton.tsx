'use client';

import CircleInfo from '@/assets/icons/circle_info.svg';
import { useState } from 'react';
import ManualBottomSheet from './ManualBottomSheet';
import { ManualType } from '@/types/manual';

type Props = {
  type: ManualType;
};

export default function ManualButton({ type }: Props) {
  const [showManual, setShowManual] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="block"
        onClick={() => setShowManual(true)}
      >
        <CircleInfo className="stroke-gray fill-gray size-8" />
      </button>
      <ManualBottomSheet
        open={showManual}
        onClose={() => setShowManual(false)}
        type={type}
      />
    </div>
  );
}
