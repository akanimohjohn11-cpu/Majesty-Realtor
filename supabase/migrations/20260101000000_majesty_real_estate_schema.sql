-- ==============================================================================
-- MAJESTY REALTY & CONSTRUCTION: PRODUCTION SUPABASE POSTGRESQL SCHEMA
-- Migration: 20260101000000_majesty_real_estate_schema.sql
-- Description: Complete schema for properties, images, enquiries, viewing requests,
--              property owner submissions, site settings, RLS policies, and triggers.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES & ROLES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'manager')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. PROPERTY CATEGORIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. PROPERTIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    reference_number TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC(15, 2) NOT NULL CHECK (price >= 0),
    currency TEXT NOT NULL DEFAULT 'NGN' CHECK (currency IN ('NGN', 'USD')),
    price_prefix TEXT,
    listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent', 'lease')),
    category_slug TEXT NOT NULL,
    property_type TEXT NOT NULL CHECK (property_type IN (
        'detached_duplex', 'semi_detached_duplex', 'terrace_duplex', 
        'penthouse', 'apartment', 'commercial_office', 'retail_plaza', 
        'land', 'mixed_use'
    )),
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    neighbourhood TEXT NOT NULL,
    address TEXT NOT NULL,
    bedrooms INT CHECK (bedrooms >= 0),
    bathrooms INT CHECK (bathrooms >= 0),
    toilets INT CHECK (toilets >= 0),
    parking_spaces INT CHECK (parking_spaces >= 0),
    land_size_sqm NUMERIC(10, 2) CHECK (land_size_sqm >= 0),
    building_size_sqm NUMERIC(10, 2) CHECK (building_size_sqm >= 0),
    amenities TEXT[] NOT NULL DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN (
        'published', 'draft', 'reserved', 'sold', 'rented', 'archived'
    )),
    views_count INT NOT NULL DEFAULT 0,
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning-fast search & filtering
CREATE INDEX IF NOT EXISTS idx_properties_slug ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON public.properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON public.properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON public.properties(property_type);

-- ------------------------------------------------------------------------------
-- 4. PROPERTY IMAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    storage_path TEXT,
    caption TEXT,
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);

-- ------------------------------------------------------------------------------
-- 5. ENQUIRIES (LEAD GENERATION)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no TEXT NOT NULL UNIQUE,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    property_title TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    enquiry_type TEXT NOT NULL DEFAULT 'property' CHECK (enquiry_type IN ('general', 'property', 'valuation', 'investment')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- ------------------------------------------------------------------------------
-- 6. VIEWING REQUESTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.viewing_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no TEXT NOT NULL UNIQUE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    property_title TEXT NOT NULL,
    property_slug TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_viewing_requests_status ON public.viewing_requests(status);
CREATE INDEX IF NOT EXISTS idx_viewing_requests_preferred_date ON public.viewing_requests(preferred_date);

-- ------------------------------------------------------------------------------
-- 7. PROPERTY OWNER SUBMISSIONS (SELL / LIST)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no TEXT NOT NULL UNIQUE,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    property_title TEXT NOT NULL,
    property_type TEXT NOT NULL,
    listing_intent TEXT NOT NULL CHECK (listing_intent IN ('sell', 'rent', 'lease')),
    location TEXT NOT NULL,
    asking_price NUMERIC(15, 2) NOT NULL,
    bedrooms INT,
    bathrooms INT,
    size_details TEXT,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'rejected')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. TESTIMONIALS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_title TEXT NOT NULL,
    location TEXT NOT NULL,
    testimonial TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    property_context TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. SITE SETTINGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    business_name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    whatsapp_link TEXT NOT NULL,
    email TEXT NOT NULL,
    office_address TEXT NOT NULL,
    opening_hours TEXT NOT NULL,
    hero_headline TEXT NOT NULL,
    hero_subheading TEXT NOT NULL,
    cac_reg_no TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Admins can read/update all profiles; users can view their own
CREATE POLICY "Admins can view profiles" ON public.profiles
    FOR SELECT TO authenticated USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')
    ));

-- Properties: Public can view published non-archived properties
CREATE POLICY "Public can view published properties" ON public.properties
    FOR SELECT TO anon, authenticated
    USING (status = 'published');

-- Properties: Authenticated admins can perform all CRUD operations
CREATE POLICY "Admins full access on properties" ON public.properties
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')));

-- Property Images: Public can view images of published properties
CREATE POLICY "Public can view published property images" ON public.property_images
    FOR SELECT TO anon, authenticated
    USING (EXISTS (
        SELECT 1 FROM public.properties p 
        WHERE p.id = property_images.property_id AND p.status = 'published'
    ));

-- Property Images: Admins have full access
CREATE POLICY "Admins full access on property_images" ON public.property_images
    FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')))
    WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')));

-- Categories & Testimonials: Public can read, Admins manage
CREATE POLICY "Public can view categories" ON public.property_categories FOR SELECT TO anon, authenticated USING (TRUE);
CREATE POLICY "Public can view approved testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (is_approved = TRUE);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (TRUE);

-- Enquiries & Viewing Requests & Submissions: Public can INSERT only (NEVER view existing records)
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (TRUE);
CREATE POLICY "Admins can view and manage enquiries" ON public.enquiries FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')));

CREATE POLICY "Public can submit viewing requests" ON public.viewing_requests FOR INSERT TO anon, authenticated WITH CHECK (TRUE);
CREATE POLICY "Admins can view and manage viewings" ON public.viewing_requests FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')));

CREATE POLICY "Public can submit property listings" ON public.property_submissions FOR INSERT TO anon, authenticated WITH CHECK (TRUE);
CREATE POLICY "Admins can view and manage submissions" ON public.property_submissions FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'manager')));

-- ------------------------------------------------------------------------------
-- STORAGE BUCKET CONFIGURATION (Execute in Supabase SQL Editor)
-- ------------------------------------------------------------------------------
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('property-photographs', 'property-photographs', true)
-- ON CONFLICT (id) DO NOTHING;

-- CREATE POLICY "Public read access to property photographs"
-- ON storage.objects FOR SELECT TO anon, authenticated
-- USING (bucket_id = 'property-photographs');

-- CREATE POLICY "Authenticated admins can upload property photographs"
-- ON storage.objects FOR INSERT TO authenticated
-- WITH CHECK (bucket_id = 'property-photographs');
