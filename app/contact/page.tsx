import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Contact Majesty Realty & Construction | Lekki Lagos Head Office',
  description:
    'Contact Majesty Realty and Construction. Office address at Plot 14 Admiralty Way Lekki Phase 1 Lagos. Call 07089581351 or chat on WhatsApp.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D4A36]/10 text-[#0D4A36] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Direct Client Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D4A36]">
            Connect With Our Real Estate Advisory Desk
          </h1>
          <p className="text-sm text-[#5B6F66] mt-3 leading-relaxed">
            Whether you are looking to acquire a verified home, lease a corporate space, inspect title documents,
            or discuss portfolio asset management, our licensed property consultants are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Coordinates & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DFBE6C]/30 shadow-md space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#0D4A36] pb-3 border-b border-[#0D4A36]/10">
                Corporate Coordinates
              </h2>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] shrink-0">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1E332B] block">Head Office Address</span>
                    <span className="text-[#5B6F66] leading-relaxed">
                      Plot 14, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] shrink-0">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1E332B] block">Telephone Hotline</span>
                    <a href="tel:+2347089581351" className="text-[#0D4A36] hover:underline font-mono font-semibold">
                      0708 958 1351 / +234 708 958 1351
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] shrink-0">
                    <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1E332B] block">Official WhatsApp Line</span>
                    <a
                      href="https://wa.me/2347089581351"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0D4A36] hover:underline font-mono font-semibold"
                    >
                      +234 708 958 1351 (Instant Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] shrink-0">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1E332B] block">Corporate Inquiries</span>
                    <span className="text-[#5B6F66]">info@majestyrealty.ng</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] shrink-0">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1E332B] block">Operating Hours</span>
                    <span className="text-[#5B6F66] leading-relaxed">
                      Monday – Friday: 8:00 AM – 6:00 PM<br />
                      Saturday: 9:00 AM – 4:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regulatory Accreditation Notice */}
            <div className="bg-white p-5 rounded-2xl border border-[#DFBE6C]/30 shadow-xs flex items-start gap-3 text-xs text-[#5B6F66]">
              <ShieldCheck className="w-5 h-5 text-[#0D4A36] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0D4A36] block">Corporate Registration</span>
                <span>Registered with the Corporate Affairs Commission (CAC) Nigeria (RC: 1849204). Fully compliant with Nigerian Anti-Money Laundering Regulations.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
