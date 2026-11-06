'use client';

import { useRouter } from 'next/navigation';
import { LogOut, UserCheck } from 'lucide-react';
import { UserSession } from '@/lib/types';

interface AdminHeaderProps {
  user?: UserSession | null;
  title?: string;
  subtitle?: string;
}

export default function AdminHeader({
  user,
  title = 'Administrator Console',
  subtitle = 'Manage live property inventory, viewing requests, and inbound leads.',
}: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('majesty_admin_session');
          localStorage.removeItem('majesty_admin_user');
          document.cookie = 'majesty_admin_session=; path=/; max-age=0; SameSite=None; Secure';
        } catch {}
        window.location.href = '/admin/login';
      }
    }
  };

  return (
    <header className="bg-white border-b border-[#0D4A36]/10 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#0D4A36]">{title}</h1>
        {subtitle && <p className="text-xs text-[#5B6F66] mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2 text-xs text-[#1E332B] bg-[#FAF9F6] px-3.5 py-1.5 rounded-lg border border-[#0D4A36]/10 shadow-xs">
          <UserCheck className="w-3.5 h-3.5 text-[#0D4A36]" />
          <span className="font-semibold">{user?.email || 'admin@majestyrealty.ng'}</span>
          <span className="text-[10px] uppercase font-bold text-[#0D4A36] bg-[#DFBE6C]/30 px-2 py-0.5 rounded-full">
            {user?.role || 'super_admin'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 hover:text-white hover:bg-red-600 rounded-lg transition-colors border border-red-200 hover:border-red-600"
          title="Log out of admin session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
