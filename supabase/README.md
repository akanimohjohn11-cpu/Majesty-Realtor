# Connecting Majesty Realty & Construction to Supabase

Follow these simple steps to link your Supabase database and storage bucket to this application.

---

### Step 1: Run the Database SQL Script
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open your project (or create a new project named `majesty-realty`).
3. Click on **SQL Editor** in the left sidebar.
4. Click **New Query**.
5. Open the `supabase/schema.sql` file in this project, copy its entire contents, and paste it into the Supabase SQL Editor.
6. Click **Run** (green button).
7. You will see a success message: `"Majesty Realty database schema and seed data created successfully!"`.
8. Check **Table Editor** to confirm your tables are ready:
   - `properties` (seeded with 8 verified luxury properties)
   - `property_images` (seeded with high-resolution photos)
   - `property_categories`
   - `enquiries`
   - `viewing_requests`
   - `property_submissions`
   - `testimonials`
   - `site_settings`
   - `profiles`
9. Check **Storage** to confirm the `property-images` bucket has been created with public access.

---

### Step 2: Retrieve Your API Credentials
In your Supabase project dashboard:
1. Click the **Project Settings** (gear icon) in the sidebar.
2. Navigate to **API**.
3. Copy the following keys:
   - **Project URL** (e.g. `https://xyzprojectid.supabase.co`)
   - **anon / public** key (e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role / secret** key (e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

---

### Step 3: Add to Environment Variables
Add these values to your `.env` or deployment environment (e.g., Vercel Environment Variables or AI Studio Secrets):

```env
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"

# Supabase Anonymous Client Key
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"

# Supabase Secret Service Role Key (Server-side operations)
SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"
```

---

### Step 4: Verification
Once the variables are set, the app will automatically switch from the in-memory store to live Supabase queries:
- Public visitors browse listings pulled directly from Supabase.
- Property inquiries and viewing inspection requests save directly into `enquiries` and `viewing_requests`.
- The Admin Dashboard reads and edits live database records in real time.
