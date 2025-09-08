'use client';

import {
  ComponentType,
  PropsWithChildren,
  SVGProps,
  useEffect,
  useState,
} from 'react';
import PhoneStarboy from '@/assets/images/phone_starboy.svg';
import LaptopStarboy from '@/assets/images/laptop_starboy.svg';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { createDelegateToken } from '@/lib/api/profile';

type Props = {
  isOpen: boolean;
  onAction1: () => void;
  onAction2: (link: string) => void;
  onClose: () => void;
};

type SelectItem = {
  id: number;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  desc: string;
  buttonText: string;
};

const items: SelectItem[] = [
  {
    id: 1,
    label: '직접 작성하기',
    Icon: LaptopStarboy,
    desc: '아래 버튼을 눌러 프로필을 작성해주세요.',
    buttonText: '작성하러 가기',
  },
  {
    id: 2,
    label: '자녀에게 부탁하기',
    Icon: PhoneStarboy,
    desc: '아래 버튼을 눌러 복사된 링크를 자녀에게 보내주세요.',
    buttonText: '복사하기',
  },
];

export default function ProfileRegisterSelectDialog({
  isOpen,
  onAction1,
  onAction2,
  onClose,
}: PropsWithChildren<Props>) {
  const [selected, setSelected] = useState(1);
  const [link, setLink] = useState('');
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const data = await createDelegateToken();
        const link = `${origin}/profile/delegate?token=${data.delegateToken}`;
        setLink(link);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [origin, isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAction = () => {
    if (selected === 1) {
      onAction1();
    } else {
      onAction2(link);
      onClose();
      toast.success(
        '링크가 복사되었습니다. 자녀에게 전달해서 프로필 작성을 완료하세요.',
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={handleBackdropClick}
        >
          <div className="mx-5 flex w-full flex-col gap-5 rounded-2xl bg-white px-4 py-6 shadow-sm">
            <p className="text-gray text-center text-xl font-bold">
              서비스 이용을 위해
              <br />
              프로필 등록이 필요합니다.
            </p>
            <div className="flex gap-2">
              {items.map((item) => {
                const Icon = item.Icon;
                const isActive = selected === item.id;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      'flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border-[1px] px-3 py-4',
                      isActive ? 'border-main' : 'border-teduri',
                    )}
                    onClick={() => setSelected(item.id)}
                  >
                    <Icon className="h-20 w-full" />
                    <p className="text-gray text-center text-lg font-semibold">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full flex-col gap-3 text-xl font-semibold">
              <div className="flex items-center gap-1">
                <div className="text-main text-3xl font-medium">·</div>
                <p className="text-lg font-normal">
                  {items.find((item) => item.id === selected)?.desc}
                </p>
              </div>
              <Button
                className="bg-hana-green h-10 flex-1 text-xl font-semibold"
                onClick={handleAction}
              >
                {items.find((item) => item.id === selected)?.buttonText}
              </Button>
              <Button
                className="bg-text-2 hover:bg-text-2/90 h-10 flex-1 text-xl font-semibold text-white"
                onClick={onClose}
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
