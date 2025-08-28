import Image from 'next/image';
import EducationCard from '@/components/education/EducationCard';
import educationTestImg from '@/assets/images/education_test.png';
import { educationData } from '@/lib/utils';

export default async function EducationPage() {
  return (
    <main className="w-full">
      {/* 히어로 이미지*/}
      <section className="w-full">
        <Image
          src={educationTestImg}
          alt="메인 배너"
          sizes="100vw"
          priority
          placeholder="blur"
          className="h-auto w-full select-none" // <- 잘림 방지
        />
      </section>

      {/* 본문: 패딩 + 중앙정렬 */}
      <section className="mx-auto max-w-screen-md px-6 py-4 sm:px-6">
        <h2 className="mb-8 text-xl font-semibold">금융 교육 프로그램</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
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
  );
}
