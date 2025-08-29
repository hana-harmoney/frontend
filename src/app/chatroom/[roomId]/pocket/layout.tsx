import Header from '@/components/common/header';

export default function ChatPocketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header title="주머니로 옮기기" centerTitle={false} />
      {children}
    </div>
  );
}
