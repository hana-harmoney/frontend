'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterStore } from '@/stores/useRegisterStore';
import LeftArrow from '@/assets/icons/left_arrow.svg';
import DaumPostcode from 'react-daum-postcode';
import Header from '@/components/common/header';

const LocationSearchPage = () => {
  const router = useRouter();
  const { setField } = useRegisterStore();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const id = 'daum-postcode-script';
    const exist = document.getElementById(id) as HTMLScriptElement | null;
    if (exist) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  const onCompletePost = (data: { address: string }) => {
    setField('address', data.address || '');
    router.push('/auth/signup/step1');
  };

  return (
    <div className="flex w-full flex-col bg-white">
      <Header title={'주소 검색'} showBackButton={true}>
        <div className="relative flex w-screen px-4">
          <LeftArrow
            onClick={() => {
              router.push('/auth/signup/step1');
            }}
          />
        </div>
      </Header>

      <DaumPostcode
        onComplete={onCompletePost}
        className="!h-screen border border-black"
      ></DaumPostcode>
      {!scriptLoaded && (
        <div className="flex items-center justify-center p-6 text-gray-500">
          로딩 중…
        </div>
      )}
    </div>
  );
};

export default LocationSearchPage;
