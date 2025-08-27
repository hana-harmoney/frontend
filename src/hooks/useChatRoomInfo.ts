'use client';

import { fetchChatRoom } from '@/lib/api/chat';
import { ChatRoomDetail } from '@/types/chat';
import { useEffect, useMemo, useState } from 'react';

export function useChatRoomInfo(roomId: number) {
  const [data, setData] = useState<ChatRoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setErr] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setErr(null);

    fetchChatRoom(roomId)
      .then(setData)
      .catch((e) => {
        setErr(e as Error);
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}
