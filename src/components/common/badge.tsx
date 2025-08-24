'use client';
// 사용방법
// <Badge active={true} text="전체" onClick={() => console.log('gun')} />

type BadgeProps = {
  active: boolean;
  text: string;
  onClick: () => void;
};
const Badge = ({ active, text, onClick }: BadgeProps) => {
  return (
    <div
      className={`${active ? 'bg-main text-white' : 'bg-gray-3 text-subtitle'} max-w-20 rounded-3xl px-5 py-1 font-semibold`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
export default Badge;
