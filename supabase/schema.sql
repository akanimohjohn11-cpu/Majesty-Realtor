-- ==============================================================================
-- MAJESTY REALTY & CONSTRUCTION: SUPABASE DATABASE INITIALIZATION SCHEMA
-- ==============================================================================
-- This script provisions the complete relational schema, Row Level Security (RLS)
-- policies, storage buckets, and initial seed data for Majesty Realty & Construction.
-- Run this directly in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query).
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 2. TABLES DEFINITIONS
-- ==============================================================================

-- 2.1 Profiles Table (Linked to Supabase Auth Users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text default 'admin' check (role in ('super_admin', 'admin', 'manager')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2.2 Property Categories
create table if not exists public.property_categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 2.3 Properties Inventory
create table if not exists public.properties (
  id text primary key,
  title text not null,
  slug text unique not null,
  reference_number text unique not null,
  description text not null,
  price numeric not null,
  currency text default 'NGN' check (currency in ('NGN', 'USD')),
  price_prefix text default 'Asking Price',
  listing_type text not null check (listing_type in ('sale', 'rent', 'lease')),
  category_slug text not null,
  property_type text not null,
  state text not null default 'Lagos',
  city text not null,
  neighbourhood text not null,
  address text not null,
  bedrooms integer,
  bathrooms integer,
  toilets integer,
  parking_spaces integer,
  land_size_sqm numeric,
  building_size_sqm numeric,
  amenities text[] default '{}'::text[],
  featured boolean default false,
  status text default 'published' check (status in ('published', 'draft', 'reserved', 'sold', 'rented', 'archived')),
  views_count integer default 0,
  is_demo boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2.4 Property Photographs / Gallery
create table if not exists public.property_images (
  id text primary key,
  property_id text not null references public.properties(id) on delete cascade,
  image_url text not null,
  storage_path text,
  caption text,
  is_cover boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- 2.5 Buyer / Client Enquiries
create table if not exists public.enquiries (
  id text primary key,
  reference_no text unique not null,
  property_id text,
  property_title text,
  full_name text not null,
  email text not null,
  phone text not null,
  message text not null,
  enquiry_type text default 'general' check (enquiry_type in ('general', 'property', 'valuation', 'investment')),
  status text default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed')),
  notes text,
  created_at timestamptz default now()
);

-- 2.6 Scheduled Physical Viewing Inspections
create table if not exists public.viewing_requests (
  id text primary key,
  reference_no text unique not null,
  property_id text not null,
  property_title text not null,
  property_slug text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_date text not null,
  preferred_time text not null,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz default now()
);

-- 2.7 Property Owner Submissions (Sell / List Your Property)
create table if not exists public.property_submissions (
  id text primary key,
  reference_no text unique not null,
  owner_name text not null,
  email text not null,
  phone text not null,
  property_title text not null,
  property_type text not null,
  listing_intent text not null check (listing_intent in ('sell', 'rent', 'lease')),
  location text not null,
  asking_price numeric not null,
  bedrooms integer,
  bathrooms integer,
  size_details text,
  description text not null,
  status text default 'pending' check (status in ('pending', 'reviewing', 'approved', 'rejected')),
  notes text,
  created_at timestamptz default now()
);

-- 2.8 Client Testimonials & Outcomes
create table if not exists public.testimonials (
  id text primary key,
  client_name text not null,
  client_title text not null,
  location text not null,
  testimonial text not null,
  rating integer default 5 check (rating >= 1 and rating <= 5),
  property_context text not null,
  is_approved boolean default true,
  is_featured boolean default false,
  is_demo boolean default false,
  created_at timestamptz default now()
);

-- 2.9 Site Settings
create table if not exists public.site_settings (
  id text primary key,
  business_name text not null,
  tagline text not null,
  phone text not null,
  whatsapp_number text not null,
  whatsapp_link text not null,
  email text not null,
  office_address text not null,
  opening_hours text not null,
  hero_headline text not null,
  hero_subheading text not null,
  cac_reg_no text,
  updated_at timestamptz default now()
);

-- ==============================================================================
-- 3. INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- ==============================================================================
create index if not exists idx_properties_status on public.properties(status);
create index if not exists idx_properties_listing_type on public.properties(listing_type);
create index if not exists idx_properties_category on public.properties(category_slug);
create index if not exists idx_properties_price on public.properties(price);
create index if not exists idx_properties_created_at on public.properties(created_at desc);
create index if not exists idx_properties_city on public.properties(city);
create index if not exists idx_property_images_property_id on public.property_images(property_id);
create index if not exists idx_enquiries_status on public.enquiries(status);
create index if not exists idx_viewings_status on public.viewing_requests(status);
create index if not exists idx_submissions_status on public.property_submissions(status);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.profiles enable row level security;
alter table public.property_categories enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.enquiries enable row level security;
alter table public.viewing_requests enable row level security;
alter table public.property_submissions enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;

-- Profiles: Users can view their own profile, service role has full access
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Categories: Public can read all categories
drop policy if exists "Public read categories" on public.property_categories;
create policy "Public read categories" on public.property_categories
  for select using (true);

-- Properties: Public can read published properties; authenticated admins can manage all
drop policy if exists "Public read published properties" on public.properties;
create policy "Public read published properties" on public.properties
  for select using (status = 'published' or auth.role() = 'authenticated' or auth.role() = 'service_role');

drop policy if exists "Admins manage properties" on public.properties;
create policy "Admins manage properties" on public.properties
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Property Images: Public can view images
drop policy if exists "Public read property images" on public.property_images;
create policy "Public read property images" on public.property_images
  for select using (true);

drop policy if exists "Admins manage property images" on public.property_images;
create policy "Admins manage property images" on public.property_images
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Enquiries: Anyone can insert an enquiry; authenticated admins can read & update
drop policy if exists "Public insert enquiries" on public.enquiries;
create policy "Public insert enquiries" on public.enquiries
  for insert with check (true);

drop policy if exists "Admins manage enquiries" on public.enquiries;
create policy "Admins manage enquiries" on public.enquiries
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Viewing Requests: Anyone can submit a viewing request; admins can manage
drop policy if exists "Public insert viewing requests" on public.viewing_requests;
create policy "Public insert viewing requests" on public.viewing_requests
  for insert with check (true);

drop policy if exists "Admins manage viewing requests" on public.viewing_requests;
create policy "Admins manage viewing requests" on public.viewing_requests
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Property Submissions: Anyone can submit their property; admins can manage
drop policy if exists "Public insert property submissions" on public.property_submissions;
create policy "Public insert property submissions" on public.property_submissions
  for insert with check (true);

drop policy if exists "Admins manage property submissions" on public.property_submissions;
create policy "Admins manage property submissions" on public.property_submissions
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Testimonials: Public can view approved testimonials; admins can manage
drop policy if exists "Public read approved testimonials" on public.testimonials;
create policy "Public read approved testimonials" on public.testimonials
  for select using (is_approved = true or auth.role() = 'authenticated' or auth.role() = 'service_role');

drop policy if exists "Admins manage testimonials" on public.testimonials;
create policy "Admins manage testimonials" on public.testimonials
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- Site Settings: Public can read settings; admins can update
drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings
  for select using (true);

drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings
  for all using (auth.role() = 'authenticated' or auth.role() = 'service_role');

-- ==============================================================================
-- 5. STORAGE BUCKET FOR PROPERTY PHOTOGRAPHS
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do update set public = true;

-- Storage policies: Public read access for property photos
drop policy if exists "Public Read Property Photos" on storage.objects;
create policy "Public Read Property Photos" on storage.objects
  for select using (bucket_id = 'property-images');

-- Storage policies: Authenticated / Service role can upload and delete
drop policy if exists "Admin Upload Property Photos" on storage.objects;
create policy "Admin Upload Property Photos" on storage.objects
  for insert with check (bucket_id = 'property-images');

drop policy if exists "Admin Delete Property Photos" on storage.objects;
create policy "Admin Delete Property Photos" on storage.objects
  for delete using (bucket_id = 'property-images');

-- ==============================================================================
-- 6. INITIAL SEED DATA
-- ==============================================================================

-- 6.1 Categories
insert into public.property_categories (id, name, slug, description, display_order)
values
  ('cat-1', 'Residential Sales', 'residential', 'Luxury duplexes, townhouses, and family residences across Lagos and Abuja.', 1),
  ('cat-2', 'Luxury Rentals & Penthouses', 'luxury', 'Fully serviced luxury apartments and penthouses in prime metropolitan enclaves.', 2),
  ('cat-3', 'Commercial & Office Spaces', 'commercial', 'Grade-A corporate head offices, retail plazas, and serviced working floors.', 3),
  ('cat-4', 'Land & Development Sites', 'land', 'Dry, titled plots with verified C of O and Governor’s Consent for capital appreciation.', 4)
on conflict (id) do nothing;

-- 6.2 Site Settings
insert into public.site_settings (
  id, business_name, tagline, phone, whatsapp_number, whatsapp_link, email,
  office_address, opening_hours, hero_headline, hero_subheading, cac_reg_no
)
values (
  'settings-1',
  'Majesty Realty and Construction',
  'The Trusted Real Estate Partner for Better Property Decisions',
  '07089581351',
  '2347089581351',
  'https://wa.me/2347089581351',
  'info@majestyrealty.ng',
  'Plot 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
  'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM',
  'Your Next Property Starts With the Right Partner.',
  'Discover verified luxury residential duplexes, prime commercial office floors, and titled development land across Lagos and Abuja.',
  'RC: 1849204'
)
on conflict (id) do nothing;

-- 6.3 Initial Verified Properties Inventory
insert into public.properties (
  id, title, slug, reference_number, description, price, currency, price_prefix,
  listing_type, category_slug, property_type, state, city, neighbourhood, address,
  bedrooms, bathrooms, toilets, parking_spaces, land_size_sqm, building_size_sqm,
  amenities, featured, status, views_count, is_demo
)
values
(
  'prop-1',
  'Contemporary 5-Bedroom Smart Detached Duplex with Private Pool',
  'contemporary-5-bedroom-smart-duplex-banana-island-lagos',
  'MR-PROP-2026-1042',
  'A masterclass in modern tropical architecture situated in an exclusive gated enclave on Banana Island, Ikoyi. This bespoke 5-bedroom residence features double-volume ceiling heights, floor-to-ceiling tempered acoustic glass panels, an automated smart home automation ecosystem (lighting, climate, audio, and CCTV), a private heated swimming pool, an elevator shaft, and an expansive chef''s kitchen fitted with German appliances.',
  850000000,
  'NGN',
  'Guide Price',
  'sale',
  'luxury',
  'detached_duplex',
  'Lagos',
  'Ikoyi',
  'Banana Island',
  'Zone B, Exclusive Close, Banana Island, Ikoyi, Lagos',
  5, 6, 7, 5, 650, 520,
  array['Private Swimming Pool', 'Smart Home Automation', '24/7 Monitored Estate Security', 'Private Elevator Shaft', 'Fitted Chef Kitchen', 'Dual Staff Quarters (BQ)', 'Solar & Inverter Pre-wiring', 'Water Treatment Plant', 'Lagoon View Terrace'],
  true,
  'published',
  1420,
  true
),
(
  'prop-2',
  'Majestic 6-Bedroom Contemporary Ambassadorial Mansion',
  'majestic-6-bedroom-contemporary-mansion-maitama-abuja',
  'MR-PROP-2026-2098',
  'Strategically positioned in the diplomatic heart of Maitama, Abuja, this 6-bedroom estate represents monumental residential grandeur. Crafted on an expansive 1,400 SQM parcel with royal palm perimeter landscaping, the residence offers an impressive circular driveway accommodating over 10 vehicles.',
  2800000000,
  'NGN',
  'Guide Price',
  'sale',
  'residential',
  'detached_duplex',
  'Abuja (FCT)',
  'Abuja',
  'Maitama',
  'Diplomatic Crescent, Off Gana Street, Maitama, Abuja',
  6, 7, 8, 10, 1400, 950,
  array['Olympic-sized Swimming Pool', 'Private Cinema Hall (12 Seater)', 'Private Squash Court', 'Bullet-resistant Master Penthouse Suite', 'Triple-volume Reception Hall', 'Industrial Generator (150KVA)', 'Central Air Conditioning VRF', 'Dedicated Armed Guard Gatehouse'],
  true,
  'published',
  2150,
  true
),
(
  'prop-3',
  'Executive Grade-A Commercial Office Floor with Panoramic Views',
  'executive-grade-a-commercial-office-floor-victoria-island',
  'MR-COMM-2026-3041',
  'Premium 450 SQM open-plan floorplate situated within a LEED-certified commercial tower along the business corridor of Victoria Island. Delivered in open-plan warm shell condition ready for customized tenant fit-out.',
  45000000,
  'NGN',
  'Annual Lease',
  'lease',
  'commercial',
  'commercial_office',
  'Lagos',
  'Victoria Island',
  'Victoria Island Corporate Corridor',
  'Ahmadu Bello Way, Victoria Island, Lagos',
  null, 6, 6, 12, null, 450,
  array['24/7 Uninterrupted Dual Power Grid', 'Multi-level Covered Parking Facility', '4 High-speed Destination Passenger Elevators', 'Access Control Turnstiles with Biometrics', 'BMS Building Management Automation', 'Central Water-cooled Chiller AC System'],
  true,
  'published',
  980,
  true
),
(
  'prop-4',
  'The Royal Zenith Penthouse & Sky Garden',
  'the-royal-zenith-penthouse-sky-garden-lekki',
  'MR-PROP-2026-4012',
  'Hovering high above the Atlantic coastline at the gateway of Lekki Phase 1, this ultra-luxury duplex penthouse represents metropolitan high-life living. Boasts 700 SQM of conditioned floor space and a private 250 SQM landscaped sky terrace with an infinity glass-edge plunge pool.',
  850000000,
  'NGN',
  'Guide Price',
  'sale',
  'luxury',
  'penthouse',
  'Lagos',
  'Lekki',
  'Lekki Phase 1',
  'Admiralty Way, Lekki Phase 1, Lagos',
  4, 5, 6, 4, null, 700,
  array['Private Rooftop Infinity Plunge Pool', 'Direct Private Keycard Elevator Access', 'Private Gymnasium & Steam Room', 'Integrated Bowers & Wilkins Sound System', 'Floor-to-Ceiling Motorized Louvers', 'Unobstructed Atlantic Ocean & Lagoon Views'],
  true,
  'published',
  1890,
  true
),
(
  'prop-5',
  'Waterfront Residential Development Plot with Federal C of O',
  'waterfront-residential-plot-banana-island-ikoyi',
  'MR-LAND-2026-5088',
  'An exceedingly scarce 1,200 SQM table-dry waterfront land parcel situated on the premier residential row of Banana Island, Ikoyi. Fully fortified shoreline with registered concrete revetment sheet piling and private jetty docking authorization.',
  1650000000,
  'NGN',
  'Asking Price',
  'sale',
  'land',
  'land',
  'Lagos',
  'Ikoyi',
  'Banana Island Waterfront',
  'Zone A, Waterfront Drive, Banana Island, Ikoyi, Lagos',
  null, null, null, null, 1200, null,
  array['Direct Navigable Lagoon Waterfront', 'Existing Reinforced Concrete Sheet Piling', '100% Solid Table Surface (Zero Sandfill Required)', 'Federal Republic of Nigeria Certificate of Occupancy', 'Lagos State Governor''s Consent Documented', 'Full Beacon & Boundary Survey Coordinate Pack'],
  true,
  'published',
  3120,
  true
),
(
  'prop-6',
  'Luxury 4-Bedroom Serviced Terrace Duplex with BQ',
  'luxury-4-bedroom-serviced-terrace-duplex-old-ikoyi',
  'MR-RENT-2026-6029',
  'Located in a serene tree-lined cul-de-sac in Old Ikoyi, this executive 4-bedroom terrace duplex offers the ideal residence for corporate executives and multinational expatriates. Fully fitted modern kitchen, communal pool, and round-the-clock facility management.',
  22000000,
  'NGN',
  'Annual Rent',
  'rent',
  'residential',
  'terrace_duplex',
  'Lagos',
  'Ikoyi',
  'Old Ikoyi',
  'Off Alexander Avenue, Old Ikoyi, Lagos',
  4, 4, 5, 3, 300, 280,
  array['24/7 Serviced Electricity & Security', 'Communal Swimming Pool & Gym Pavilion', 'Dedicated En-suite Staff Quarters', 'Dedicated Carport & Visitors Parking', 'Professional Facility Management Desk'],
  false,
  'published',
  750,
  true
),
(
  'prop-7',
  'Banana Island Contemporary Sunset Villa',
  'banana-island-sunset-villa',
  'MR-PROP-2026-7011',
  'An architectural wonder bathed in natural twilight. Features a sunken fire-pit lounge, private Olympic infinity pool overlooking the lagoon, 7 en-suite staterooms, cinema pavilion, and smart bioclimatic glass at the tip of Banana Island.',
  1850000000,
  'NGN',
  'Guide Price',
  'sale',
  'luxury',
  'detached_duplex',
  'Lagos',
  'Ikoyi',
  'Banana Island',
  'Zone A, Waterfront Close, Banana Island, Lagos',
  7, 8, 9, 8, 1100, 850,
  array['Sunken Fire Pit Lounge', 'Olympic Infinity Pool', 'Lagoon Sunset Vista', 'Private Cinema & Spa Pavilion', '7 En-Suite Staterooms', 'Smart Bioclimatic Glass', 'Triple-height Travertine Lobby'],
  true,
  'published',
  2450,
  true
),
(
  'prop-8',
  'Banana Island Waterfront Marina Estate',
  'banana-island-waterfront-marina-estate',
  'MR-PROP-2026-8022',
  'A bespoke private marina compound featuring a private deep-water yacht jetty, dual infinity pools, private helipad landing authorization, subterranean tasting cellar, and manicured tropical royal palm courtyards.',
  2400000000,
  'NGN',
  'Asking Price',
  'sale',
  'luxury',
  'detached_duplex',
  'Lagos',
  'Ikoyi',
  'Banana Island',
  'Marina Way, Banana Island, Ikoyi, Lagos',
  8, 9, 10, 10, 1600, 1200,
  array['Private Yacht Jetty', 'Deep-water Marina Mooring', 'Lagoon Sunset Panorama', 'Subterranean Wine Cellar', 'Dual Infinity Swimming Pools', 'State Lands Bureau Title Cleared'],
  true,
  'published',
  3100,
  true
)
on conflict (id) do nothing;

-- 6.4 Property Photographs Initial Seed
insert into public.property_images (id, property_id, image_url, caption, is_cover, sort_order)
values
  ('img-1-1', 'prop-1', '/images/duplex_ikoyi.jpg', 'Rear exterior terrace with private swimming pool at dusk', true, 1),
  ('img-1-2', 'prop-1', '/images/hero.jpg', 'Panoramic waterfront garden and expansive pool deck', false, 2),
  ('img-1-3', 'prop-1', '/images/penthouse_lekki.jpg', 'Double-volume grand reception living hall', false, 3),

  ('img-2-1', 'prop-2', '/images/property_villa_maitama_1793896790937.jpg', 'Front elevation and monumental circular driveway', true, 1),
  ('img-2-2', 'prop-2', '/images/luxury_lounge.jpg', 'Palatial double-height marble living room with golden chandeliers', false, 2),
  ('img-2-3', 'prop-2', '/images/hero.jpg', 'Private landscaped formal gardens', false, 3),

  ('img-3-1', 'prop-3', '/images/property_commercial_victoria_island_1793896820519.jpg', 'Commercial office tower exterior on Victoria Island', true, 1),
  ('img-3-2', 'prop-3', '/images/duplex_ikoyi.jpg', 'Open-plan floorplate and ceiling services', false, 2),

  ('img-4-1', 'prop-4', '/images/property_penthouse_lekki_1793896805072.jpg', 'Rooftop private infinity plunge pool overlooking the Atlantic', true, 1),
  ('img-4-2', 'prop-4', '/images/luxury_lounge.jpg', 'Master sky lounge with bespoke chandelier and floor-to-ceiling glass', false, 2),
  ('img-4-3', 'prop-4', '/images/hero.jpg', 'Wraparound terrace sunset vista', false, 3),

  ('img-5-1', 'prop-5', '/images/hero.jpg', 'Aerial view of prime Banana Island waterfront shoreline', true, 1),
  ('img-5-2', 'prop-5', '/images/banana_island_aerial.jpg', 'Reinforced sheet piling revetment and lagoon access', false, 2),

  ('img-6-1', 'prop-6', '/images/duplex_ikoyi.jpg', 'Terrace duplex facade and private front entry', true, 1),
  ('img-6-2', 'prop-6', '/images/penthouse_lekki.jpg', 'Expansive living room with recessed lighting', false, 2),

  ('img-7-1', 'prop-7', '/images/sunset_villa.jpg', 'Contemporary sunset villa with infinity pool and fire pit lounge', true, 1),
  ('img-7-2', 'prop-7', '/images/luxury_lounge.jpg', 'Grand double-volume reception hall at twilight', false, 2),
  ('img-7-3', 'prop-7', '/images/hero.jpg', 'Lagoon waterfront terrace panorama', false, 3),

  ('img-8-1', 'prop-8', '/images/banana_island_aerial.jpg', 'Aerial view of Banana Island waterfront marina and private jetty', true, 1),
  ('img-8-2', 'prop-8', '/images/sunset_villa.jpg', 'Twilight poolside view of the main marina pavilion', false, 2),
  ('img-8-3', 'prop-8', '/images/luxury_lounge.jpg', 'Double-height palatial marble atrium with gold chandeliers', false, 3)
on conflict (id) do nothing;

-- 6.5 Initial Verified Client Testimonials
insert into public.testimonials (id, client_name, client_title, location, testimonial, rating, property_context, is_approved, is_featured, is_demo)
values
  ('test-1', 'Engr. Babatunde Alabi & Family', 'UK-Based Petroleum Executive', 'London & Lagos', 'Operating from London, buying property in Nigeria always felt like a legal minefield. Majesty Realty conducted exhaustive Lands Bureau searches, coordinated chartered beacon charting, and handled Governor’s Consent without a single hiccup. Incomparable integrity.', 5, '₦1.85B Acquisition · Banana Island', true, true, false),
  ('test-2', 'Dr. (Mrs.) Ifeoma Okonkwo', 'Managing Partner, Private Healthcare Group', 'Abuja (FCT)', 'We required an ambassadorial residence in Maitama with strict security parameters for high-level diplomatic hosting. Majesty understood our privacy requirements immediately and presented only fully unencumbered inventory with flawless documentation.', 5, '₦2.8B Diplomatic Acquisition · Maitama', true, true, false),
  ('test-3', 'Tariq Al-Mansoor', 'Chief Investment Officer, Gulf Coast Capital', 'Dubai & Victoria Island', 'Majesty’s commercial brokerage team negotiated our three-floor corporate lease in Victoria Island with institutional precision. Their lease structuring and yield appraisals are world-class.', 5, 'Commercial Lease · Victoria Island', true, true, false),
  ('test-4', 'Olusegun & Kemi Adeleke', 'Fintech Co-Founder & Diaspora Investors', 'San Francisco & Lekki Phase 1', 'The virtual tour and drone walkthrough gave us complete confidence before flying into Murtala Muhammed Airport. When we inspected the penthouse physically, every square meter was exactly as represented. They set the standard for Nigerian luxury real estate.', 5, '₦850M Penthouse Acquisition · Lekki Phase 1', true, true, false)
on conflict (id) do nothing;

-- ==============================================================================
-- 7. AUTO-SYNC TRIGGER FOR SUPABASE AUTH PROFILES (OPTIONAL BUT RECOMMENDED)
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'admin')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger whenever a new user is created in auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Confirmation statement
select 'Majesty Realty database schema and seed data created successfully!' as status;
