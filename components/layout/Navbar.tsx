'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

import BrandLogo from '@/components/brand/BrandLogo';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'Sell / List', href: '/sell-your-property' },
    { name: 'Investment', href: '/investment' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/properties') {
      return pathname.startsWith('/properties');
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D4A36] text-[#FAF9F6] border-b border-[#DFBE6C]/20 shadow-md backdrop-blur-md">
      {/* Top Utility Announcement Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 lg:px-12 py-2 text-xs text-[#DFBE6C] border-b border-white/10 bg-[#093527]/60">
        <div className="flex items-center gap-6">
          <span className="font-medium">CAC Reg: RC 1849204 · Lagos & Abuja Prime Corridor</span>
          <span className="text-[#FAF9F6]/70">Office Hours: Mon – Sat (8:00 AM – 6:00 PM)</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="tel:+2347089581351"
            className="hover:text-white transition-colors flex items-center gap-1.5 font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>0708 958 1351</span>
          </a>
          <a
            href="https://wa.me/2347089581351"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5 font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones, gap-8 */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-12 py-3.5">
        {/* Zone 1: Brand Insignia & Regal Wordmark */}
        <BrandLogo href="/" size="md" variant="light" />

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#F5EEDB]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-[#DFBE6C] transition-colors whitespace-nowrap shrink-0 relative py-1 text-xs uppercase tracking-wider ${
                isActive(link.href)
                  ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#DFBE6C]'
                  : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-md transition-all whitespace-nowrap shrink-0 shadow-md font-semibold"
          >
            Schedule Consultation
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-[#F5EEDB] hover:text-white focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0D4A36] border-t border-[#DFBE6C]/20 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm uppercase tracking-wider font-medium py-1.5 ${
                  isActive(link.href) ? 'text-[#DFBE6C] font-semibold' : 'text-[#FAF9F6]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 space-y-3">
            <a
              href="https://wa.me/2347089581351"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs uppercase tracking-wider font-semibold text-white bg-[#093527] rounded-md"
            >
              <MessageSquare className="w-4 h-4 text-[#DFBE6C]" />
              WhatsApp: 0708 958 1351
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-[#DFBE6C] rounded-md"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
