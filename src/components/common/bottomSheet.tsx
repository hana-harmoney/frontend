'use client';

import { PropsWithChildren, useEffect } from 'react';
import { cn } from '@/lib/utils';
import BottomButton from './bottomButton';

type Props = {
  open: boolean;
  onClose: () => void;
  contentClassName?: string;
};

export default function BottomSheet({
  open,
  onClose,
  contentClassName,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={handleBackdropClick}
        />
      )}
      <div
        className={cn(
          'frame-container fixed right-0 bottom-0 left-0 z-50 h-full transition-transform duration-300',
          open ? 'translate-y-0' : 'translate-y-full',
          contentClassName,
        )}
        style={{ maxHeight: '90vh', zIndex: 60 }}
      >
        <div className="relative flex h-full w-full flex-col items-center rounded-t-3xl bg-white">
          {children}
          {/* 바텀시트 하단버튼 */}
          <BottomButton onClick={onClose}>확인</BottomButton>
        </div>
      </div>
    </div>
  );
}
