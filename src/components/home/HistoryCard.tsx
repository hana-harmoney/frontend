import { HistoryCardProps } from '@/types/home';

const HistoryCard = ({
  time,
  amountSigned,
  isDeposit,
  counterparty,
}: HistoryCardProps) => {
  return (
    <div className="border-b-text-2 flex flex-col border-b px-4 pb-5">
      <span className="font-light">{time}</span>
      <span className="text-2xl font-semibold">{counterparty}</span>
      <span
        className={`text-2xl font-semibold ${isDeposit ? 'text-[#178B85]' : 'text-[#F85C52]'} self-end`}
      >
        {amountSigned}
      </span>
    </div>
  );
};
export default HistoryCard;
