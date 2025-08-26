// src/app/education/page.tsx
import Image from 'next/image';
import EducationCard from '@/components/education/EducationCard';
import educationTestImg from '@/assets/images/education_test.png';

export const metadata = { title: '금융 교육' };

async function getPrograms() {
  return [
    {
      href: '/education/1',
      imageUrl: educationTestImg,
      title: '1사1교',
      subtitle: '금융교육 프로그램 안내문',
      dateRange: '8/25 ~ 9/15 (월) 15:00',
      location: '오뉴 인사동',
      badge: '모집중',
    },
    {
      href: '/education/2',
      imageUrl: educationTestImg,
      title: '글로벌 금융체험',
      subtitle: '체험형 금융교육',
      dateRange: '9/20 (금) 14:00',
      location: '하나금융 교육센터',
    },
    {
      href: '/education/3',
      imageUrl: educationTestImg,
      title: '디지털 금융 리터러시',
      subtitle: 'MZ 맞춤 금융스쿨',
      dateRange: '상시',
      location: '온라인 라이브',
      badge: 'NEW',
    },
  ];
}

export default async function EducationPage() {
  const programs = await getPrograms();

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {programs.map((p) => (
            <EducationCard key={p.href} {...p} />
          ))}
        </div>
      </section>
    </main>
  );
}
