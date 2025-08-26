import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type Props = {
  href: string;
  imageUrl: string | StaticImageData;
  title: string;
  subtitle?: string;
  dateRange?: string;
  location?: string;
};

export default function EducationCard({
  href,
  imageUrl,
  title,
  subtitle,
  dateRange,
  location,
}: Props) {
  return (
    <Link
      href={href}
      className="block overflow-hidden transition hover:shadow-md"
    >
      {/* 이미지 영역 */}
      <div className="relative w-full">
        <Image
          src={imageUrl}
          alt={title}
          className="h-auto w-full"
          priority={false}
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="space-y-1 border-t border-gray-200 px-3 py-1">
        <h3 className="text-main text-[20px] font-bold">{title}</h3>
        {subtitle && (
          <p className="text-[18px] font-semibold text-gray-800">{subtitle}</p>
        )}
      </div>

      {/* 날짜/장소 영역 */}
      {(dateRange || location) && (
        <div className="border-t border-gray-200 px-3 py-1 text-[18px] font-normal text-gray-600">
          {dateRange && <div>{dateRange}</div>}
          {location && <div>{location}</div>}
        </div>
      )}
    </Link>
  );
}
