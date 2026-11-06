'use client';

import { useState } from 'react';
import { Enquiry, EnquiryStatus } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { MessageSquare, Phone, Mail, CheckCircle2, Search, ExternalLink } from 'lucide-react';

interface EnquiriesManagerProps {
  initialEnquiries: Enquiry[];
}

export default function EnquiriesManager({ initialEnquiries }: EnquiriesManagerProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeEnquiry, setActiveEnquiry] = useState<Enquiry | null>(null);
  const [status, setStatus] = useState<EnquiryStatus>('new');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const filtered = enquiries.filter((e) =>
    statusFilter === 'all' ? true : e.status === statusFilter
  );

  const openModal = (enquiry: Enquiry) => {
    setActiveEnquiry(enquiry);
    setStatus(enquiry.status);
    setNotes(enquiry.notes || '');
  };

  const handleSaveStatus = async () => {
    if (!activeEnquiry) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/enquiries/${activeEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === activeEnquiry.id ? { ...item, status, notes } : item
          )
        );
        setActiveEnquiry(null);
      }
    } catch (err) {
      console.error('Failed to update enquiry:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
        {[
          { label: 'All Inquiries', value: 'all' },
          { label: 'New Action Required', value: 'new' },
          { label: 'Contacted', value: 'contacted' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Closed', value: 'closed' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              statusFilter === tab.value
                ? 'bg-[#173F32] text-white'
                : 'bg-white text-[#5C6E66] hover:text-[#173F32] border border-[#173F32]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-[#173F32]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F2] border-b border-[#173F32]/10 text-[#5C6E66] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Subject / Property</th>
                <th className="py-3 px-4">Message Snippet</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173F32]/8 text-[#26342F]">
              {filtered.map((enq) => {
                const waClean = enq.phone.replace(/\D/g, '');
                const waUrl = `https://wa.me/${waClean.startsWith('234') ? waClean : `234${waClean.replace(/^0/, '')}`}?text=${encodeURIComponent(
                  `Hello ${enq.full_name}, thank you for contacting Majesty Realty and Construction regarding your enquiry (${enq.reference_no}).`
                )}`;

                return (
                  <tr key={enq.id} className="hover:bg-[#FAF8F2]/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#173F32] whitespace-nowrap">
                      {enq.full_name}
                      <span className="block text-[10px] text-[#5C6E66] font-mono">
                        {enq.reference_no}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{enq.phone}</div>
                      <div className="text-[11px] text-[#5C6E66]">{enq.email}</div>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <span className="line-clamp-1 font-medium">
                        {enq.property_title || 'General Real Estate Advisory'}
                      </span>
                      <span className="text-[10px] text-[#5C6E66] uppercase">{enq.enquiry_type}</span>
                    </td>

                    <td className="py-3 px-4 max-w-sm">
                      <p className="line-clamp-2 text-[#5C6E66] italic">&ldquo;{enq.message}&rdquo;</p>
                      {enq.notes && (
                        <p className="text-[10px] text-[#173F32] font-semibold mt-0.5">
                          Note: {enq.notes}
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          enq.status === 'new'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'in_progress'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-[11px] text-[#5C6E66]">
                      {formatDate(enq.created_at)}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 text-green-700 hover:text-green-900 rounded hover:bg-green-50"
                        title="Chat Client on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => openModal(enq)}
                        className="px-2.5 py-1 text-xs bg-[#173F32] text-white rounded hover:bg-[#14372C] font-medium"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#5C6E66]">
            No enquiries recorded under this filter.
          </div>
        )}
      </div>

      {/* Update Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4 shadow-xl border border-[#173F32]/15">
            <div>
              <h4 className="text-sm font-bold text-[#173F32]">Update Inbound Enquiry</h4>
              <p className="text-xs text-[#5C6E66]">{activeEnquiry.full_name} ({activeEnquiry.reference_no})</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#26342F] mb-1">
                Workflow Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white font-semibold"
              >
                <option value="new">New Action Required</option>
                <option value="contacted">Contacted Client</option>
                <option value="in_progress">In Progress / Negotiation</option>
                <option value="closed">Closed / Concluded</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#26342F] mb-1">
                Admin Internal Follow-up Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Sent brochure and survey coordinates via WhatsApp..."
                className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveEnquiry(null)}
                className="px-3 py-1.5 text-xs text-[#5C6E66] hover:text-[#26342F]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSaveStatus}
                className="px-4 py-2 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Updates'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
