import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyDetailClient from '@/components/properties/PropertyDetailClient';
import PropertyCard from '@/components/properties/PropertyCard';
import { repository } from '@/lib/db/repository';
import { formatNaira, formatPropertyType } from '@/lib/format';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await repository.getPropertyBySlug(slug);

  if (!property) {
    return {
      title: 'Property Not Found | Majesty Realty & Construction',
    };
  }

  const isRental = property.listing_type === 'rent' || property.listing_type === 'lease';
  const priceDisplay = formatNaira(property.price, isRental);
  const coverImage = property.images?.[0]?.image_url || '/images/hero.jpg';

  return {
    title: `${property.title} | Majesty Realty`,
    description: `${property.title} located in ${property.neighbourhood}, ${property.city}, ${property.state}. Listed at ${priceDisplay}. Verified real estate inventory by Majesty Realty and Construction.`,
    openGraph: {
      title: `${property.title} - ${priceDisplay}`,
      description: property.description.slice(0, 160),
      images: [coverImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: `${property.neighbourhood}, ${property.city} · ${priceDisplay}`,
      images: [coverImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await repository.getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  // Fetch similar properties in same category or city
  const { properties: allProps } = await repository.getProperties({ limit: 4 });
  const similarProperties = allProps
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#5B6F66] font-medium mb-6">
          <Link href="/" className="hover:text-[#0D4A36]">
            Home
          </Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-[#0D4A36]">
            Properties
          </Link>
          <span>/</span>
          <Link href={`/properties?city=${encodeURIComponent(property.city)}`} className="hover:text-[#0D4A36]">
            {property.city}
          </Link>
          <span>/</span>
          <span className="text-[#0D4A36] font-semibold truncate max-w-xs">{property.title}</span>
        </nav>

        {/* Client Interactive Showcase Stage & Modals */}
        <PropertyDetailClient property={property} />

        {/* Similar Verified Opportunities */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#0D4A36]/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">
                  Similar Opportunities
                </p>
                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#0D4A36]">
                  Explore Related Verified Listings
                </h2>
              </div>
              <Link
                href="/properties"
                className="text-xs font-bold uppercase tracking-wider text-[#0D4A36] hover:text-[#D4AF37] transition-colors"
              >
                View All Listings →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
