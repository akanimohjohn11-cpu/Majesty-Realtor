'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Car, Maximize2, MapPin, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Property } from '@/lib/types';
import { formatNaira, formatPropertyType, formatListingType, buildWhatsAppLink } from '@/lib/format';

interface PropertyCardProps {
  property: Property;
  onScheduleViewing?: (property: Property) => void;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isRental = property.listing_type === 'rent' || property.listing_type === 'lease';
  const priceDisplay = formatNaira(property.price, isRental);

  const initialCover =
    property.images?.find((img) => img.is_cover)?.image_url ||
    property.images?.[0]?.image_url ||
    '/images/hero.jpg';

  const [imgSrc, setImgSrc] = useState(initialCover);

  const waLink = buildWhatsAppLink('2347089581351', {
    title: property.title,
    reference_number: property.reference_number,
    price: property.price,
    listing_type: property.listing_type,
    neighbourhood: property.neighbourhood,
    city: property.city,
  });

  return (
    <article className="group bg-white rounded-2xl border border-[#0D4A36]/12 overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Visual Carrier */}
      <div className="relative aspect-4/3 w-full bg-[#F5EEDB] overflow-hidden">
        <Link href={`/properties/${property.slug}`} className="block w-full h-full">
          <Image
            src={imgSrc}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            onError={() => {
              if (imgSrc !== '/images/hero.jpg') {
                setImgSrc('/images/hero.jpg');
              }
            }}
            className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Minimalist Top Gradient Scrim for Contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Unboxed Metadata in Overlay Top Row */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between text-xs text-white drop-shadow-sm font-medium">
          <div className="flex items-center gap-1.5 bg-[#0D4A36]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-[#DFBE6C] border border-white/10">
            <span>{formatListingType(property.listing_type)}</span>
          </div>

          <span className="text-[10px] text-[#FAF9F6] tabular-nums font-mono bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
            {property.reference_number}
          </span>
        </div>

        {/* Demo Indicator Note if applicable */}
        {property.is_demo && (
          <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-[#DFBE6C] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
            Verified Showcase
          </div>
        )}
      </div>

      {/* Card Content Block */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Unboxed Category and Location Kicker */}
          <div className="flex items-center gap-2 text-xs text-[#5B6F66] mb-1.5 font-medium">
            <span className="text-[#0D4A36] font-semibold">{formatPropertyType(property.property_type)}</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span className="flex items-center gap-1 text-[#1E332B] truncate">
              <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
              <span>{property.neighbourhood}, {property.city}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-[#0D4A36] group-hover:text-[#093527] transition-colors line-clamp-2 leading-snug">
            <Link href={`/properties/${property.slug}`}>
              {property.title}
            </Link>
          </h3>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            {property.price_prefix && (
              <span className="text-[11px] text-[#5B6F66] font-medium">{property.price_prefix}</span>
            )}
            <span className="text-lg font-extrabold text-[#0D4A36] tabular-nums font-mono">
              {priceDisplay}
            </span>
          </div>
        </div>

        {/* Specifications Strip */}
        <div className="pt-3 border-t border-[#0D4A36]/8 flex items-center justify-between text-xs text-[#5B6F66]">
          {property.bedrooms != null && (
            <div className="flex items-center gap-1.5" title={`${property.bedrooms} Bedrooms`}>
              <Bed className="w-3.5 h-3.5 text-[#0D4A36]" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}

          {property.bathrooms != null && (
            <div className="flex items-center gap-1.5" title={`${property.bathrooms} Bathrooms`}>
              <Bath className="w-3.5 h-3.5 text-[#0D4A36]" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}

          {property.parking_spaces != null && (
            <div className="flex items-center gap-1.5" title={`${property.parking_spaces} Parking Spaces`}>
              <Car className="w-3.5 h-3.5 text-[#0D4A36]" />
              <span>{property.parking_spaces} Cars</span>
            </div>
          )}

          {property.land_size_sqm != null ? (
            <div className="flex items-center gap-1.5" title={`${property.land_size_sqm} SQM Land Area`}>
              <Maximize2 className="w-3.5 h-3.5 text-[#0D4A36]" />
              <span>{property.land_size_sqm} m²</span>
            </div>
          ) : property.building_size_sqm != null ? (
            <div className="flex items-center gap-1.5" title={`${property.building_size_sqm} SQM Building Area`}>
              <Maximize2 className="w-3.5 h-3.5 text-[#0D4A36]" />
              <span>{property.building_size_sqm} m²</span>
            </div>
          ) : null}
        </div>

        {/* Action Row */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider text-[#0D4A36] bg-[#FAF9F6] hover:bg-[#F5EEDB] border border-[#0D4A36]/15 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Inquire on WhatsApp with prefilled property details"
            className="p-2 text-[#0D4A36] hover:text-white bg-[#F5EEDB] hover:bg-[#0D4A36] rounded-lg border border-[#0D4A36]/10 transition-colors"
            aria-label="Inquire about property on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
