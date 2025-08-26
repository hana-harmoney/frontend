import type { ChatRoom, ChatRoomDetail, ChatRoomDTO } from '@/types/chatRoom';
import { apiClient } from './client';

function mapRoom(dto: ChatRoomDTO): ChatRoom {
  return {
    roomId: dto.roomId,
    imageUrl: dto.profileImageUrl,
    nickname: dto.nickname,
    lastMessage: dto.lastMessage ?? undefined,
    lastMessageDate: dto.lastMessageTime
      ? new Date(dto.lastMessageTime)
      : undefined,
  };
}

export async function fetchChatRooms(): Promise<ChatRoom[]> {
  const data = await apiClient('/chat');

  const chatRooms: ChatRoom[] = data.result.chatRoomList.map(mapRoom);
  return chatRooms;
}

export async function fetchChatRoom(roomId: number): Promise<ChatRoomDetail> {
  const data = await apiClient(`/chat/${roomId}`);

  return data.result;
}
