import Header from '@/components/common/header';

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="구직" centerTitle={false} showBackButton={false} />
      {children}
    </div>
  );
}
