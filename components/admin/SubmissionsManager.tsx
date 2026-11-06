'use client';

import { useState } from 'react';
import { PropertySubmission, SubmissionStatus } from '@/lib/types';
import { formatDate, formatNaira } from '@/lib/format';
import { Send, CheckCircle2, XCircle, MessageSquare, Phone, Building } from 'lucide-react';
import Link from 'next/link';

interface SubmissionsManagerProps {
  initialSubmissions: PropertySubmission[];
}

export default function SubmissionsManager({ initialSubmissions }: SubmissionsManagerProps) {
  const [submissions, setSubmissions] = useState<PropertySubmission[]>(initialSubmissions);
  const [filter, setFilter] = useState<string>('all');

  const filtered = submissions.filter((s) => (filter === 'all' ? true : s.status === filter));

  const updateStatus = async (id: string, newStatus: SubmissionStatus) => {
    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update submission status:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
        {[
          { label: 'All Submissions', value: 'all' },
          { label: 'Pending Review', value: 'pending' },
          { label: 'Under Review', value: 'reviewing' },
          { label: 'Approved & Listed', value: 'approved' },
          { label: 'Rejected', value: 'rejected' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filter === tab.value
                ? 'bg-[#173F32] text-white'
                : 'bg-white text-[#5C6E66] hover:text-[#173F32] border border-[#173F32]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-[#173F32]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F2] border-b border-[#173F32]/10 text-[#5C6E66] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Owner Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Property Headline</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Asking Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173F32]/8 text-[#26342F]">
              {filtered.map((sub) => {
                const waClean = sub.phone.replace(/\D/g, '');
                const waUrl = `https://wa.me/${waClean.startsWith('234') ? waClean : `234${waClean.replace(/^0/, '')}`}?text=${encodeURIComponent(
                  `Hello ${sub.owner_name}, regarding your listing submission for "${sub.property_title}" (Ref: ${sub.reference_no}): our property acquisition desk has reviewed the details and would like to arrange physical verification.`
                )}`;

                return (
                  <tr key={sub.id} className="hover:bg-[#FAF8F2]/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#173F32] whitespace-nowrap">
                      {sub.owner_name}
                      <span className="block text-[10px] text-[#5C6E66] font-mono">
                        {sub.reference_no}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{sub.phone}</div>
                      <div className="text-[11px] text-[#5C6E66]">{sub.email}</div>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-semibold text-[#173F32] line-clamp-1">{sub.property_title}</div>
                      <span className="text-[10px] text-[#5C6E66] uppercase">
                        Intent: {sub.listing_intent} · {sub.property_type}
                      </span>
                      {sub.description && (
                        <p className="text-[10px] text-[#5C6E66] line-clamp-1 italic mt-0.5">
                          &ldquo;{sub.description}&rdquo;
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-[11px]">{sub.location}</td>

                    <td className="py-3 px-4 font-mono font-bold text-[#173F32] tabular-nums whitespace-nowrap">
                      {formatNaira(sub.asking_price)}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          sub.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : sub.status === 'reviewing'
                            ? 'bg-blue-100 text-blue-800'
                            : sub.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 text-green-700 hover:text-green-900 rounded hover:bg-green-50"
                        title="Chat Owner on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      {sub.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(sub.id, 'reviewing')}
                          className="px-2.5 py-1 text-xs bg-blue-700 text-white rounded font-medium"
                        >
                          Review
                        </button>
                      )}

                      {sub.status !== 'approved' && (
                        <button
                          onClick={() => updateStatus(sub.id, 'approved')}
                          className="px-2.5 py-1 text-xs bg-[#173F32] hover:bg-[#14372C] text-white rounded font-medium"
                        >
                          Approve
                        </button>
                      )}

                      {sub.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(sub.id, 'rejected')}
                          className="px-2 py-1 text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#5C6E66]">
            No owner property submissions under this filter.
          </div>
        )}
      </div>
    </div>
  );
}
