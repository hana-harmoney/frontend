import { badgeData } from '@/lib/utils';
import Badge from '../common/badge';
import BottomSheet from '../common/bottomSheet';
import { CustomInput } from '../common/customInput';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ProfileExampleBottomSheet({ open, onClose }: Props) {
  const categories = ['요리', '청소'];
  const content =
    '집밥 같은 건강식 반찬을 정성껏 준비해요.\n냉장고 속 재료로 알뜰하게 식단을 구성하고, 조리 후 주방 정리까지 깔끔하게 마무리합니다.\n어르신·아이 간편식도 가능합니다.';
  const profileImage = '/images/senior_profile_example.png';
  const introImages = [
    '/images/senior_intro_example1.jpg',
    '/images/senior_intro_example2.jpeg',
  ];

  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="w-full overflow-y-auto overscroll-contain px-5 pb-25">
        {/* 바텀시트 라벨 */}
        <h2 className="text-text my-5 overflow-y-auto text-center text-2xl font-semibold">
          프로필 등록 예시
        </h2>
        <div className="flex flex-col gap-7">
          <div className="flex w-full flex-col gap-3 text-2xl font-light">
            닉네임
            <CustomInput value={'마포구 청소왕'} readOnly={true} />
          </div>
          <div className="flex w-full flex-col gap-3 text-2xl font-light">
            프로필 사진
            <label className="border-teduri relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border">
              <Image
                src={profileImage}
                alt="프로필 예시"
                fill
                sizes="256px"
                className="object-cover object-center"
                priority
              />
            </label>
          </div>
          <div className="flex w-full flex-col gap-3 text-2xl font-light">
            관심 카테고리 선택
            <div className="grid grid-cols-3 gap-4 self-center">
              {badgeData.map((item) => {
                const key = item.text as string;
                const active = categories.includes(key);
                return (
                  <Badge
                    key={item.id}
                    active={active}
                    text={item.text}
                    onClick={() => {}}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 text-2xl font-light">
            소개글
            <Textarea
              className="placeholder:text-gray h-44 !text-xl font-normal placeholder:text-xl"
              value={content}
              readOnly
              maxLength={500}
            />
            <span className="text-end text-xl">{content.length}/500</span>
          </div>

          <div className="flex w-full flex-col gap-3 text-2xl font-light">
            소개 사진 <span className="text-gray text-base">(최대 5장)</span>
            <div className="flex flex-wrap gap-3">
              {introImages.map((path, idx) => (
                <div
                  key={idx}
                  className="border-teduri relative h-32 w-32 overflow-hidden rounded-2xl border"
                >
                  <Image
                    src={path}
                    alt={`intro-${idx}`}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
