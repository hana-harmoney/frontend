'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client, IMessage, StompSubscription, IFrame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { ReceivedChatMessage, SendChatMessage } from '@/types/chat';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? '/ws-stomp'; // SockJS는 http(s) 엔드포인트 사용

export function useStomp() {
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<Map<string, StompSubscription>>(new Map());
  const [connected, setConnected] = useState(false);

  // 1회만 생성/연결
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (m) => console.log('[STOMP]', m),
      onConnect: (_frame: IFrame) => {
        setConnected(true);
      },
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

    return () => {
      // 모든 구독 해제 후 비활성화
      subsRef.current.forEach((s) => s.unsubscribe());
      subsRef.current.clear();
      client.deactivate(); // 연결 여부와 상관없이 안전
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
