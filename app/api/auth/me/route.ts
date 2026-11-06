import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminSession,
  parseAdminToken,
  ADMIN_COOKIE_NAME,
  createAdminToken,
  DEFAULT_ADMIN,
} from '@/lib/auth';

export async function GET(req: NextRequest) {
  // Check cookie first
  let session = await getAdminSession();

  // Fallback: check Authorization header
  if (!session) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      session = parseAdminToken(token);
    }
  }

  // Fallback: check query parameter
  if (!session) {
    const tokenParam = req.nextUrl.searchParams.get('token');
    if (tokenParam) {
      session = parseAdminToken(tokenParam);
    }
  }

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const token = createAdminToken(session);
  const response = NextResponse.json({ authenticated: true, user: session, token });

  // Re-confirm cookie
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'none',
    secure: true,
    httpOnly: false,
  });

  return response;
}
