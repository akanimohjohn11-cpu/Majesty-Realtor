import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilterBar from '@/components/properties/PropertyFilterBar';
import { repository } from '@/lib/db/repository';
import { PropertyFilterParams } from '@/lib/types';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

interface PropertiesPageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    category?: string;
    property_type?: string;
    bedrooms?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: 'Verified Nigerian Properties for Sale & Rent | Majesty Realty',
  description:
    'Search verified luxury homes, apartments, commercial offices, and titled land for sale and rent in Lagos, Abuja, and surrounding high-growth corridors.',
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedParams = await searchParams;

  const filterParams: PropertyFilterParams = {
    query: resolvedParams.q || undefined,
    listing_type: (resolvedParams.type as any) || 'all',
    category: resolvedParams.category || undefined,
    property_type: resolvedParams.property_type || undefined,
    bedrooms: (resolvedParams.bedrooms as any) || undefined,
    min_price: resolvedParams.min_price ? Number(resolvedParams.min_price) : undefined,
    max_price: resolvedParams.max_price ? Number(resolvedParams.max_price) : undefined,
    sort: (resolvedParams.sort as any) || 'newest',
    page: resolvedParams.page ? Number(resolvedParams.page) : 1,
    limit: 9,
  };

  const { properties, total, page, totalPages } = await repository.getProperties(filterParams);

  // Helper for pagination URL generation
  const createPageUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (resolvedParams.q) params.set('q', resolvedParams.q);
    if (resolvedParams.type) params.set('type', resolvedParams.type);
    if (resolvedParams.category) params.set('category', resolvedParams.category);
    if (resolvedParams.bedrooms) params.set('bedrooms', resolvedParams.bedrooms);
    if (resolvedParams.min_price) params.set('min_price', resolvedParams.min_price);
    if (resolvedParams.max_price) params.set('max_price', resolvedParams.max_price);
    if (resolvedParams.sort) params.set('sort', resolvedParams.sort);
    params.set('page', newPage.toString());
    return `/properties?${params.toString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-[#5B6F66] font-medium mb-1">
            <Link href="/" className="hover:text-[#0D4A36]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0D4A36] font-semibold">Property Portfolio</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D4A36]">
            Available Properties in Nigeria
          </h1>
          <p className="text-xs sm:text-sm text-[#5B6F66] mt-1">
            Showing {total} verified residential, commercial, and land opportunities with authenticated titles.
          </p>
        </div>

        {/* Filter Bar with Suspense for useSearchParams */}
        <Suspense fallback={<div className="h-24 bg-white rounded-2xl animate-pulse mb-8" />}>
          <PropertyFilterBar
            initialListingType={resolvedParams.type || 'all'}
            initialQuery={resolvedParams.q || ''}
            initialCategory={resolvedParams.category || 'all'}
            initialMinPrice={resolvedParams.min_price || ''}
            initialMaxPrice={resolvedParams.max_price || ''}
            initialBedrooms={resolvedParams.bedrooms || 'any'}
            initialSort={resolvedParams.sort || 'newest'}
          />
        </Suspense>

        {/* Properties Grid or Empty State */}
        {properties.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 pt-6 border-t border-[#0D4A36]/10 flex items-center justify-between">
                <div className="text-xs text-[#5B6F66]">
                  Page <span className="font-semibold text-[#0D4A36]">{page}</span> of{' '}
                  <span className="font-semibold text-[#0D4A36]">{totalPages}</span>
                </div>

                <div className="flex items-center gap-2">
                  {page > 1 && (
                    <Link
                      href={createPageUrl(page - 1)}
                      className="px-4 py-2 bg-white text-xs font-semibold uppercase tracking-wider text-[#0D4A36] rounded-xl border border-[#0D4A36]/20 hover:bg-[#FAF9F6] transition-colors"
                    >
                      Previous
                    </Link>
                  )}

                  {page < totalPages && (
                    <Link
                      href={createPageUrl(page + 1)}
                      className="px-4 py-2 bg-[#0D4A36] text-xs font-semibold uppercase tracking-wider text-white rounded-xl hover:bg-[#093527] transition-colors shadow-xs"
                    >
                      Next Page
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#DFBE6C]/30 p-12 text-center max-w-lg mx-auto shadow-md">
            <SearchX className="w-12 h-12 text-[#5B6F66] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0D4A36]">No matching properties found</h3>
            <p className="text-xs text-[#5B6F66] mt-2 leading-relaxed">
              We couldn&apos;t find listings matching your current filter criteria. Try adjusting your
              location, price range, or category.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/properties"
                className="px-5 py-2.5 bg-[#0D4A36] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#093527] transition-colors shadow-xs"
              >
                Clear All Filters
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[#FAF9F6] text-[#0D4A36] border border-[#0D4A36]/20 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F5F3EC] transition-colors"
              >
                Request Custom Search
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
