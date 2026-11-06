import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import PropertyCarousel from '@/components/home/PropertyCarousel';
import NeighborhoodsCarousel from '@/components/home/NeighborhoodsCarousel';
import VirtualTourShowcase from '@/components/home/VirtualTourShowcase';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import StatsCounterStrip from '@/components/home/StatsCounterStrip';
import { repository } from '@/lib/db/repository';
import {
  ShieldCheck,
  FileCheck,
  Search,
  Compass,
  ArrowRight,
  MessageSquare,
  Scale,
  Sparkles,
} from 'lucide-react';

export default async function HomePage() {
  const { properties } = await repository.getProperties({ limit: 12 });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO INTERACTIVE SLIDER & MOVING CAROUSEL
            ========================================================================= */}
        <section className="relative">
          <HeroSlider />

          {/* Integrated Interactive Fast-Search Ribbon floating beneath hero */}
          <div className="relative -mt-10 z-20 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-xl border border-[#DFBE6C]/30 text-[#1E332B] backdrop-blur-md">
              <form action="/properties" method="GET" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label htmlFor="hero-q" className="block text-[11px] font-bold uppercase tracking-wider text-[#0D4A36] mb-1">
                    Location or Keyword
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#5B6F66] absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="hero-q"
                      name="q"
                      type="text"
                      placeholder="Ikoyi, Banana Island, Maitama, Lekki..."
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-type" className="block text-[11px] font-bold uppercase tracking-wider text-[#0D4A36] mb-1">
                    Listing Intent
                  </label>
                  <select
                    id="hero-type"
                    name="type"
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6] text-[#1E332B]"
                  >
                    <option value="all">Buy, Rent, or Lease</option>
                    <option value="sale">For Sale (Outright Acquisition)</option>
                    <option value="rent">For Rent (Luxury Residential)</option>
                    <option value="lease">Commercial Lease</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="hero-category" className="block text-[11px] font-bold uppercase tracking-wider text-[#0D4A36] mb-1">
                    Property Category
                  </label>
                  <select
                    id="hero-category"
                    name="category"
                    className="w-full text-xs py-2.5 px-3 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6] text-[#1E332B]"
                  >
                    <option value="all">All Categories</option>
                    <option value="residential">Residential Duplexes & Villas</option>
                    <option value="luxury">Luxury & Penthouses</option>
                    <option value="commercial">Commercial & Offices</option>
                    <option value="land">Plots & Development Land</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#0D4A36] to-[#0F5B41] hover:from-[#093527] hover:to-[#0D4A36] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all shadow-md text-center"
                  >
                    Search Verified Properties
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. STATS & REPUTATION COUNTER STRIP
            ========================================================================= */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
          <StatsCounterStrip />
        </section>

        {/* =========================================================================
            3. FEATURED PROPERTIES SLIDING CAROUSEL
            ========================================================================= */}
        <section className="py-14 px-6 lg:px-12 max-w-7xl mx-auto">
          <PropertyCarousel properties={properties} />
        </section>

        {/* =========================================================================
            4. CINEMATIC VIRTUAL TOURS & AERIAL WALKTHROUGHS
            ========================================================================= */}
        <VirtualTourShowcase />

        {/* =========================================================================
            5. PRIME NEIGHBORHOODS & GROWTH CORRIDORS SPOTLIGHT
            ========================================================================= */}
        <section className="py-14 px-6 lg:px-12 max-w-7xl mx-auto">
          <NeighborhoodsCarousel />
        </section>

        {/* =========================================================================
            6. FIDUCIARY STANDARDS: Honest Due Diligence (Anti-Slop)
            ========================================================================= */}
        <section className="py-16 px-6 lg:px-12 bg-white border-y border-[#0D4A36]/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Integrity & Legal Due Diligence</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0D4A36] text-balance">
                  The Trusted Real Estate Partner for Better Property Decisions.
                </h2>
                <p className="text-xs sm:text-sm text-[#5B6F66] leading-relaxed">
                  Nigerian real estate transactions demand uncompromising legal and physical due diligence.
                  Majesty Realty was founded to eliminate ambiguity, double-allocation risks, and undocumented claims.
                </p>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0D4A36] hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Learn About Our Advisory Principles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'Rigorous Title Verification',
                    desc: 'Every property on our desk undergoes search at the State Lands Bureau and Surveyor-General’s office to verify root of title.',
                  },
                  {
                    icon: FileCheck,
                    title: 'Physical Survey Alignment',
                    desc: 'Coordinates and beacon numbers are physically verified by licensed surveyors prior to transaction documentation.',
                  },
                  {
                    icon: Compass,
                    title: 'Diaspora Buyer Protection',
                    desc: 'Full video inspections, escrow coordination, and certified courier of registered title deeds for overseas investors.',
                  },
                  {
                    icon: Scale,
                    title: 'Clear Financial Transparency',
                    desc: 'Zero concealed agency or legal fees. All legal drafting, stamp duty, and governor consent pathways are mapped upfront.',
                  },
                ].map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className="bg-[#FAF9F6] p-5 rounded-xl border border-[#0D4A36]/10 hover:border-[#D4AF37] transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#0D4A36] shadow-xs mb-3 border border-[#0D4A36]/10">
                        <Icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#0D4A36] mb-1.5">{feat.title}</h3>
                      <p className="text-xs text-[#5B6F66] leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. INTERACTIVE CLIENT STORIES & VERIFIED TESTIMONIALS SLIDER
            ========================================================================= */}
        <TestimonialsCarousel />

        {/* =========================================================================
            7. CONVERSION BANNER: Instant Owner & Buyer Action
            ========================================================================= */}
        <section className="pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0D4A36] via-[#0F5B41] to-[#0D4A36] rounded-2xl text-white p-8 md:p-14 relative overflow-hidden shadow-2xl border border-[#DFBE6C]/30">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DFBE6C] block mb-2">
                Landlord & Investor Gateway
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Have a Property to Sell, Lease, or Manage?
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#F5EEDB]/90 leading-relaxed">
                Connect your prime listing with vetted Nigerian high-net-worth buyers and corporate tenants.
                List your property directly on our platform or consult our asset managers.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/sell-your-property"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-md transition-all shadow-md font-semibold"
                >
                  Submit Your Property Listing
                </Link>

                <a
                  href="https://wa.me/2347089581351?text=Hello%20Majesty%20Realty%2C%20I%20am%20a%20property%20owner%20and%20would%20like%20to%20discuss%20listing%20my%20asset."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-black/35 hover:bg-black/50 rounded-md backdrop-blur-md transition-all flex items-center gap-2 border border-[#DFBE6C]/40"
                >
                  <MessageSquare className="w-4 h-4 text-[#DFBE6C]" />
                  <span>WhatsApp Owner Desk</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
