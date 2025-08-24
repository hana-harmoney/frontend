'use client';
import Badge from '@/components/common/badge';
import Card from '@/components/jobs/card';
import NoData from '@/assets/images/no-data.svg';
import { useEffect, useState } from 'react';
import { JobsProps } from '@/types/jobs';
import { fetchJobList } from '@/lib/api/jobs';
import type { JobBoard } from '@/types/jobs';

const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [boards, setBoards] = useState<JobBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJobList();
        setBoards(data.result.boardList);
      } catch (e) {
        setError('목록을 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const badgeData = [
    { id: 0, text: '전체' },
    { id: 1, text: '요리' },
    { id: 2, text: '육아' },
    { id: 3, text: '농업' },
    { id: 4, text: '청소' },
    { id: 5, text: '기술' },
    { id: 6, text: '기타' },
  ];

  const cards: JobsProps[] = boards
    .filter((b) =>
      selectedCategory === 0
        ? true
        : b.category === badgeData.find((x) => x.id === selectedCategory)?.text,
    )
    .map((b) => ({
      title: b.title,
      category: b.category,
      created: b.createdAt,
      content: b.content,
      address: b.address,
      wage: b.wage,
      imageUrl: b.imageUrl,
    }));

  // const demos: CardProps[] = [];
  useEffect(() => {
    console.log('cards : ', cards);
  }, [cards]);

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
        {loading ? (
          <div className="py-10 text-center text-gray-500">불러오는 중…</div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">{error}</div>
        ) : cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-500">
            검색 결과가 없습니다.
            <br />
            다른 카테고리를 선택해주세요.
            <NoData className="h-24 w-24" />
          </div>
        ) : (
          cards.map((item, idx) => (
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
