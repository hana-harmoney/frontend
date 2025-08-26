import { isSameDay, isSameMinute } from 'date-fns';
import { Ref } from 'react';
import DateSeparator from './ChatDateSeparater';
import ChatMessageBubble from './ChatMessageBubble';
import { ChatMessage } from '@/types/chat';

type Props = {
  scrollRef: Ref<HTMLDivElement>;
  messages: ChatMessage[];
  isLoading: boolean;
  isError: boolean;
};

export default function ChatMessageList({
  scrollRef,
  messages,
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
      className="chat-theme scrollbar-hide flex flex-col-reverse overflow-y-scroll py-2 pb-24"
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
