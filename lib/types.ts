export type ListingType = 'sale' | 'rent' | 'lease';

export type PropertyCategorySlug = 'residential' | 'commercial' | 'land' | 'luxury' | 'development';

export type PropertyType =
  | 'detached_duplex'
  | 'semi_detached_duplex'
  | 'terrace_duplex'
  | 'penthouse'
  | 'apartment'
  | 'commercial_office'
  | 'retail_plaza'
  | 'land'
  | 'mixed_use';

export type PropertyStatus =
  | 'published'
  | 'draft'
  | 'reserved'
  | 'sold'
  | 'rented'
  | 'archived';

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  storage_path?: string;
  caption?: string;
  is_cover: boolean;
  sort_order: number;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  reference_number: string;
  description: string;
  price: number;
  currency: 'NGN' | 'USD';
  price_prefix?: string; // e.g. "From" or "Guide Price"
  listing_type: ListingType;
  category_slug: PropertyCategorySlug;
  property_type: PropertyType;
  state: string; // Lagos, Abuja, Rivers, Ogun, etc.
  city: string; // Ikeja, Victoria Island, Ikoyi, Lekki, Maitama, Asokoro, etc.
  neighbourhood: string; // e.g. Banana Island, Guzape, Lekki Phase 1
  address: string;
  bedrooms: number | null;
  bathrooms: number | null;
  toilets: number | null;
  parking_spaces: number | null;
  land_size_sqm: number | null;
  building_size_sqm: number | null;
  amenities: string[];
  featured: boolean;
  status: PropertyStatus;
  views_count: number;
  created_at: string;
  updated_at: string;
  images: PropertyImage[];
  is_demo?: boolean; // clearly flag demo content
}

export interface PropertyCategory {
  id: string;
  name: string;
  slug: PropertyCategorySlug;
  description: string;
  display_order: number;
}

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'closed';

export interface Enquiry {
  id: string;
  reference_no: string;
  property_id?: string;
  property_title?: string;
  full_name: string;
  email: string;
  phone: string;
  message: string;
  enquiry_type: 'general' | 'property' | 'valuation' | 'investment';
  status: EnquiryStatus;
  notes?: string;
  created_at: string;
}

export type ViewingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ViewingRequest {
  id: string;
  reference_no: string;
  property_id: string;
  property_title: string;
  property_slug: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: ViewingStatus;
  created_at: string;
}

export type SubmissionStatus = 'pending' | 'reviewing' | 'approved' | 'rejected';

export interface PropertySubmission {
  id: string;
  reference_no: string;
  owner_name: string;
  email: string;
  phone: string;
  property_title: string;
  property_type: PropertyType;
  listing_intent: 'sell' | 'rent' | 'lease';
  location: string;
  asking_price: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size_details?: string;
  description: string;
  status: SubmissionStatus;
  notes?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  location: string;
  testimonial: string;
  rating: number;
  property_context: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  is_demo?: boolean;
}

export interface SiteSettings {
  id: string;
  business_name: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  whatsapp_link: string;
  email: string;
  office_address: string;
  opening_hours: string;
  hero_headline: string;
  hero_subheading: string;
  cac_reg_no?: string;
  updated_at: string;
}

export interface UserSession {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'manager';
}

export interface PropertyFilterParams {
  query?: string;
  listing_type?: ListingType | 'all';
  category?: string;
  property_type?: string;
  state?: string;
  city?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number | 'any';
  bathrooms?: number | 'any';
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'popular';
  page?: number;
  limit?: number;
}
