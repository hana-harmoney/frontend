'use client';
import Header from '@/components/common/header';
import { NumericKeypad } from '@/components/home/NumericKeypad';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/lib/utils';
import { minusPocket } from '@/lib/api/transfer';
import { useParams } from 'next/navigation';
import TwoStepModalHome from '@/components/home/TwoStepModalHome';

const TakePage = () => {
  const params = useParams();
  const pocketId = params.id;

  const [amount, setAmount] = useState<number>(0);
  const [pocket, setPocket] = useState<string>('');
  const [open, setOpen] = useState(false);

  const [targetStr, setTargetStr] = useState('');
  const increaseTarget = (value: number) => {
    const current = targetStr === '' ? 0 : Number(targetStr);
    const next = current + value;
    setTargetStr(String(next));
  };

  const gun = [
    { text: '+1만', value: 10000 },
    { text: '+5만', value: 50000 },
    { text: '+10만', value: 100000 },
    { text: '+20만', value: 200000 },
    { text: '+30만', value: 300000 },
  ];

  useEffect(() => {
    setPocket('손주 용돈 주머니');
    setAmount(50000);
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  const clickComplete = () => {
    openModal();
    console.log('clickComplete');
  };

  const handlePocketSubmit = async ({
    amount,
  }: {
    type: string;
    name: string;
    amount: number;
    account: string;
  }): Promise<{ ok: boolean; message?: string }> => {
    try {
      const res = await minusPocket(amount, Number(pocketId));
      const ok = res?.ok ?? (res?.code === 200 || res?.code === '200');
      const message: string | undefined = res?.message;
      return { ok: !!ok, message };
    } catch (e) {
      return { ok: false, message: '주머니 잔액이 부족합니다.' };
    }
  };

  return (
    <div className="px-6">
      <Header title="꺼내기" centerTitle={false} showBackButton={true} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 text-2xl">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <span className="font-semibold">{pocket}</span>
                에서
              </div>
              <div className="text-gray flex gap-1 text-xl font-light">
                잔액
                <span className="font-semibold">{formatNumber(amount)}</span>원
              </div>
            </div>
            <div className="flex items-center gap-1 text-2xl">
              <span className="font-semibold">내 기본 주머니</span>
              <span className="font-light">로</span>
            </div>
          </div>
          <span className="w-full text-center text-3xl font-semibold">
            {targetStr.length == 0 ? (
              <>얼마를 꺼낼까요?</>
            ) : (
              <>{formatNumber(Number(targetStr))} 원</>
            )}
          </span>
          <div className="flex flex-col gap-11">
            <div className="flex gap-1">
              {gun.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-md bg-[#EFF0F4] px-3 py-2 text-center"
                  onClick={() => {
                    increaseTarget(item.value);
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>
            <NumericKeypad
              value={targetStr}
              onChange={(v) => setTargetStr(v)}
              onSubmit={(v) => {
                setTargetStr(v);
              }}
              maxLength={9}
              shuffle={false}
              showWonSuffix={true}
              className="mt-2"
              isAccount={true}
              clickComplete={clickComplete}
              completeComment="완료"
            />
          </div>
        </div>
        <TwoStepModalHome
          open={open}
          type={'take'}
          name={pocket}
          amount={Number(targetStr)}
          onClose={() => setOpen(false)}
          onSubmit={handlePocketSubmit}
        />
      </div>
    </div>
  );
};
export default TakePage;
