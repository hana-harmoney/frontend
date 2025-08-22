import Jobs from '@/assets/images/jobs.svg';
import Badge from '@/components/common/badge';
import Pin from '@/assets/icons/pin.svg';
import Dollar from '@/assets/icons/dollar.svg';
const Card = () => {
  return (
    <div className="border-teduri flex flex-col rounded-2xl">
      <div className="border-bottom border-teduri flex items-center justify-center">
        <Jobs width={32} height={32} fill="currentColor" />
      </div>
      <div className="flex flex-col gap-9 px-3 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Badge active={true} text={'요리'} />
            <span className="text-gray text-2xl font-semibold">2 시간 뒤</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-text">
              가정에서 건강한 집밥 요리를 도와주실 분을 찾습니다. 한식 위주로
              2-3시간 근무.
            </span>
            <div className="flex items-center gap-2 text-black">
              <Pin width={24} height={24} /> 성동구 성동구 성수동
            </div>
            <div className="flex items-center gap-2 text-black">
              <Dollar width={22} height={22} className="border" /> 시급 15,000
              원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
