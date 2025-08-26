'use client';

import Header from '@/components/common/header';
import BottomButton from '@/components/common/bottomButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterStore } from '@/stores/useRegisterStore';
import { AgreementKey } from '@/types/auth';
import { signupUser } from '@/lib/api/auth';

const TERMS_DETAIL: Record<AgreementKey, string> = {
  service:
    '하나 하모니 서비스 이용을 위한 기본 약관입니다.\n\n- 수집 항목: 성명, CI/DI, 생년월일, ISA 계좌 번호 등...\n- 이용 목적: 챌린지 운영, 보상 산정 등...',
  privacy:
    '개인정보 수집 및 이용에 대한 동의입니다.\n\n- 수집 항목: 이름, 연락처, 주소 등...',
  mydata: '금융 정보 연계 및 맞춤형 서비스 제공을 위한 동의입니다.',
  account: '하나은행 연계 계좌와 기본 저축 봉투를 생성합니다.',
  marketing: '새로운 일자리와 혜택 정보를 받아보실 수 있습니다.',
};

const AGREEMENT_ID: Record<AgreementKey, number> = {
  service: 0,
  privacy: 1,
  mydata: 2,
  account: 3,
  marketing: 4,
};

export default function Step3Page() {
  const [modalKey, setModalKey] = useState<AgreementKey | null>(null);
  const router = useRouter();

  const { data, toggleAgreement, setField } = useRegisterStore();
  const agreements = data.agreements;

  const isAllRequiredChecked =
    agreements.service &&
    agreements.privacy &&
    agreements.mydata &&
    agreements.account;

  const handleToggle = (key: AgreementKey) => {
    toggleAgreement(key);
  };

  const handleCheckAll = () => {
    const allChecked = isAllRequiredChecked;
    setField('agreements', {
      service: !allChecked,
      privacy: !allChecked,
      mydata: !allChecked,
      account: !allChecked,
      marketing: agreements.marketing,
    });
  };

  const handleSubmit = async () => {
    const formatBirth = (() => {
      if (!data.birth) return '';
      const date = new Date(data.birth);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    })();

    const genderValue = data.gender === '남자' ? 'MALE' : 'FEMALE';

    const formatPhone = data.phone
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');

    try {
      // signupUser 호출
      const result = await signupUser({
        loginId: data.loginId,
        password: data.password,
        name: data.name,
        birth: formatBirth,
        gender: genderValue,
        address: data.address,
        phone: formatPhone,
      });

      if (result?.code === '200') {
        router.push('/auth/login');
      } else {
        alert(`회원가입 실패: ${result?.message ?? '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const AgreementRow = ({
    label,
    keyName,
    required,
  }: {
    label: string;
    keyName: AgreementKey;
    required?: boolean;
  }) => (
    <div className="flex flex-col gap-1 py-3 text-xl">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={agreements[keyName]}
          onChange={() => handleToggle(keyName)}
          className="accent-hanagreen-normal mt-1 size-5"
        />
        <div className="flex flex-col gap-2">
          <div className="font-m">
            {label} {required ? '(필수)' : '(선택)'}
          </div>
          <div className="text-base text-gray-600">
            {TERMS_DETAIL[keyName].split('\n')[0]}
          </div>
          <button
            onClick={() => {
              const id = AGREEMENT_ID[keyName];
              router.push(`/auth/signup/step3/terms/${id}`);
            }}
            className="text-hanagreen-normal text-left text-sm underline"
          >
            약관 전문 보기
          </button>
        </div>
      </div>
    </div>
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
              step <= 3
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
        약관에 동의해주세요
      </div>

      <div className="flex flex-col gap-3 divide-gray-200">
        <AgreementRow
          label="서비스 이용 약관 동의"
          keyName="service"
          required
        />
        <AgreementRow
          label="개인정보 활용 동의서 약관"
          keyName="privacy"
          required
        />
        <AgreementRow
          label="마이데이터 활용 동의서 약관"
          keyName="mydata"
          required
        />
        <AgreementRow
          label="계좌(베이스 봉투) 생성 동의"
          keyName="account"
          required
        />
        <AgreementRow label="마케팅 정보 수신 동의" keyName="marketing" />
      </div>

      <div className="mt-6 border-t pt-6">
        <label className="font-m flex items-center gap-2 text-xl">
          <input
            type="checkbox"
            checked={isAllRequiredChecked}
            onChange={handleCheckAll}
            className="accent-hanagreen-normal size-5"
          />
          필수 약관 전체 동의
        </label>
      </div>

      <BottomButton disabled={!isAllRequiredChecked} onClick={handleSubmit}>
        다음으로
      </BottomButton>

      {/*{modalKey && (*/}
      {/*  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-8">*/}
      {/*    <div className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-md bg-white p-6 shadow-lg">*/}
      {/*      <h2 className="font-m mb-4 text-lg">*/}
      {/*        {TERMS_DETAIL[modalKey]?.split('\n')[0]}*/}
      {/*      </h2>*/}
      {/*      <p className="text-sm whitespace-pre-wrap text-gray-700">*/}
      {/*        {TERMS_DETAIL[modalKey]}*/}
      {/*      </p>*/}
      {/*      <button*/}
      {/*        className="absolute top-3 right-3 text-sm text-gray-400 hover:text-gray-600"*/}
      {/*        onClick={() => setModalKey(null)}*/}
      {/*      >*/}
      {/*        닫기 ✕*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
