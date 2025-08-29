import type { AccountHistoryItem } from '@/types/accountDetail';
import type { PocketTransaction } from '@/types/pocket';

export type DisplayHistory = {
  historyId: number;
  time: string; // "HH:MM"
  amountSigned: string; // "+5,000" / "-15,000"
  isDeposit: boolean;
  counterparty: string; // 상대 이름 / 주머니 이름
};

// "HH:mm:ss" → "HH:mm" 변환
const toHHmm = (raw: string): string => {
  const [hh = '00', mm = '00'] = raw.split(':');
  return `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
};

// 오버로드 시그니처
export function toDisplayHistory(item: AccountHistoryItem): DisplayHistory;
export function toDisplayHistory(item: PocketTransaction): DisplayHistory;

export function toDisplayHistory(
  item: AccountHistoryItem | PocketTransaction,
): DisplayHistory {
  const isAccountItem = (
    x: AccountHistoryItem | PocketTransaction,
  ): x is AccountHistoryItem => 'transactionId' in x;

  const historyId = isAccountItem(item) ? item.transactionId : item.txId;
  const isDeposit = isAccountItem(item)
    ? item.transactionType === '입금'
    : item.direction === '입금';

  const counterparty = isAccountItem(item)
    ? ((isDeposit
        ? (item.fromAccountName ?? item.fromPocketName)
        : (item.toAccountName ?? item.toPocketName)) ?? '알수없음')
    : ((isDeposit ? item.fromName : item.toName) ?? '알수없음');

  const signed = isDeposit ? item.amount : -item.amount;
  const amountSigned = `${signed >= 0 ? '+' : ''}${Math.trunc(signed).toLocaleString('ko-KR')}`;

  const time = toHHmm(item.time);

  return { historyId, time, amountSigned, isDeposit, counterparty };
}
