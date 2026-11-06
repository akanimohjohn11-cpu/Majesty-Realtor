'use client';

import { useState } from 'react';
import { ViewingRequest, ViewingStatus } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { CalendarCheck, Clock, MessageSquare, Phone, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

interface ViewingsManagerProps {
  initialViewings: ViewingRequest[];
}

export default function ViewingsManager({ initialViewings }: ViewingsManagerProps) {
  const [viewings, setViewings] = useState<ViewingRequest[]>(initialViewings);
  const [filter, setFilter] = useState<string>('all');

  const filtered = viewings.filter((v) => (filter === 'all' ? true : v.status === filter));

  const updateStatus = async (id: string, newStatus: ViewingStatus) => {
    try {
      const res = await fetch(`/api/viewings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setViewings((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update viewing status:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
        {[
          { label: 'All Viewings', value: 'all' },
          { label: 'Pending Confirmation', value: 'pending' },
          { label: 'Confirmed', value: 'confirmed' },
          { label: 'Completed', value: 'completed' },
          { label: 'Cancelled', value: 'cancelled' },
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

      {/* Viewings Table */}
      <div className="bg-white rounded-xl border border-[#173F32]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F2] border-b border-[#173F32]/10 text-[#5C6E66] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Contact Coordinates</th>
                <th className="py-3 px-4">Target Property</th>
                <th className="py-3 px-4">Scheduled Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173F32]/8 text-[#26342F]">
              {filtered.map((view) => {
                const waClean = view.phone.replace(/\D/g, '');
                const waUrl = `https://wa.me/${waClean.startsWith('234') ? waClean : `234${waClean.replace(/^0/, '')}`}?text=${encodeURIComponent(
                  `Hello ${view.full_name}, regarding your physical inspection request for "${view.property_title}" on ${view.preferred_date} at ${view.preferred_time} (Ref: ${view.reference_no}): our property officer is confirmed to meet you at the estate security gate.`
                )}`;

                return (
                  <tr key={view.id} className="hover:bg-[#FAF8F2]/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#173F32] whitespace-nowrap">
                      {view.full_name}
                      <span className="block text-[10px] text-[#5C6E66] font-mono">
                        {view.reference_no}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{view.phone}</div>
                      <div className="text-[11px] text-[#5C6E66]">{view.email}</div>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <Link
                        href={`/properties/${view.property_slug}`}
                        target="_blank"
                        className="font-medium text-[#173F32] hover:underline line-clamp-1"
                      >
                        {view.property_title}
                      </Link>
                      {view.notes && (
                        <p className="text-[10px] text-[#5C6E66] italic mt-0.5">
                          Notes: {view.notes}
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-medium text-[#173F32]">
                      <div className="flex items-center gap-1.5">
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>{view.preferred_date}</span>
                      </div>
                      <div className="text-[10px] text-[#5C6E66] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{view.preferred_time}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          view.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : view.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : view.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {view.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block p-1.5 text-green-700 hover:text-green-900 rounded hover:bg-green-50"
                        title="Send Gate Clearance & Confirmation on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      {view.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(view.id, 'confirmed')}
                          className="px-2.5 py-1 text-xs bg-green-700 hover:bg-green-800 text-white rounded font-medium"
                        >
                          Confirm
                        </button>
                      )}

                      {view.status === 'confirmed' && (
                        <button
                          onClick={() => updateStatus(view.id, 'completed')}
                          className="px-2.5 py-1 text-xs bg-[#173F32] hover:bg-[#14372C] text-white rounded font-medium"
                        >
                          Mark Completed
                        </button>
                      )}

                      {view.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(view.id, 'cancelled')}
                          className="px-2 py-1 text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Cancel
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
            No viewing requests found under this filter.
          </div>
        )}
      </div>
    </div>
  );
}
