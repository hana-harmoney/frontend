'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from '@/components/use-kakao-loader';
import Header from '@/components/common/header';
import Badge from '@/components/common/badge';
import Pin from '@/assets/icons/pin.svg';
import Dollar from '@/assets/icons/dollar.svg';
import { Button } from '@/components/ui/button';
import { fetchJobDetail } from '@/lib/api/jobs';
import type { JobBoard } from '@/types/jobs';
import Image from 'next/image';
import NoData from '@/assets/images/no-data.svg';
import { formatNumber } from '@/lib/utils';
import Kebab from '@/assets/icons/kebab.svg';
import Edit from '@/assets/icons/edit.svg';
import Trash from '@/assets/icons/trash.svg';
import { deleteJob } from '@/lib/api/jobs';
import toast from 'react-hot-toast';
import { createChatRoom } from '@/lib/api/chat';
import { useJobEditStore } from '@/stores/useJobEditStore';
import { badgeData } from '@/lib/utils';

const JobDetailPage = () => {
  useKakaoLoader();

  const params = useParams();
  const jobId = Number(params.id);

  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [boardData, setBoardData] = useState<JobBoard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const [mine, setMine] = useState(false);
  const [userId, setUserId] = useState<string>();
  const [chatRoomCnt, setChatRoomCnt] = useState(0);
  const [boardId, setBoardId] = useState<string>();

  const { setData } = useJobEditStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const menu = document.getElementById('kebab-menu');
      const trigger = document.getElementById('kebab-trigger');
      if (
        menu &&
        !menu.contains(e.target as Node) &&
        trigger &&
        !trigger.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);

  useEffect(() => {
    (async () => {
      try {
        if (jobId) {
          const data = await fetchJobDetail(jobId);
          const r = data.result;
          setBoardId(r.boardId);
          setChatRoomCnt(r.chatRoomCnt);
          setMine(r.mine || false);
          setBoardData(r);
          setUserId(r.userId);

          const categoryIdFromText =
            badgeData.find((b) => b.text === r.category)?.id ?? 0;
          setData({
            title: r.title ?? '',
            content: r.content ?? '',
            wage: typeof r.wage === 'number' ? r.wage : 0,
            address: r.address ?? '',
            categoryId: categoryIdFromText,
            latitude: r.latitude,
            longitude: r.longitude,
            phone: r.phone ?? '',
            imageUrl: r.imageUrl ?? '',
          });
        }
      } catch (e) {
        setError('데이터를 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  const handleDelete = async () => {
    if (!boardData) return;
    try {
      setDeleting(true);
      await deleteJob(boardData.boardId);
      setShowConfirm(false);
      toast.success('성공적으로 삭제되었습니다.');
      router.back();
    } catch (e) {
      console.error('delete error', e);
      toast.error('본인이 작성한 글만 삭제할 수 있습니다.');
      setShowConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleChat = async () => {
    if (!boardData) return;
    if (boardData.chatRoomId) {
      router.push(`/chatroom/${boardData.chatRoomId}`);
      return;
    }

    try {
      const roomId = await createChatRoom(boardData.boardId);

      router.push(`/chatroom/${roomId}`);
      toast.success('채팅방이 성공적으로 생성되었습니다.');
    } catch (e) {
      toast.success('채팅방 생성에 실패했습니다.');
    }
  };

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

  return (
    <>
      <Header
        title={boardData.title}
        centerTitle={false}
        showBackButton={true}
        backClick={() => router.push('/jobs')}
      >
        {mine && (
          <div className="relative flex w-screen justify-end px-4">
            <Kebab
              id="kebab-trigger"
              onClick={() => {
                setShowMenu(true);
              }}
              className="h-7 w-7"
            />
            {showMenu && (
              <div
                id="kebab-menu"
                className="absolute top-4 right-2 flex flex-col gap-3 rounded-xl border bg-white p-4"
              >
                <div
                  className="flex items-center gap-2 text-xl"
                  onClick={() => {
                    router.push(`/jobs/${jobId}/edit`);
                  }}
                >
                  <Edit className="h-7 w-7" />
                  수정하기
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-left text-xl"
                  onClick={() => setShowConfirm(true)}
                >
                  <Trash className="h-7 w-7" />
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </Header>
      <div className="flex w-full flex-col items-center gap-5">
        {boardData.imageUrl && (
          // <div className="relative flex h-80 w-full px-20">
          //   <img
          //     src={boardData.imageUrl}
          //     alt="profile"
          //     className="object-cover object-center"
          //   />
          // </div>
          <img
            src={boardData.imageUrl}
            alt="profile"
            className="w-full object-cover object-center"
          />
        )}
        <div className="flex w-full flex-col gap-5 px-6">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <div
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
              onClick={() => router.push(`/profile/${userId}`)}
            >
              <Image
                src={boardData.profileUrl}
                alt="profile"
                fill
                className="object-cover object-center"
                unoptimized
                sizes="48px"
              />
            </div>
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
          {!mine ? (
            !boardData.status ? (
              <div className="flex w-full gap-3 text-2xl">
                <Button className="min-w-0 flex-1 !py-6 text-2xl">
                  <a href={`tel:${boardData.phone}`}>전화하기</a>
                </Button>
                <Button
                  variant="destructive"
                  className="min-w-0 flex-1 !py-6 text-2xl"
                  onClick={handleChat}
                >
                  채팅하기
                </Button>
              </div>
            ) : (
              <div className="flex w-full gap-3 text-2xl">
                <Button
                  disabled
                  className="min-w-0 flex-1 bg-gray-500 !py-6 text-xl text-white"
                >
                  종료된 공고입니다
                </Button>
              </div>
            )
          ) : (
            <Button
              variant="destructive"
              className="!py-7 text-2xl"
              onClick={() => router.push(`/chat/my/${boardId}`)}
            >
              대화중인 채팅 {chatRoomCnt}
            </Button>
          )}
        </div>
        {showConfirm && (
          <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/50">
            <div className="w-11/12 max-w-sm rounded-xl bg-white p-6 shadow-xl">
              <h3 className="mb-2 text-lg font-semibold">
                정말 삭제하시겠어요?
              </h3>
              <p className="mb-5 text-sm text-gray-600">
                삭제 후에는 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-3">
                <Button
                  className="bg-text-2 flex-1"
                  onClick={() => setShowConfirm(false)}
                  disabled={deleting}
                >
                  취소
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? '삭제 중…' : '삭제하기'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default JobDetailPage;
