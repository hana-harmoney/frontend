'use client';
import Image from 'next/image';
import TrustLevel from '@/components/profile/TrustLevel';
import { badgeData, initialProfile } from '@/lib/utils';
import Badge from '@/components/common/badge';
import { fetchProfile } from '@/lib/api/profile';
import { withdrawUser } from '@/lib/api/auth';
import React, { useEffect, useState } from 'react';
import { fetchProfileResponse } from '@/types/profile';
import ImageSlider from '@/components/profile/ImageSlider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [profile, setProfile] = useState<fetchProfileResponse>(initialProfile);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

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

  const handleWithdraw = async () => {
    const res = await withdrawUser();
    console.log(res);
    if (res.code !== '200') {
      toast.error('탈퇴하기를 실패했습니다.');
      return;
    }
    toast.error('탈퇴하기를 성공했습니다.');
    router.replace('/auth/login');
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/auth/login');
  };

  return (
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
        <div className="flex flex-col gap-3 text-xl">
          <span className="text-2xl">주소</span>
          {profile.user_address}
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
          <Button
            className="w-full py-6 text-xl font-semibold"
            onClick={() => {
              router.push('/profile/edit');
            }}
          >
            프로필 수정하기
          </Button>
          <Button
            className="bg-text-2 hover:bg-text-2 w-full py-6 text-xl font-semibold"
            onClick={() => setLogoutOpen(true)}
          >
            로그아웃
          </Button>
          <span
            className="font-light text-[#DC221E] underline"
            onClick={() => setOpen(true)}
          >
            탈퇴하기
          </span>
        </div>
        {logoutOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
            <div className="w-[360px] rounded-2xl bg-white p-6">
              <h2 className="mb-6 text-center text-xl font-bold">
                로그아웃하시겠습니까?
              </h2>
              <div className="mt-6 flex w-full items-stretch gap-3">
                <Button
                  variant="secondary"
                  className="bg-text-2 hover:bg-text-2 h-12 min-w-0 flex-1 text-xl text-white"
                  onClick={() => setLogoutOpen(false)}
                >
                  취소
                </Button>
                <Button
                  className="h-12 min-w-0 flex-1 text-xl"
                  onClick={handleLogout}
                >
                  네
                </Button>
              </div>
            </div>
          </div>
        )}
        {open && (
          <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/50">
            <div className="flex w-[400px] flex-col gap-6 rounded-2xl bg-white p-6">
              {step === 1 && (
                <>
                  <h2 className="text-xl font-bold">탈퇴하시겠습니까?</h2>
                  <p className="text-gray-600">
                    탈퇴 시 계정 및 이용 정보가 모두 삭제되며, 복구가
                    불가능합니다.
                  </p>
                  <p className="text-gray-600">
                    계속하시려면 [다음]을 눌러주세요
                  </p>
                  <div className="mt-6 flex w-full items-stretch gap-3">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="bg-text-2 hover:bg-text-2 h-12 min-w-0 flex-1 text-xl text-white"
                    >
                      취소
                    </Button>
                    <Button
                      onClick={() => setStep(2)}
                      className="h-12 min-w-0 flex-1 text-xl text-white"
                    >
                      다음
                    </Button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl font-bold">탈퇴하시겠습니까?</h2>
                  <p className="text-gray-600">
                    계속 하시려면 비밀번호를 입력해주세요
                  </p>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    className="mt-3 w-full rounded-md border p-2"
                  />
                  <div className="mt-6 flex w-full items-stretch gap-3">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="bg-text-2 hover:bg-text-2 h-12 min-w-0 flex-1 text-xl text-white"
                    >
                      취소
                    </Button>
                    <Button
                      className="h-12 min-w-0 flex-1 bg-[#DC221E] text-xl text-white hover:bg-[#DC221E]"
                      onClick={handleWithdraw}
                    >
                      탈퇴하기
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
