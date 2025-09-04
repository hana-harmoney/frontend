import { stackedBarData } from '@/types/stackedBar';

export default function StackedBarChart({
  name,
  data,
  total,
}: {
  name: string;
  data: stackedBarData[];
  total: number;
}) {
  const monthlyData = data.map((d) => ({
    ...d,
    width: total > 0 ? (d.value / total) * 100 : 0,
    percent: Math.round((d.value / total) * 100),
  }));

  return (
    <div className="flex w-full flex-row items-start justify-start gap-4">
      <h2 className="py-[6px] text-lg font-semibold text-[#181818]">{name}</h2>
      <div className="flex flex-col gap-1">
        <div className="flex w-full overflow-hidden py-2">
          {monthlyData.map((data, idx) => (
            <div
              key={idx}
              style={{
                height: '24px',
                width: `${data.width}%`,
                backgroundColor: data.color,
                borderRight:
                  idx !== monthlyData.length - 1 ? '0.5px solid white' : 'none',
                borderTopRightRadius:
                  idx === monthlyData.length - 1 ? '2px' : 0,
                borderBottomRightRadius:
                  idx === monthlyData.length - 1 ? '2px' : 0,
              }}
            />
          ))}
        </div>
        {/* 하단 라벨 */}
        <div className="font-weight-600 mt-1 grid grid-cols-2 gap-x-4 gap-y-2 text-[1rem] font-[500]">
          {monthlyData.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span
                className="h-[0.6rem] w-[0.6rem] rounded-full"
                style={{ background: d.color }}
              />
              <span>{d.label}</span>
              <span>{d.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
