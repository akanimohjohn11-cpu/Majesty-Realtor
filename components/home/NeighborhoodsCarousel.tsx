'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';

interface Neighborhood {
  id: string;
  name: string;
  state: string;
  headline: string;
  image: string;
  propertyCount: string;
  averageAppreciation: string;
  href: string;
}

const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'banana-island',
    name: 'Banana Island, Ikoyi',
    state: 'Lagos',
    headline: 'Private Gated Island with Private Boat Docks & Helipads',
    image: '/images/banana_island_aerial.jpg',
    propertyCount: '14 Active Listings',
    averageAppreciation: '+18% / Year',
    href: '/properties?city=Ikoyi',
  },
  {
    id: 'maitama',
    name: 'Maitama Diplomatic Zone',
    state: 'Abuja (FCT)',
    headline: 'Ambassadorial Mansions & Expansive 1,400m² Private Grounds',
    image: '/images/villa_maitama.jpg',
    propertyCount: '9 Active Listings',
    averageAppreciation: '+14% / Year',
    href: '/properties?city=Maitama',
  },
  {
    id: 'lekki-waterfront',
    name: 'Lekki Phase 1 Waterfront',
    state: 'Lagos',
    headline: 'Luxury Serviced Penthouses Overlooking Ikoyi Link Bridge',
    image: '/images/penthouse_lekki.jpg',
    propertyCount: '22 Active Listings',
    averageAppreciation: '+21% / Year',
    href: '/properties?city=Lekki',
  },
  {
    id: 'victoria-island',
    name: 'Victoria Island Commercial',
    state: 'Lagos',
    headline: 'Corporate Headquarters, Banking Towers & Commercial Plazas',
    image: '/images/commercial_vi.jpg',
    propertyCount: '11 Corporate Floors',
    averageAppreciation: '+16% / Year',
    href: '/properties?city=Victoria+Island',
  },
  {
    id: 'sunset-coastal',
    name: 'Coastal Enclaves & Resorts',
    state: 'Lagos & Abuja',
    headline: 'Private Infinity Pool Mansions with Lagoon & Atlantic Frontage',
    image: '/images/sunset_villa.jpg',
    propertyCount: '8 Private Estates',
    averageAppreciation: '+24% / Year',
    href: '/properties?category=luxury',
  },
  {
    id: 'ikeja-gra',
    name: 'Ikeja GRA Residences',
    state: 'Lagos Mainland',
    headline: 'Tranquil Mature Neighbourhoods Minutes from Airport',
    image: '/images/duplex_ikoyi.jpg',
    propertyCount: '12 Family Duplexes',
    averageAppreciation: '+15% / Year',
    href: '/properties?city=Ikeja',
  },
];

export default function NeighborhoodsCarousel() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0D4A36] font-bold mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Prime Growth Corridors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D4A36]">
            Explore Nigeria’s Most Prestigious Enclaves
          </h2>
        </div>
        <p className="text-xs text-[#5B6F66] max-w-md">
          Explore vetted properties in high-demand residential and corporate hubs with strong capital
          growth and rental turnover.
        </p>
      </div>

      {/* Grid of Visual Corridor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NEIGHBORHOODS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#0D4A36]/15 shadow-md flex flex-col justify-end p-6 text-white transition-all duration-300 hover:shadow-2xl hover:border-[#D4AF37]"
          >
            {/* Background Image with Zoom */}
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              referrerPolicy="no-referrer"
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Radiant Emerald & Charcoal Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D4A36] via-[#0D4A36]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Top Badge */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs">
              <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[#DFBE6C] font-semibold text-[11px] border border-white/10">
                {item.state}
              </span>
              <span className="bg-[#0D4A36]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-mono font-medium flex items-center gap-1 border border-[#DFBE6C]/20">
                <TrendingUp className="w-3 h-3 text-[#DFBE6C]" />
                <span>{item.averageAppreciation}</span>
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-1.5">
              <h3 className="text-xl font-bold text-white group-hover:text-[#DFBE6C] transition-colors leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-[#F5EEDB]/90 line-clamp-2 leading-relaxed">
                {item.headline}
              </p>
              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#DFBE6C]">
                <span>{item.propertyCount}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Corridor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
