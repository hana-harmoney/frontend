'use client';
import { copyAccountNumber, formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import BalanceCard from '@/components/home/BalanceCard';
import { useRouter } from 'next/navigation';
import { fetchPocketList } from '@/lib/api/home';
import { AccountInfo } from '@/types/pocket';
import Header from '@/components/common/header';
import { useEffect, useState } from 'react';
import { initFcmOnce } from '@/lib/fcm';
import ManualButton from '@/components/manual/ManualButton';

const HomePage = () => {
  useEffect(() => {
    (async () => {
      await initFcmOnce(); // 토큰 발급/등록 등 초기화 (이미 허용돼 있다면 바로 진행)
      if (typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'default') {
          await Notification.requestPermission();
        }
      }
    })();
  }, []);

  const labelBg = [
    'bg-label0',
    'bg-label1',
    'bg-label2',
    'bg-label3',
    'bg-label4',
    'bg-label5',
  ];

  const router = useRouter();
  const [account, setAccount] = useState<AccountInfo>({
    totalAssets: 0,
    account: '',
    accountId: 0,
    accountBalance: 0,
    pocketLists: [],
  });

  useEffect(() => {
    (async () => {
      const response = await fetchPocketList();
      setAccount(response.result);
    })();
  }, []);

  return (
    <div>
      <Header title="홈" centerTitle={false} showBackButton={false} />
      <div className="flex w-full flex-col gap-6 px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col justify-center gap-2 px-2 pt-6 text-2xl font-semibold">
            <div>총 자산</div>
            <div className="text-main flex items-center gap-1 text-3xl">
              {formatNumber(account.totalAssets)}
              <span className="text-text">원</span>
            </div>
          </div>
        </div>
        <div className="bg-hana-green-light flex flex-col gap-8 rounded-2xl px-4 py-9 text-2xl font-semibold">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold">하모니 계좌</span>
              <span
                className="text-gray cursor-pointer text-xl font-light"
                onClick={() => {
                  router.push(`/home/account/${account.accountId}`);
                }}
              >
                상세보기 &gt;
              </span>
            </div>
            <div className="text-gray flex items-end gap-2 font-light">
              <span className="text-2xl">{account.account}</span>
              <button
                type="button"
                onClick={() => copyAccountNumber(account.account)}
                className="text-xl underline"
                aria-label="계좌번호 복사"
              >
                복사
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {formatNumber(account.accountBalance)}
            <span className="font-light">원</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="flex-1 py-7 text-xl font-semibold"
              onClick={() => {
                router.push('/home/send/step1');
              }}
            >
              송금하기
            </Button>
            <ManualButton type={'transfer'} />
          </div>
        </div>
        {account.pocketLists?.map((pocket, idx) => (
          <BalanceCard
            key={pocket.pocketId}
            id={pocket.pocketId}
            pocketName={pocket.name}
            balance={pocket.amount}
            isAccount={false}
            bgColor={labelBg[(idx + 1) % labelBg.length]}
          />
        ))}
        <div className="flex items-center gap-2">
          <Button
            className="flex-1 py-7 text-xl font-semibold"
            onClick={() => {
              router.push('/home/pocket/new');
            }}
          >
            주머니 만들기
          </Button>
          <ManualButton type={'pocket'} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
