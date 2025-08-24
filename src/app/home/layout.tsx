import Header from '@/components/common/header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="홈" centerTitle={false} showBackButton={false} />
      {children}
    </div>
  );
}
