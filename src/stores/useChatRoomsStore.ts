import { ChatRoom, ChatRoomDetail } from '@/types/chat';
import { create } from 'zustand';

interface ChatRoomListState {
  chatRooms: ChatRoom[];
  setChatRooms: (chatRooms: ChatRoom[]) => void;
  updateRoom: (chatRoom: ChatRoom) => void; // 채팅방 목록 내 채팅방 업데이트
}

export const useChatRoomListStore = create<ChatRoomListState>((set) => ({
  chatRooms: [],
  setChatRooms: (chatRooms: ChatRoom[]) => set({ chatRooms: chatRooms }),
  updateRoom: (chatRoom: ChatRoom) =>
    set((state) => {
      const others = state.chatRooms.filter(
        (r) => r.roomId !== chatRoom.roomId,
      );
      return {
        chatRooms: [chatRoom, ...others], // 최신 메시지 기준으로 정렬
      };
    }),
}));

interface ChatRoomDetailState {
  roomInfo: ChatRoomDetail | null;
  setRoomInfo: (chatRoomInfo: ChatRoomDetail) => void; // 채팅방 단건 정보 업데이트
}

export const useChatRoomDetailStore = create<ChatRoomDetailState>((set) => ({
  roomInfo: null,
  setRoomInfo: (roomInfo: ChatRoomDetail) => set({ roomInfo }),
}));

interface ChatAmountState {
  amount: number;
  setAmount: (amount: number) => void;
}

export const useChatAmountStore = create<ChatAmountState>((set) => ({
  amount: 0,
  setAmount: (amount: number) => set({ amount }),
}));
