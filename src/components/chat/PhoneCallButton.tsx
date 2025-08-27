'use client';

import PhoneCall from '@/assets/icons/phone_call.svg';

function toTelHref(raw: string) {
  const cleaned = raw.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export default function PhoneCallButton({ number }: { number: string }) {
  const href = toTelHref(number); // 예: "010-1234-5678" -> "tel:01012345678"
  return (
    <a href={href} aria-label={`${number}로 전화하기`}>
      <PhoneCall className="size-8" />
    </a>
  );
}
