import Image from 'next/image';
import EducationCard from '@/components/education/EducationCard';
import { educationData } from '@/lib/utils';
import Header from '@/components/common/header';

export default async function EducationPage() {
  return (
    <div>
      <Header title="교육" centerTitle={false} showBackButton={false} />
      <main className="w-full">
        <section className="w-full">
          <Image
            src={'/images/education/education_test.svg'}
            alt="메인 배너"
            sizes="100vw"
            priority
            width="20"
            height="20"
            className="h-auto w-full select-none"
          />
        </section>

        {/* 본문: 패딩 + 중앙정렬 */}
        <section className="mx-auto max-w-screen-md px-6 py-4 sm:px-6">
          <h2 className="mb-8 text-xl font-semibold">금융 교육 프로그램</h2>

          <div className="flex flex-col gap-8">
            {educationData.map((p, idx) => (
              <EducationCard
                key={idx}
                href={p.href}
                imageUrl={p.imageUrl}
                topic={p.topic}
                location={p.location}
                meta={p.meta}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
