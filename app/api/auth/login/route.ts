import { NextRequest, NextResponse } from 'next/server';
import {
  setAdminSession,
  DEFAULT_ADMIN,
  ADMIN_MASTER_PASSWORD,
  createAdminToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';
import { getSupabaseServerClient, isServerSupabaseConfigured } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = body.password?.trim();

    if (!password) {
      return NextResponse.json({ error: 'Security password is required.' }, { status: 400 });
    }

    // Direct password match for Herkan007
    if (
      password === ADMIN_MASTER_PASSWORD ||
      password === 'Herkan007' ||
      password.toLowerCase() === 'herkan007' ||
      password === 'MajestyAdmin2026!'
    ) {
      const sessionUser = {
        ...DEFAULT_ADMIN,
        email: body.email?.trim() || 'admin@majestyrealty.ng',
      };
      const token = createAdminToken(sessionUser);
      await setAdminSession(sessionUser);

      const response = NextResponse.json({
        success: true,
        user: sessionUser,
        token,
      });

      // Explicitly set cookie header on the response object
      response.cookies.set(ADMIN_COOKIE_NAME, token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'none',
        secure: true,
        httpOnly: false,
      });

      return response;
    }

    // Supabase fallback if configured and email provided
    if (body.email) {
      const supabase = getSupabaseServerClient();
      if (isServerSupabaseConfigured && supabase) {
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: body.email.toLowerCase().trim(),
            password,
          });

          if (!authError && authData.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authData.user.id)
              .single();

            const role = profile?.role || 'admin';
            const sessionUser = {
              id: authData.user.id,
              email: authData.user.email || body.email,
              full_name: profile?.full_name || 'Admin',
              role: role as any,
            };

            const token = createAdminToken(sessionUser);
            await setAdminSession(sessionUser);

            const response = NextResponse.json({
              success: true,
              user: sessionUser,
              token,
            });

            response.cookies.set(ADMIN_COOKIE_NAME, token, {
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
              sameSite: 'none',
              secure: true,
              httpOnly: false,
            });

            return response;
          }
        } catch (err) {
          console.warn('Supabase auth attempt error:', err);
        }
      }
    }

    // Return generic error without leaking password
    return NextResponse.json({ error: 'Incorrect security password. Access denied.' }, { status: 401 });
  } catch (error) {
    console.error('API /api/auth/login error:', error);
    return NextResponse.json({ error: 'Login authentication failed.' }, { status: 500 });
  }
}
