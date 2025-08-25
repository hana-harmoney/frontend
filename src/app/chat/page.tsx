'use client';

import ChatRoomTile from '@/components/chat/ChatRoomTile';
import { fetchChatRooms } from '@/lib/api/chat';
import { useChatRoomStore } from '@/stores/useChatRoomsStore';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const setChatRooms = useChatRoomStore((state) => state.setChatRooms);
  const chatRooms = useChatRoomStore((state) => state.chatRooms);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchChatRooms();
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
  );
}
