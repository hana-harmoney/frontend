'use client';
import { CustomInput } from '@/components/common/customInput';
import React, { useState } from 'react';
import Header from '@/components/common/header';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/lib/api/profile';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const EditPasswordPage = () => {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isValidPassword = (pw: string) => /^.{8,}$/.test(pw);

  const formValid = !!(
    isValidPassword(password) &&
    passwordConfirm &&
    password === passwordConfirm
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updateProfile({
        password: password,
      });

      toast.success('비밀번호가 수정되었습니다.');
      router.back();
    } catch (err) {
      setIsLoading(false);
      toast.error(
        err instanceof Error ? err.message : '수정 중 오류가 발생했습니다.',
      );
    }
  };
  return (
    <div className="px-6 pt-3 pb-24">
      <Header
        title={'비밀번호 변경'}
        showBackButton={true}
        centerTitle={false}
      />
      <div className="text-gray mb-2 w-full text-3xl font-medium">
        비밀번호 변경
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          새 비밀번호
          <CustomInput
            type="password"
            placeholder="8자 이상 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isValidPassword(password) && password && (
            <p className="text-sm text-red-500">
              비밀번호는 8자 이상이어야 합니다.
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          새 비밀번호 확인
          <CustomInput
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {passwordConfirm && password !== passwordConfirm && (
            <p className="text-sm text-red-500">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
        <Button
          className="w-full py-6 text-xl font-semibold"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          비밀번호 변경 완료
        </Button>
      </div>
    </div>
  );
};
export default EditPasswordPage;
