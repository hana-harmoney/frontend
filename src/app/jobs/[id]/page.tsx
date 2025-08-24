'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/components/use-kakao-loader';

import Badge from '@/components/common/badge';
import Pin from '@/assets/icons/pin.svg';
import Dollar from '@/assets/icons/dollar.svg';
import { Button } from '@/components/ui/button';
import ImageSlider from '@/components/jobs/ImageSlider';
import { fetchJobDetail } from '@/lib/api/jobs';
import type { JobBoard } from '@/types/jobs';
import Image from 'next/image';
import NoData from '@/assets/images/no-data.svg';
import { formatNumber } from '@/lib/utils';

const JobDetailPage = () => {
  useKakaoLoader();

  const params = useParams();
  const jobId = Number(params.id);

  const [boardData, setBoardData] = useState<JobBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (jobId) {
          const data = await fetchJobDetail(jobId);
          setBoardData(data.result);
        }
      } catch (e) {
        setError('데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  // useEffect(() => {
  //   console.log('boardData : ', boardData);
  // }, [boardData]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-gray-500">
        불러오는 중…
        <NoData className="h-24 w-24" />
      </div>
    );
  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!boardData) return null;

  const images = [
    'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg',
    'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg',
  ];

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="">
        <ImageSlider images={images} />
      </div>

      <div className="flex w-full flex-col gap-5 px-6">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <Image
            src={boardData.profileUrl}
            alt="profile"
            width={48}
            height={48}
            className="rounded-full object-cover object-center"
            unoptimized
          />
          <div className="flex flex-col">
            <div className="flex items-end gap-1">
              <span className="text-2xl">{boardData.nickname}</span>
              <span className="text-hana-green">Lv.{boardData.trust}</span>
            </div>
            {boardData.address}
          </div>
        </div>
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold">{boardData.title}</span>
            <Badge active={true} text={boardData.category || '카테고리'} />
          </div>
          <span className="text-xl font-semibold">{boardData.content}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Pin /> {boardData.address}
          </div>
          <div className="flex items-center gap-2">
            <Dollar /> 시급{' '}
            <span className="text-main font-bold">
              {formatNumber(boardData.wage)}
            </span>
            원
          </div>
        </div>
        <div className="flex flex-col text-2xl">장소</div>
        <Map
          id="map"
          center={{
            lat: boardData.latitude || 37.5448361732145,
            lng: boardData.longitude || 127.056563379345,
          }}
          style={{ width: '100%', height: '350px' }}
          level={3}
        >
          <MapMarker
            position={{
              lat: boardData.latitude || 37.5448361732145,
              lng: boardData.longitude || 127.056563379345,
            }}
          />
        </Map>
        <div className="flex w-full gap-3 text-2xl">
          <Button className="min-w-0 flex-1 !py-5">전화하기</Button>
          <Button variant="destructive" className="min-w-0 flex-1 !py-5">
            채팅하기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default JobDetailPage;
