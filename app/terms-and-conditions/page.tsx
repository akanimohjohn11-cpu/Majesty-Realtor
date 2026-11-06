import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms & Conditions | Majesty Realty & Construction',
  description:
    'Terms and conditions governing the use of the Majesty Realty and Construction website and brokerage services.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2]">
      <Navbar />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold tracking-tight text-[#173F32] mb-2">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-[#5C6E66] mb-8">
          Last Updated: March 2026 · Governing Nigerian Real Estate Transactions
        </p>

        <div className="bg-white p-8 rounded-xl border border-[#173F32]/12 space-y-6 text-xs sm:text-sm text-[#26342F] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">1. Acceptance of Terms</h2>
            <p>
              By accessing the website of Majesty Realty and Construction (RC: 1849204) or engaging our
              services for property search, sales, rentals, viewing scheduling, or listing submissions,
              you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">2. Property Information & Availability</h2>
            <p>
              All property listings, descriptions, dimensions, photographs, and asking prices published on
              this platform are curated with professional diligence. However, property availability,
              exchange rates, and asking prices are subject to change by owners prior to contract execution.
              Prospective purchasers and tenants are advised to confirm specific terms during the formal
              inspection and legal due diligence phase.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">3. Professional Agency & Legal Fees</h2>
            <p>
              Unless otherwise agreed in a written representation agreement:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sales Agency Fee: 5% of the agreed purchase price, payable upon execution of contracts.</li>
              <li>Rental Agency Fee: 10% of the first year’s annual rent, payable upon tenancy execution.</li>
              <li>Legal Conveyancing Fee: 5% of the transaction value for drafting Deed of Assignment and contract of sale.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">4. Title Due Diligence Disclaimer</h2>
            <p>
              While Majesty Realty and Construction coordinates searches at relevant state land registries,
              clients retain the right and are encouraged to instruct independent legal counsel to review
              all deeds, Governor’s Consent documents, and survey plans prior to final disbursement of funds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#173F32]">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the Laws of the
              Federal Republic of Nigeria, and any disputes shall be subject to the exclusive jurisdiction
              of the High Courts of Lagos State or the Federal Capital Territory, Abuja.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
