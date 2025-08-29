'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ChatMessageDTO } from '@/types/chat';
import { fetchChatMessages } from '@/lib/api/chat';
import toast from 'react-hot-toast';

type State = {
  items: ChatMessageDTO[];
  loading: boolean;
  error: boolean;
};

export function useChatMessages(roomId: number) {
  const [state, setState] = useState<State>({
    items: [],
    loading: false,
    error: false,
  });

  useEffect(() => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      fetchChatMessages(roomId)
        .then((messages) => {
          setState(() => ({
            items: messages,
            loading: false,
            error: false,
          }));
        })
        .catch((e) => {
          setState(() => ({
            items: state.items,
            loading: false,
            error: true,
          }));
        });
    } catch (e) {
      toast.error('메세지 목록 조회에 실패했습니다.');
    }
  }, [roomId]);

  return useMemo(
    () => ({
      items: state.items,
      loading: state.loading,
      error: state.error,
    }),
    [state],
  );
}
