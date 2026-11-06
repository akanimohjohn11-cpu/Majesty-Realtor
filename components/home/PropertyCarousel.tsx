'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Property } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface PropertyCarouselProps {
  properties: Property[];
}

export default function PropertyCarousel({ properties }: PropertyCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent' | 'luxury'>('all');

  const filtered = properties.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'sale') return p.listing_type === 'sale';
    if (activeTab === 'rent') return p.listing_type === 'rent' || p.listing_type === 'lease';
    if (activeTab === 'luxury') return p.category_slug === 'luxury';
    return true;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const offset = clientWidth * 0.75;
    containerRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - offset : scrollLeft + offset,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Carousel Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0D4A36] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Featured Luxury Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D4A36]">
            Curated Architectural Showcases
          </h2>
        </div>

        {/* Category switcher & slider navigation arrows */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-[#F5EEDB] p-1 rounded-lg border border-[#0D4A36]/10 text-xs">
            {[
              { label: 'All Showcase', val: 'all' },
              { label: 'For Sale', val: 'sale' },
              { label: 'Luxury Rentals', val: 'rent' },
              { label: 'Penthouses', val: 'luxury' },
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setActiveTab(tab.val as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === tab.val
                    ? 'bg-[#0D4A36] text-white shadow-xs'
                    : 'text-[#1E332B] hover:text-[#0D4A36]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll carousel left"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#0D4A36] hover:text-white text-[#0D4A36] flex items-center justify-center transition-all border border-[#0D4A36]/15 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll carousel right"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#0D4A36] hover:text-white text-[#0D4A36] flex items-center justify-center transition-all border border-[#0D4A36]/15 shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Track */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filtered.map((property) => (
          <div
            key={property.id}
            className="w-[290px] sm:w-[340px] md:w-[380px] shrink-0 snap-start"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="flex items-center justify-between pt-2 border-t border-[#0D4A36]/10 text-xs">
        <span className="text-[#5B6F66]">
          Swipe or click arrows to explore {filtered.length} verified listings in this showcase.
        </span>
        <Link
          href="/properties"
          className="font-bold text-[#0D4A36] hover:text-[#D4AF37] flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <span>View Complete Catalog ({properties.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
