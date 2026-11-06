import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SellPropertyForm from '@/components/forms/SellPropertyForm';
import { ShieldCheck, Eye, Users, FileText, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Sell or List Your Property in Nigeria | Majesty Realty',
  description:
    'List your residential duplex, luxury apartment, commercial building, or land with Majesty Realty and Construction. Connect directly with qualified buyers and corporate tenants.',
};

export default function SellYourPropertyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D4A36]/10 text-[#0D4A36] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Owner & Landlord Representation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D4A36]">
            List Your Property With Majesty Realty
          </h1>
          <p className="text-sm text-[#5B6F66] mt-3 leading-relaxed">
            Position your real estate asset before verified high-net-worth Nigerian home seekers,
            diaspora investors, and multinational corporate occupiers. Complete the confidential listing
            submission below to begin our advisory appraisal.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              icon: Eye,
              title: 'Qualified Exposure',
              desc: 'Targeted marketing directly to verified buyers with ready funds, eliminating tire-kickers.',
            },
            {
              icon: ShieldCheck,
              title: 'Title Integrity Shield',
              desc: 'We safeguard your documents and ensure prospective buyers are vetted prior to inspections.',
            },
            {
              icon: FileText,
              title: 'Professional Conveyancing',
              desc: 'Standardized legal documentation prepared in compliance with state property laws.',
            },
            {
              icon: Users,
              title: 'Accompanied Inspections',
              desc: 'Zero unannounced visits. A dedicated licensed Majesty broker conducts every inspection.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#DFBE6C]/30 shadow-xs hover:border-[#D4AF37] transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] mb-3 shadow-xs">
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h2 className="text-xs font-bold text-[#0D4A36] mb-1">{item.title}</h2>
                <p className="text-[11px] text-[#5B6F66] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Owner Submission Form */}
        <div className="max-w-4xl">
          <SellPropertyForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
