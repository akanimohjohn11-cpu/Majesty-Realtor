'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<'general' | 'property' | 'valuation' | 'investment'>('general');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          enquiry_type: enquiryType,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSuccessRef(data.reference_no);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (successRef) {
    return (
      <div className="bg-white p-8 rounded-xl border border-[#173F32]/15 text-center shadow-xs space-y-4">
        <CheckCircle2 className="w-12 h-12 text-[#173F32] mx-auto" />
        <div>
          <h3 className="text-xl font-bold text-[#173F32]">Message Received</h3>
          <p className="text-xs text-[#5C6E66] mt-1">Enquiry Reference Number:</p>
          <div className="mt-1 text-sm font-mono font-bold text-[#26342F] bg-[#FAF8F2] px-3 py-1.5 rounded border border-[#173F32]/10 inline-block">
            {successRef}
          </div>
        </div>
        <p className="text-xs text-[#26342F] max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out to Majesty Realty & Construction. An advisor will review your request
          and contact you promptly via phone or email.
        </p>
        <button
          onClick={() => {
            setSuccessRef(null);
            setMessage('');
          }}
          className="px-5 py-2 bg-[#173F32] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#14372C] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-[#173F32]/15 shadow-xs space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-[#26342F] mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Barr. Emeka Nwachukwu"
          className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="emeka@example.com"
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">
            Phone / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0802 345 6789"
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#26342F] mb-1">
          Subject / Area of Advisory <span className="text-red-500">*</span>
        </label>
        <select
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value as any)}
          className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white text-[#26342F]"
        >
          <option value="general">General Real Estate Enquiry</option>
          <option value="property">Property Acquisition / Home Purchase</option>
          <option value="valuation">Property Valuation & Inspection</option>
          <option value="investment">High-Yield Investment Portfolio</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#26342F] mb-1">
          Your Message / Requirements <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe what type of property, budget range, or location in Nigeria you are interested in..."
          className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-[#D8C5A2]" />
          <span>{loading ? 'Transmitting Message...' : 'Send Message to Broker Desk'}</span>
        </button>
      </div>
    </form>
  );
}
