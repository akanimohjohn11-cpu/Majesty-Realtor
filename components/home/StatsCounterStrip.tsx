'use client';

import { ShieldCheck, Building, Users, Award } from 'lucide-react';

export default function StatsCounterStrip() {
  const stats = [
    {
      icon: Building,
      value: '₦48.5B+',
      label: 'Verified Assets Portfolio',
      subtext: 'Across Lagos & Abuja enclaves',
    },
    {
      icon: ShieldCheck,
      value: '100%',
      label: 'Title Search Integrity',
      subtext: 'Zero unverified land claims',
    },
    {
      icon: Users,
      value: '450+',
      label: 'Private Inspections Handled',
      subtext: 'Physical & diaspora walk-throughs',
    },
    {
      icon: Award,
      value: '98.2%',
      label: 'Tenancy Occupancy Rate',
      subtext: 'Managed portfolio efficiency',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#0D4A36] via-[#0F5B41] to-[#0D4A36] rounded-2xl p-8 sm:p-10 shadow-xl border border-[#DFBE6C]/25 text-white my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#DFBE6C] border border-white/15 shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-[#DFBE6C] tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
                <div className="text-[11px] text-[#F5EEDB]/80 mt-0.5">{s.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
