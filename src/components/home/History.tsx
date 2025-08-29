import { HistoryProps } from '@/types/home';
import HistoryCard from '@/components/home/HistoryCard';
import { useMemo } from 'react';
import { AccountHistoryItem } from '@/types/accountDetail';

const toDisplay = (item: AccountHistoryItem) => {
  const historyId = item.transactionId;
  const isDeposit = item.transactionType === '입금';

  const counterparty =
    (isDeposit
      ? (item.fromAccountName ?? item.fromPocketName)
      : (item.toAccountName ?? item.toPocketName)) ?? '알수없음';

  // 금액 +/-
  const signed = isDeposit ? item.amount : -item.amount;
  const amountSigned = `${signed >= 0 ? '+' : ''}${Math.trunc(signed).toLocaleString('ko-KR')}`;

  const time = item.time.slice(0, 5); // "20:31:17" -> "20:31"

  return { historyId, time, amountSigned, isDeposit, counterparty };
};

const History = ({ date, histories }: HistoryProps) => {
  // 같은 계산 반복 방지
  const displayList = useMemo(() => histories.map(toDisplay), [histories]);

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
