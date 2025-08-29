'use client';
import Image from 'next/image';
import TrustLevel from '@/components/profile/TrustLevel';
import { badgeData, initialProfile } from '@/lib/utils';
import Badge from '@/components/common/badge';
import { fetchProfile, fetchProfileById } from '@/lib/api/profile';
import React, { useEffect, useState } from 'react';
import { fetchProfileResponse } from '@/types/profile';
import ImageSlider from '@/components/profile/ImageSlider';
import Header from '@/components/common/header';
import { useParams } from 'next/navigation';

const ProfilePage = () => {
  const [profile, setProfile] = useState<fetchProfileResponse>(initialProfile);
  const params = useParams();
  const userId = Number(params.id);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProfileById(userId);
        setProfile(data);
        setUserName(profile.nickname);
      } catch (e) {
      } finally {
      }
    })();
  }, []);

  return (
    <>
      <Header
        title={`${profile.nickname} 님의 정보`}
        centerTitle={false}
        showBackButton={true}
      />
      <div className="flex flex-col items-center gap-9 px-6 py-3 text-black">
        <div className="flex w-full items-center gap-3">
          <div className="border-main relative h-20 w-20 overflow-hidden rounded-full border">
            <Image
              src={
                profile.profile_img ??
                'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg'
              }
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
        </div>
        <div className="flex w-full flex-col gap-6">
          <span className="text-[26px] font-semibold">
            {profile.nickname} 님 소개
          </span>
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
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
