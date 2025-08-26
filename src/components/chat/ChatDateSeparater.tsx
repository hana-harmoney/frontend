import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DateSeparator({ date }: { date: Date }) {
  return (
    <div className="my-4 flex items-center">
      <div className="flex-grow self-center border-b px-5" />
      <span className="text-text-2 px-5 py-1 text-xl">
        {format(date, 'yyyy년 M월 d일 (E)', { locale: ko })}
      </span>
      <div className="flex-grow self-center border-b px-5" />
    </div>
  );
}
