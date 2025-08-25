// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('회원가입 요청:', body);
  return NextResponse.json({
    code: 200,
    message: '회원가입이 완료되었습니다.',
  });
}
