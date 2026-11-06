import Link from 'next/link';
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck, ArrowUpRight, Lock } from 'lucide-react';
import BrandLogo from '@/components/brand/BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D4A36] text-[#FAF9F6] border-t border-[#DFBE6C]/20 mt-auto">
      {/* Upper Pre-Footer Call to Action */}
      <div className="border-b border-white/10 py-12 px-6 lg:px-12 bg-[#093527]/70">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#DFBE6C] font-semibold mb-2">
              The Trusted Real Estate Partner
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Ready to make better, verified property decisions in Nigeria?
            </h2>
            <p className="text-sm text-[#F5EEDB]/80 mt-1">
              Connect directly with our senior acquisition and investment advisory desk.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="https://wa.me/2347089581351?text=Hello%20Majesty%20Realty%2C%20I%20would%20like%20to%20speak%20with%20a%20property%20advisor."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-md transition-all flex items-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+2347089581351"
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF9F6] bg-[#093527] border border-[#DFBE6C]/30 rounded-md hover:bg-[#06241a] transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#DFBE6C]" />
              <span>Call: 0708 958 1351</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Column 1: Brand & Regulatory */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo href="/" size="md" variant="light" />
          <p className="text-xs sm:text-sm text-[#F5EEDB]/80 leading-relaxed max-w-sm">
            The Trusted Real Estate Partner for Better Property Decisions. We deliver institutional-grade
            due diligence, verified title verification, residential brokerage, luxury rentals, and commercial
            property management across Nigeria.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-[#DFBE6C]">
            <ShieldCheck className="w-4 h-4 text-[#DFBE6C]" />
            <span>Corporate Affairs Commission (RC: 1849204) · SCUML Compliant</span>
          </div>
        </div>

        {/* Column 2: Properties & Markets */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#DFBE6C]">
            Prime Markets
          </p>
          <ul className="space-y-2 text-xs text-[#F5EEDB]/80">
            <li>
              <Link href="/properties?city=Ikoyi" className="hover:text-white transition-colors">
                Banana Island & Ikoyi
              </Link>
            </li>
            <li>
              <Link href="/properties?city=Victoria+Island" className="hover:text-white transition-colors">
                Victoria Island Commercial
              </Link>
            </li>
            <li>
              <Link href="/properties?city=Lekki" className="hover:text-white transition-colors">
                Lekki Phase 1 Waterfront
              </Link>
            </li>
            <li>
              <Link href="/properties?city=Maitama" className="hover:text-white transition-colors">
                Maitama & Asokoro, Abuja
              </Link>
            </li>
            <li>
              <Link href="/properties?city=Ikeja" className="hover:text-white transition-colors">
                Ikeja GRA Residences
              </Link>
            </li>
            <li>
              <Link href="/properties?category=land" className="hover:text-white transition-colors">
                Epe Growth Corridors (Land)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate & Practice */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#DFBE6C]">
            Practice Areas
          </p>
          <ul className="space-y-2 text-xs text-[#F5EEDB]/80">
            <li>
              <Link href="/services#sales" className="hover:text-white transition-colors">
                Property Sales & Acquisition
              </Link>
            </li>
            <li>
              <Link href="/services#rentals" className="hover:text-white transition-colors">
                Residential Rentals & Leasing
              </Link>
            </li>
            <li>
              <Link href="/services#management" className="hover:text-white transition-colors">
                Full Property Management
              </Link>
            </li>
            <li>
              <Link href="/investment" className="hover:text-white transition-colors">
                Real Estate Investment Advisory
              </Link>
            </li>
            <li>
              <Link href="/sell-your-property" className="hover:text-white transition-colors">
                List / Sell Your Property
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Title Verification & FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Office Coordinates */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider font-semibold text-[#DFBE6C]">
            Lagos Head Office
          </p>
          <div className="space-y-2.5 text-xs text-[#F5EEDB]/80">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#DFBE6C] shrink-0 mt-0.5" />
              <span>Plot 14, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#DFBE6C] shrink-0" />
              <span>+234 708 958 1351 / 0708 958 1351</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#DFBE6C] shrink-0" />
              <span>info@majestyrealty.ng</span>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-xs text-[#DFBE6C] hover:text-white font-medium"
              >
                <span>Interactive Office Map & Hours</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Baseline with Admin Access Portal */}
      <div className="border-t border-white/10 py-6 px-6 lg:px-12 text-xs text-[#F5EEDB]/70 bg-[#093527]/90">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Majesty Realty and Construction. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#DFBE6C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#DFBE6C] transition-colors">
              Terms & Conditions
            </Link>

            {/* Discreet Admin Portal Button at the bottom of the page */}
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0D4A36] text-[#DFBE6C] hover:text-white hover:bg-[#06241a] border border-[#DFBE6C]/25 transition-all text-[11px] font-medium"
              title="Admin Portal Login"
            >
              <Lock className="w-3 h-3 text-[#DFBE6C]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
