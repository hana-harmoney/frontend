'use client';
import Header from '@/components/common/header';
import { CustomInput } from '@/components/common/customInput';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TabBar from '@/components/home/TabBar';
import AccountHistory from '@/components/home/AccountHistory';
import { useRouter } from 'next/navigation';
import { useAccountStore } from '@/stores/accountStore';

const SendStep1Page = () => {
  const router = useRouter();
  const { setAccountNumber: setGlobalAccountNumber, reset } = useAccountStore();
  const [accountNumber, setAccountNumber] = useState('');

  const [selectedId, setSelectedId] = useState(0);
  const tabs = [
    { id: 0, name: '최근' },
    { id: 1, name: '자주' },
  ];
  const recentHistory = [
    { name: '김지민', accountNumber: '569-174604-33224' },
    { name: '유우림', accountNumber: '110-159-162975' },
    { name: '효준리', accountNumber: '251-412008-51289' },
  ];
  const oftenHistory = [
    { name: '곽희건', accountNumber: '022-560098-70519' },
    { name: '미야옹', accountNumber: '409-995828-53054' },
    { name: '아아아', accountNumber: '110-123-456789' },
    { name: '고고', accountNumber: '154-784206-04861' },
    { name: '희건희', accountNumber: '853-824140-57853' },
  ];

  return (
    <div className="px-6">
      <Header title="송금하기" centerTitle={false} showBackButton={true} />
      <div className="flex flex-col gap-6">
        <span className="text-3xl font-semibold">누구에게 보낼까요?</span>
        <CustomInput
          placeholder="계좌번호 입력"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <Button
          className="py-7 text-xl font-semibold"
          disabled={accountNumber.length === 0}
          onClick={() => {
            setGlobalAccountNumber(accountNumber);
            router.push('/home/send/step2');
          }}
        >
          송금하기
        </Button>
        <div className="flex flex-col gap-6">
          <TabBar
            tabs={tabs}
            selectedId={selectedId}
            clickTab={setSelectedId}
          />
          <div className="flex flex-col gap-4">
            {selectedId == 0 &&
              recentHistory.map((item, idx) => {
                return (
                  <AccountHistory
                    key={idx}
                    name={item.name}
                    accountNum={item.accountNumber}
                    onClick={() => setAccountNumber(item.accountNumber)}
                  />
                );
              })}
            {selectedId == 1 &&
              oftenHistory.map((item, idx) => {
                return (
                  <AccountHistory
                    key={idx}
                    name={item.name}
                    accountNum={item.accountNumber}
                    onClick={() => setAccountNumber(item.accountNumber)}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendStep1Page;
