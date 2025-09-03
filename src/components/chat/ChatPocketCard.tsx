import { cn, formatNumber } from '@/lib/utils';
import { Pocket } from '@/types/pocket';

type Props = {
  pocket: Pocket;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

export default function ChatPocketCard({
  pocket,
  isSelected,
  onSelect,
}: Props) {
  return (
    <div
      className={cn(
        'border-main flex flex-col gap-2.5 rounded-xl border-[1px] p-6',
        isSelected ? 'bg-hana-green-light' : '',
      )}
      onClick={() => onSelect(pocket.pocketId)}
    >
      <p className="text-2xl font-semibold">{`${pocket.name} 주머니`}</p>
      <p className="text-end text-2xl font-semibold">
        {`${formatNumber(pocket.amount)} `}
        <span className="text-text">원</span>
      </p>
      <p className="text-gray pt-1 text-center text-lg font-normal">
        목표 금액까지{' '}
        <span className="text-hana-green font-bold">
          {formatNumber(pocket.targetAmount - pocket.amount)}
        </span>
        원 남았어요!
      </p>
    </div>
  );
}
