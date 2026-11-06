import Link from 'next/link';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import { repository } from '@/lib/db/repository';
import {
  Building2,
  MessageSquare,
  CalendarCheck,
  Send,
  Eye,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Clock,
  Phone,
} from 'lucide-react';
import { formatNaira, formatDate } from '@/lib/format';

export const metadata = {
  title: 'Admin Overview | Majesty Realty & Construction',
};

export default async function AdminOverviewPage() {
  const metrics = await repository.getDashboardMetrics();

  return (
    <AdminLayoutShell
      title="Admin Dashboard Overview"
      subtitle="Real-time property inventory status, lead conversion metrics, and recent inquiries."
    >
      <div className="space-y-8 max-w-7xl">
        {/* KPI Scorecards Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
                Total Properties
              </span>
              <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
                {metrics.totalListings}
              </span>
              <span className="text-[11px] text-[#5C6E66]">
                {metrics.publishedListings} Published Live
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] text-[#173F32] flex items-center justify-center border border-[#173F32]/10">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
                Buyer Enquiries
              </span>
              <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
                {metrics.totalEnquiries}
              </span>
              <span className="text-[11px] text-amber-700 font-medium">
                {metrics.pendingEnquiries} Require Action
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] text-[#173F32] flex items-center justify-center border border-[#173F32]/10">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
                Viewing Requests
              </span>
              <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
                {metrics.recentViewings.length}
              </span>
              <span className="text-[11px] text-blue-700 font-medium">
                {metrics.pendingViewings} Pending Confirmation
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] text-[#173F32] flex items-center justify-center border border-[#173F32]/10">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
                Lead Conversion
              </span>
              <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
                {metrics.conversionRate}%
              </span>
              <span className="text-[11px] text-[#5C6E66]">
                Across {metrics.totalViews.toLocaleString()} Property Views
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F2] text-[#173F32] flex items-center justify-center border border-[#173F32]/10">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="bg-[#173F32] text-[#FAF8F2] p-5 rounded-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PlusCircle className="w-5 h-5 text-[#D8C5A2]" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Quick Property Action
              </h3>
              <p className="text-[11px] text-[#EAE7DF]/80">
                Directly upload photographs from your device and publish new inventory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/properties/new"
              className="px-4 py-2 bg-[#D8C5A2] hover:bg-white text-[#173F32] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              + Create New Listing
            </Link>
            <Link
              href="/admin/properties"
              className="px-4 py-2 bg-[#26342F] hover:bg-[#202c27] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Manage Inventory
            </Link>
          </div>
        </div>

        {/* Recent Activity Split Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Inquiries */}
          <div className="bg-white rounded-xl border border-[#173F32]/10 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#173F32]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F32] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#173F32]" />
                <span>Recent Customer Inquiries</span>
              </h3>
              <Link
                href="/admin/enquiries"
                className="text-[11px] text-[#173F32] hover:underline font-semibold"
              >
                View All ({metrics.totalEnquiries}) →
              </Link>
            </div>

            {metrics.recentEnquiries.length > 0 ? (
              <div className="divide-y divide-[#173F32]/8 text-xs">
                {metrics.recentEnquiries.map((enq) => (
                  <div key={enq.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#26342F]">{enq.full_name}</span>
                      <span className="text-[10px] text-[#5C6E66]">{formatDate(enq.created_at)}</span>
                    </div>
                    <div className="text-[11px] text-[#5C6E66] truncate">
                      {enq.property_title || 'General Enquiry'} · Tel: {enq.phone}
                    </div>
                    <p className="text-[11px] text-[#26342F]/80 line-clamp-1 italic">
                      &ldquo;{enq.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#5C6E66] py-4 text-center">No inquiries logged yet.</p>
            )}
          </div>

          {/* Recent Viewing Requests */}
          <div className="bg-white rounded-xl border border-[#173F32]/10 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#173F32]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F32] flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#173F32]" />
                <span>Scheduled Viewing Inspections</span>
              </h3>
              <Link
                href="/admin/viewings"
                className="text-[11px] text-[#173F32] hover:underline font-semibold"
              >
                Manage Viewings →
              </Link>
            </div>

            {metrics.recentViewings.length > 0 ? (
              <div className="divide-y divide-[#173F32]/8 text-xs">
                {metrics.recentViewings.map((view) => (
                  <div key={view.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#26342F]">{view.full_name}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          view.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {view.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5C6E66] truncate">
                      Property: {view.property_title}
                    </div>
                    <div className="text-[11px] text-[#173F32] font-medium flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        Date: {view.preferred_date} at {view.preferred_time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#5C6E66] py-4 text-center">No viewing requests booked yet.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayoutShell>
  );
}
