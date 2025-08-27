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

export type ChatMessageDTO = {
  messageId: number;
  senderId: number;
  receiverId: number;
  message: string;
  amount?: number;
  regdate: string; // ISO 문자열 가정: "2025-08-24T01:23:45Z"
};

export type ChatMessage = {
  message: string;
  sender: 'me' | 'other';
  direction: 'incoming' | 'outgoing';
  position: 'single';
  createdAt: Date;
  amount?: number;
  senderId?: number;
  senderNickname?: string;
  senderProfileImg?: string;
};

// Client -> Socket
export type SendChatMessage = {
  roomId: number;
  message: string;
  amount?: number;
};

// Socket -> Client
export type ReceivedChatMessage = {
  messageId: number;
  roomId: number;
  senderId: number;
  receiverId: number;
  message: string;
  amount: number;
  regdate: string;
};
