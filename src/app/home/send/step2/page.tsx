'use client';
import Header from '@/components/common/header';
import { NumericKeypad } from '@/components/home/NumericKeypad';
import { useEffect, useState, useRef } from 'react';
import { formatNumber } from '@/lib/utils';
import { useAccountStore } from '@/stores/accountStore';
import TwoStepModalHome from '@/components/home/TwoStepModalHome';
import { fetchAccountName, transfer } from '@/lib/api/transfer';
import toast from 'react-hot-toast';

const SendStep2Page = () => {
  const [receiver, setReceiver] = useState<string>('사용자');
  const { accountNumber, reset } = useAccountStore();
  const [account, setAccount] = useState<string>('');

  const ignoreFirstCleanup = useRef(true);

  // 페이지 벗어날 때 계좌번호 초기화하기 위해 이렇게 했습니다
  useEffect(() => {
    return () => {
      if (ignoreFirstCleanup.current) {
        ignoreFirstCleanup.current = false;
        return;
      }
      reset();
    };
  }, [reset]);

  const [targetStr, setTargetStr] = useState('');
  const [open, setOpen] = useState(false);

  const increaseTarget = (value: number) => {
    const current = targetStr === '' ? 0 : Number(targetStr);
    const next = current + value;
    setTargetStr(String(next));
  };

  const priceList = [
    { text: '+1만', value: 10000 },
    { text: '+5만', value: 50000 },
    { text: '+10만', value: 100000 },
    { text: '+20만', value: 200000 },
    { text: '+30만', value: 300000 },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (accountNumber) {
          const data = await fetchAccountName(accountNumber);
          setReceiver(data.name);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [account]);

  useEffect(() => {
    setAccount(accountNumber);
  }, [accountNumber]);

  const openModal = () => {
    setOpen(true);
  };

  const clickComplete = () => {
    if (Number(targetStr) === 0) {
      toast.error('금액을 입력해주세요.');
      return;
    }
    openModal();
  };

  const handleModalSubmit = async ({
    name,
    amount,
    account,
  }: {
    name: string;
    amount: number;
    account: string;
  }) => {
    const res = await transfer(account, name, amount);
    if (res.code === '200') {
      return { ok: true };
    }
    return { ok: false };
  };

  return (
    <div className="px-6">
      <Header title="송금하기" centerTitle={false} showBackButton={true} />
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col text-2xl">
            <div className="flex gap-2">
              <span className="font-semibold">{receiver}</span>
              님에게
            </div>
            <span className="text-gray font-light">{accountNumber}</span>
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
              {priceList.map((item, idx) => (
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
          type={'send'}
          name={receiver}
          amount={Number(targetStr)}
          account={accountNumber}
          onClose={() => setOpen(false)}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
};
export default SendStep2Page;
