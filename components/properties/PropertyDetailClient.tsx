'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Property } from '@/lib/types';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  Calendar,
  MessageSquare,
  Phone,
  ShieldCheck,
  Check,
  Share2,
  ChevronLeft,
  ChevronRight,
  Maximize,
  X,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';
import { formatNaira, formatPropertyType, formatListingType, buildWhatsAppLink } from '@/lib/format';
import ViewingRequestModal from './ViewingRequestModal';

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [copied, setCopied] = useState(false);

  const images =
    property.images && property.images.length > 0
      ? property.images
      : [
          {
            id: 'placeholder',
            property_id: property.id,
            image_url: '/images/hero.jpg',
            caption: property.title,
            is_cover: true,
            sort_order: 0,
            created_at: new Date().toISOString(),
          },
        ];

  // Auto-play slideshow if enabled
  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const activeImage = images[activeImageIndex] || images[0];
  const isRental = property.listing_type === 'rent' || property.listing_type === 'lease';
  const priceDisplay = formatNaira(property.price, isRental);

  const waLink = buildWhatsAppLink('2347089581351', {
    title: property.title,
    reference_number: property.reference_number,
    price: property.price,
    listing_type: property.listing_type,
    neighbourhood: property.neighbourhood,
    city: property.city,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-10">
      {/* Visual Gallery Block */}
      <div className="space-y-4">
        {/* Main High-Resolution Showcase Stage */}
        <div className="relative aspect-16/9 sm:aspect-16/10 w-full bg-[#1E332B] rounded-2xl overflow-hidden border border-[#DFBE6C]/30 shadow-lg group">
          <Image
            src={activeImage.image_url}
            alt={activeImage.caption || property.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            referrerPolicy="no-referrer"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          />

          {/* Top Scrim Overlay */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs text-white z-10">
            <div className="flex items-center gap-2 bg-[#0D4A36]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full font-medium text-xs text-[#FAF9F6] border border-[#DFBE6C]/30 shadow-md">
              <span className="text-[#DFBE6C]">{formatListingType(property.listing_type)}</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span>{formatPropertyType(property.property_type)}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="bg-black/60 hover:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium transition-colors border border-white/15"
                title="Copy property link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-[#DFBE6C]" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => setLightboxOpen(true)}
                className="bg-black/60 hover:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium transition-colors border border-white/15"
                title="Expand Fullscreen Lightbox"
              >
                <Maximize className="w-3.5 h-3.5 text-[#DFBE6C]" />
                <span className="hidden sm:inline">Lightbox</span>
              </button>

              <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full font-mono text-xs border border-white/15">
                Ref: {property.reference_number}
              </span>
            </div>
          </div>

          {/* Carousel Slide Navigation Arrows (visible if >1 image) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all z-10"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all z-10"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Bottom Overlay Ribbon: Caption + Slide Counter + Autoplay */}
          <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-xs z-10">
            <div className="bg-black/70 backdrop-blur-md text-[#FAF9F6] text-xs px-3.5 py-1.5 rounded-full border border-white/15 max-w-md truncate">
              {activeImage.caption || `${property.title} – View ${activeImageIndex + 1}`}
            </div>

            <div className="flex items-center gap-2">
              {images.length > 1 && (
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-[#DFBE6C] text-xs px-2.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1 transition-colors"
                  title={isAutoPlay ? 'Pause Slideshow' : 'Start Slideshow'}
                >
                  {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
                  <span className="hidden sm:inline">{isAutoPlay ? 'Pause' : 'Play Slides'}</span>
                </button>
              )}

              <span className="bg-black/70 backdrop-blur-md text-[#DFBE6C] font-mono text-xs px-3 py-1.5 rounded-full border border-white/15">
                0{activeImageIndex + 1} / 0{images.length}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Carousel Selector */}
        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIsAutoPlay(false);
                }}
                className={`relative w-24 h-16 sm:w-28 sm:h-20 shrink-0 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-102 shadow-md'
                    : 'border-[#0D4A36]/20 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={img.caption || `Photograph ${idx + 1}`}
                  fill
                  sizes="120px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Specifications & Conversion Desk Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Details, Specifications, Amenities */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B6F66] font-medium mb-2">
              <span>{property.state}</span>
              <span aria-hidden="true">·</span>
              <span>{property.city}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#0D4A36] font-semibold">{property.neighbourhood}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0D4A36] leading-tight">
              {property.title}
            </h1>

            <p className="text-xs text-[#5B6F66] mt-2">
              Exact Address / Zone: <span className="text-[#1E332B] font-medium">{property.address}</span>
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="bg-white p-5 rounded-2xl border border-[#DFBE6C]/30 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            {property.bedrooms != null && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36]">
                  <Bed className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[#5B6F66] text-[11px]">Bedrooms</span>
                  <span className="font-bold text-[#0D4A36] text-sm">{property.bedrooms} En-Suite</span>
                </div>
              </div>
            )}

            {property.bathrooms != null && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36]">
                  <Bath className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[#5B6F66] text-[11px]">Bathrooms</span>
                  <span className="font-bold text-[#0D4A36] text-sm">{property.bathrooms} Baths</span>
                </div>
              </div>
            )}

            {property.parking_spaces != null && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36]">
                  <Car className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[#5B6F66] text-[11px]">Parking</span>
                  <span className="font-bold text-[#0D4A36] text-sm">{property.parking_spaces} Vehicles</span>
                </div>
              </div>
            )}

            {property.land_size_sqm != null ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36]">
                  <Maximize2 className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[#5B6F66] text-[11px]">Land Area</span>
                  <span className="font-bold text-[#0D4A36] text-sm">{property.land_size_sqm} m²</span>
                </div>
              </div>
            ) : property.building_size_sqm != null ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36]">
                  <Maximize2 className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-[#5B6F66] text-[11px]">Gross Floor</span>
                  <span className="font-bold text-[#0D4A36] text-sm">{property.building_size_sqm} m²</span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Description Block */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#0D4A36] pb-2 border-b border-[#0D4A36]/10">
              Property Overview & Architectural Highlights
            </h2>
            <div className="text-sm text-[#1E332B] leading-relaxed whitespace-pre-line">
              {property.description}
            </div>
          </div>

          {/* Verified Amenities & Infrastructure List */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#0D4A36] pb-2 border-b border-[#0D4A36]/10">
                Verified Amenities & Facilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white border border-[#DFBE6C]/25 text-xs font-medium text-[#1E332B] shadow-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#0D4A36]/10 flex items-center justify-center text-[#0D4A36] shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#0D4A36]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Title & Due Diligence Advisory Box */}
          <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#DFBE6C]/40 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0D4A36] text-[#DFBE6C] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4A36]">
                Majesty Title & Conveyancing Warranty
              </h4>
              <p className="text-xs text-[#5B6F66] leading-relaxed">
                Prior to financial commitment, our legal department coordinates thorough search at the State Lands Registry, survey coordinate verification with the Office of the Surveyor-General, and confirmation of unencumbered root of title.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Conversion & Action Desk */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white p-6 sm:p-8 rounded-2xl border border-[#DFBE6C]/30 shadow-xl space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6F66] block">
                {property.price_prefix || 'Asking Price'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0D4A36] mt-1 tabular-nums">
                {priceDisplay}
              </div>
              <span className="text-[11px] text-[#5B6F66] block mt-1">
                Inclusive of verified title documentation pack.
              </span>
            </div>

            {/* Conversion Actions Block */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setViewingModalOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-[#0D4A36] to-[#0F5B41] hover:from-[#093527] hover:to-[#0D4A36] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Calendar className="w-4 h-4 text-[#DFBE6C]" />
                <span>Schedule Private Viewing</span>
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#1E332B] hover:bg-[#13221c] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-[#DFBE6C]/40 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#DFBE6C]" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href="tel:+2347089581351"
                className="w-full py-3 bg-[#FAF9F6] hover:bg-[#F5F3EC] text-[#0D4A36] border border-[#0D4A36]/20 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#0D4A36]" />
                <span>Call Broker Desk (0708 958 1351)</span>
              </a>
            </div>

            {/* Lead Time & Inspection Notice */}
            <div className="pt-4 border-t border-[#0D4A36]/10 text-[11px] text-[#5B6F66] space-y-2">
              <div className="flex items-center justify-between">
                <span>Inspection Notice:</span>
                <span className="font-semibold text-[#1E332B]">24 Hours Required</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Access Protocols:</span>
                <span className="font-semibold text-[#1E332B]">Accompanied Agent Only</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security Clearance:</span>
                <span className="font-semibold text-[#1E332B]">Gated Estate Gate Pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6 text-white">
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between z-10">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                {property.title}
              </h3>
              <p className="text-xs text-[#DFBE6C]">
                Photograph {activeImageIndex + 1} of {images.length} · {activeImage.caption || 'Architectural View'}
              </p>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center Image Stage */}
          <div className="relative flex-1 my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={activeImage.image_url}
                alt={activeImage.caption || property.title}
                fill
                priority
                sizes="100vw"
                referrerPolicy="no-referrer"
                className="object-contain"
              />
            </div>

            {/* Lightbox navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Strip */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto py-2 z-10">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border shrink-0 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#DFBE6C] ring-2 ring-[#DFBE6C]'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Viewing Modal */}
      <ViewingRequestModal
        property={property}
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
      />
    </div>
  );
}
