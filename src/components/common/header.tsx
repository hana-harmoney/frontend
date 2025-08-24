'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { PropsWithChildren, useEffect, useState } from 'react';
import LeftArrow from '@/assets/icons/left_arrow.svg';

type Props = {
  title: string;
  centerTitle?: boolean;
  showBackButton?: boolean;
  scrollHide?: boolean;
  color?: 'white' | 'black';
  className?: string;
};

const BackButton = ({ color }: { color: 'white' | 'black' }) => {
  const router = useRouter();

  return (
    <button
      className="z-10 cursor-pointer px-4 py-4"
      type="button"
      onClick={() => router.back()}
    >
      <LeftArrow
        className={clsx(
          'size-4 stroke-black stroke-[0.1rem]',
          color === 'black' ? 'stroke-black' : 'stroke-white',
        )}
      />
    </button>
  );
};

export default function Header({
  title,
  centerTitle = true,
  showBackButton = true,
  scrollHide = true,
  color = 'black',
  className,
  children,
}: PropsWithChildren<Props>) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!scrollHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        // 아래로 스크롤: 헤더 숨김
        setShow(false);
      } else {
        // 위로 스크롤: 헤더 보여줌
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollHide, lastScrollY]);

  return (
    <header>
      <div className="h-12"></div>
      <div
        className={clsx(
          'bg-background fixed top-0 left-0 z-10 w-full transition-transform duration-300',
          scrollHide ? (show ? 'translate-y-0' : '-translate-y-full') : '',
          className,
        )}
      >
        <div className="frame-container relative flex h-12 items-center">
          {showBackButton && <BackButton color={color} />}

          <h1
            className={clsx(
              'absolute right-0 left-0 text-2xl font-semibold',
              centerTitle ? 'text-center' : 'pl-8 text-left',
              color === 'black' ? 'text-text-primary' : 'text-white',
            )}
          >
            {title}
          </h1>
          <div className="absolute right-0">{children}</div>
        </div>
      </div>
    </header>
  );
}
