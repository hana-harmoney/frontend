import Image from 'next/image';
import Badge from '@/components/common/badge';
import Pin from '@/assets/icons/pin.svg';
import Dollar from '@/assets/icons/dollar.svg';
import { JobsProps } from '@/types/jobs';
import { formatNumber } from '@/lib/utils';

const Card = ({
  title,
  category,
  created,
  content,
  address,
  wage,
  imageUrl,
  onClick,
}: JobsProps) => {
  const timeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now.getTime() - date.getTime()) / 1000; // 초 단위 차이

    if (diff < 60) return `${Math.floor(diff)}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
    if (diff < 31104000) return `${Math.floor(diff / 2592000)}개월 전`;
    return `${Math.floor(diff / 31104000)}년 전`;
  };

  return (
    <div
      className="border-teduri flex flex-col rounded-2xl border"
      onClick={onClick}
    >
      <div className="border-b-teduri flex items-center justify-center border-b">
        <Image
          src={imageUrl}
          alt="profile"
          width={120}
          height={120}
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-9 px-3 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 font-semibold">
            <div className="flex items-center gap-3">
              <Badge active={true} text={category} />
              <span className="text-gray">{timeAgo(created)}</span>
            </div>
            <span className="text-gray text-2xl">{title}</span>
          </div>
          <div className="flex flex-col gap-2 text-black">
            <span className="text-text">{content}</span>
            <div className="flex items-center gap-2">
              <Pin /> {address}
            </div>
            <div className="flex items-center gap-2">
              <Dollar /> 시급 {formatNumber(wage)} 원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
