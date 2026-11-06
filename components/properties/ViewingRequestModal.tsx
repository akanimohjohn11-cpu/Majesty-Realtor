'use client';

import { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { Property } from '@/lib/types';

interface ViewingRequestModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewingRequestModal({ property, isOpen, onClose }: ViewingRequestModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/viewings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: property.id,
          property_title: property.title,
          property_slug: property.slug,
          full_name: fullName,
          email,
          phone,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit viewing request');
      }

      setSuccessReference(data.reference_no);
    } catch (err: any) {
      setError(err.message || 'An error occurred while booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-[#173F32]/15 overflow-hidden">
        {/* Header */}
        <div className="bg-[#173F32] px-6 py-4 text-[#FAF8F2] flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold leading-tight">Schedule Private Viewing</h3>
            <p className="text-xs text-[#D8C5A2] mt-0.5 truncate max-w-xs">{property.title}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-[#FAF8F2]/80 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successReference ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#173F32] mx-auto" />
              <div>
                <h4 className="text-lg font-bold text-[#173F32]">Viewing Request Confirmed</h4>
                <p className="text-xs text-[#5C6E66] mt-1">
                  Your inspection reference number is:
                </p>
                <p className="text-base font-mono font-bold text-[#26342F] mt-1 bg-[#FAF8F2] py-1.5 px-4 rounded border border-[#173F32]/10 inline-block">
                  {successReference}
                </p>
              </div>
              <p className="text-xs text-[#26342F] max-w-sm mx-auto leading-relaxed">
                A Majesty Realty property officer has logged your preferred inspection schedule and
                will contact you via telephone and WhatsApp to confirm gate clearance and access protocol.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#173F32] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#14372C] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#26342F] mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Kolawole Davies"
                    className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#26342F] mb-1">
                    Phone Number (WhatsApp) <span className="text-red-500">*</span>
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

              <div>
                <label className="block text-xs font-medium text-[#26342F] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kolawole@example.com"
                  className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#26342F] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#173F32]" />
                    <span>Preferred Date</span> <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#26342F] mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#173F32]" />
                    <span>Preferred Time</span> <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white"
                  >
                    <option value="10:00 AM">Morning (10:00 AM)</option>
                    <option value="11:30 AM">Late Morning (11:30 AM)</option>
                    <option value="02:00 PM">Afternoon (02:00 PM)</option>
                    <option value="04:00 PM">Late Afternoon (04:00 PM)</option>
                    <option value="Weekend Flexible">Weekend Walk-Through</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#26342F] mb-1">
                  Special Notes or Accompanying Persons (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Coming with building surveyor, or requesting video inspection..."
                  className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#5C6E66] hover:text-[#26342F]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#173F32] hover:bg-[#14372C] rounded transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting Schedule...' : 'Confirm Viewing Appointment'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
