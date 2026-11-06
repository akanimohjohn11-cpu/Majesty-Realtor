import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | Majesty Realty & Construction',
  description:
    'Privacy Policy and data protection commitments of Majesty Realty and Construction under the Nigeria Data Protection Act (NDPA).',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2]">
      <Navbar />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold tracking-tight text-[#173F32] mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#5C6E66] mb-8">
          Last Updated: March 2026 · Compliant with the Nigeria Data Protection Act (NDPA)
        </p>

        <div className="bg-white p-8 rounded-xl border border-[#173F32]/12 space-y-6 text-xs sm:text-sm text-[#26342F] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">1. Introduction & Scope</h2>
            <p>
              Majesty Realty and Construction (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;, RC: 1849204) is committed to
              protecting the personal information of our clients, property seekers, landlords, and
              website visitors. This policy explains how we collect, use, store, and protect your data
              when you use our website, schedule property viewings, submit property listings, or contact
              our advisory desk.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">2. Personal Data We Collect</h2>
            <p>We only collect information necessary to facilitate property transactions and advisory:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact Details: Full name, email address, telephone and WhatsApp number.</li>
              <li>Transaction Preferences: Property types, preferred locations, budget, and desired inspection dates.</li>
              <li>Owner Submissions: Asset title details, location coordinates, photographs, and asking price.</li>
              <li>Technical Telemetry: IP address, browser type, and navigation timestamps for security rate-limiting.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">3. Purpose of Processing</h2>
            <p>Your data is processed strictly to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Coordinate physical and virtual property viewings with estate security gates.</li>
              <li>Respond to inquiries, valuation requests, and investment advisory briefs.</li>
              <li>Conduct title verification and draft legal conveyancing documentation.</li>
              <li>Comply with statutory anti-money laundering and know-your-customer (KYC) requirements.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">4. Data Protection & Confidentiality</h2>
            <p>
              We implement industry-standard encryption, Row Level Security (RLS) policies on our Supabase
              PostgreSQL database, and strict administrative access controls. We never sell, lease, or monetize
              your contact information to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">5. Contact Us Regarding Your Data</h2>
            <p>
              To request access, correction, or deletion of your personal data, please contact our Data
              Compliance Officer at <strong>info@majestyrealty.ng</strong> or write to our head office at
              Plot 14, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
