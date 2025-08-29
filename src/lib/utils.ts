import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fetchProfileResponse } from '@/types/profile';
import toast from 'react-hot-toast';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// jobs
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ko-KR');
};

// terms data
export const termsData = [
  {
    title: '서비스 이용 약관 동의 (필수)',
    subtitle: '하나 하모니 서비스 이용을 위한 기본 약관입니다.',
    contents: [
      '수집 항목: 성명, CI/DI, 생년월일, ISA 계좌 번호 등...',
      '이용 목적: 챌린지 운영, 보상 산정 등...',
      '이용 목적: 제3자 제공 및 서비스 개선 목적...',
      '회원은 “ISA 계좌 연결 해제” 메뉴로 언제든 동의를 철회할 수 있으며 즉시 계좌 조회·거래 위임이 중단되고 챌린지 참여·보상이 제한됩니다.',
    ],
  },
  {
    title: '개인정보 활용 동의서 약관 (필수)',
    subtitle: '개인정보 수집 및 이용에 대한 동의입니다.',
    contents: [
      '수집 항목: 이름, 연락처, 주소 등...',
      '보관 기간: 회원 탈퇴 시까지 또는 법령이 정한 기간',
    ],
  },
  {
    title: '마이데이터 활용 동의서 약관 (필수)',
    subtitle: '금융 정보 연계 및 맞춤형 서비스 제공을 위한 동의입니다.\n',
    contents: [
      '수집 항목: 성명, CI/DI, 생년월일, ISA 계좌 번호 등...',
      '이용 목적: 챌린지 운영, 보상 산정 등...',
      '제공 범위: 금융기관 및 제휴사와의 정보 연계',
    ],
  },
  {
    title: '계좌(베이스 봉투) 생성 동의 (필수)',
    subtitle: '하나은행 연계 계좌와 기본 저축 봉투를 생성합니다.',
    contents: [
      '수집 항목: 성명, CI/DI, 생년월일, ISA 계좌 번호 등...',
      '이용 목적: 챌린지 운영, 보상 산정 등...',
      '계좌 생성: 계좌 생성 시 필수 인증 절차 진행',
    ],
  },
  {
    title: '마케팅 정보 수신 동의 (선택)',
    subtitle: '새로운 일자리와 혜택 정보를 받아보실 수 있습니다.',
    contents: [
      '수집 항목: 성명, CI/DI, 생년월일, ISA 계좌 번호 등...',
      '이용 목적: 챌린지 운영, 보상 산정 등...',
      '기타: 거부 시에도 서비스 기본 기능은 이용 가능합니다.',
    ],
  },
];

export type category = { id: number; text: string };

export const badgeData: category[] = [
  { id: 1, text: '요리' },
  { id: 2, text: '육아' },
  { id: 3, text: '농업' },
  { id: 4, text: '청소' },
  { id: 5, text: '기술' },
  { id: 6, text: '기타' },
];

// profile

export const initialProfile: fetchProfileResponse = {
  user_id: 0,
  nickname: '',
  profile_img:
    'https://harmoneybucket.s3.ap-northeast-2.amazonaws.com/upload/profile/2025/08/22/c47d3582-ef29-4b95-b06e-0fadc5a515d0.jpeg',
  category_ids: [],
  description: '',
  img_url_detail: [],
  trust: 0,
  match_count: 0,
  user_address: '',
};

export const reportReasons = [
  '사기나 허위 요청이에요.',
  '과도한 금액을 요구했어요.',
  '욕설이나 모욕적인 말을 했어요.',
  '위험하거나 불건전한 제안을 했어요.',
  '스팸이나 광고를 보냈어요.',
];

// home
// export const sampleHistories: HistoryProps[] = [
//   {
//     date: '2025.08.20 (수)',
//     histories: [
//       { time: '21:00', title: '베이스 봉투', money: 150000 },
//       { time: '14:30', title: '송유림', money: -50000 },
//       { time: '09:10', title: '교통 봉투', money: 30000 },
//     ],
//   },
//   {
//     date: '2025.08.19 (화)',
//     histories: [
//       { time: '20:15', title: '베이스 봉투', money: 120000 },
//       { time: '11:45', title: '식비 봉투', money: 45000 },
//     ],
//   },
//   {
//     date: '2025.08.18 (월)',
//     histories: [{ time: '18:00', title: '베이스 봉투', money: 200000 }],
//   },
// ];

