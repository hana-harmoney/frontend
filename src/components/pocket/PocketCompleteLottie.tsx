'use client';

import LottiePlayer from '../common/lottiePlayer';
import Celebrations from '@/assets/lottie/celebrations.json';
import ClappingHands from '@/assets/lottie/clapping.json';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  show: boolean;
  baseClassName?: string;
  overlayClassName?: string;
  baseSpeed?: number;
  overlaySpeed?: number;
  onClose: () => void;
};

export default function PocketCompleteLottie({
  show,
  baseClassName = '',
  overlayClassName = '',
  baseSpeed = 1,
  overlaySpeed = 1,
  onClose,
}: Props) {
  const router = useRouter();

  const navigateToAsset = () => {
    onClose();
    router.push('/asset');
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-white">
          <div className="pointer-events-none absolute h-dvh w-dvh">
            <LottiePlayer
              animationData={Celebrations}
              speed={baseSpeed}
              className={`absolute inset-0 ${baseClassName}`}
            />
            <div className="absolute inset-0 top-1/6 flex justify-center">
              <p className="text-center text-4xl font-semibold">
                목표달성을
                <br />
                축하드립니다!
              </p>
            </div>
            <div className="absolute inset-0 top-1/3 flex justify-center">
              <LottiePlayer
                animationData={ClappingHands}
                speed={overlaySpeed}
                className={`size-50 ${overlayClassName}`}
              />
            </div>
          </div>
          <div className="absolute bottom-0 flex w-full flex-col gap-4 bg-white px-6 pt-2 pb-10">
            <p className="text-gray text-center text-xl font-medium">
              돈을 모을 수 있는 더 좋은 방법이 있어요!
              <br />
              확인하러 가보시겠어요?
            </p>
            <div className="flex w-full gap-4">
              <Button
                className="h-14 flex-1 text-2xl"
                variant={'secondary'}
                onClick={onClose}
              >
                아니요
              </Button>
              <Button
                className="bg-hana-green h-14 flex-1 text-2xl"
                onClick={navigateToAsset}
              >
                확인하러 가기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
