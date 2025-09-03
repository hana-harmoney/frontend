import BowDown from '@/assets/images/bow_down.svg';

export default function DelegateSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-8 sm:p-20">
      <div className="text-4xl font-bold">에러 발생</div>
      <div className="text-2xl font-semibold">에러가 발생했습니다.</div>
      <div className="text-center text-2xl font-light">
        작성 만료 시간이 지났을 수 있으니
        <br />
        시니어분들께 새로운 링크를 발급 받아
        <br />
        다시 시도해주세요.
      </div>
      <BowDown className="my-8 h-28 w-full" />
    </div>
  );
}
