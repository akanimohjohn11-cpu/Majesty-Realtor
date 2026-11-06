import { cookies } from 'next/headers';
import { UserSession } from './types';
import {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  parseAdminToken,
  DEFAULT_ADMIN,
  ADMIN_MASTER_PASSWORD,
} from './auth-shared';

export {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  parseAdminToken,
  DEFAULT_ADMIN,
  ADMIN_MASTER_PASSWORD,
};

/**
 * Verify administrative session from server cookies
 */
export async function getAdminSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return null;
    }

    return parseAdminToken(sessionToken);
  } catch (err) {
    return null;
  }
}

/**
 * Set administrative session cookie (called upon valid password entry)
 */
export async function setAdminSession(user: UserSession = DEFAULT_ADMIN): Promise<string> {
  const token = createAdminToken(user);
  try {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'none',
      secure: true,
      httpOnly: false, // allow client-side hydration in iframes
    });
  } catch (err) {
    // Ignore if called in context where cookies can't be set directly
  }
  return token;
}

/**
 * Clear administrative session
 */
export async function clearAdminSession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
  } catch (err) {}
}
