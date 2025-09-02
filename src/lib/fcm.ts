// lib/fcm.ts
import { firebaseApp } from '@/firebase';
import {
  getMessaging,
  isSupported,
  getToken,
  onMessage,
  Messaging,
} from 'firebase/messaging';
import { requestToken } from '@/lib/api/fcm';
import type { MessagePayload } from 'firebase/messaging';

let initialized = false;
let messagingInstance: Messaging | null = null;
const listeners: Array<(payload: MessagePayload) => void> = [];

export const subscribeForegroundMessage = (
  cb: (payload: MessagePayload) => void,
) => {
  listeners.push(cb);
  return () => {
    const i = listeners.indexOf(cb);
    if (i >= 0) listeners.splice(i, 1);
  };
};

export const initFcmOnce = async () => {
  if (initialized) return messagingInstance;
  initialized = true;

  const supported = await isSupported().catch(() => false);
  if (!supported) return null;

  if ('Notification' in window) {
    const p = Notification.permission;
    if (p === 'default') {
      await Notification.requestPermission(); // 사용자가 허용하면 'granted'
    }
  }

  messagingInstance = getMessaging(firebaseApp);

  try {
    const token = await getToken(messagingInstance);
    if (token) {
      await requestToken(token);
    }
  } catch (e) {
    console.warn('FCM getToken 실패:', e);
  }

  onMessage(messagingInstance, (payload: MessagePayload) => {
    listeners.forEach((fn) => fn(payload));
  });

  return messagingInstance;
};
