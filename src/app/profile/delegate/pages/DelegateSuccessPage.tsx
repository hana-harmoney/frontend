import ThumsUp from '@/assets/images/thumbsup.svg';

export default function DelegateSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 p-8 sm:p-20">
      <div className="text-4xl font-bold">작성 완료</div>
      <div className="text-center text-2xl font-semibold">
        성공적으로 프로필이 작성되었습니다.
      </div>
      <div className="text-center text-2xl font-light">
        시니어분들을 위해
        <br />
        귀한 시간 내주셔서 감사합니다.
        <br />
        이제 시니어분들께 이 사실을 알려
        <br />
        로그인을 진행해주세요.
      </div>
      <ThumsUp className="my-8 h-28 w-full" />
    </div>
  );
}
