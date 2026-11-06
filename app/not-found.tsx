import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-[#173F32]/15 p-8 sm:p-10 text-center shadow-xs space-y-5">
          <span className="text-4xl font-mono font-bold text-[#173F32] block">
            404
          </span>

          <div className="space-y-2">
            <h1 className="text-xl font-bold text-[#173F32]">Property or Page Not Found</h1>
            <p className="text-xs text-[#5C6E66] leading-relaxed">
              The property listing, page, or document reference you requested could not be located.
              It may have been sold, archived, or the URL might have been mistyped.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/properties"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5 text-[#D8C5A2]" />
              <span>Browse Properties</span>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#FAF8F2] hover:bg-[#EAE7DF] text-[#173F32] border border-[#173F32]/20 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
