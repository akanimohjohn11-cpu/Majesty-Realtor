import { UserSession } from './types';

export const ADMIN_COOKIE_NAME = 'majesty_admin_session';

// Master administrative password requested by user
export const ADMIN_MASTER_PASSWORD = 'Herkan007';

// Primary default administrative account
export const DEFAULT_ADMIN: UserSession = {
  id: 'usr-admin-1',
  email: 'admin@majestyrealty.ng',
  full_name: 'Majesty Executive Administrator',
  role: 'super_admin',
};

/**
 * Encode user session into a base64 token
 */
export function createAdminToken(user: UserSession = DEFAULT_ADMIN): string {
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(JSON.stringify(user))));
  }
  return Buffer.from(JSON.stringify(user)).toString('base64');
}

/**
 * Parse base64 token back into a UserSession object
 */
export function parseAdminToken(token: string): UserSession | null {
  if (!token) return null;
  try {
    const raw = decodeURIComponent(token.trim());
    let jsonStr: string;
    if (typeof window !== 'undefined') {
      jsonStr = decodeURIComponent(escape(atob(raw)));
    } else {
      jsonStr = Buffer.from(raw, 'base64').toString('utf-8');
    }
    const parsed = JSON.parse(jsonStr) as UserSession;
    if (parsed && (parsed.role === 'admin' || parsed.role === 'super_admin' || parsed.id)) {
      return parsed;
    }
  } catch {
    try {
      const parsed = JSON.parse(token) as UserSession;
      if (parsed && (parsed.role === 'admin' || parsed.role === 'super_admin' || parsed.id)) {
        return parsed;
      }
    } catch {}
  }
  return null;
}
