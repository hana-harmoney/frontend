'use client';
import Image from 'next/image';
import TrustLevel from '@/components/profile/TrustLevel';
import { badgeData, initialProfile } from '@/lib/utils';
import Badge from '@/components/common/badge';
import { fetchProfile } from '@/lib/api/profile';
import React, { useEffect, useState } from 'react';
import { fetchProfileResponse } from '@/types/profile';
import ImageSlider from '@/components/profile/ImageSlider';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
  const [profile, setProfile] = useState<fetchProfileResponse>(initialProfile);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (e) {
      } finally {
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center gap-9 px-6 py-3 text-black">
      <div className="flex w-full items-center gap-3">
        <div className="border-main relative h-20 w-20 overflow-hidden rounded-full border">
          <Image
            src="https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg"
            alt="profile"
            fill
            className="object-cover object-center"
            unoptimized
            sizes="48px"
          />
        </div>
        <div className="flex flex-col gap-3 font-semibold">
          <span className="text-2xl">{profile.nickname} 님</span>
          <div className="flex items-center gap-2">
            <div className="text-hana-green rounded-2xl bg-[#EAF9F6] px-2 py-1">
              매칭 횟수
            </div>
            {profile.match_count}회
          </div>
        </div>
      </div>
      <div className="bg-hana-green-light flex w-full flex-col gap-4 rounded-xl p-5">
        <span className="text-2xl font-semibold">기본 정보</span>
        <div className="flex flex-col gap-12">
          <span className="text-2xl">신뢰도</span>
          <TrustLevel level={profile.trust} />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-2xl">관심 카테고리</span>
          <div className="flex flex-wrap gap-2">
            {badgeData
              .filter((item) => profile.category_ids.includes(item.id))
              .map((item) => (
                <Badge key={item.id} active={true} text={item.text} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 text-xl">
          <span className="text-2xl">주소</span>
          경기도 용인시 수지구 성복1로 163번길 20
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <span className="text-[26px] font-semibold">내 소개</span>
        <div className="flex flex-col gap-4 text-xl">
          <span className="text-2xl">소개글</span>
          <span className="font-light">{profile.description}</span>
        </div>
        <div className="flex flex-col gap-4 text-xl">
          <span className="text-2xl">사진</span>
          <div className="flex flex-wrap gap-3">
            {profile.img_url_detail && profile.img_url_detail.length > 0 ? (
              <ImageSlider images={profile.img_url_detail} />
            ) : null}
          </div>
        </div>
        <div className="flex w-full flex-col items-end gap-2">
          <Button className="w-full py-6 text-xl font-semibold">
            프로필 수정하기
          </Button>
          <Button className="bg-text-2 w-full py-6 text-xl font-semibold">
            로그아웃
          </Button>
          <span className="font-light text-[#DC221E] underline">탈퇴하기</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
