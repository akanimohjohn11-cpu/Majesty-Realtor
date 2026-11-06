'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserSession } from '@/lib/types';
import { parseAdminToken, DEFAULT_ADMIN } from '@/lib/auth-shared';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayoutShell({
  children,
  title,
  subtitle,
}: AdminLayoutShellProps) {
  const router = useRouter();

  // Synchronously initialize auth from client storage if available to eliminate page-to-page tab flickers
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const localToken = localStorage.getItem('majesty_admin_session');
      if (localToken && parseAdminToken(localToken)) return true;
      const match = document.cookie.match(/majesty_admin_session=([^;]+)/);
      if (match && match[1] && parseAdminToken(decodeURIComponent(match[1]))) return true;
    } catch {}
    return false;
  });

  const [user, setUser] = useState<UserSession>(() => {
    if (typeof window === 'undefined') return DEFAULT_ADMIN;
    try {
      const localToken = localStorage.getItem('majesty_admin_session');
      if (localToken) {
        const parsed = parseAdminToken(localToken);
        if (parsed) return parsed;
      }
      const match = document.cookie.match(/majesty_admin_session=([^;]+)/);
      if (match && match[1]) {
        const parsed = parseAdminToken(decodeURIComponent(match[1]));
        if (parsed) return parsed;
      }
    } catch {}
    return DEFAULT_ADMIN;
  });

  useEffect(() => {
    // If not authenticated from initial state, do client check or route to login
    let token: string | null = null;
    try {
      token = localStorage.getItem('majesty_admin_session');
    } catch {}

    if (!token) {
      try {
        const match = document.cookie.match(/majesty_admin_session=([^;]+)/);
        if (match && match[1]) {
          token = decodeURIComponent(match[1]);
        }
      } catch {}
    }

    const parsed = token ? parseAdminToken(token) : null;
    if (!parsed) {
      router.replace('/admin/login');
    }
  }, [router]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 text-[#1E332B]">
        <div className="w-8 h-8 border-2 border-[#0D4A36]/20 border-t-[#0D4A36] rounded-full animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#5B6F66]">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader user={user} title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
