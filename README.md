# Majesty Realty and Construction — Production Platform

The official real estate discovery, property management, and advisory platform for **Majesty Realty and Construction**.

- **Positioning**: *The Trusted Real Estate Partner for Better Property Decisions.*
- **Official Telephone**: `0708 958 1351` / `+234 708 958 1351`
- **WhatsApp Integration**: `https://wa.me/2347089581351`
- **Head Office**: Plot 14, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria
- **Corporate Registration**: CAC Nigeria (RC: 1849204)

---

## 1. Technology Architecture

- **Framework**: Next.js 15+ App Router, TypeScript, React 19
- **Styling**: Tailwind CSS v4, custom brand design system
  - Deep Green: `#173F32`
  - Charcoal Green: `#26342F`
  - Soft Sand Accent: `#D8C5A2`
  - Warm White: `#FAF8F2`
- **Database & Storage**:
  - **Live Production**: Supabase PostgreSQL with Row Level Security (RLS), Supabase Auth, and Supabase Storage.
  - **Resilient Fallback**: Server-side repository layer (`lib/db/repository.ts`) with pre-seeded illustrative demo listings to guarantee zero downtime during initial onboarding and sandbox evaluation.
- **Icons**: Lucide React
- **Forms & Validation**: Server & client input validation with sanitization.

---

## 2. Public Route Matrix

| Route | Purpose & Key Features |
|---|---|
| `/` | Homepage with hero search, curated property cards, Bento market sectors, and trust pillars |
| `/properties` | Database search, multi-criteria filtering (Buy/Rent/Lease, bedrooms, price, location, sorting) |
| `/properties/[slug]` | Dynamic property detail, image gallery, specs, Naira price, viewing request modal, WhatsApp prefill |
| `/about` | Corporate history, founding philosophy, legal title due diligence standards, RC: 1849204 |
| `/services` | Comprehensive breakdown of all 8 practice areas with deliverables and direct consultation CTAs |
| `/sell-your-property` | Landlord & owner submission portal with multi-step validated intake form |
| `/investment` | Real estate advisory, 5-year ROI and rental yield simulation calculator, diaspora protection |
| `/contact` | Lekki head office coordinates, operating hours, direct WhatsApp, interactive inquiry form |
| `/faq` | Knowledge base explaining C of O, Governor’s Consent, Gazette, and diaspora protocols |
| `/privacy-policy` | NDPA-compliant data governance and confidentiality notice |
| `/terms-and-conditions`| Brokerage terms, agency fee schedule, and Nigerian jurisdiction governing law |
| `not-found` | Branded 404 page with navigation escape hatches |

---

## 3. Administrative Portal (`/admin`)

- **Login Route**: `/admin/login`
- **Default Super-Admin Credentials**:
  - Email: `admin@majestyrealty.ng`
  - Password: `MajestyAdmin2026!`
- **Dashboard Sections**:
  - `/admin/overview`: Real-time KPIs, total listings, conversion metrics, recent activity feeds.
  - `/admin/properties`: Complete inventory table, search, status filters (Published, Draft, Sold, Reserved, Archived), delete confirmation.
  - `/admin/properties/new`: Multi-file direct upload from laptops/mobile devices, spatial metrics, amenities matrix, publication controls.
  - `/admin/properties/[id]/edit`: Update property details, rearrange cover photo, delete or archive.
  - `/admin/enquiries`: Buyer and tenant inquiry management with status workflows (`new`, `contacted`, `in_progress`, `closed`), internal notes, and direct WhatsApp launcher.
  - `/admin/viewings`: Inspection appointment calendar with status updates (`pending`, `confirmed`, `completed`) and estate gate pass confirmation messages.
  - `/admin/submissions`: Landlord listing reviews, approval pipeline, and conversion to live listings.
  - `/admin/analytics`: Conversion funnel visualization, high-demand corridor metrics (Ikoyi, Victoria Island, Lekki, Maitama).
  - `/admin/settings`: Manage company phone numbers, WhatsApp, email, office address, opening hours, and hero headlines.

---

## 4. Supabase Setup Instructions (PostgreSQL & Storage)

1. Create a project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20260101000000_majesty_real_estate_schema.sql` and run the entire SQL script.
4. Under **Storage**, create a public bucket named `property-photographs`.
5. Add the following environment variables to your `.env.local` or Vercel dashboard:
   ```env
   APP_URL="https://your-domain.com"
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

---

## 5. Direct Photograph Upload System

Administrators can upload photographs directly from laptops and mobile devices without requiring external URLs:
- Validated server-side in `/api/upload` (JPEG, PNG, WebP; up to 10MB per file).
- Directly uploads to the Supabase Storage bucket (`property-photographs`) when configured.
- Gracefully stores to `/public/uploads/` when running in local sandbox mode.
- Administrators can set any photograph as the primary cover via the star toggle or remove images before saving.
