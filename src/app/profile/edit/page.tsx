'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { badgeData, initialProfile } from '@/lib/utils';
import { fetchProfile, updateProfile } from '@/lib/api/profile';
import Header from '@/components/common/header';
import { imgUrlItem } from '@/types/profile';
import { Button } from '@/components/ui/button';
import { CustomInput } from '@/components/common/customInput';
import Image from 'next/image';
import Plus from '@/assets/icons/plus.svg';
import CircleRemove from '@/assets/icons/circle_remove.svg';
import Badge from '@/components/common/badge';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

type IntroItem =
  | { id: number; url: string }
  | { id: -1; url: string; file: File };

export default function ProfileEditPage() {
  const router = useRouter();
  const MAX_INTRO = 5;

  const [introItems, setIntroItems] = useState<IntroItem[]>([]);

  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState<string>('');
  const [categories, setCategories] = useState<number[]>([]);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>('');

  const [descImagesDeleteIds, setDescImagesDeleteIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchProfile();

        const serverItems: IntroItem[] = (data.img_url_detail ?? []).map(
          ({ id, url }: imgUrlItem) => ({ id, url }),
        );

        setIntroItems(serverItems);

        setNickname(data.nickname ?? '');
        setDescription(data.description ?? '');
        setCategories(data.category_ids ?? []);
        setProfileImagePreview(data.profile_img ?? '');
      } catch (e) {
        toast.error('프로필을 불러오지 못했습니다.');
      }
    })();
  }, []);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (profileImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(profileImagePreview);
    }

    const url = URL.createObjectURL(file);
    setProfileImageFile(file);
    setProfileImagePreview(url);
    e.currentTarget.value = '';
  };

  const toggleCategory = (id: number) => {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleIntroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remain = MAX_INTRO - introItems.length;
    if (remain <= 0) {
      toast('최대 5장까지 등록할 수 있어요.');
      e.currentTarget.value = '';
      return;
    }

    const picked = Array.from(files).slice(0, remain);

    const newItems: IntroItem[] = picked.map((file) => {
      const url = URL.createObjectURL(file);
      return { id: -1 as const, url, file };
    });

    setIntroItems((prev) => [...prev, ...newItems]);
    e.currentTarget.value = '';
  };

  const removeIntroAt = (idx: number) => {
    setIntroItems((prev) => {
      const target = prev[idx];
      if (!target) return prev.slice();

      if (target.id !== -1) {
        setDescImagesDeleteIds((old) => [...old, target.id]);
      } else {
        URL.revokeObjectURL(target.url);
      }
      const clone = prev.slice();
      clone.splice(idx, 1);
      return clone;
    });
  };

  const newFiles = useMemo(
    () =>
      introItems.filter(
        (it): it is Extract<IntroItem, { id: -1 }> => it.id === -1,
      ),
    [introItems],
  );
  const existingItems = useMemo(
    () =>
      introItems.filter((it) => it.id !== -1) as Extract<
        IntroItem,
        { id: number; url: string }
      >[],
    [introItems],
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const descImageFiles = newFiles.map((nf) => nf.file);
      const descImageUrls = existingItems.map((it) => it.url);

      await updateProfile({
        nickname,
        description: description,
        categoryIds: categories,
        profileImage: profileImageFile ?? undefined,
        descImageFiles,
        descImageUrls,
        descImagesDeleteIds,
      });

      toast.success('프로필이 수정되었습니다.');
      router.back();
    } catch (err) {
      setIsLoading(false);
      toast.error(
        err instanceof Error ? err.message : '수정 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <div className="px-6 pt-5 pb-24">
      <Header
        title={'내 정보 수정하기'}
        showBackButton={true}
        centerTitle={false}
      />

      <div className="flex flex-col gap-7">
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          닉네임
          <CustomInput
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          프로필 사진
          <label className="border-teduri relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border">
            {profileImagePreview ? (
              <Image
                src={profileImagePreview}
                alt="profile-preview"
                fill
                className="object-contain object-center"
                unoptimized
              />
            ) : (
              <Plus />
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </label>
        </div>

        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          관심 카테고리 선택
          <div className="grid grid-cols-3 gap-4 self-center">
            {badgeData.map((item) => {
              const key = item.id;
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
            value={description ?? ''}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
          />
          <span className="text-end text-xl">
            {(description ?? '').length}/500
          </span>
        </div>

        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          소개 사진 <span className="text-gray text-base">(최대 5장)</span>
          <div className="flex flex-wrap gap-3">
            {introItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="border-teduri relative h-32 w-32 overflow-hidden rounded-2xl border"
              >
                <Image
                  src={item.url}
                  alt={`intro-${idx}`}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                <CircleRemove
                  className="absolute top-0 right-0"
                  onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                    removeIntroAt(idx);
                    e.preventDefault();
                  }}
                />
              </div>
            ))}

            {introItems.length < MAX_INTRO && (
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
        <Button
          className="w-full py-6 text-xl font-semibold"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
}
