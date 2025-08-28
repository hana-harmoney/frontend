'use client';
import Image from 'next/image';
import Plus from '@/assets/icons/plus_gray.svg';
import { CustomInput } from '@/components/common/customInput';
import { InputWithIcon } from '@/components/common/inputWithIcon';
import { Textarea } from '@/components/ui/textarea';
import Badge from '@/components/common/badge';
import React, { useEffect, useMemo, useState } from 'react';
import Next from '@/assets/icons/next.svg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import CircleRemove from '@/assets/icons/circle_remove.svg';
import { useJobDraft } from '@/stores/useJobDraft';
import { createJob } from '@/lib/api/jobs';
import { JobCreateRequest } from '@/types/jobs';
import toast from 'react-hot-toast';
import { badgeData } from '@/lib/utils';
import Header from '@/components/common/header';

const saveFileToSessionStorage = async (key: string, file: File) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result as string;
    const payload = {
      name: file.name,
      type: file.type,
      lastModified: file.lastModified,
      base64,
    };
    sessionStorage.setItem(key, JSON.stringify(payload));
  };
  reader.readAsDataURL(file);
};

const loadFileFromSessionStorage = (key: string): File | null => {
  const raw = sessionStorage.getItem(key);
  if (!raw) return null;
  const { name, type, lastModified, base64 } = JSON.parse(raw);
  const byteString = atob(base64.split(',')[1]);
  const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ia], name, { type: mimeType, lastModified });
};

const JobsNewPage = () => {
  const { data: registerData, setData } = useJobDraft();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      saveFileToSessionStorage('jobImage', file);
      const url = URL.createObjectURL(file);
      setData({ imageUrl: url });
    }
  };

  const updateField =
    <K extends keyof typeof registerData>(key: K) =>
    (value: (typeof registerData)[K]) =>
      setData({ [key]: value } as Partial<typeof registerData>);

  const router = useRouter();

  const isEmpty = useMemo(() => {
    const { title, content, categoryId, address, imageUrl } = registerData;
    return !(
      title &&
      content &&
      categoryId !== null &&
      categoryId !== 0 &&
      address &&
      imageUrl
    );
  }, [registerData]);

  const handleSubmit = async () => {
    if (registerData.categoryId === null || registerData.categoryId === 0)
      return;
    const fileToUpload = loadFileFromSessionStorage('jobImage');
    if (!fileToUpload) {
      toast.error('이미지를 선택해주세요.');
      return;
    }

    const job = {
      title: registerData.title,
      content: registerData.content,
      wage: registerData.wage,
      address: registerData.address,
      categoryId: registerData.categoryId,
      latitude: registerData.latitude,
      longitude: registerData.longitude,
    };

    try {
      setIsLoading(true);
      await createJob(job as JobCreateRequest, fileToUpload);
      toast.success('성공적으로 등록되었습니다.');
      setData({
        title: '',
        content: '',
        wage: 0,
        address: '',
        imageUrl: '',
        categoryId: 0,
        latitude: 37.5448361732145,
        longitude: 127.056563379345,
        phone: '',
      });
      setImageFile(null);
      sessionStorage.removeItem('jobImage');
      router.push('/jobs');
    } catch (e) {
      console.error('createJob error:', e);
      toast.error('등록에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title={'게시글 등록'} showBackButton={true} centerTitle={false} />
      <div className="flex w-full flex-col items-center gap-5 px-6 py-3">
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          게시글 사진
          <label className="border-teduri relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border">
            {registerData.imageUrl ? (
              <Image
                src={registerData.imageUrl}
                alt="uploaded"
                fill
                className="object-contain object-center"
                unoptimized
              />
            ) : (
              <Plus />
            )}
            {registerData.imageUrl ? (
              <CircleRemove
                className="absolute top-0 right-0"
                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                  setData({ imageUrl: '' });
                  setImageFile(null);
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
          게시글 제목
          <CustomInput
            placeholder="예: 집밥 요리 도우미 구합니다"
            value={registerData.title}
            onChange={(e) => updateField('title')(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          급여 (시급)
          <CustomInput
            placeholder="예: 15000"
            value={registerData.wage}
            onChange={(e) => {
              const onlyNum = e.target.value.replace(/[^0-9]/g, '');
              updateField('wage')(onlyNum ? Number(onlyNum) : 0);
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          상세 설명
          <Textarea
            placeholder="어떤 일을 하게 될지, 어떤 분을 찾고 있는지 자세히 설명해주세요"
            className="placeholder:text-gray h-44 text-xl font-normal placeholder:text-xl"
            value={registerData.content}
            onChange={(e) => updateField('content')(e.target.value)}
            maxLength={500}
          />
          <span className="text-end text-xl">
            {registerData.content.length}/500
          </span>
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          카테고리 선택
          <div className="grid grid-cols-3 gap-4 self-center">
            {badgeData.map((item) => (
              <Badge
                key={item.id}
                active={registerData.categoryId === item.id}
                text={item.text}
                onClick={() => updateField('categoryId')(item.id)}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 text-2xl font-light">
          장소 선택
          <InputWithIcon
            placeholder={`${registerData.address.length === 0 ? '장소 선택' : registerData.address}`}
            icon={<Next className="h-5" />}
            onClick={() => router.push('/jobs/new/location')}
            readOnly
          />
        </div>
        <Button
          className="w-full !py-6 text-xl"
          disabled={isEmpty || isLoading}
          onClick={handleSubmit}
        >
          작성완료
        </Button>
      </div>
    </>
  );
};
export default JobsNewPage;
