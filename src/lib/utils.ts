import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// jobs
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};
