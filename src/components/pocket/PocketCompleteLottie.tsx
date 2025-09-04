'use client';

import LottiePlayer from '../common/lottiePlayer';
import Celebrations from '@/assets/lottie/celebrations.json';
import ClappingHands from '@/assets/lottie/clapping.json';

type Props = {
  show: boolean;
  size?: number | string;
  baseClassName?: string;
  overlayClassName?: string;
  baseSpeed?: number;
  overlaySpeed?: number;
  onClose: () => void;
};

export default function PocketCompleteLottie({
  show,
  size = 1000,
  baseClassName = '',
  overlayClassName = '',
  baseSpeed = 1,
  overlaySpeed = 1,
  onClose,
}: Props) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 z-55 flex items-center justify-center bg-white/80"
          onClick={handleBackdropClick}
        >
          <div
            className="pointer-events-none absolute"
            style={{ width: size, height: size }}
          >
            <LottiePlayer
              animationData={Celebrations}
              speed={baseSpeed}
              className={`absolute inset-0 ${baseClassName}`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <LottiePlayer
                animationData={ClappingHands}
                speed={overlaySpeed}
                className={`size-50 ${overlayClassName}`}
              />
              <p className="pt-10 text-center text-2xl font-semibold">
                축하드립니다!
                <br />
                주머니를 모두 채우셨습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
