'use client';

import { useState } from 'react';
import { SiteSettings } from '@/lib/types';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface SettingsManagerProps {
  initialSettings: SiteSettings;
}

export default function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [businessName, setBusinessName] = useState(initialSettings.business_name);
  const [tagline, setTagline] = useState(initialSettings.tagline);
  const [phone, setPhone] = useState(initialSettings.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsapp_number);
  const [email, setEmail] = useState(initialSettings.email);
  const [officeAddress, setOfficeAddress] = useState(initialSettings.office_address);
  const [openingHours, setOpeningHours] = useState(initialSettings.opening_hours);
  const [heroHeadline, setHeroHeadline] = useState(initialSettings.hero_headline);
  const [heroSubheading, setHeroSubheading] = useState(initialSettings.hero_subheading);
  const [cacRegNo, setCacRegNo] = useState(initialSettings.cac_reg_no || 'RC: 1849204');

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName,
          tagline,
          phone,
          whatsapp_number: whatsappNumber,
          whatsapp_link: `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`,
          email,
          office_address: officeAddress,
          opening_hours: openingHours,
          hero_headline: heroHeadline,
          hero_subheading: heroSubheading,
          cac_reg_no: cacRegNo,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save website settings');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || 'Error occurred while updating settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {savedSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700" />
          <span>Website settings updated successfully! Changes reflect on public pages immediately.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Corporate Identity */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          1. Brand Identity & Positioning
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">Business Name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">Corporate Registration No. (CAC)</label>
            <input
              type="text"
              value={cacRegNo}
              onChange={(e) => setCacRegNo(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">Brand Tagline / Positioning Statement</label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
          />
        </div>
      </div>

      {/* Communication Coordinates */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          2. Communication Channels & Office Coordinates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">Telephone Line</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">WhatsApp Number (International)</label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="2347089581351"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">Corporate Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">Office Street Address</label>
            <input
              type="text"
              required
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">Operating Hours</label>
            <input
              type="text"
              required
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>
      </div>

      {/* Homepage Copy */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          3. Homepage Hero Copy
        </h3>

        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">Hero Main Headline</label>
          <input
            type="text"
            required
            value={heroHeadline}
            onChange={(e) => setHeroHeadline(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">Hero Supporting Subtitle</label>
          <textarea
            rows={3}
            required
            value={heroSubheading}
            onChange={(e) => setHeroSubheading(e.target.value)}
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#D8C5A2]" />
          <span>{saving ? 'Updating Settings...' : 'Save Site Settings'}</span>
        </button>
      </div>
    </form>
  );
}
