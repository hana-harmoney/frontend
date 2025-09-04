import { cn } from '@/lib/utils';
import BottomSheet from '../common/bottomSheet';
import BarChart from '@/assets/icons/bar_chart.svg';
import IncomePastHistoryChart from './IncomePastHistoryChart';
import { useEffect, useState } from 'react';
import { fetchPastHarmoneyIncome } from '@/lib/api/report';

type Props = {
  open: boolean;
  onClose: () => void;
};

type IncomeData = {
  date: Date;
  month: number;
  income: number;
  height: number;
};

export default function IncomePastHistoryBottomSheet({ open, onClose }: Props) {
  const [datas, setDatas] = useState<IncomeData[]>([]);
  const [incomeDiffFromPrevMonth, setIncomeDiffFromPrevMonth] = useState(0);

  function getHeights(
    data: { date: Date; month: number; income: number }[],
    minHeight = 24,
    maxHeight = 80,
  ) {
    const incomes = data.map((d) => d.income);
    const minVal = Math.min(...incomes);
    const maxVal = Math.max(...incomes);
    const span = maxVal - minVal;

    if (span === 0) {
      return data.map((d) => ({ ...d, height: maxHeight }));
    }

    return data.map((d) => {
      const ratio = (d.income - minVal) / span; // 0 ~ 1
      const height = Math.round(minHeight + ratio * (maxHeight - minHeight));
      return { ...d, height };
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchPastHarmoneyIncome();

        const parsed = res
          .map((income) => {
            const date = new Date(income.month);
            return {
              date: date,
              month: date.getMonth() + 1,
              income: income.monthlyAmount,
            };
          })
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .slice(Math.max(res.length - 4, 0));

        const incomeThis = parsed[parsed.length - 1].income;
        const incomePrev = parsed[parsed.length - 2].income;

        setIncomeDiffFromPrevMonth(incomeThis - incomePrev);
        setDatas(getHeights(parsed));
      } catch (e) {
      } finally {
      }
    })();
  }, []);

  return (
    <BottomSheet open={open} onClose={onClose} contentClassName="h-fit">
      <div className="w-full overflow-y-auto overscroll-contain px-5 pb-25">
        {/* 바텀시트 라벨 */}
        <div className="text-text mt-4 flex items-center gap-2 overflow-y-auto text-2xl font-semibold">
          <BarChart className="text-hana-green stroke-hana-green size-8" />
          지난 하모니 수입
        </div>
        <p className="text-gray my-5 text-center text-xl font-medium">
          전월 대비 이번 달 수입이
          <span
            className={cn(
              incomeDiffFromPrevMonth > 0 ? 'text-hana-green' : 'text-hana-red',
            )}
          >
            {' '}
            {incomeDiffFromPrevMonth / 10000}만원{' '}
          </span>
          {incomeDiffFromPrevMonth > 0 ? '늘었어요!' : '줄었어요!'}
        </p>
        <div className="bg-gray-3 gap-2.5 rounded-md px-2.5 pt-6 pb-2.5">
          <IncomePastHistoryChart datas={datas} />
          <p className="text-subtitle pt-2.5 text-center text-base font-medium">
            월별 하모니 수입
          </p>
        </div>
      </div>
    </BottomSheet>
  );
}
