'use client';

import React from 'react';

type TrustLevelBarProps = {
  level: number;
};

export default function TrustLevelBar({ level }: TrustLevelBarProps) {
  const current = level / 10;

  return (
    <div className="flex w-full flex-col items-center gap-2 font-light">
      <div className="w-full px-6">
        <div className="relative h-3 w-full rounded-2xl bg-[#D9D9D9]">
          <div
            className="bg-main absolute left-0 h-3 rounded-2xl transition-[width] duration-700 ease-in-out"
            style={{ width: `${current * 100}%` }}
          ></div>
          <span
            className="absolute -top-8 -translate-x-1/2 truncate transition-all duration-700 ease-in-out"
            style={{ left: `${current * 100}%` }}
          >
            레벨 {level}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <span>레벨 1</span>
        <span>레벨 10</span>
      </div>
    </div>
  );
}
