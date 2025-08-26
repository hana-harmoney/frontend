'use client';

import BottomButton from '@/components/common/bottomButton';
import { useRouter } from 'next/navigation';
import { useProfileRegister } from '@/stores/useProfileRegister';
import { CustomInput } from '@/components/common/customInput';
import React from 'react';
import Image from 'next/image';
import Plus from '@/assets/icons/plus.svg';
import CircleRemove from '@/assets/icons/circle_remove.svg';
import { badgeData } from '@/lib/utils';
import Badge from '@/components/common/badge';
import { Textarea } from '@/components/ui/textarea';
import { createProfile } from '@/lib/api/profile';
import toast from 'react-hot-toast';

export default function Step3Page() {
  const router = useRouter();

  const {
    nickname,
    setProfileField,
    profileImageUrl,
    setProfileImage,
    clearProfileImage,
    categories,
    toggleCategory,
    bio,
    introImageUrls,
    addIntroImages,
    removeIntroImage,
    reset,
    profileImageFile,
  } = useProfileRegister();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setProfileImage(f);
  };

  const MAX_INTRO = 5;
  const handleIntroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remaining = MAX_INTRO - introImageUrls.length;
    if (remaining <= 0) return;

    const picked = Array.from(files).slice(0, remaining);
    addIntroImages(picked);

    e.currentTarget.value = '';
  };
  const handleSubmit = async () => {
    try {
      await createProfile({
        nickname,
        description: bio,
        categoryIds: categories,
        profileImage: profileImageFile ?? null,
        descImageUrls: introImageUrls,
      });
      toast.success('프로필이 성공적으로 등록되었습니다.');
      router.push('/home');
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '회원가입 중 오류가 발생했습니다.',
      );
    }
  };

  const canSubmit =
    nickname.trim().length > 0 &&
    categories.length > 0 &&
    !!profileImageUrl &&
    bio.length <= 500;

  return (
    <div className="px-6 pt-5 pb-24">
      {/*<Header*/}
      {/*  title={'프로필 등록하기'}*/}
      {/*  showBackButton={true}*/}
      {/*  centerTitle={false}*/}
      {/*/>*/}

      <div className="flex flex-col gap-7">
        <div className="text-gray mb-2 w-full py-3 text-center text-3xl font-medium">
          프로필 등록하기
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          닉네임
          <CustomInput
            placeholder="예: 집밥 요리 도우미 구합니다"
            value={nickname}
            onChange={(e) => setProfileField('nickname', e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          프로필 사진
          <label className="border-teduri relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt="uploaded"
                fill
                className="object-contain object-center"
                unoptimized
              />
            ) : (
              <Plus />
            )}
            {profileImageUrl ? (
              <CircleRemove
                className="absolute top-0 right-0"
                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                  clearProfileImage();
                  e.preventDefault();
                }}
              />
            ) : null}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
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
                  onClick={() => toggleCategory(key)}
                />
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          소개글
          <Textarea
            placeholder="제육볶음 달인!"
            className="placeholder:text-gray h-44 text-xl font-normal placeholder:text-xl"
            value={bio}
            onChange={(e) => setProfileField('bio', e.target.value)}
            maxLength={500}
          />
          <span className="text-end text-xl">{bio.length}/500</span>
        </div>

        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          소개 사진 <span className="text-gray text-base">(최대 5장)</span>
          <div className="flex flex-wrap gap-3">
            {introImageUrls.map((url, idx) => (
              <div
                key={idx}
                className="border-teduri relative h-32 w-32 overflow-hidden rounded-2xl border"
              >
                <Image
                  src={url}
                  alt={`intro-${idx}`}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                <CircleRemove
                  className="absolute top-0 right-0"
                  onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                    removeIntroImage(idx);
                    e.preventDefault();
                  }}
                />
              </div>
            ))}

            {introImageUrls.length < MAX_INTRO && (
              <label className="border-teduri relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border">
                <Plus />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleIntroUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <BottomButton disabled={!canSubmit} onClick={handleSubmit}>
        프로필 등록하기
      </BottomButton>
    </div>
  );
}
