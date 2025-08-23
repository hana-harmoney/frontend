'use client';
import Badge from '@/components/common/badge';
import Card from '@/components/jobs/card';
import NoData from '@/assets/images/no-data.svg';
import { useState } from 'react';
import { JobsProps } from '@/types/jobs';

const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const badgeData = [
    { id: 0, text: '전체' },
    { id: 1, text: '요리' },
    { id: 2, text: '육아' },
    { id: 3, text: '농협' },
    { id: 4, text: '청소' },
    { id: 5, text: '기술' },
    { id: 6, text: '기타' },
  ];

  const demos: JobsProps[] = [
    {
      title: '집밥 요리 도우미',
      category: badgeData[1].text,
      created: '2025-08-19T09:10:00',
      content:
        '가정에서 건강한 집밥 요리를 도와주실 분을 찾습니다. 한식 위주로 2-3시간 근무.',
      address: '성동구 성수동',
      wage: 15000,
      imageUrl:
        'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg',
    },
    {
      title: '아이 돌봄 선생님',
      category: badgeData[2].text,
      created: '2025-08-20T14:30:00',
      content:
        '3살 아이를 오후 시간에 돌봐주실 분을 찾습니다. 놀이 및 안전 관리 중심.',
      address: '강남구 역삼동',
      wage: 18000,
      imageUrl:
        'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/sample2.jpeg',
    },
    {
      title: '주말 농장 일손 돕기',
      category: badgeData[3].text,
      created: '2025-08-21T07:00:00',
      content: '주말 농장에서 수확 및 간단한 잡일 도와주실 분 모집.',
      address: '경기도 파주시',
      wage: 12000,
      imageUrl:
        'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/sample3.jpeg',
    },
    {
      title: '사무실 청소 도우미',
      category: badgeData[4].text,
      created: '2025-08-22T06:50:00',
      content: '소규모 사무실 청소 및 정리 정돈. 오전 2시간 근무.',
      address: '마포구 상암동',
      wage: 14000,
      imageUrl:
        'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/sample4.jpeg',
    },
  ];

  // const demos: CardProps[] = [];

  return (
    <div className="flex flex-col items-center gap-9 px-6 py-3">
      <div className="grid grid-cols-4 gap-3">
        {badgeData.map((item) => (
          <Badge
            key={item.id}
            active={selectedCategory === item.id}
            text={item.text}
            onClick={() => setSelectedCategory(item.id)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {demos.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-500">
            검섹 결과가 없습니다.
            <br />
            다른 카테고리를 선택해주세요.
            <NoData className="h-24 w-24" />
          </div>
        ) : (
          demos.map((item, idx) => (
            <div key={idx}>
              <Card {...item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default JobsPage;
