'use client';

import { PropsWithChildren } from 'react';
import { Button } from '../ui/button';

type Props = {
  title: string;
  desc: string;
  open?: boolean;
  showCancleButton?: boolean;
  actionButtonText?: string;
  closeButtonText?: string;
  onAction: () => void;
  onClose: () => void;
};

export default function ChatDialogButton({
  title,
  desc,
  open,
  showCancleButton = true,
  actionButtonText,
  closeButtonText,
  onAction,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  const showModal = open ?? true;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={handleBackdropClick}
        >
          <div className="mx-5 w-full rounded-2xl bg-white px-8 py-6 shadow-sm">
            <p className="text-text mb-2 text-3xl font-semibold">{title}</p>
            <p className="text-gray mb-9 text-2xl font-normal">{desc}</p>
            {children}
            <div className="flex w-full gap-4 px-0 pt-9 text-xl font-semibold">
              {showCancleButton && (
                <Button
                  className="bg-text-2 hover:bg-text-2/90 h-10 flex-1 text-xl font-semibold text-white"
                  onClick={onClose}
                >
                  {closeButtonText ?? '취소'}
                </Button>
              )}
              <Button
                className="h-10 flex-1 text-xl font-semibold"
                onClick={onAction}
              >
                {actionButtonText ?? '확인'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
