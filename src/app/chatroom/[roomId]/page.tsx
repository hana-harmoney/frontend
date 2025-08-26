'use client';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/common/header';

import ChatInput from '@/components/chat/ChatInput';
import PhoneCallButton from '@/components/chat/PhoneCallButton';
import ReportButton from '@/components/chat/ReportButton';
import { useChatRoomStore } from '@/stores/useChatRoomsStore';
import ChatBoardCard from '@/components/chat/ChatBoardCard';
import { useChatRoomInfo } from '@/hooks/useChatRoomInfo';
import { ChatMessage } from '@/types/chat';
import { useChatMessages } from '@/hooks/useChatMessages';
import ChatMessageList from '@/components/chat/ChatMessageList';
import { useMyProfile } from '@/hooks/useMyProdfile';

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = Number(params.roomId);
  const updateRoom = useChatRoomStore((state) => state.updateRoom);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data: roomInfo } = useChatRoomInfo(roomId);
  const { data: myProfile } = useMyProfile();
  const { items: chatHistory, loading, error } = useChatMessages(roomId);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {};

  useEffect(() => {
    if (!roomId || !roomInfo || !myProfile || !chatHistory) return;

    const parsedMessages: ChatMessage[] =
      chatHistory?.map((message) => {
        const isMine = message.senderId === myProfile.userId;
        return {
          message: message.message,
          sender: isMine ? 'me' : 'other',
          direction: isMine ? 'outgoing' : 'incoming',
          position: 'single',
          createdAt: new Date(Date.parse(message.regdate)),
          senderId: message.senderId,
          senderNickname: isMine ? undefined : roomInfo.nickname,
          senderProfileImg: isMine ? undefined : roomInfo.profileUrl,
        };
      }) ?? [];

    setMessages(parsedMessages);
  }, [roomId, roomInfo, myProfile, chatHistory]);

  return (
    <div className="scrollbar-hide flex h-[100dvh] flex-col px-6">
      {/* 상단 고정 헤더 */}
      <Header
        title={roomInfo?.nickname ?? ''}
        scrollHide={false}
        centerTitle={false}
        titleClassName="text-xl"
      >
        <div className="flex gap-3 pr-6">
          <PhoneCallButton number={'010-1234-5678'} />
          <ReportButton />
        </div>
      </Header>

      {roomInfo && (
        <ChatBoardCard
          boardId={roomInfo.boardId}
          title={roomInfo.title}
          address={roomInfo.address}
          wage={roomInfo.wage}
          isWriter={false}
        />
      )}

      {/* 메시지 영역 (스크롤 가능) */}
      {
        <ChatMessageList
          scrollRef={scrollRef}
          messages={messages}
          isLoading={loading}
          isError={false}
        />
      }

      {/* 하단 고정 입력창 */}
      <div
        className="frame-container fixed right-0 bottom-0 left-0 flex flex-col gap-3 bg-transparent"
        style={{ zIndex: 5 }}
      >
        <ChatInput inputRef={inputRef} onSend={handleSendMessage} />
      </div>
    </div>
  );
}
