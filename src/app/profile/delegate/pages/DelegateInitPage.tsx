import ShowPhone from '@/assets/images/show_phone.svg';
import { Button } from '@/components/ui/button';
import { useDelegatePageStatus } from '@/stores/useDelegatePageStatus';

export default function DelegateInitPage() {
  const setStatus = useDelegatePageStatus((state) => state.setStatus);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-8 sm:p-20">
      <div className="text-4xl font-bold">하나하모니</div>
      <div className="text-center text-2xl font-semibold">
        여러분의 시니어를 소개해주세요.
      </div>
      <div className="text-center text-2xl font-light">
        저희는 시니어를 위한 고용/구직 서비스입니다.
        <br />
        시니어분들의 숙련된 기술과 노하우들을
        <br />
        고용주분들이 알 수 있게
        <br />
        시니어분들의 프로필을 작성해주세요
      </div>
      <ShowPhone className="my-8 h-28 w-full" />
      <Button
        onClick={() => setStatus('writing')}
        className="bg-hana-green text-semibold px-10 py-8 text-2xl text-white"
      >
        작성하러 가기
      </Button>
    </div>
  );
}
