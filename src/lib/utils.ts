import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fetchProfileResponse } from '@/types/profile';

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
