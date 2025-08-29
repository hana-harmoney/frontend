'use client';

import ChatRoomTile from '@/components/chat/ChatRoomTile';
import { fetchChatRooms, fetchChatRoomsByBoardId } from '@/lib/api/chat';
import { useChatRoomListStore } from '@/stores/useChatRoomsStore';
import { useEffect, useState } from 'react';
import Header from '@/components/common/header';
import { useParams } from 'next/navigation';

export default function MyChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const setChatRooms = useChatRoomListStore((state) => state.setChatRooms);
  const chatRooms = useChatRoomListStore((state) => state.chatRooms);

  const params = useParams();
  const boardId = Number(params.id);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchChatRoomsByBoardId(boardId);
        setChatRooms(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setChatRooms]);

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <>
      <Header title="대화중인 채팅" centerTitle={false} showBackButton={true} />
      <div className="flex flex-col gap-8">
        {chatRooms.map((chatRoom) => (
          <ChatRoomTile
            key={chatRoom.roomId}
            roomId={chatRoom.roomId}
            imageUrl={chatRoom.imageUrl}
            nickname={chatRoom.nickname}
            lastMessage={chatRoom.lastMessage}
            lastMessageDate={chatRoom.lastMessageDate}
          />
        ))}
      </div>
    </>
  );
}
