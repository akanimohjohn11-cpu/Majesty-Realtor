import { NextResponse } from 'next/server';
import { clearAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST() {
  await clearAdminSession();
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    path: '/',
    maxAge: 0,
    sameSite: 'none',
    secure: true,
  });

  return response;
}
