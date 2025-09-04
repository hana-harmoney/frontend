import { cn } from '@/lib/utils';
import BottomSheet from '../common/bottomSheet';
import BarChart from '@/assets/icons/bar_chart.svg';
import IncomePastHistoryChart from './IncomePastHistoryChart';

type Props = {
  open: boolean;
  onClose: () => void;
};

const datas = [
  {
    month: 6,
    income: 100000,
  },
  {
    month: 7,
    income: 300000,
  },
  {
    month: 8,
    income: 210000,
  },
  {
    month: 9,
    income: 200000,
  },
];

type IncomeData = {
  month: number;
  income: number;
};

export default function IncomePastHistoryBottomSheet({ open, onClose }: Props) {
  const isPlus = true;
  const calculatedData = getHeights(datas);

  function getHeights(data: IncomeData[], minHeight = 24, maxHeight = 80) {
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
          <span className={cn(isPlus ? 'text-hana-green' : 'text-hana-red')}>
            {' '}
            5만원{' '}
          </span>
          {isPlus ? '늘었어요!' : '줄었어요!'}
        </p>
        <div className="bg-gray-3 gap-2.5 rounded-md px-2.5 pt-6 pb-2.5">
          <IncomePastHistoryChart datas={calculatedData} />
          <p className="text-subtitle pt-2.5 text-center text-base font-medium">
            월별 하모니 수입
          </p>
        </div>
      </div>
    </BottomSheet>
  );
}
