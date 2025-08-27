import { HistoryCardProps } from '@/types/home';
import { formatNumber } from '@/lib/utils';

const HistoryCard = ({ time, title, money }: HistoryCardProps) => {
  return (
    <div className="border-b-text-2 flex flex-col border-b px-4 pb-5">
      <span className="font-light">{time}</span>
      <span className="text-2xl font-semibold">{title}</span>
      <span
        className={`text-2xl font-semibold ${money > 0 ? 'text-[#178B85]' : 'text-[#F85C52]'} self-end`}
      >
        {money > 0 ? (
          <>{formatNumber(money)} 원</>
        ) : (
          <>-{formatNumber(Math.abs(money))} 원</>
        )}
      </span>
    </div>
  );
};
export default HistoryCard;
