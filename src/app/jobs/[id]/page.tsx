import JobsProfileTest from '@/assets/images/jobs-profile-test.svg';
import Badge from '@/components/common/badge';
import Pin from '@/assets/icons/pin.svg';
import Dollar from '@/assets/icons/dollar.svg';
const JobDetailPage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-5 border">
      <div className=""></div> {/* 슬라이더 */}
      <div className="flex w-full flex-col gap-5 border border-blue-950 px-6">
        <div className="flex items-center gap-3 border border-red-700 text-xl font-semibold">
          <JobsProfileTest className="h-12 w-12" />
          <div className="flex flex-col">
            <div className="flex items-end gap-1">
              <span className="text-2xl">작성자 이름</span>
              <span className="text-hana-green">Lv.6</span>
            </div>
            마포구 공덕동
          </div>
        </div>
        <div className="flex w-full flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold">사무실 청소</span>
            <Badge active={true} text={'요리'} />
          </div>
          <span className="text-xl font-semibold">
            소규모 사무실 청소 업무입니다. 주 3회, 오전 시간대 근무 가능하신 분.
          </span>
        </div>
        <div className="flex flex-col gap-1 border border-yellow-900">
          <div className="flex items-center gap-2">
            <Pin /> 마포구 공덕동
          </div>
          <div className="flex items-center gap-2">
            <Dollar /> 시급 <span className="text-main font-bold">15,000</span>
            원
          </div>
        </div>
        <div className="flex flex-col border border-red-700 text-2xl">장소</div>
      </div>
    </div>
  );
};
export default JobDetailPage;
