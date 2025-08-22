'use client';
import Badge from '@/components/common/badge';
import Card from '@/components/jobs/card';
import { useState } from 'react';
const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const badgeData = [
    { id: 0, text: '전체', active: true },
    { id: 1, text: '요리', active: false },
    { id: 2, text: '육아', active: false },
    { id: 3, text: '농협', active: false },
    { id: 4, text: '청소', active: false },
    { id: 5, text: '기술', active: false },
    { id: 6, text: '기타', active: false },
  ];

  const demo = {
    title: '집밥 요리 도우미',
    category: 1,
    created: '2025-08-19T09:10:00',
    content:
      '가정에서 건강한 집밥 요리를 도와주실 분을 찾습니다. 한식 위주로 2-3시간 근무.',
    address: '성동구 성수동',
    wage: 15000,
    imageUrl:
      'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg',
  };
  return (
    <div className="flex flex-col items-center gap-9 border px-6 py-3">
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
      <div>
        <Card {...demo} />
      </div>
    </div>
  );
};
export default JobsPage;
