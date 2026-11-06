import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Home,
  Key,
  Building,
  Wrench,
  TrendingUp,
  ClipboardCheck,
  Compass,
  Megaphone,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

export const metadata = {
  title: 'Real Estate & Property Management Services | Majesty Realty',
  description:
    'Comprehensive Nigerian real estate services: property sales, residential leasing, commercial brokerage, turnkey property management, valuation, and land acquisition.',
};

export default function ServicesPage() {
  const services = [
    {
      id: 'sales',
      icon: Home,
      title: 'Property Sales & Purchase',
      short: 'Buyer & Seller Representation',
      desc: 'Guiding high-net-worth individuals, diaspora investors, and institutions in acquiring prime residential duplexes, luxury penthouses, and executive estates across Lagos and Abuja.',
      deliverables: [
        'Pre-listing title search at State Lands Bureau',
        'Comparative market price analysis (CMA)',
        'Legal conveyancing & Deed of Assignment drafting',
        'Safe transaction escrow coordination',
      ],
    },
    {
      id: 'rentals',
      icon: Key,
      title: 'Residential Rentals & Leasing',
      short: 'Executive & Family Tenancies',
      desc: 'Matching vetted corporate expatriates, professionals, and families with luxury serviced apartments, terrace duplexes, and waterfront homes with 24/7 power and security.',
      deliverables: [
        'Rigorous tenant employment & background screening',
        'Standardized tenancy agreements compliant with state rent laws',
        'Pre-occupancy inventory & condition audit',
        'Service charge schedule coordination',
      ],
    },
    {
      id: 'commercial',
      icon: Building,
      title: 'Commercial Real Estate Brokerage',
      short: 'Offices, Retail & Industrial',
      desc: 'Assisting corporate headquarters, tech hubs, financial institutions, and retail operators in securing prime office floors, plazas, and logistics hubs in Victoria Island, Ikeja, and Abuja.',
      deliverables: [
        'Commercial lease negotiation & rent reviews',
        'Fit-out coordination & technical space planning',
        'Foot-traffic & catchment demographic reports',
        'Zoning & commercial land-use clearance',
      ],
    },
    {
      id: 'management',
      icon: Wrench,
      title: 'Turnkey Property Management',
      short: 'Asset Preservation for Landlords',
      desc: 'Complete property stewardship for resident and overseas landlords. We maintain 98%+ occupancy rates, handle routine maintenance, and ensure prompt net rent remittances.',
      deliverables: [
        'Prompt annual rent collection & debt recovery',
        'Routine facility maintenance & vendor oversight',
        '24/7 tenant dispute & emergency dispatch',
        'Quarterly property physical condition & financial reports',
      ],
    },
    {
      id: 'investment',
      icon: TrendingUp,
      title: 'Real Estate Investment Advisory',
      short: 'Capital Growth & High-Yield Strategy',
      desc: 'Advising family offices and private investors on high-yield opportunities, off-plan vs completed appraisal, buy-to-let rental yields, and inflation-hedged land banking.',
      deliverables: [
        'Internal Rate of Return (IRR) & cash yield modeling',
        'Corridor growth trajectory analysis (Lekki-Epe, Abuja Guzape)',
        'Developer track-record & escrow verification',
        'Exit strategy & asset re-allocation planning',
      ],
    },
    {
      id: 'valuation',
      icon: ClipboardCheck,
      title: 'Valuation & Inspection Coordination',
      short: 'Accurate Asset Worth & Integrity',
      desc: 'Coordinating independent chartered surveyors (NIESV/ESVARBON) for bank financing, probate, probate valuation, asset revaluation, and structural integrity walk-throughs.',
      deliverables: [
        'Physical structural condition & dampness inspection',
        'Open market valuation (OMV) certificates',
        'Forced sale value (FSV) calculations for collateral',
        'Reinstatement cost assessments for insurance',
      ],
    },
    {
      id: 'land',
      icon: Compass,
      title: 'Land & Development Opportunities',
      short: 'Titled Plots for Private & Commercial Build',
      desc: 'Sourcing 100% dry, table surface land plots with verified Certificate of Occupancy (C of O), Governor’s Consent, and government gazettes along booming growth axes.',
      deliverables: [
        'Charting against the master layout & government acquisition zones',
        'Perimeter beacon verification with registered surveyors',
        'Topography, soil test & drainage feasibility assistance',
        'Governor’s Consent processing facilitation',
      ],
    },
    {
      id: 'marketing',
      icon: Megaphone,
      title: 'Strategic Property Marketing',
      short: 'High-Impact Media & Lead Generation',
      desc: 'Positioning premier properties through professional architectural photography, cinematic video walk-throughs, targeted digital reach, and our private network of qualified buyers.',
      deliverables: [
        'High-resolution architectural photography',
        '4K video walk-through tours for diaspora buyers',
        'Targeted digital campaigns across verified investor networks',
        'Exclusive private viewing previews',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1">
        {/* Services Hero */}
        <section className="bg-gradient-to-br from-[#0D4A36] via-[#0F5B41] to-[#0A3829] text-[#FAF9F6] py-20 px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#DFBE6C]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto max-w-3xl relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#DFBE6C] mb-3">
              Practice Disciplines
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Comprehensive Real Estate & Property Stewardship
            </h1>
            <p className="mt-4 text-base md:text-lg text-[#F5EEDB]/90 font-light leading-relaxed">
              From individual luxury residential acquisitions to full commercial portfolio management,
              we deliver verified solutions built on integrity, market intelligence, and legal precision.
            </p>
          </div>
        </section>

        {/* Services Detailed Grid */}
        <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="bg-white rounded-2xl border border-[#DFBE6C]/30 p-8 shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] text-[#0D4A36] flex items-center justify-center border border-[#0D4A36]/10 shadow-xs">
                        <Icon className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#5B6F66]">0{idx + 1}.</span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D4A36] block mb-1">
                      {service.short}
                    </span>
                    <h2 className="text-xl font-bold text-[#0D4A36] mb-3">{service.title}</h2>
                    <p className="text-xs sm:text-sm text-[#5B6F66] leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#1E332B]">
                        Key Deliverables:
                      </p>
                      {service.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#1E332B]">
                          <span className="text-[#0D4A36] font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#0D4A36]/10 flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="text-xs font-bold uppercase tracking-wider text-[#0D4A36] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/2347089581351?text=${encodeURIComponent(
                        `Hello Majesty Realty, I am interested in your ${service.title} service. Please share more details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#5B6F66] hover:text-[#0D4A36] flex items-center gap-1 font-medium"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Advisory Consultation Strip */}
        <section className="bg-gradient-to-r from-[#0D4A36] via-[#0F5B41] to-[#0D4A36] text-[#FAF9F6] py-16 px-6 lg:px-12 border-t border-[#DFBE6C]/30 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Need a Tailored Real Estate Proposal?</h3>
              <p className="text-xs sm:text-sm text-[#F5EEDB]/80 mt-1">
                Tell us about your property goals and our senior consultants will prepare a custom advisory brief.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0D4A36] bg-gradient-to-r from-[#DFBE6C] to-[#D4AF37] hover:from-[#F2DFAC] hover:to-[#DFBE6C] rounded-xl transition-all shrink-0 shadow-md"
            >
              Request Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
