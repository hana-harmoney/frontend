import { ApiResponse } from './apiResponse';

export type ChatRoomDTO = {
  roomId: number;
  profileImageUrl: string;
  nickname: string;
  lastMessage?: string | null;
  lastMessageTime?: string | null; // ISO 문자열 가정: "2025-08-24T01:23:45Z"
};

export type ChatRoom = {
  roomId: number;
  imageUrl: string;
  nickname: string;
  lastMessage?: string;
  lastMessageDate?: Date;
};

export type ChatRoomDetail = {
  boardId: number;
  writerId: number;
  nickname: string;
  profileUrl: string;
  title: string;
  wage: number;
  address: string;
};

export type ChatRoomsResponse = ApiResponse<{ chatRoomList: ChatRoomDTO[] }>;
