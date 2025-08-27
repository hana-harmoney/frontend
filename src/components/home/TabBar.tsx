import { useLayoutEffect, useRef, useState } from 'react';
import type { TabBarProps } from '@/types/home';

const TabBar = ({ selectedId, tabs, clickTab }: TabBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = itemRefs.current[selectedId];
    const container = containerRef.current;
    if (!el || !container) return;

    setIndicator({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  }, [selectedId, tabs]);

  const shown = tabs.slice(0, 2);

  return (
    <div
      ref={containerRef}
      className="relative w-full px-6 pb-2 shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]"
    >
      <div className="flex items-center gap-10">
        {shown.map((tab) => (
          <div
            key={tab.id}
            ref={(n: HTMLDivElement | null) => {
              itemRefs.current[tab.id] = n;
            }}
            className={[
              'cursor-pointer px-2 py-1 text-2xl font-semibold transition-colors',
              selectedId === tab.id
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-600',
            ].join(' ')}
            onClick={() => clickTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-0 h-[3px] bg-teal-400 transition-all duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
    </div>
  );
};

export default TabBar;
