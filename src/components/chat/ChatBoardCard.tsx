import Pin from '@/assets/icons/pin.svg';
import Dollor from '@/assets/icons/dollar.svg';
import { Button } from '../ui/button';
import Link from 'next/link';

type Props = {
  boardId: number;
  title: string;
  address: string;
  wage: number;
  isWriter: boolean;
};

export default function ChatBoardCard({
  boardId,
  title,
  address,
  wage,
  isWriter,
}: Props) {
  return (
    <div className="border-teduri flex flex-col rounded-xl border-[1px] px-3 py-6">
      <div className="p-2.5">
        <div className="flex items-center gap-2.5">
          <p className="text-hana-green line-clamp-1 text-2xl font-semibold">
            {title}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <Pin className="size-4" />
            <p className="text-sm font-medium">{address}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dollor className="size-5" />
          <p className="text-base">
            시급
            <span className="text-hana-green font-semibold">{` ${wage.toLocaleString('ko-KR')} `}</span>
            원
          </p>
        </div>
      </div>
      <div className="flex w-full gap-2.5">
        <Link className="flex-1" href={`/jobs/${boardId}`}>
          <Button variant="outline" className="h-10 w-full flex-1 text-xl">
            상세 보기
          </Button>
        </Link>
        {isWriter && <Button className="h-10 flex-1 text-xl">송금하기</Button>}
      </div>
    </div>
  );
}
