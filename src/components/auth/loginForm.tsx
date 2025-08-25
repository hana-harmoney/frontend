'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import InputWithLabel from '../common/inputWithLabel';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId: id, password }),
      });

      if (!r.ok) throw new Error(await r.text());

      router.replace('/home');
    } catch (e) {
      setErr('아이디 또는 비밀번호를 확인해 주세요.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex w-full flex-col items-center justify-center gap-5"
    >
      <InputWithLabel
        label={'아이디'}
        placeholder="영문, 숫자 조합 6자 이상"
        value={id}
        onChange={handleChangeId}
      />
      <InputWithLabel
        label={'비밀번호'}
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handleChangePassword}
      />
      <Button
        className="bg-hana-green h-[52px] w-full rounded-sm text-2xl"
        type="submit"
        disabled={loading}
      >
        {loading ? '로그인 중...' : '로그인'}
      </Button>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <Link href={'/auth/signup'}>
        <p className="text-text-secondary text-xl">회원가입 하러가기</p>
      </Link>
    </form>
  );
}
