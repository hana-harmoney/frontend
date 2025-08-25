'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import InputWithLabel from '../common/inputWithLabel';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form
      // onSubmit={handleLogin}
      className="flex w-full flex-col items-center justify-center gap-5"
    >
      <InputWithLabel
        label={'아이디'}
        placeholder="영문, 숫자 조합 6자 이상"
        value={email}
        onChange={handleChangeEmail}
      />
      <InputWithLabel
        label={'비밀번호'}
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handleChangePassword}
      />
      <Button className="bg-hana-green h-[52px] w-full rounded-sm text-2xl">
        로그인
      </Button>
      <Link href={'/auth/signup'}>
        <p className="text-text-secondary text-xl">회원가입 하러가기</p>
      </Link>
    </form>
  );
}
