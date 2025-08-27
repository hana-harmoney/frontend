'use client';
import Header from '@/components/common/header';
import { CustomInput } from '@/components/common/customInput';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TabBar from '@/components/home/TabBar';
import AccountHistory from '@/components/home/AccountHistory';

const SendStep1Page = () => {
  const [accountNumber, setAccountNumber] = useState('');

  const [selectedId, setSelectedId] = useState(0);
  const tabs = [
    { id: 0, name: '최근' },
    { id: 1, name: '자주' },
  ];
  const gugu = [
    { name: '송유림', accountNumber: '592-910508-29670' },
    { name: '송유림', accountNumber: '592-910508-29670' },
    { name: '송유림', accountNumber: '592-910508-29670' },
  ];
  const gugu2 = [
    { name: '송유림', accountNumber: '592-910508-29670' },
    { name: '송유림', accountNumber: '592-910508-29670' },
    { name: '송유림', accountNumber: '592-910508-29670' },
    { name: '송유림', accountNumber: '592-910508-29670' },
    { name: '송유림', accountNumber: '592-910508-29670' },
  ];

  return (
    <div className="flex w-full flex-col gap-6 px-6">
      <Header title="송금하기" centerTitle={false} showBackButton={true} />
      <span className="text-3xl font-semibold">누구에게 보낼까요?</span>
      <CustomInput
        placeholder="계좌번호 입력"
        value={accountNumber}
        type="number"
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <Button className="py-7 text-xl font-semibold">송금하기</Button>
      <div className="flex flex-col gap-6">
        <TabBar tabs={tabs} selectedId={selectedId} clickTab={setSelectedId} />
        <div className="flex flex-col gap-4">
          {selectedId == 0 &&
            gugu.map((item, idx) => {
              return (
                <AccountHistory
                  key={idx}
                  name={item.name}
                  accountNum={item.accountNumber}
                />
              );
            })}
          {selectedId == 1 &&
            gugu2.map((item, idx) => {
              return (
                <AccountHistory
                  key={idx}
                  name={item.name}
                  accountNum={item.accountNumber}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default SendStep1Page;
