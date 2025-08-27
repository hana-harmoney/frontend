import { HistoryProps } from '@/types/home';
import HistoryCard from '@/components/home/HistoryCard';
const History = ({ date, histories }: HistoryProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="border-b-text-2 border-b pb-5 text-xl font-semibold">
        {date}
      </div>

      <div className="flex flex-col gap-6">
        {histories.map((h, idx) => {
          return (
            <div key={idx}>
              <HistoryCard title={h.title} time={h.time} money={h.money} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default History;
