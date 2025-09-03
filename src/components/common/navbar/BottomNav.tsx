'use client';
import HomeIcon from '@/assets/icons/home.svg';
import JobIcon from '@/assets/icons/job.svg';
import ChatIcon from '@/assets/icons/chat.svg';
import EducationIcon from '@/assets/icons/education.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import BottomNavButton from './BottomNavTab';
import { usePathname } from 'next/navigation';
const navItems = [
  { key: 'home', label: '홈', path: '/home', Icon: HomeIcon },
  { key: 'jobs', label: '구직', path: '/jobs', Icon: JobIcon },
  { key: 'chat', label: '채팅', path: '/chat', Icon: ChatIcon },
  { key: 'education', label: '교육', path: '/education', Icon: EducationIcon },
  { key: 'profile', label: '내정보', path: '/profile', Icon: ProfileIcon },
] as const;
const HIDDEN_NAVBAR_PATHS = [
  '/auth',
  '/chatroom',
  '/profile/new',
  '/profile/delegate',
];
export default function BottomNav() {
  const pathname = usePathname();
  if (
    pathname === '/' ||
    HIDDEN_NAVBAR_PATHS.some((path) => pathname.startsWith(path))
  )
    return null;
  return (
    <nav>
      <div className="h-28" />
      <div className="border-hanagreen-normal fixed right-0 bottom-0 left-0 z-50 border-t-[1px] bg-white pt-3 pb-5">
        <div className="frame-container">
          {/* 각 버튼이 너비를 균등하게 차지 */}
          <div className="flex items-stretch">
            {navItems.map(({ key, label, path, Icon }) => (
              <div key={key} className="flex-1">
                <BottomNavButton label={label} path={path} Icon={Icon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
