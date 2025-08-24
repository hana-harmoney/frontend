'use client';
import Badge from '@/components/common/badge';
const JobsPage = () => {
  const gun = () => {
    console.log('gml');
  };
  const badgeData = [
    { text: '전체', active: true },
    { text: '요리', active: false },
    { text: '육아', active: false },
    { text: '농협', active: false },
    { text: '청소', active: false },
    { text: '기술', active: false },
    { text: '기타', active: false },
  ];
  return (
    <div className="flex flex-col items-center gap-9 border px-6 py-3">
      <div className="grid grid-cols-4 gap-3">
        {badgeData.map((item) => (
          <Badge
            key={item.text}
            active={item.active}
            text={item.text}
            onClick={() => console.log(item.text)}
          />
        ))}
      </div>
      <div></div>
    </div>
  );
};
export default JobsPage;
