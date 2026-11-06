'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { PropertyType } from '@/lib/types';

export default function SellPropertyForm() {
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('detached_duplex');
  const [listingIntent, setListingIntent] = useState<'sell' | 'rent' | 'lease'>('sell');
  const [location, setLocation] = useState('');
  const [askingPrice, setAskingPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [sizeDetails, setSizeDetails] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner_name: ownerName,
          email,
          phone,
          property_title: propertyTitle,
          property_type: propertyType,
          listing_intent: listingIntent,
          location,
          asking_price: Number(askingPrice),
          bedrooms: bedrooms ? Number(bedrooms) : null,
          bathrooms: bathrooms ? Number(bathrooms) : null,
          size_details: sizeDetails,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit property listing');
      }

      setSuccessRef(data.reference_no);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please check required fields.');
    } finally {
      setLoading(false);
    }
  };

  if (successRef) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-xl border border-[#173F32]/15 text-center shadow-sm space-y-5">
        <CheckCircle2 className="w-14 h-14 text-[#173F32] mx-auto" />
        <div>
          <h3 className="text-2xl font-bold text-[#173F32]">Property Listing Submitted</h3>
          <p className="text-xs text-[#5C6E66] mt-1">Your submission tracking reference:</p>
          <div className="mt-2 text-base font-mono font-bold text-[#26342F] bg-[#FAF8F2] px-4 py-2 rounded border border-[#173F32]/10 inline-block">
            {successRef}
          </div>
        </div>
        <p className="text-sm text-[#26342F] max-w-lg mx-auto leading-relaxed">
          Thank you for trusting Majesty Realty and Construction. Our senior valuation broker and listing
          team will review your asset specifications, coordinate title verification, and schedule a
          physical walk-through inspection within 24 to 48 hours.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => {
              setSuccessRef(null);
              setPropertyTitle('');
              setAskingPrice('');
              setLocation('');
              setDescription('');
            }}
            className="px-6 py-2.5 bg-[#173F32] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#14372C] transition-colors"
          >
            Submit Another Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-xl border border-[#173F32]/15 shadow-sm space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Section 1: Property Owner / Representative Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          1. Owner / Legal Representative Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Full Legal Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              placeholder="e.g. Chief Olatunji Adeleke"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@example.com"
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
              placeholder="0803 123 4567"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Property Identification & Pricing */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          2. Asset Specifications & Desired Outcome
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Listing Intent <span className="text-red-500">*</span>
            </label>
            <select
              value={listingIntent}
              onChange={(e) => setListingIntent(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white"
            >
              <option value="sell">Outright Sale</option>
              <option value="rent">Residential Rent</option>
              <option value="lease">Commercial Lease</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Property Classification <span className="text-red-500">*</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white"
            >
              <option value="detached_duplex">Detached Duplex</option>
              <option value="semi_detached_duplex">Semi-Detached Duplex</option>
              <option value="terrace_duplex">Terrace Duplex</option>
              <option value="penthouse">Penthouse</option>
              <option value="apartment">Serviced Apartment</option>
              <option value="commercial_office">Commercial Office Space</option>
              <option value="land">Dry Land / Development Plot</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Target Asking Price (₦ Naira) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              placeholder="e.g. 350000000"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Descriptive Property Headline <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={propertyTitle}
              onChange={(e) => setPropertyTitle(e.target.value)}
              placeholder="e.g. Brand New 5-Bedroom Detached Duplex with Swimming Pool"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Precise Location / Estate / Neighbourhood <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Osapa London, Lekki, Lagos State"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>

        {/* Optional Dimensional Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Bedrooms (If Residential)
            </label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="e.g. 5"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="e.g. 6"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Land / Floor Size Details
            </label>
            <input
              type="text"
              value={sizeDetails}
              onChange={(e) => setSizeDetails(e.target.value)}
              placeholder="e.g. 600 SQM or 400 SQM Floor"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">
            Description & Key Features (POP, Smart Home, Title Documents, Swimming Pool, BQ)
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please describe the property condition, title documents held (C of O, Governor Consent, Deed), and any unique highlights..."
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] resize-none"
          />
        </div>
      </div>

      {/* Trust Notice */}
      <div className="p-4 rounded-lg bg-[#FAF8F2] border border-[#173F32]/10 flex items-start gap-3 text-xs text-[#5C6E66]">
        <ShieldCheck className="w-5 h-5 text-[#173F32] shrink-0 mt-0.5" />
        <p>
          All owner submissions are held in strict legal confidence. Majesty Realty and Construction
          verifies title documentation prior to marketing and only introduces pre-qualified purchasers
          or institutional tenants.
        </p>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
        >
          <Send className="w-4 h-4 text-[#D8C5A2]" />
          <span>{loading ? 'Submitting Property...' : 'Submit Property for Listing'}</span>
        </button>
      </div>
    </form>
  );
}
