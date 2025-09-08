export type ManualType = 'transfer' | 'pocket' | 'job' | 'voice';

export const MANUAL_IMAGES = {
  transfer: [
    '/images/manual/transfer/transfer1.png',
    '/images/manual/transfer/transfer2.png',
    '/images/manual/transfer/transfer3.png',
    '/images/manual/transfer/transfer4.png',
    '/images/manual/transfer/transfer5.png',
  ],
  pocket: [
    '/images/manual/pocket/pocket1.png',
    '/images/manual/pocket/pocket2.png',
    '/images/manual/pocket/pocket3.png',
    '/images/manual/pocket/pocket4.png',
  ],
  job: [
    '/images/manual/job/job1.png',
    '/images/manual/job/job2.png',
    '/images/manual/job/job3.png',
  ],
  voice: [
    '/images/manual/voice/voice1.png',
    '/images/manual/voice/voice2.png',
    '/images/manual/voice/voice3.png',
    '/images/manual/voice/voice4.png',
    '/images/manual/voice/voice5.png',
  ],
} as const satisfies Record<ManualType, string[]>;
