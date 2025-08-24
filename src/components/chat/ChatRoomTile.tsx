import Link from 'next/link';
import { formatSmartDate } from '@/lib/date/dateformatter';
import ChatProfileImage from './ChatProfileImage';

type Props = {
  roomId: number;
  imageUrl: string;
  nickname: string;
  lastMessage?: string;
  lastMessageDate?: Date;
};

export default function ChatRoomTile({
  roomId,
  imageUrl,
  nickname,
  lastMessage,
  lastMessageDate,
}: Props) {
  return (
    <Link href={`/chatroom/${roomId}`}>
      <div className="hover:bg-gray-3 flex items-center gap-2.5 px-6">
        <ChatProfileImage imageUrl={imageUrl} size={50} />
        <div className="flex flex-1 flex-col gap-1.5 py-1">
          <div className="flex items-center gap-2">
            <p className="flex-1 text-xl font-semibold">{nickname}</p>
            <p className="text-text-2 text-sm font-medium">
              {lastMessageDate && formatSmartDate(lastMessageDate)}
            </p>
          </div>
          <p className="text-xl font-normal">
            {lastMessage ?? '아직 메세지가 없습니다.'}
          </p>
        </div>
      </div>
    </Link>
  );
}
