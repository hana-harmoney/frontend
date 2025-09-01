'use client';

import Header from '@/components/common/header';
import { CustomInput } from '@/components/common/customInput';
import BottomButton from '@/components/common/bottomButton';
import { useState } from 'react';
import { useRegisterStore } from '@/stores/useRegisterStore';
import { useRouter } from 'next/navigation';

const isValidLoginId = (id: string) => /^[a-zA-Z0-9]{6,}$/.test(id);
const isValidPassword = (pw: string) =>
  /^(?=\S{8,}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).*$/.test(pw);

export default function Step2Page() {
  const { data, setField } = useRegisterStore();
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const formValid = !!(
    isValidLoginId(data.loginId) &&
    isValidPassword(data.password) &&
    confirmPassword &&
    data.password === confirmPassword
  );

  return (
    <div className="px-6 pt-5 pb-24">
      <Header title={''} />

      {/* 단계 표시 */}
      <div className="mt-0 mb-4 flex gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
              step <= 2
                ? 'bg-hanagreen-normal text-white'
                : 'border-hanagreen-normal text-hanagreen-normal border bg-white'
            }`}
            style={{ width: 32, height: 32 }}
          >
            {step}
          </div>
        ))}
      </div>

      <div className="mb-2 w-full py-3 text-center text-3xl font-medium text-gray-700">
        계정 정보를 입력해주세요
      </div>

      <div className="w-full space-y-6">
        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          아이디
          <CustomInput
            placeholder="영문, 숫자 조합 6자 이상"
            value={data.loginId}
            onChange={(e) => setField('loginId', e.target.value)}
          />
          {!isValidLoginId(data.loginId) && data.loginId && (
            <p className="text-sm text-red-500">
              영문/숫자 조합 6자 이상이어야 합니다.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          비밀번호
          <CustomInput
            type="password"
            placeholder="8자 이상 입력하세요"
            value={data.password}
            onChange={(e) => setField('password', e.target.value)}
          />
          {!isValidPassword(data.password) && data.password && (
            <p className="text-sm text-red-500">
              비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          비밀번호 확인
          <CustomInput
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword && data.password !== confirmPassword && (
            <p className="text-sm text-red-500">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
      </div>

      <BottomButton
        disabled={!formValid}
        onClick={() => router.push('/auth/signup/step3')}
      >
        다음으로
      </BottomButton>

      <div className="mt-auto w-full" />
    </div>
  );
}
