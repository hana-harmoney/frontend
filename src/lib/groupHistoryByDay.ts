import { AccountHistoryItem } from '@/types/accountDetail';
import { HistoryProps } from '@/types/home';

export function groupHistoryByDay(
  history: AccountHistoryItem[],
): HistoryProps[] {
  const map = new Map<string, AccountHistoryItem[]>();

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
