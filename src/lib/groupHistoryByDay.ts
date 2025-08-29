import { AccountHistoryItem } from '@/types/accountDetail';
import { PocketTransaction } from '@/types/pocket';
import { HistoryProps } from '@/types/home';

export function groupHistoryByDay<T extends { day: string; time: string }>(
  history: T[],
): { id: number; date: string; histories: T[] }[];

export function groupHistoryByDay(history: PocketTransaction[]): HistoryProps[];

// 구현부 (공통 필드 day/time만 사용)
export function groupHistoryByDay(
  history: (AccountHistoryItem | PocketTransaction)[],
): HistoryProps[] {
  const map = new Map<string, (AccountHistoryItem | PocketTransaction)[]>();

  for (const item of history) {
    const arr = map.get(item.day) ?? [];
    arr.push(item);
    map.set(item.day, arr);
  }

  for (const [day, items] of map) {
    items.sort((a, b) => b.time.localeCompare(a.time));
    map.set(day, items);
  }

  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([day, items], idx) => ({
      id: idx,
      date: day,
      histories: items,
    }));
}
