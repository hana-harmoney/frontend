import { formatNumber } from '@/lib/utils';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { HistoryProps } from '@/types/home';
import History from '@/components/home/History';
const PocketDetailPage = () => {
  const target = 100000;
  const amount = 500000;

  const sampleHistories: HistoryProps[] = [
    {
      date: '2025.08.20 (수)',
      histories: [
        { time: '21:00', title: '베이스 봉투', money: 150000 },
        { time: '14:30', title: '송유림', money: -50000 },
        { time: '09:10', title: '교통 봉투', money: 30000 },
      ],
    },
    {
      date: '2025.08.19 (화)',
      histories: [
        { time: '20:15', title: '베이스 봉투', money: 120000 },
        { time: '11:45', title: '식비 봉투', money: 45000 },
      ],
    },
    {
      date: '2025.08.18 (월)',
      histories: [{ time: '18:00', title: '베이스 봉투', money: 200000 }],
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-6">
      <Header title={'주머니'} showBackButton={true} centerTitle={false} />
      <div className="flex flex-col gap-1 font-semibold">
        <span className="text-3xl">손주 용돈 주머니</span>
        <div className="flex items-center gap-1 text-xl">
          <span className="text-[#4C525D]">목표 금액</span>
          <span>{formatNumber(target)} 원</span>
        </div>
      </div>
      {/* 잔고 표시 */}
      <div className="bg-hana-green-light flex w-full flex-col gap-2 rounded-xl px-6 py-5 font-semibold">
        <span className="text-2xl">현재 금액</span>
        <div className="flex gap-2">
          <span className="text-3xl">{formatNumber(amount)}</span>
          <span className="text-2xl font-light">원</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1 py-6 text-xl">꺼내기</Button>
        <Button variant="destructive" className="flex-1 py-6 text-xl">
          채우기
        </Button>
      </div>
      <div className="flex w-full flex-col gap-6 font-semibold">
        <h1 className="text-3xl">거래 내역</h1>
        <div className="flex flex-col gap-6">
          {sampleHistories.map((item, idx) => (
            <History key={idx} date={item.date} histories={item.histories} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default PocketDetailPage;