export const copyAccountNumber = (accountNumber: string) => {
  navigator.clipboard.writeText(accountNumber);
  toast.success('계좌번호가 복사되었습니다.');
};

// error
export const extractErrorMessage = (err: unknown) => {
  if (err instanceof Error) {
    const jsonMatch = err.message.match(/\{[\s\S]*\}$/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed?.message) {
          return parsed.message;
        }
      } catch {}
    }
    return err.message;
  }
};

// education
export const educationData = [
  {
    href: 'https://www.hana1qm.com/web/2758/pdsView.do',
    imageUrl: '/images/education/image1.png',
    topic: '하나더넥스트 LEADERS - Mini-MBA 과정',
    location: '서울 강남구 삼성동',
    meta: {
      participants: '15명',
      time: '9월 1일부터 14:00~16:00',
      period: '3개월간 총 8회차',
    },
  },
  {
    href: 'https://hana1qm.com/web/2691/pdsView.do',
    imageUrl: '/images/education/image2.png',
    topic: '6.27 대출 규제 이후, 부동산 시장은 어떻게 될까요?',
    location: '하나은행 을지로 본점',
    meta: {
      time: '8월 8일(금) 오후2시',
      period: '1시간 30분',
    },
  },
  {
    href: 'https://hana1qm.com/web/2691/pdsView.do',
    imageUrl: '/images/education/image3.png',
    topic: '국민연금 얼마나 알고 있니?',
    location: '하나은행 을지로 본점',
    meta: {
      participants: '20명',
      time: '8월 27일 (수) 오후 2시',
      period: '1시간',
    },
  },
  {
    href: 'https://www.easyarum.com/notice/?mod=document&uid=545',
    imageUrl: '/images/education/image4.png',
    topic: '‘눈높이 맞춤형’ 시니어 디지털금융교육',
    location: '신한아름인금융프렌드',
    meta: {
      participants: '30명',
      time: '1회 2시간',
      period: '3월~12월 중 협의',
    },
  },
  {
    href: 'https://www.easyarum.com/notice/?mod=document&uid=519',
    imageUrl: '/images/education/image5.png',
    topic: '디지털 금융범죄 예방 및 대처',
    location: '서울시, 경기도 소재 종합사회복지관, 노인종합사회복지관',
    meta: {
      participants: '2~5명',
      time: '1회 2시간 3주',
      period: '9월1일 ~ 12월 23일',
    },
  },
  {
    href: 'https://50plus.or.kr/education-detail.do?id=44271008',
    imageUrl: '/images/education/image6.png',
    topic: '페이 활용 교육, 금융사기 예방 교육',
    location: '영등포50 플러스 센터',
    meta: {
      participants: '20명',
      time: '2시간, 4회',
      period: '11월4일 ~ 11월 25일',
    },
  },
  {
    href: 'https://excacademy.co.kr/contents/open/513',
    imageUrl: '/images/education/image7.png',
    topic: '은퇴자 진로설계 재취업 과정',
    location: '송파러닝센터, 강남러닝센터',
    meta: {
      participants: '5인 이상 수강신청 시 개설',
      time: '09:00~18:00',
      period: '2일',
    },
  },
  {
    href: '',
    imageUrl: '/images/education/image8.png',
    topic: '하나더넥스트 페스타',
    location: '하나은행 을지로 본점',
    meta: {
      period: '7월 3일 오후 2시',
    },
  },
  {
    href: '',
    imageUrl: '/images/education/image9.png',
    topic: '연금제도 바로 알기',
    location: '수원러닝센터, 강남러닝센터',
    meta: {
      participants: '10인 이상 수강신청 시 개설',
      time: '14:00~17:00',
      period: '2일',
    },
  },
  {
    href: '',
    imageUrl: '/images/education/image10.png',
    topic: '시니어 금융강사 양성 아카데미',
    location: '종로러닝센터, 강서러닝센터',
    meta: {
      participants: '5인 이상 수강신청 시 개설',
      time: '10:00~13:00',
      period: '3일',
    },
  },
  {
    href: '',
    imageUrl: '/images/education/image11.png',
    topic: '시니어를 위한 신용케어 아카데미',
    location: '시니어금융교육협의회',
    meta: {
      participants: '5인 이상 수강신청 시 개설',
      time: '10:00~13:00',
      period: '3일',
    },
  },
];
