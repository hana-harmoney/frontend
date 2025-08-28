'use client';

import ChatPocketCard from '@/components/chat/ChatPocketCard';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { useAccount } from '@/hooks/useAccount';
import { useState } from 'react';

export default function ChatPocketPage() {
  const { data: account } = useAccount();
  const [selected, setSelected] = useState<number>();

  const selectPocket = (id: number) => {
    setSelected(id);
  };

  return (
    <div>
      <Header title="주머니로 옮기기" centerTitle={false} />
      <div className="flex flex-col gap-6 p-6">
        {account?.pocketLists.map((pocket) => (
          <ChatPocketCard
            key={pocket.pocketId}
            pocket={pocket}
            isSelected={selected === pocket.pocketId}
            onSelect={selectPocket}
          />
        ))}
        <Button className="h-14 text-xl font-semibold" disabled={!selected}>
          주머니로 옮기기
        </Button>
      </div>
    </div>
  );
}
