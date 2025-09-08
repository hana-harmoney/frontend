import ShowPhone from '@/assets/images/show_phone.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-8 sm:p-20">
      <div className="text-4xl font-bold">하나하모니</div>
      <div className="text-center text-2xl font-semibold">
        경험을 소득으로, 시간을 자산으로
      </div>
      <div className="text-center text-2xl font-light">
        벌고 · 쌓고 · 아끼고 · 지키는
        <br />
        시니어를 위한 통합 재정관리 플랫폼
      </div>
      <ShowPhone className="my-8 h-28 w-full" />
      <Link href={'/auth/login'}>
        <Button className="bg-hana-green text-semibold px-10 py-8 text-2xl text-white">
          지금 시작하기
        </Button>
      </Link>
    </div>
  );
}
