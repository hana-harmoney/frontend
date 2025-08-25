'use client';

import { ButtonHTMLAttributes } from 'react';

type BottomButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BottomButton({
  children,
  className = '',
  ...props
}: BottomButtonProps) {
  return (
    <button
      className={`bg-hanagreen-normal font-m fixed bottom-0 left-0 flex h-20 w-full items-start justify-center rounded-none pt-4 text-xl text-white disabled:bg-gray-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
