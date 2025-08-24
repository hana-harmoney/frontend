'use client';

import ChatRoomTile from '@/components/chat/ChatRoomTile';
import { ChatRoom } from '@/types/chatRoom';
import { useState } from 'react';

export default function ChatPage({}) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

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
