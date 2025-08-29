import { isSameDay, isSameMinute } from 'date-fns';
import { Ref } from 'react';
import DateSeparator from './ChatDateSeparater';
import ChatMessageBubble from './ChatMessageBubble';
import { ChatMessage } from '@/types/chat';
import { cn } from '@/lib/utils';

type Props = {
  scrollRef: Ref<HTMLDivElement>;
  roomId: number;
  messages: ChatMessage[];
  showRecord: boolean;
  isLoading: boolean;
  isError: boolean;
};

export default function ChatMessageList({
  scrollRef,
  roomId,
  messages,
  showRecord,
  isLoading,
  isError,
}: Props) {
  const reversedMessage = [...messages].reverse();

  if (isLoading || isError)
    return (
      <div className="content-h text-text-secondary flex flex-col items-center justify-center">
        {isLoading ? '채팅 불러오는 중...' : isError ? '에러 발생' : ''}
      </div>
    );

  return (
    <div
      ref={scrollRef}
      className={cn(
        'chat-theme scrollbar-hide flex flex-col-reverse overflow-y-scroll py-2 pb-24',
        showRecord ? 'pb-50' : 'pb-24',
      )}
    >
      {reversedMessage.map((m, idx) => {
        const prev = reversedMessage[idx + 1];
        const next = reversedMessage[idx - 1];

        const showDate = !prev || !isSameDay(prev.createdAt, m.createdAt);

        const isFirstOfGroup =
          !prev ||
          !isSameMinute(prev?.createdAt, m.createdAt) ||
          prev?.direction !== m.direction;

        const isLastOfGroup =
          !next ||
          !isSameMinute(next?.createdAt, m.createdAt) ||
          next?.direction !== m.direction;

        return (
          <div key={idx}>
            {showDate && <DateSeparator date={m.createdAt} />}
            <ChatMessageBubble
              roomId={roomId}
              message={m}
              showDate={showDate}
              isFirstOfGroup={isFirstOfGroup}
              isLastOfGroup={isLastOfGroup}
            />
          </div>
        );
      })}
    </div>
  );
}
