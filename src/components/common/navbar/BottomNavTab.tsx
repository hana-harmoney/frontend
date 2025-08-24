'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import type { ComponentType, SVGProps } from 'react';

type Props = {
  label: string;
  path: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function BottomNavButton({ label, path, Icon }: Props) {
  const pathname = usePathname();
  const active = pathname.startsWith(path);

  return (
    <Link
      href={path}
      aria-current={active ? 'page' : undefined}
      className="flex h-full w-full flex-col items-center justify-center gap-1 text-xl font-semibold"
    >
      <Icon
        className={clsx(
          'size-8',
          '[&_*]:fill-current [&_*]:stroke-current [&>path]:fill-current [&>path]:stroke-current',
          active ? 'text-hanagreen-normal' : 'text-dark-gray',
        )}
        aria-hidden
      />
      <span
        className={clsx(
          'leading-none',
          active ? 'text-hanagreen-normal font-medium' : 'text-dark-gray',
        )}
      >
        {label}
      </span>
    </Link>
  );
}
