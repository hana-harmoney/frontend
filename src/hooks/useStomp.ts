'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client, IMessage, StompSubscription, IFrame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ReceivedChatMessage, SendChatMessage } from '@/types/chat';

const WS_URL = '/ws-stomp'; // SockJS는 http(s) 엔드포인트 사용

export function useStomp() {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<Map<string, StompSubscription>>(new Map());
  const [connected, setConnected] = useState(false);

  // 1회만 생성/연결
  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 1) 서버(Next API)에서 HttpOnly 쿠키를 읽어 WS 토큰 받기
      const r = await fetch('/api/ws-token', { cache: 'no-store' });
      if (!r.ok) {
        console.error('WS token fetch failed', r.status);
        return;
      }
      const { token } = await r.json();

      if (cancelled) return;

      // 2) STOMP 클라이언트 생성 시 connectHeaders에 토큰 주입
      const client = new Client({
        webSocketFactory: () => new SockJS(WS_URL),
        reconnectDelay: 3000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        debug: (m) => console.log('[STOMP]', m),
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        onConnect: (_frame: IFrame) => setConnected(true),
        onDisconnect: () => setConnected(false),
        onStompError: (f) => {
          console.error('[STOMP ERROR]', f.headers['message'], f.body);
        },
        onWebSocketError: (e) => {
          console.error('[WS ERROR]', e);
        },
      });

      clientRef.current = client;
      client.activate();
    })();

    return () => {
      // 모든 구독 해제 후 비활성화
      cancelled = true;
      subsRef.current.forEach((s) => s.unsubscribe());
      subsRef.current.clear();
      clientRef.current?.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, []); // ✅ 빈 배열

  const subscribe = useCallback(
    (
      destination: string,
      handler: (body: ReceivedChatMessage, msg: IMessage) => void,
    ) => {
      const client = clientRef.current;
      if (!client || !client.connected) throw new Error('STOMP not connected');

      const sub = client.subscribe(destination, (msg) => {
        const parsed = safeJSON(msg.body);
        handler(parsed as ReceivedChatMessage, msg);
      });

      subsRef.current.set(destination, sub);

      // 구독 해제 함수 반환
      return () => {
        sub.unsubscribe();
        subsRef.current.delete(destination);
      };
    },
    [],
  );

  const publish = useCallback((destination: string, body: SendChatMessage) => {
    const client = clientRef.current;
    if (!client || !client.connected) throw new Error('STOMP not connected');

    client.publish({
      destination,
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' }, // ✅ Spring DTO 매핑용
    });
  }, []);

  return { connected, subscribe, send: publish };
}

function safeJSON(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}
