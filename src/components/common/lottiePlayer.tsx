// src/components/common/LottiePlayer.tsx
'use client';

import { useEffect, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

type Props = {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  className?: string;
};

export default function LottiePlayer({
  animationData,
  loop = true,
  autoplay = true,
  speed = 1,
  className,
}: Props) {
  const ref = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    ref.current?.setSpeed(speed);
  }, [speed]);

  return (
    <Lottie
      lottieRef={ref}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
    />
  );
}
