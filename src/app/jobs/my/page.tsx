'use client';
import Badge from '@/components/common/badge';
import Card from '@/components/jobs/card';
import NoData from '@/assets/images/no-data.svg';
import { useEffect, useState } from 'react';
import { JobsProps } from '@/types/jobs';
import { useRouter } from 'next/navigation';
import { JobBoard } from '@/types/jobs';
import { fetchMyJobs } from '@/lib/api/jobs';
import Header from '@/components/common/header';

const MyJobsPage = () => {
  const [boards, setBoards] = useState<JobBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyJobs();
        setBoards(data.result.boardList);
      } catch (e) {
        setError('내 글을 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cards: JobsProps[] = boards.map((b) => ({
    boardId: b.boardId,
    title: b.title,
    category: b.category,
    created: b.createdAt,
    content: b.content,
    address: b.address,
    wage: b.wage,
    imageUrl: b.imageUrl,
  }));

  return (
    <div className="flex flex-col gap-3 px-6">
      <Header title={'내가 쓴 글'} showBackButton={true} centerTitle={false} />

      {loading ? (
        <div className="py-10 text-center text-gray-500">불러오는 중…</div>
      ) : error ? (
        <div className="py-10 text-center text-red-500">{error}</div>
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-500">
          작성한 글이 없습니다.
          <br />
          구직 글을 작성해보세요.
          <NoData className="h-24 w-24" />
        </div>
      ) : (
        cards.map((item, idx) => (
          <div key={idx}>
            <Card
              {...item}
              onClick={() => {
                router.push(`/jobs/${item.boardId}`);
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default MyJobsPage;
