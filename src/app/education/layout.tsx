import Header from '@/components/common/header';

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="교육" centerTitle={false} showBackButton={false} />
      {children}
    </div>
  );
}
