import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InvestmentRoiCalculator from '@/components/investment/InvestmentRoiCalculator';
import Link from 'next/link';
import { TrendingUp, Sparkles, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Real Estate Investment Advisory in Nigeria | Majesty Realty',
  description:
    'Institutional-grade property investment advisory in Lagos and Abuja. Capital appreciation strategies, buy-to-let yields, land banking, and due diligence.',
};

export default function InvestmentPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D4A36]/10 text-[#0D4A36] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Wealth Preservation & Yield Strategy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0D4A36]">
            Nigerian Real Estate Investment Advisory
          </h1>
          <p className="text-sm text-[#5B6F66] mt-3 leading-relaxed">
            Real estate in Nigeria remains one of the most effective hedges against inflation and currency
            depreciation when executed with rigorous due diligence. We structure, acquire, and manage
            high-performing portfolios for family offices, executives, and diaspora investors.
          </p>
        </div>

        {/* Investment Calculator Stage */}
        <div className="mb-16">
          <InvestmentRoiCalculator />
        </div>

        {/* Core Investment Strategies */}
        <div className="mb-16 space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D4A36]">
              Three Proven Allocation Strategies
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6F66] mt-1">
              Engineered for balanced liquidity, capital appreciation, and passive rental returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'High-Demand Buy-to-Let',
                corridor: 'Lekki Phase 1, Victoria Island & Ikoyi',
                yieldRate: '7% – 12% Annual Net Yield',
                desc: 'Acquiring premium 2 to 4-bedroom serviced duplexes or penthouses with high corporate tenant occupancy and prompt annual rental turnover.',
              },
              {
                title: 'Corridor Land Banking',
                corridor: 'Lekki-Epe Expressway & Abuja Guzape',
                yieldRate: '18% – 30% Capital Growth CAGR',
                desc: 'Strategic acquisition of titled dry land with Governor’s Consent ahead of major infrastructure (airports, deep seaports, corporate logistics corridors).',
              },
              {
                title: 'Commercial Headquarter Leases',
                corridor: 'Victoria Island & Central Business District Abuja',
                yieldRate: 'Long-Term 3 to 5-Year Institutional Tenancies',
                desc: 'Grade-A office floors let to multinationals and blue-chip corporations with structured triennial rent escalations and full service charges.',
              },
            ].map((strat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#DFBE6C]/30 space-y-3 shadow-sm hover:border-[#D4AF37] transition-all">
                <span className="text-[11px] font-mono font-bold text-[#D4AF37] block">Strategy 0{i + 1}</span>
                <h3 className="text-base font-bold text-[#0D4A36]">{strat.title}</h3>
                <div className="text-xs text-[#0D4A36] font-semibold bg-[#FAF9F6] p-2 rounded-lg border border-[#0D4A36]/10">
                  {strat.yieldRate}
                </div>
                <p className="text-xs text-[#5B6F66] leading-relaxed">{strat.desc}</p>
                <div className="pt-2 text-[11px] text-[#1E332B] font-medium border-t border-[#0D4A36]/10">
                  Prime Focus: {strat.corridor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diaspora Advisory Note */}
        <div className="bg-gradient-to-r from-[#0D4A36] via-[#0F5B41] to-[#0D4A36] text-[#FAF9F6] p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#DFBE6C]/30 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-white">Investing From the Nigerian Diaspora?</h3>
            <p className="text-xs md:text-sm text-[#F5EEDB]/85 mt-2 leading-relaxed">
              We represent hundreds of Nigerians in the UK, USA, Canada, and Europe. Benefit from video inspections,
              direct attorney-client escrow, independent surveyor verification, and verified registration at the
              Lands Bureau without relying on unvetted family intermediaries.
            </p>
          </div>
          <a
            href="https://wa.me/2347089581351?text=Hello%20Majesty%20Realty%2C%20I%20am%20a%20diaspora%20investor%20and%20would%20like%20to%20discuss%20portfolio%20opportunities."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-xl transition-all shrink-0 flex items-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Diaspora Advisory Desk</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
