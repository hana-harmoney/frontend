import type {
  ChatMessageDTO,
  ChatRoom,
  ChatRoomDetail,
  ChatRoomDTO,
} from '@/types/chat';
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

export async function fetchChatRoomsByBoardId(
  boardId: number,
): Promise<ChatRoom[]> {
  const data = await apiClient(`/board/${boardId}/chatRoom`);

  const chatRooms: ChatRoom[] = data.result.chatRoomList.map(mapRoom);
  return chatRooms;
}

export async function fetchChatRoom(roomId: number): Promise<ChatRoomDetail> {
  const data = await apiClient(`/chat/${roomId}`);

  return data.result;
}

export async function fetchChatMessages(
  roomId: number,
): Promise<ChatMessageDTO[]> {
  const data = await apiClient(`/chat/${roomId}/message`);

  return data.result.chatMessageList;
}

export async function reportUser(roomId: number): Promise<void> {
  await apiClient(`/chat/${roomId}/report`, {
    method: 'POST',
  });
}

export async function writeReview(
  roomId: number,
  score: number,
): Promise<void> {
  await apiClient(`/chat/${roomId}/report`, {
    method: 'POST',
    body: JSON.stringify({ score: score }),
  });
}

export async function transferInChatRoom(
  roomId: number,
  amount: number,
): Promise<void> {
  await apiClient(`/chat/${roomId}/transfer/send`, {
    method: 'POST',
    body: JSON.stringify({ amount: amount }),
  });
}
