import React, { useEffect, useState } from 'react';
import { FlowType, TwoStepModalProps } from '@/types/modal';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';

export default function TwoStepModal({
  open,
  type,
  name: initialName = '',
  amount: initialAmount = 0,
  account,
  onClose,
  onSubmit,
}: TwoStepModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState(initialName);
  const [amount, setAmount] = useState<number>(initialAmount);

  // 모달이 열릴 때마다 단계/입력 초기화
  useEffect(() => {
    if (open) {
      setStep(1);
      setName(initialName);
      setAmount(initialAmount);
    }
  }, [open, initialName, initialAmount]);
  console.log('account :', account);

  if (!open) return null;

  // 간단한 카피(문구) 분기 – 배치는 네가 꾸미면 됨
  const titleMap: Record<FlowType, string> = {
    fill: '충전하기',
    take: '회수하기',
    send: '송금하기',
  };

  const step1Label = (() => {
    if (type === 'send') return '받는 분과 계좌';
    return '대상 정보';
  })();

  const step2Label = (() => {
    if (type === 'send') return '보낼 금액';
    if (type === 'fill') return '충전 금액';
    return '회수 금액';
  })();

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleComplete = () => {
    // onSubmit({ type, name: name.trim(), amount, account: account.trim() });
    console.log('handleComplete');
    // onClose();
  };

  // 단순 오버레이/컨테이너 – 원하는 스타일로 교체 가능
  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        {/* STEP 1: name/account */}
        {step === 1 && (
          <>
            {type === 'send' ? (
              <div
                data-testid="send-step1"
                className="flex min-h-[80px] flex-col items-center gap-10 pb-9"
              >
                <div className="flex flex-col items-center gap-1 text-2xl">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-semibold">{name}</span>
                    <span className="font-light">님에게</span>
                  </div>
                  <span className="text-gray">{account}</span>
                </div>
                <div className="text-gray flex flex-col items-center gap-1 text-2xl">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-semibold text-black">
                      {formatNumber(amount)}
                    </span>
                    <span className="font-light">원</span>
                  </div>
                  보내시겠습니까?
                </div>
              </div>
            ) : (
              <div data-testid="fill-take-step1" className="min-h-[80px]" />
            )}

            <div className="mt-2 flex gap-2 font-semibold text-white">
              <Button
                className="bg-text-2 hover:bg-text-2 flex-1 rounded-md py-6 text-xl"
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                className="bg-main flex-1 rounded-md py-6 text-xl"
                onClick={handleNext}
                disabled={!name.trim()}
              >
                네
              </Button>
            </div>
          </>
        )}

        {/* STEP 2: amount */}
        {step === 2 && (
          <>
            {type === 'send' ? (
              <div
                data-testid="send-step2"
                className="flex min-h-[80px] flex-col items-center gap-2 text-2xl"
              >
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-semibold">{name}</span>
                  <span className="font-light">님에게</span>
                </div>
                <div className="flex items-end gap-1 font-light text-black">
                  <span className="text-3xl font-semibold">
                    {formatNumber(amount)}
                  </span>
                  <span className="text-gray">원</span>
                  <span>송금 완료!</span>
                </div>
                <div>아이콘</div>
              </div>
            ) : (
              <div data-testid="fill-take-step2" className="min-h-[80px]" />
            )}
            <Button
              className="bg-main mt-4 w-full flex-1 rounded-md py-6 text-xl"
              onClick={handleComplete}
              disabled={!name.trim()}
            >
              완료
            </Button>
            {/*<div className="mt-2 flex gap-2 font-semibold text-white">*/}
            {/*  <Button*/}
            {/*    className="bg-text-2 hover:bg-text-2 flex-1 rounded-md py-6 text-xl"*/}
            {/*    onClick={handleBack}*/}
            {/*  >*/}
            {/*    취소*/}
            {/*  </Button>*/}
            {/*  <Button*/}
            {/*    className="bg-main flex-1 rounded-md py-6 text-xl"*/}
            {/*    onClick={handleComplete}*/}
            {/*    disabled={!name.trim()}*/}
            {/*  >*/}
            {/*    네*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </>
        )}
      </div>
    </div>
  );
}
