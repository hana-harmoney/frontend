'use client';
import Image, { StaticImageData } from 'next/image';
import { useId, useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  href: string;
  imageUrl: string | StaticImageData;
  topic: string;
  location: string;
  meta?: {
    participants?: string;
    time?: string;
    period?: string;
    notes?: string;
  };
};

export default function EducationCard({
  href,
  imageUrl,
  topic,
  location,
  meta,
}: Props) {
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  const router = useRouter();
  const handleRouting = () => {
    if (href) {
      router.push(href);
    }
  };
  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  return (
    <div
      className="border-b-gray block overflow-hidden border-b pb-2 text-xl transition hover:shadow-md"
      onClick={(e) => {
        if (!e.defaultPrevented) {
          handleRouting();
        }
      }}
    >
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={imageUrl}
          alt={topic}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div
        className="flex justify-between px-3 py-1"
        onClick={(e) => {
          handleOpen(e);
        }}
      >
        <h3 className="text-hanagreen-normal text-2xl font-semibold">
          {topic}
        </h3>
        {meta && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            className="rounded text-gray-500 transition focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-8 w-8 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
              aria-hidden="true"
            >
              <path d="M12 15.5a1 1 0 0 1-.707-.293l-6-6a1 1 0 1 1 1.414-1.414L12 12.086l5.293-4.293a1 1 0 1 1 1.414 1.414l-6 6A1 1 0 0 1 12 15.5z" />
            </svg>
            <span className="sr-only">자세히 보기</span>
          </button>
        )}
      </div>

      <div
        className="text-gray px-3 py-1 font-normal"
        onClick={(e) => {
          handleOpen(e);
        }}
      >
        <div>{location}</div>
      </div>

      {meta && (
        <div
          id={detailsId}
          className="text-gray overflow-hidden px-3 transition-[max-height] duration-300"
          style={{ maxHeight: open ? 500 : 0 }}
        >
          <div className="space-y-1 py-3">
            {typeof meta.participants !== 'undefined' && (
              <div className="flex gap-2">
                <span className="text-gray min-w-[72px]">인원</span>
                <span>{meta.participants}</span>
              </div>
            )}
            {meta.time && (
              <div className="flex gap-2">
                <span className="text-gray min-w-[72px]">시간</span>
                <span>{meta.time}</span>
              </div>
            )}
            {meta.period && (
              <div className="flex gap-2">
                <span className="text-gray min-w-[72px]">기간</span>
                <span>{meta.period}</span>
              </div>
            )}
            {meta.notes && (
              <div className="flex gap-2">
                <span className="text-gray min-w-[72px]">비고</span>
                <span>{meta.notes}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
