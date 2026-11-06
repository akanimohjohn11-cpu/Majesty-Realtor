'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronDown, MessageSquare, Sparkles } from 'lucide-react';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the difference between a Governor’s Consent and a Certificate of Occupancy (C of O)?',
      a: 'A Certificate of Occupancy (C of O) is the initial official title document granted by the State Governor confirming that the applicant is the officially recognized leaseholder of the land for a 99-year term. When that property is subsequently sold or transferred to a new buyer, the Land Use Act requires that the State Governor grant consent to the transaction. That document is the Governor’s Consent. Both are premier, verifiable titles at the State Lands Bureau.',
    },
    {
      q: 'How does Majesty Realty verify a property before listing it?',
      a: 'We conduct a mandatory 4-stage due diligence audit: (1) Root of title search at the State Lands Bureau to confirm registered owners and detect any mortgages or court lis pendens; (2) Physical survey charting by registered surveyors to ensure beacon coordinates fall outside government committed acquisitions or road setbacks; (3) Physical structural walk-through inspection; and (4) Valuation benchmarking against prevailing neighborhood sales.',
    },
    {
      q: 'Can Nigerians living in the diaspora safely purchase property through Majesty Realty?',
      a: 'Yes. Over 40% of our residential clients reside in the diaspora (UK, US, Canada, Europe, UAE). We provide high-definition video walkthrough inspections, independent surveyor coordinates, virtual contract execution, and secure client-attorney escrow accounts. Registered title deeds and original keys are securely dispatched via tracked courier (DHL) or handed to designated legal proxies.',
    },
    {
      q: 'What are the standard transaction and statutory closing fees in Nigerian property transactions?',
      a: 'Standard closing costs typically encompass: (1) Professional Real Estate Agency Fee (typically 5% of purchase price for sales, 10% for annual rentals); (2) Legal Documentation & Conveyancing Fee (typically 5% for drafting Deed of Assignment and contract of sale); and (3) State Government statutory perfection fees (Stamp Duty, Capital Gains Tax, and Governor’s Consent application fees). All costs are disclosed upfront in writing.',
    },
    {
      q: 'How are physical viewing inspections scheduled?',
      a: 'Physical inspections can be booked directly through any property detail page using the "Schedule a Viewing" button, or via our WhatsApp desk at 07089581351. Due to security clearances in gated estates (Banana Island, Maitama, Lekki Phase 1), we require at least 24 hours advance notice to arrange gate passes and ensure accompanied access.',
    },
    {
      q: 'What is included in Majesty Realty’s property management service for landlords?',
      a: 'Our property management service covers: rigorous tenant screening (employment and financial vetting), standardized lease agreements, timely annual rent collection and direct remittance, proactive preventive maintenance oversight, 24/7 emergency dispatch, and quarterly condition inspection reports.',
    },
    {
      q: 'What does "Dry Land" vs "Reclaimed Land" mean in Lagos real estate?',
      a: 'Dry land refers to firm, natural ground with high load-bearing capacity that does not require sand-filling, raft piling, or extensive stabilization. Reclaimed land has been dredged from water bodies or wetlands. While both can support high-value construction when engineered properly, dry land significantly reduces foundation and piling costs.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D4A36]/10 text-[#0D4A36] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Knowledge Base & Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D4A36]">
            Frequently Asked Real Estate Questions
          </h1>
          <p className="text-sm text-[#5B6F66] mt-3 leading-relaxed">
            Essential guidance on Nigerian land title documents, due diligence procedures, diaspora acquisitions,
            and tenancy management.
          </p>
        </div>

        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#DFBE6C]/30 overflow-hidden shadow-xs hover:border-[#D4AF37] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-bold text-[#0D4A36] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#1E332B] leading-relaxed border-t border-[#0D4A36]/8 bg-[#FAF9F6]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Further Consultation Card */}
        <div className="mt-14 max-w-4xl bg-gradient-to-r from-[#0D4A36] via-[#0F5B41] to-[#0D4A36] text-[#FAF9F6] p-8 md:p-10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#DFBE6C]/30 shadow-xl">
          <div>
            <h3 className="text-xl font-bold text-white">Have a Specific Title or Property Query?</h3>
            <p className="text-xs sm:text-sm text-[#F5EEDB]/80 mt-1">
              Our real estate conveyancing and advisory team is available to examine documents and review survey plans.
            </p>
          </div>
          <a
            href="https://wa.me/2347089581351?text=Hello%20Majesty%20Realty%2C%20I%20have%20a%20question%20regarding%20property%20title%20verification."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] text-[#0D4A36] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shrink-0 flex items-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Advisor</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
