import Header from '@/components/common/header';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col">
      <Header title="채팅" centerTitle={false} showBackButton={false} />
      {children}
    </div>
  );
}
