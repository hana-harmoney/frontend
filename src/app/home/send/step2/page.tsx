'use client';
import Header from '@/components/common/header';
import { NumericKeypad } from '@/components/home/NumericKeypad';
import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

const SendStep2Page = () => {
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
  return (
    <div className="flex w-full flex-col gap-6 px-6">
      <Header title="송금하기" centerTitle={false} showBackButton={true} />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col text-2xl">
          <div className="flex gap-2">
            <span className="font-semibold">송유림</span>
            님에게
          </div>
          <span className="text-gray font-light">592-910508-29670</span>
        </div>
        <span className="w-full text-center text-3xl font-semibold">
          {targetStr.length == 0 ? (
            <>얼마를 보낼까요?</>
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
          />
        </div>
      </div>
    </div>
  );
};
export default SendStep2Page;
