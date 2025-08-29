import { HistoryProps } from '@/types/home';
import HistoryCard from '@/components/home/HistoryCard';
import { useMemo } from 'react';
import { AccountHistoryItem } from '@/types/accountDetail';
import { toDisplayHistory } from '@/lib/toDisplayHistory';
import { PocketTransaction } from '@/types/pocket';

const History = ({ date, histories }: HistoryProps) => {
  // 같은 계산 반복 방지
  const displayList = useMemo(
    () =>
      histories.map(
        toDisplayHistory as (
          v: AccountHistoryItem | PocketTransaction,
        ) => ReturnType<typeof toDisplayHistory>,
      ),
    [histories],
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="border-b-text-2 border-b-2 pb-5 text-xl font-semibold">
        {date}
      </div>

      <div className="flex flex-col gap-6">
        {displayList.map((v, idx) => {
          return (
            <div key={idx}>
              <HistoryCard
                id={v.historyId}
                time={v.time}
                amountSigned={v.amountSigned}
                isDeposit={v.isDeposit}
                counterparty={v.counterparty}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default History;
