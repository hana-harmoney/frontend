'use client';
import { CustomInput } from '@/components/common/customInput';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/header';
import { NumericKeypad } from '@/components/home/NumericKeypad';
import { useRouter } from 'next/navigation';
import { createPocket } from '@/lib/api/pocket';
import { PocketCreateRequest } from '@/types/pocket';

const CreatePocketPage = () => {
  const router = useRouter();
  const [pocketName, setPocketName] = useState('');
  const [targetStr, setTargetStr] = useState('');
  const gun = [
    { text: '+1만', value: 10000 },
    { text: '+5만', value: 50000 },
    { text: '+10만', value: 100000 },
    { text: '+20만', value: 200000 },
    { text: '+30만', value: 300000 },
  ];

  const increaseTarget = (value: number) => {
    const current = targetStr === '' ? 0 : Number(targetStr);
    const next = current + value;
    setTargetStr(String(next));
  };

  const handleCreatePocket = async (name: string, targetAmount: number) => {
    const data: PocketCreateRequest = {
      name,
      targetAmount,
      initialAmount: 0,
    };
    await createPocket(data);

    router.push('/home');
  };

  return (
    <div className="px-6">
      <Header
        title={'주머니 만들기'}
        showBackButton={true}
        centerTitle={false}
      />
      <div className="flex flex-col gap-7">
        <h1 className="text-3xl font-semibold">주머니</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-light">이름</span>
            <CustomInput
              placeholder="주머니 이름을 설정하세요."
              value={pocketName}
              onChange={(e) => setPocketName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-light">목표 금액</span>
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
            />
            <Button
              onClick={() => handleCreatePocket(pocketName, Number(targetStr))}
              className="py-7 text-xl font-semibold"
            >
              작성 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePocketPage;
