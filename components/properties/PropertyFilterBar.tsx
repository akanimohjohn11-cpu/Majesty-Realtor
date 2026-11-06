'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface PropertyFilterBarProps {
  initialListingType?: string;
  initialQuery?: string;
  initialCategory?: string;
  initialMinPrice?: string;
  initialMaxPrice?: string;
  initialBedrooms?: string;
  initialSort?: string;
}

export default function PropertyFilterBar({
  initialListingType = 'all',
  initialQuery = '',
  initialCategory = 'all',
  initialMinPrice = '',
  initialMaxPrice = '',
  initialBedrooms = 'any',
  initialSort = 'newest',
}: PropertyFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [listingType, setListingType] = useState<string>(
    searchParams.get('type') || initialListingType
  );
  const [query, setQuery] = useState<string>(searchParams.get('q') || initialQuery);
  const [category, setCategory] = useState<string>(
    searchParams.get('category') || initialCategory
  );
  const [bedrooms, setBedrooms] = useState<string>(
    searchParams.get('bedrooms') || initialBedrooms
  );
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get('min_price') || initialMinPrice
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get('max_price') || initialMaxPrice
  );
  const [sort, setSort] = useState<string>(searchParams.get('sort') || initialSort);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (query.trim()) params.set('q', query.trim());
    if (listingType && listingType !== 'all') params.set('type', listingType);
    if (category && category !== 'all') params.set('category', category);
    if (bedrooms && bedrooms !== 'any') params.set('bedrooms', bedrooms);
    if (minPrice) params.set('min_price', minPrice);
    if (maxPrice) params.set('max_price', maxPrice);
    if (sort && sort !== 'newest') params.set('sort', sort);
    params.set('page', '1');

    router.push(`/properties?${params.toString()}`);
  };

  const resetFilters = () => {
    setListingType('all');
    setQuery('');
    setCategory('all');
    setBedrooms('any');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    router.push('/properties');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DFBE6C]/30 shadow-md p-4 md:p-6 mb-8">
      {/* Top Segmented Controls: Listing Type (Functional buttons with active states) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#0D4A36]/8">
        <div className="inline-flex p-1 bg-[#FAF9F6] rounded-xl border border-[#0D4A36]/10">
          {[
            { label: 'All Listings', value: 'all' },
            { label: 'For Sale', value: 'sale' },
            { label: 'For Rent', value: 'rent' },
            { label: 'Commercial Lease', value: 'lease' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setListingType(tab.value);
                const params = new URLSearchParams(searchParams.toString());
                if (tab.value === 'all') params.delete('type');
                else params.set('type', tab.value);
                params.set('page', '1');
                router.push(`/properties?${params.toString()}`);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                listingType === tab.value
                  ? 'bg-[#0D4A36] text-white shadow-xs'
                  : 'text-[#1E332B] hover:text-[#0D4A36]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="sort-select" className="text-[#5B6F66] font-medium whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              const params = new URLSearchParams(searchParams.toString());
              if (e.target.value === 'newest') params.delete('sort');
              else params.set('sort', e.target.value);
              router.push(`/properties?${params.toString()}`);
            }}
            className="text-xs py-1.5 px-3 rounded-lg border border-[#0D4A36]/20 bg-[#FAF9F6] text-[#1E332B] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Lowest to Highest</option>
            <option value="price_desc">Price: Highest to Lowest</option>
            <option value="popular">Most Inquired</option>
          </select>
        </div>
      </div>

      {/* Main Filter Fields Row */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search keyword / location */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#5B6F66] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            placeholder="Search location (Ikoyi, Maitama, Lekki...)"
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FAF9F6]"
          />
        </div>

        {/* Category */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-xs py-2.5 px-3 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6] text-[#1E332B]"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential Homes</option>
            <option value="luxury">Luxury & Penthouses</option>
            <option value="commercial">Commercial & Office</option>
            <option value="land">Plots & Land Development</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full text-xs py-2.5 px-3 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6] text-[#1E332B]"
          >
            <option value="any">Bedrooms: Any</option>
            <option value="1">1+ Bedroom</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={applyFilters}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#0D4A36] to-[#0F5B41] hover:from-[#093527] hover:to-[#0D4A36] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md text-center"
          >
            Find Properties
          </button>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`p-2.5 rounded-lg border transition-colors ${
              showAdvanced
                ? 'bg-[#0D4A36] text-white border-[#0D4A36]'
                : 'border-[#0D4A36]/20 text-[#1E332B] hover:bg-[#FAF9F6]'
            }`}
            title="Toggle price range filters"
            aria-label="Toggle price range filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Price Range Sub-Bar */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-[#0D4A36]/8 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
          <div>
            <label className="block text-[11px] font-semibold text-[#5B6F66] mb-1">
              Minimum Price (₦ Naira)
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="e.g. 50000000"
              className="w-full text-xs p-2.5 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#5B6F66] mb-1">
              Maximum Price (₦ Naira)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 1500000000"
              className="w-full text-xs p-2.5 rounded-lg border border-[#0D4A36]/20 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={applyFilters}
              className="flex-1 py-2.5 bg-[#1E332B] hover:bg-[#0D4A36] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors border border-[#DFBE6C]/40"
            >
              Apply Price Filter
            </button>
            <button
              onClick={resetFilters}
              className="py-2.5 px-3 border border-[#0D4A36]/20 text-xs text-[#5B6F66] hover:text-[#0D4A36] rounded-lg flex items-center gap-1 hover:bg-[#FAF9F6]"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
