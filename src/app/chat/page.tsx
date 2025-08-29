'use client';

import ChatRoomTile from '@/components/chat/ChatRoomTile';
import { fetchChatRooms } from '@/lib/api/chat';
import { useChatRoomListStore } from '@/stores/useChatRoomsStore';
import { useEffect, useState } from 'react';
import NoData from '@/assets/images/no-data.svg';

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  const setChatRooms = useChatRoomListStore((state) => state.setChatRooms);
  const chatRooms = useChatRoomListStore((state) => state.chatRooms);

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
  }, [isLoading, setChatRooms]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-500">
        불러오는 중…
        <NoData className="h-24 w-24" />
      </div>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-2xl text-gray-500">
        채팅 목록이 없습니다.
      </div>
    );
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
