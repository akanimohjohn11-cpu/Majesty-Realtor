import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, FileCheck, Users, Scale, MessageSquare, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Majesty Realty & Construction | The Trusted Real Estate Partner',
  description:
    'Learn about Majesty Realty and Construction, our founding mission, real estate brokerage standards, and uncompromising title due diligence across Nigeria.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Header */}
        <section className="bg-gradient-to-br from-[#0D4A36] via-[#0F5B41] to-[#0A3829] text-[#FAF9F6] py-20 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#DFBE6C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFBE6C]/15 border border-[#DFBE6C]/30 text-[#DFBE6C] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Corporate Profile · RC: 1849204</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The Trusted Real Estate Partner for Better Property Decisions.
            </h1>

            <p className="mt-5 text-base md:text-lg text-[#F5EEDB]/90 font-light leading-relaxed">
              Majesty Realty and Construction is a premier Nigerian real estate agency, property management,
              and advisory firm headquartered in Lekki, Lagos. We bring institutional discipline, title clarity,
              and transparency to high-value real estate transactions.
            </p>
          </div>
        </section>

        {/* Founding Philosophy & Market Context */}
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                Our Founding Mandate
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D4A36]">
                Solving the Integrity Gap in Nigerian Real Estate.
              </h2>
              <p className="text-sm text-[#5B6F66] leading-relaxed">
                For too long, acquiring property in Nigeria has been fraught with structural uncertainty:
                undocumented ancestral claims, unregistered survey conflicts, delayed Governor&apos;s Consent,
                and inflated commissions.
              </p>
              <p className="text-sm text-[#5B6F66] leading-relaxed">
                Majesty Realty and Construction was established to provide an unyielding standard of
                fiduciary responsibility. Every property presented on our desk must pass our four-stage
                pre-listing audit before being offered to purchasers, diaspora investors, or corporate occupiers.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/properties"
                  className="px-6 py-3 bg-[#0D4A36] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#093527] transition-all shadow-md"
                >
                  View Verified Portfolio
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-[#0D4A36] border border-[#0D4A36]/20 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#FAF9F6] transition-all"
                >
                  Visit Our Lekki Office
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-[#DFBE6C]/30">
              <Image
                src="/images/property_commercial_victoria_island_1793896820519.jpg"
                alt="Majesty Realty and Construction Corporate Headquarters"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="bg-white py-20 px-6 lg:px-12 border-y border-[#0D4A36]/10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">
                Our Guiding Standards
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0D4A36]">
                Four Non-Negotiable Fiduciary Commitments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Title Verification First',
                  desc: 'We never market or accept deposits on unverified property. We authenticate Governor’s Consent, C of O, Gazette, or registered deeds at the Lands Bureau.',
                },
                {
                  icon: FileCheck,
                  title: 'Survey Coordinate Audit',
                  desc: 'Every parcel is physically charted by registered surveyors to ensure boundaries match government layout charts without road setbacks or acquisitions.',
                },
                {
                  icon: Scale,
                  title: 'Zero Hidden Agency Fees',
                  desc: 'Transparent transaction fees and advisory fee schedules agreed in writing before contract execution.',
                },
                {
                  icon: Users,
                  title: 'Turnkey Asset Stewardship',
                  desc: 'From negotiation and conveyancing to facility maintenance, tenant screening, and rent collection for landlords.',
                },
              ].map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#DFBE6C]/30 shadow-xs hover:border-[#D4AF37] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] mb-4 shadow-xs">
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-sm font-bold text-[#0D4A36] mb-2">{pillar.title}</h3>
                    <p className="text-xs text-[#5B6F66] leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Corporate Trust Credentials Strip */}
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0D4A36] via-[#0F5B41] to-[#0D4A36] text-[#FAF9F6] p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#DFBE6C]/30 shadow-xl">
            <div className="max-w-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Speak With a Registered Real Estate Advisor Today
              </h3>
              <p className="text-xs md:text-sm text-[#F5EEDB]/80 mt-2 leading-relaxed">
                Whether you are an overseas Nigerian planning a safe residential acquisition or an
                institutional firm seeking prime commercial leasing in Lagos or Abuja, our desk is ready.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="https://wa.me/2347089581351?text=Hello%20Majesty%20Realty%2C%20I%20would%20like%20to%20discuss%20a%20property%20matter."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-xl transition-all flex items-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: 0708 958 1351</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
