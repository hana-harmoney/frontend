import Header from '@/components/common/header';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="내 정보" centerTitle={false} showBackButton={false} />
      {children}
    </div>
  );
}
