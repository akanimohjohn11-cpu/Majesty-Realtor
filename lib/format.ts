import { PropertyType, ListingType } from './types';

/**
 * Format currency in Nigerian Naira (NGN) with clean comma grouping
 */
export function formatNaira(amount: number, isRental = false, suffix?: string): string {
  if (amount == null || isNaN(amount)) return '₦0';

  const formatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

  // en-NG often formats as "NGN 450,000,000" or "₦450,000,000"
  const clean = formatted.replace(/^NGN\s?/, '₦');

  if (suffix) {
    return `${clean}/${suffix}`;
  }

  if (isRental) {
    return `${clean}/year`;
  }

  return clean;
}

/**
 * Generate formatted WhatsApp link with properly URL-encoded pre-filled message
 */
export function buildWhatsAppLink(
  phone: string = '2347089581351',
  property?: {
    title: string;
    reference_number: string;
    price: number;
    listing_type: ListingType;
    neighbourhood: string;
    city: string;
  }
): string {
  // Clean phone to only digits
  const cleanPhone = phone.replace(/\D/g, '');

  if (!property) {
    const defaultMsg =
      'Hello Majesty Realty & Construction, I would like to inquire about your real estate services and available properties.';
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;
  }

  const isRental = property.listing_type === 'rent' || property.listing_type === 'lease';
  const priceFormatted = formatNaira(property.price, isRental);

  const message = `Hello Majesty Realty, I am interested in inquiring about "${property.title}" (Ref: ${property.reference_number}) in ${property.neighbourhood}, ${property.city}, listed for ${priceFormatted}. Please let me know its availability and viewing schedule.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Convert title to URL-safe unique slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate unique reference number (e.g. MR-2026-8941)
 */
export function generateReference(prefix: 'PROP' | 'ENQ' | 'VIEW' | 'SUB' = 'PROP'): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `MR-${prefix}-${year}-${random}`;
}

export function formatPropertyType(type: PropertyType): string {
  const map: Record<PropertyType, string> = {
    detached_duplex: 'Detached Duplex',
    semi_detached_duplex: 'Semi-Detached Duplex',
    terrace_duplex: 'Terrace Duplex',
    penthouse: 'Luxury Penthouse',
    apartment: 'Serviced Apartment',
    commercial_office: 'Commercial Office Space',
    retail_plaza: 'Retail / Shopping Plaza',
    land: 'Dry Land / Development Plot',
    mixed_use: 'Mixed-Use Commercial/Residential',
  };
  return map[type] || 'Real Estate Property';
}

export function formatListingType(type: ListingType): string {
  const map: Record<ListingType, string> = {
    sale: 'For Sale',
    rent: 'For Rent',
    lease: 'For Lease',
  };
  return map[type] || 'Available';
}

export function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}
