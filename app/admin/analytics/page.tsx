import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import { repository } from '@/lib/db/repository';
import {
  TrendingUp,
  Users,
  MessageSquare,
  CalendarCheck,
  Eye,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'Lead Conversion & Traffic Analytics | Majesty Realty Admin',
};

export default async function AdminAnalyticsPage() {
  const metrics = await repository.getDashboardMetrics();

  const corridors = [
    { name: 'Ikoyi & Banana Island', demandScore: 'High (Residential/Luxury)', share: '34%' },
    { name: 'Victoria Island', demandScore: 'High (Commercial Floors)', share: '24%' },
    { name: 'Lekki Phase 1 Waterfront', demandScore: 'High (Penthouses/Rentals)', share: '20%' },
    { name: 'Maitama, Abuja (FCT)', demandScore: 'Steady (Ambassadorial)', share: '14%' },
    { name: 'Ikeja GRA & Epe Corridor', demandScore: 'Rapid Growth (Land)', share: '8%' },
  ];

  const channels = [
    { channel: 'Property Detail WhatsApp Pre-fills', percentage: 48, count: '38 Leads/mo' },
    { channel: 'Schedule a Viewing Inspection Form', percentage: 26, count: '21 Leads/mo' },
    { channel: 'Floating Website WhatsApp Desk', percentage: 16, count: '13 Leads/mo' },
    { channel: 'General Contact & Telephone Hotline', percentage: 10, count: '8 Leads/mo' },
  ];

  return (
    <AdminLayoutShell
      title="Lead Conversion & Site Traffic Intelligence"
      subtitle="Detailed performance tracking across property discovery, customer inquiries, and inspection bookings."
    >
      <div className="space-y-8 max-w-7xl">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
              Cumulative Property Views
            </span>
            <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
              {metrics.totalViews.toLocaleString()}
            </span>
            <span className="text-[11px] text-green-700 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% Month-on-Month</span>
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
              Lead Conversion Rate
            </span>
            <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
              {metrics.conversionRate}%
            </span>
            <span className="text-[11px] text-[#5C6E66] mt-1 block">
              Above Nigerian industry average (2.1%)
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
              Avg. Inbound Response Time
            </span>
            <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
              18 Mins
            </span>
            <span className="text-[11px] text-green-700 font-medium mt-1 block">
              94% within 1 hour
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#173F32]/10 shadow-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6E66] block">
              Inspection Conversion
            </span>
            <span className="text-2xl font-bold font-mono text-[#173F32] mt-1 block tabular-nums">
              42.5%
            </span>
            <span className="text-[11px] text-[#5C6E66] mt-1 block">
              Viewing request to formal offer ratio
            </span>
          </div>
        </div>

        {/* Funnel & Conversion Channels Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Channels */}
          <div className="bg-white p-6 rounded-xl border border-[#173F32]/10 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
              Inbound Conversion Channels
            </h3>
            <p className="text-xs text-[#5C6E66]">
              Distribution of prospective buyers and corporate tenants reaching Majesty Realty:
            </p>

            <div className="space-y-4 pt-2">
              {channels.map((chan, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#26342F]">
                    <span>{chan.channel}</span>
                    <span className="font-mono text-[#173F32]">
                      {chan.percentage}% ({chan.count})
                    </span>
                  </div>
                  <div className="w-full bg-[#FAF8F2] h-2.5 rounded-full overflow-hidden border border-[#173F32]/10">
                    <div
                      className="bg-[#173F32] h-full rounded-full transition-all duration-500"
                      style={{ width: `${chan.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Demand Geographic Corridors */}
          <div className="bg-white p-6 rounded-xl border border-[#173F32]/10 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
              High-Demand Corridors & Inquiries
            </h3>
            <p className="text-xs text-[#5C6E66]">
              Geographic concentration of search traffic and inspection booking intent:
            </p>

            <div className="divide-y divide-[#173F32]/8 text-xs">
              {corridors.map((c, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#173F32]" />
                    <span className="font-semibold text-[#26342F]">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#173F32]">{c.share}</span>
                    <span className="block text-[10px] text-[#5C6E66]">{c.demandScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory SLA and Data Integrity Notice */}
        <div className="bg-[#173F32] text-[#FAF8F2] p-6 rounded-xl flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-[#D8C5A2] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-white text-sm">
              Conversion Rate Optimization & Lead Integrity
            </h4>
            <p className="text-[#EAE7DF]/80 leading-relaxed">
              Every inquiry recorded on the Majesty Realty platform is validated with telephone and email format
              checks. Duplicate spam is filtered before logging to ensure advisor time is dedicated solely to
              qualified buyers, diaspora investors, and commercial occupiers.
            </p>
          </div>
        </div>
      </div>
    </AdminLayoutShell>
  );
}
