'use client';
import Badge from '@/components/common/badge';
import Card from '@/components/jobs/card';
import NoData from '@/assets/images/no-data.svg';
import EditIcon from '@/assets/icons/edit.svg';
import BoardIcon from '@/assets/icons/board.svg';
import PlusIcon from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { JobsProps } from '@/types/jobs';
import { fetchJobList } from '@/lib/api/jobs';
import type { JobBoard } from '@/types/jobs';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/header';

const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [boards, setBoards] = useState<JobBoard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showButtons, setShowButtons] = useState(false);

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
      boardId: b.boardId,
      title: b.title,
      category: b.category,
      created: b.createdAt,
      content: b.content,
      address: b.address,
      wage: b.wage,
      imageUrl: b.imageUrl,
    }));

  // const demos: CardProps[] = [];

  return (
    <div>
      <Header title="구직" centerTitle={false} showBackButton={false} />
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
        <div className="flex w-full flex-col gap-3">
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
        {showButtons && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowButtons(false)}
          />
        )}
        <div className="fixed right-6 bottom-26 z-30 flex flex-col items-end">
          {showButtons && (
            <div className="mb-2 flex flex-col gap-0 rounded-lg bg-white p-0 shadow-lg">
              <button
                onClick={() => {
                  setShowButtons(false);
                  router.push('/jobs/new');
                }}
                className="hover:bg-hanagreen-light flex items-center gap-3 rounded-md px-4 py-3 text-base text-gray-700"
              >
                <EditIcon width={24} height={24} />
                구직 글 등록
              </button>
              <button
                onClick={() => {
                  setShowButtons(false);
                  router.push('/jobs/my');
                }}
                className="hover:bg-hanagreen-light flex items-center gap-3 rounded-md px-4 py-3 text-base text-gray-700"
              >
                <BoardIcon width={24} height={24} />
                내가 쓴 글 보기
              </button>
            </div>
          )}
          <button
            className="bg-hanagreen-normal hover:bg-hanagreen-normal-hover flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
            onClick={() => setShowButtons((prev) => !prev)}
          >
            <PlusIcon width={28} height={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default JobsPage;
