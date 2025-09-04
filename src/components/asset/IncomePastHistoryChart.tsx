import { cn } from '@/lib/utils';

type Props = {
  datas: {
    month: number;
    income: number;
    height: number;
  }[];
};

export default function IncomePastHistoryChart({ datas }: Props) {
  const today = new Date(Date.now());

  return (
    <div className="flex">
      {datas.map((data, index) => {
        const thisMonth = today.getMonth() + 1 === data.month;
        return (
          <div
            key={index}
            className="text-subtitle flex flex-1 flex-col items-center justify-end text-center text-sm font-semibold"
          >
            <div>{data.income / 10000}만원</div>
            <div
              style={{ height: data.height }}
              className={cn(
                'mt-2.5 h-20 w-10 rounded-t-sm transition-transform duration-300',
                thisMonth ? 'bg-hana-green' : 'bg-gray-300',
              )}
            ></div>
            <div className="border-subtitle w-full border-t-2">
              {data.month}월
            </div>
          </div>
        );
      })}
    </div>
  );
}
