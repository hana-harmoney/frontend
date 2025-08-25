'use client';

import Header from '@/components/common/header';
import { CustomInput } from '@/components/common/customInput';
import { DatePicker } from '@/components/ui/datepicker';
import BottomButton from '@/components/common/bottomButton';
import { useRegisterStore } from '@/stores/userRegisterStore';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import LeftArrow from '@/assets/icons/left_arrow.svg';

export default function Step1Page() {
  const { data, setField } = useRegisterStore();
  const router = useRouter();

  const formValid = !!(
    data.name &&
    data.birth &&
    data.gender &&
    data.phone &&
    data.address
  );

  return (
    <div className="px-6 pt-5 pb-15">
      <div></div>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />

      <Header title={''} showBackButton={false}>
        <div className="relative flex w-screen px-4">
          <LeftArrow
            onClick={() => {
              router.push('/auth/login');
            }}
          />
        </div>
      </Header>

      {/* 단계 표시 */}
      <div className="mt-0 mb-4 flex gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
              step === 1
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
        기본 정보를 입력해주세요
      </div>

      {/* Form */}
      <div className="w-full space-y-6">
        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          이름
          <CustomInput
            placeholder="이름을 입력하세요"
            value={data.name}
            onChange={(e) => setField('name', e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          생년월일
          <DatePicker
            value={data.birth ?? undefined}
            onChange={(date) => setField('birth', date ?? null)}
            locale="ko-KR"
            formatOptions={{ day: '2-digit', month: 'long', year: 'numeric' }}
          />
        </div>

        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          성별
          <div className="flex gap-4 px-4">
            {['남자', '여자'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setField('gender', g as '남자' | '여자')}
                className={`flex-1 rounded-md border px-6 py-4 text-center font-medium ${
                  data.gender === g
                    ? 'bg-hanagreen-normal/10 border-hanagreen-normal text-hanagreen-normal'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          전화번호
          <CustomInput
            placeholder="010-1234-5678"
            value={data.phone}
            onChange={(e) => {
              const onlyNum = e.target.value.replace(/[^0-9]/g, '');
              setField('phone', onlyNum);
            }}
          />
        </div>

        <div className="flex w-full flex-col gap-3 py-2 text-2xl font-light">
          주소
          <CustomInput
            placeholder="서울시 강남구 테헤란로 123"
            value={data.address}
            onChange={(e) => setField('address', e.target.value)}
            readOnly
            onClick={() => {
              router.push('/auth/signup/step1/location');
            }}
          />
        </div>
      </div>

      <BottomButton
        disabled={!formValid}
        onClick={() => router.push('/auth/signup/step2')}
      >
        다음으로
      </BottomButton>

      <div className="mt-auto w-full"></div>
    </div>
  );
}
