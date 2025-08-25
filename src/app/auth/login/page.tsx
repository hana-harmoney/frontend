import LoginForm from '@/components/auth/loginForm';

export default async function LoginPage({}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6">
      <div className="flex flex-col items-center pb-2.5">
        <p className="pb-11 text-4xl font-bold">하나하모니</p>
        <p className="text-2xl font-semibold">로그인</p>
      </div>
      <LoginForm />
    </div>
  );
}
