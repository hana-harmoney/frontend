'use client';
import Plus from '@/assets/icons/plus.svg';
import { CustomInput } from '@/components/common/customInput';
import { InputWithIcon } from '@/components/common/inputWithIcon';
import { Textarea } from '@/components/ui/textarea';
import Badge from '@/components/common/badge';
import { useState } from 'react';
import Next from '@/assets/icons/next.svg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const JobsNewPage = () => {
  const badgeData = [
    { id: 0, text: '요리' },
    { id: 1, text: '육아' },
    { id: 2, text: '농협' },
    { id: 3, text: '청소' },
    { id: 4, text: '기술' },
    { id: 5, text: '기타' },
  ];

  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-5 px-6 py-3">
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        게시글 사진
        <div className="border-teduri flex h-32 w-32 items-center justify-center rounded-2xl border">
          <Plus />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        게시글 제목
        <CustomInput placeholder="예: 집밥 요리 도우미 구합니다" />
      </div>
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        상세 설명
        <Textarea
          placeholder="어떤 일을 하게 될지, 어떤 분을 찾고 있는지 자세히 설명해주세요"
          className="placeholder:text-gray h-44 font-normal placeholder:text-xl"
        />
        <span className="text-end text-xl">34/500</span>
      </div>
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        카테고리 선택
        <div className="flex flex-wrap justify-center gap-2">
          {badgeData.map((item) => (
            <Badge
              key={item.id}
              active={selectedCategory === item.id}
              text={item.text}
              onClick={() => setSelectedCategory(item.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        장소 선택
        <InputWithIcon
          placeholder="장소 선택"
          icon={<Next className="h-5" />}
          onClick={() => router.push('/jobs/new/location')}
        />
      </div>
      <div className="flex w-full flex-col gap-3 text-2xl font-light">
        연락처 (선택)
        <CustomInput placeholder="010-1234-5678" />
      </div>
      <Button className="w-full !py-6 text-xl">작성완료</Button>
    </div>
  );
};
export default JobsNewPage;
