'use client';
import { CustomInput } from '@/components/common/customInput';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/header';
import { NumericKeypad } from '@/components/home/NumericKeypad';
import { useRouter } from 'next/navigation';

const CreatePocketPage = () => {
  const router = useRouter();
  const [pocketName, setPocketName] = useState('');
  const [targetStr, setTargetStr] = useState('');
  const gun = [
    { text: '+30만', value: 300000 },
    { text: '+40만', value: 400000 },
    { text: '+50만', value: 500000 },
    { text: '+60만', value: 600000 },
    { text: '+70만', value: 700000 },
  ];

  const increaseTarget = (value: number) => {
    const current = targetStr === '' ? 0 : Number(targetStr);
    const next = current + value;
    setTargetStr(String(next));
  };

  return (
    <div className="flex flex-col gap-7 px-6">
      <Header
        title={'주머니 만들기'}
        showBackButton={true}
        centerTitle={false}
      />

      <h1 className="text-3xl font-semibold">주머니</h1>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-light">주머니 이름</span>
          <CustomInput
            placeholder="유림이 용돈"
            value={pocketName}
            onChange={(e) => setPocketName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-light">주머니 이름</span>
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
        />
        <Button className="py-7 text-xl font-semibold">작성 완료</Button>
      </div>
    </div>
  );
};

export default CreatePocketPage;
