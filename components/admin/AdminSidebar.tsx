'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Building2,
  PlusCircle,
  MessageSquare,
  CalendarCheck,
  Send,
  BarChart3,
  Settings,
  LayoutDashboard,
  ExternalLink,
} from 'lucide-react';

import BrandLogo from '@/components/brand/BrandLogo';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Overview', href: '/admin/overview', icon: LayoutDashboard },
    { label: 'All Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Add New Property', href: '/admin/properties/new', icon: PlusCircle },
    { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
    { label: 'Viewing Requests', href: '/admin/viewings', icon: CalendarCheck },
    { label: 'Owner Submissions', href: '/admin/submissions', icon: Send },
    { label: 'Traffic & Conversion', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0D4A36] text-[#FAF9F6] flex flex-col shrink-0 border-r border-[#DFBE6C]/20 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10">
        <BrandLogo href="/admin/overview" size="sm" variant="light" />
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#DFBE6C] bg-[#093527] px-2 py-0.5 rounded mt-2 inline-block border border-[#DFBE6C]/20">
          Admin Management Portal
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="p-4 space-y-1.5 flex-1">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin/overview' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#093527] text-white border-l-2 border-[#DFBE6C] shadow-xs'
                  : 'text-[#F5EEDB]/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#DFBE6C]' : 'text-[#F5EEDB]/60'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Public Website Link */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#F5EEDB]/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#DFBE6C]" />
        </Link>
      </div>
    </aside>
  );
}
