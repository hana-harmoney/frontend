'use client';
import Image from 'next/image';
import Plus from '@/assets/icons/plus.svg';
import { CustomInput } from '@/components/common/customInput';
import { InputWithIcon } from '@/components/common/inputWithIcon';
import { Textarea } from '@/components/ui/textarea';
import Badge from '@/components/common/badge';
import { useEffect, useMemo } from 'react';
import Next from '@/assets/icons/next.svg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import CircleRemove from '@/assets/icons/circle_remove.svg';
import { useJobDraft } from '@/stores/useJobDraft';

const JobsNewPage = () => {
  const { data: registerData, setData } = useJobDraft();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setData({ image: url });
    }
  };

  const updateField =
    <K extends keyof typeof registerData>(key: K) =>
    (value: (typeof registerData)[K]) =>
      setData({ [key]: value } as Partial<typeof registerData>);

  const badgeData = [
    { id: 0, text: '요리' },
    { id: 1, text: '육아' },
    { id: 2, text: '농업' },
    { id: 3, text: '청소' },
    { id: 4, text: '기술' },
    { id: 5, text: '기타' },
  ];

  const router = useRouter();

  const isEmpty = useMemo(() => {
    const { title, content, category, address } = registerData;
    return !(title && content && category !== null && address);
  }, [registerData]);

  return (
    <div className="flex w-full flex-col items-center gap-5 px-6 py-3">
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        게시글 사진
        <label className="border-teduri relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border">
          {registerData.image ? (
            <Image
              src={registerData.image}
              alt="uploaded"
              fill
              className="object-contain object-center"
              unoptimized
            />
          ) : (
            <Plus />
          )}
          {registerData.image ? (
            <CircleRemove
              className="absolute top-0 right-0"
              onClick={(e: React.MouseEvent<SVGSVGElement>) => {
                setData({ image: '' });
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
        상세 설명
        <Textarea
          placeholder="어떤 일을 하게 될지, 어떤 분을 찾고 있는지 자세히 설명해주세요"
          className="placeholder:text-gray h-44 text-xl font-normal placeholder:text-xl"
          value={registerData.content}
          onChange={(e) => updateField('content')(e.target.value)}
        />
        <span className="text-end text-xl">34/500</span>
      </div>
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        카테고리 선택
        <div className="flex flex-wrap justify-center gap-2">
          {badgeData.map((item) => (
            <Badge
              key={item.id}
              active={registerData.category === item.id}
              text={item.text}
              onClick={() => updateField('category')(item.id)}
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
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        연락처 (선택)
        <CustomInput
          placeholder="010-1234-5678"
          value={registerData.phone}
          onChange={(e) => updateField('phone')(e.target.value)}
        />
      </div>
      <Button className="w-full !py-6 text-xl" disabled={isEmpty}>
        작성완료
      </Button>
    </div>
  );
};
export default JobsNewPage;
