import { Message } from '@chatscope/chat-ui-kit-react';
import ChatProfileImage from './ChatProfileImage';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date/dateformatter';
import { ChatMessage } from '@/types/chat';
import { Button } from '../ui/button';
import ReviewButton from './ReviewButton';
import { useChatAmountStore } from '@/stores/useChatRoomsStore';

type Props = {
  roomId: number;
  message: ChatMessage;
  showDate: boolean;
  isFirstOfGroup: boolean;
  isLastOfGroup: boolean;
};

export default function ChatMessageBubble({
  roomId,
  message,
  isFirstOfGroup,
  isLastOfGroup,
}: Props) {
  const setAmount = useChatAmountStore((state) => state.setAmount);
  const isIncoming = message.direction === 'incoming';
  const showProfile = isIncoming && isFirstOfGroup && message.senderProfileImg;

  return (
    <div
      className={cn(
        'mt-1 items-end',
        isIncoming ? 'mr-10 flex' : 'ml-10 flex flex-row-reverse',
      )}
    >
      {/* 상대방 이미지 (상대방 그룹의 첫번째 메세지일 경우만) */}
      {isIncoming &&
        (showProfile ? (
          <div className="mr-2 flex-none self-start">
            <Link href={`/card/${message.senderId}`}>
              <ChatProfileImage
                size={50}
                imageUrl={message.senderProfileImg ?? ''}
              />
            </Link>
          </div>
        ) : (
          <div className="mr-5 h-[37px] w-[37px]" />
        ))}
      {/* 메세지 */}
      <div className="flex flex-col">
        <Message model={message}>
          <Message.CustomContent>
            <div className="flex flex-col gap-2.5">
              <p className="rounded-[10px] text-2xl font-normal">
                {message.message}
              </p>
              {message.amount &&
                (message.direction === 'incoming' ? (
                  <Link
                    href={`/chatroom/${roomId}/pocket`}
                    onClick={() => setAmount(message.amount ?? 0)}
                  >
                    <Button className="w-full text-xl font-medium">
                      주머니로 옮기기
                    </Button>
                  </Link>
                ) : (
                  <ReviewButton roomId={roomId} />
                ))}
            </div>
          </Message.CustomContent>
        </Message>
        {/* 전송 시간 (그룹의 마지막 메세지일 경우만) */}
        {isLastOfGroup && (
          <div
            className={cn(
              'text-text mt-1 flex-none text-xl',
              isIncoming ? 'ml-1 text-left' : 'mr-1 text-right',
            )}
          >
            {formatTime(message.createdAt, 'a hh:mm')}
          </div>
        )}
      </div>
    </div>
  );
}
