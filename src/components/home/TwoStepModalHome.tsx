import React, { useEffect, useState } from 'react';
import { TwoStepModalPropsWithVoidSubmit } from '@/types/modal';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import CheckCircle from '@/assets/icons/check_circle.svg';
import CircleError from '@/assets/icons/circle_error.svg';
import { useRouter } from 'next/navigation';

type SubmitResult = { ok: boolean; message?: string };

export default function TwoStepModalHome({
  open,
  type,
  name: initialName = '',
  amount: initialAmount = 0,
  account,
  onClose,
  onSubmit,
  onComplete,
}: TwoStepModalPropsWithVoidSubmit) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState(initialName);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setName(initialName);
      setAmount(initialAmount);
      setResult(null);
      setSubmitting(false);
    }
  }, [open, initialName, initialAmount]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await onSubmit({
        type,
        name: name.trim(),
        amount,
        account: account?.trim() ?? '',
      });

      // onSubmit이 명시적으로 결과를 반환하면 사용, 아니면 성공으로 간주
      const ok =
        typeof res === 'object' && res !== null && 'ok' in res ? res.ok : true;
      const msg =
        typeof res === 'object' && res !== null && 'message' in res
          ? res.message
          : undefined;
      setResult({ ok, message: msg });
      setStep(2);
    } catch (e) {
      setResult({ ok: false, message: '송금에 실패했습니다.' });
      setStep(2);
    } finally {
      setSubmitting(false);
    }
  };

  const handleComplete = () => {
    onClose();
    onComplete?.();
    if (type === 'send') {
      router.replace('/home');
    } else {
      router.back();
    }
  };

  return (
    <div className="fixed inset-0 z-[51] flex items-center justify-center">
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
              <div
                data-testid="fill-take-step1"
                className="flex min-h-[80px] flex-col items-center gap-10 pb-9"
              >
                <span className="text-2xl font-semibold">
                  {name} {type === 'fill' ? '에' : '에서'}
                </span>
                <div className="text-gray flex flex-col items-center gap-1 text-2xl">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-semibold text-black">
                      {formatNumber(amount)}
                    </span>
                    <span className="font-light">원</span>
                  </div>
                  {type === 'fill' ? '채우시겠습니까?' : '꺼내시겠습니까?'}
                </div>
              </div>
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
                onClick={handleSubmit}
                disabled={!name.trim()}
              >
                {submitting ? '처리 중…' : '네'}
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {result?.ok ? (
              // 성공 화면
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
                    <CheckCircle className="h-12 w-12" />
                  </div>
                ) : (
                  <div
                    data-testid="fill-take-step2"
                    className="flex min-h-[80px] flex-col items-center gap-2 text-2xl"
                  >
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-semibold">{name}</span>
                      <span className="font-light">
                        {type === 'fill' ? '에' : '에서'}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 font-light text-black">
                      <span className="text-3xl font-semibold">
                        {formatNumber(amount)}
                      </span>
                      <span className="text-gray">원</span>
                      <span>
                        {type === 'fill' ? '채우기 완료!' : '꺼내기 완료!'}
                      </span>
                    </div>
                    <CheckCircle className="h-12 w-12" />
                  </div>
                )}
                <Button
                  className="bg-main mt-4 w-full flex-1 rounded-md py-6 text-xl"
                  onClick={handleComplete}
                  disabled={!name.trim()}
                >
                  완료
                </Button>
              </>
            ) : (
              // 실패 화면
              <>
                {type === 'send' ? (
                  <div
                    data-testid="send-step2"
                    className="flex min-h-[80px] flex-col items-center gap-2 text-2xl font-semibold"
                  >
                    <span>잔액 부족으로</span>
                    <span>송금 실패</span>
                    <CircleError className="h-12 w-12" />
                  </div>
                ) : type === 'fill' ? (
                  <div
                    data-testid="fill-step2"
                    className="flex min-h-[80px] flex-col items-center gap-2 text-2xl font-semibold"
                  >
                    <span>출금 실패</span>
                    {result?.message && (
                      <p className="mt-2 text-gray-600">{result.message}</p>
                    )}
                    <CircleError className="h-12 w-12" />
                  </div>
                ) : (
                  <div
                    data-testid="take-step2"
                    className="flex min-h-[80px] flex-col items-center gap-2 text-2xl font-semibold"
                  >
                    <span>출금 실패</span>
                    {result?.message && (
                      <p className="mt-2 text-gray-600">{result.message}</p>
                    )}
                    <CircleError className="h-12 w-12" />
                  </div>
                )}
                <Button
                  className="bg-text-2 mt-4 w-full flex-1 rounded-md py-6 text-xl"
                  onClick={handleComplete}
                >
                  닫기
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
