'use client';

import { useEffect } from 'react';
import type { MessagePayload } from 'firebase/messaging';
import { subscribeForegroundMessage } from '@/lib/fcm';

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let unsub = () => {};
    (async () => {
      unsub = subscribeForegroundMessage((payload: MessagePayload) => {
        const n = payload.notification;
        if (Notification.permission === 'granted' && n) {
          const title = n.title ?? '알림';
          const options: NotificationOptions = {
            body: n.body,
            icon: n.image,
            badge: n.image,
          };
          new Notification(title, options);
        }
      });
    })();
    return () => unsub();
  }, []);

  return <>{children}</>;
}
