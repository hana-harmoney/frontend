'use client';
import { useParams, useRouter } from 'next/navigation';
import { termsData } from '@/lib/utils';
import Header from '@/components/common/header';
import BottomButton from '@/components/common/bottomButton';
import { useRegisterStore } from '@/stores/userRegisterStore';
import { AgreementKey } from '@/types/auth';

const TermsPage = () => {
  const params = useParams();
  const termsId = Number(params.id);
  const { toggleAgreement } = useRegisterStore();
  const agreementKeys: AgreementKey[] = [
    'service',
    'privacy',
    'mydata',
    'account',
    'marketing',
  ];
  const currentKey = agreementKeys[termsId];
  const router = useRouter();

  return (
    <div className="text-gray flex flex-col gap-6 px-6 py-3 text-xl">
      <Header title={''} showBackButton={true} />
      <span className="w-full py-3 text-center text-3xl font-medium">
        {termsData[termsId].title}
      </span>
      <span className="font-light">{termsData[termsId].subtitle}</span>
      <div className="flex flex-col gap-4">
        {termsData[termsId].contents.map((content, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <div className="bg-main mt-2 inline-block h-2 w-2 flex-shrink-0 rounded-full" />
              <span>{content}</span>
            </div>
          );
        })}
      </div>
      <BottomButton
        disabled={false}
        onClick={() => {
          if (currentKey) {
            toggleAgreement(currentKey);
            router.back();
          }
        }}
      >
        동의하기
      </BottomButton>
    </div>
  );
};
export default TermsPage;
