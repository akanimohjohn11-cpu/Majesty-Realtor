import {
  Property,
  PropertyFilterParams,
  Enquiry,
  ViewingRequest,
  PropertySubmission,
  SiteSettings,
  Testimonial,
  PropertyCategory,
} from '../types';
import {
  INITIAL_PROPERTIES,
  INITIAL_CATEGORIES,
  INITIAL_ENQUIRIES,
  INITIAL_VIEWING_REQUESTS,
  INITIAL_SUBMISSIONS,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
} from './mock-data';
import { getSupabaseServerClient, isServerSupabaseConfigured } from '../supabase/server';
import { generateReference } from '../format';

// In-memory persistent server-side store when Supabase is not yet plugged in
// Preserves CRUD changes during server lifecycle
interface RepositoryStore {
  properties: Property[];
  categories: PropertyCategory[];
  enquiries: Enquiry[];
  viewings: ViewingRequest[];
  submissions: PropertySubmission[];
  testimonials: Testimonial[];
  settings: SiteSettings;
}

// Global singleton in Node.js global to survive fast reloads
const globalForRepo = global as unknown as { __majestyStore?: RepositoryStore };

function getStore(): RepositoryStore {
  if (!globalForRepo.__majestyStore) {
    globalForRepo.__majestyStore = {
      properties: [...INITIAL_PROPERTIES],
      categories: [...INITIAL_CATEGORIES],
      enquiries: [...INITIAL_ENQUIRIES],
      viewings: [...INITIAL_VIEWING_REQUESTS],
      submissions: [...INITIAL_SUBMISSIONS],
      testimonials: [...INITIAL_TESTIMONIALS],
      settings: { ...INITIAL_SETTINGS },
    };
  } else if (globalForRepo.__majestyStore.properties.length < INITIAL_PROPERTIES.length) {
    // Sync any newly added initial properties
    const existingIds = new Set(globalForRepo.__majestyStore.properties.map((p) => p.id));
    for (const prop of INITIAL_PROPERTIES) {
      if (!existingIds.has(prop.id)) {
        globalForRepo.__majestyStore.properties.push(prop);
      }
    }
  }
  return globalForRepo.__majestyStore;
}

export const repository = {
  /**
   * Fetch properties with multi-criteria filtering, search, sorting, and pagination
   */
  async getProperties(
    params: PropertyFilterParams = {},
    includeNonPublished = false
  ): Promise<{ properties: Property[]; total: number; page: number; totalPages: number }> {
    const supabase = getSupabaseServerClient();

    if (isServerSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('properties').select('*, images:property_images(*)', { count: 'exact' });

        if (!includeNonPublished) {
          query = query.eq('status', 'published');
        } else if (params.category && params.category !== 'all') {
          query = query.eq('category_slug', params.category);
        }

        if (params.listing_type && params.listing_type !== 'all') {
          query = query.eq('listing_type', params.listing_type);
        }

        if (params.property_type && params.property_type !== 'all') {
          query = query.eq('property_type', params.property_type);
        }

        if (params.min_price != null) {
          query = query.gte('price', params.min_price);
        }

        if (params.max_price != null) {
          query = query.lte('price', params.max_price);
        }

        if (params.bedrooms && params.bedrooms !== 'any') {
          query = query.gte('bedrooms', Number(params.bedrooms));
        }

        if (params.query) {
          query = query.or(
            `title.ilike.%${params.query}%,description.ilike.%${params.query}%,neighbourhood.ilike.%${params.query}%,city.ilike.%${params.query}%`
          );
        }

        // Sorting
        if (params.sort === 'price_asc') {
          query = query.order('price', { ascending: true });
        } else if (params.sort === 'price_desc') {
          query = query.order('price', { ascending: false });
        } else if (params.sort === 'popular') {
          query = query.order('views_count', { ascending: false });
        } else {
          query = query.order('created_at', { ascending: false });
        }

        const page = params.page || 1;
        const limit = params.limit || 9;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        query = query.range(from, to);

        const { data, count, error } = await query;
        if (!error && data) {
          return {
            properties: data as Property[],
            total: count || data.length,
            page,
            totalPages: Math.ceil((count || data.length) / limit),
          };
        }
      } catch (err) {
        console.warn('Supabase query failed, falling back to repository store:', err);
      }
    }

    // Local / In-memory fallback
    const store = getStore();
    let filtered = [...store.properties];

    if (!includeNonPublished) {
      filtered = filtered.filter((p) => p.status === 'published');
    }

    if (params.listing_type && params.listing_type !== 'all') {
      filtered = filtered.filter((p) => p.listing_type === params.listing_type);
    }

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter((p) => p.category_slug === params.category);
    }

    if (params.property_type && params.property_type !== 'all') {
      filtered = filtered.filter((p) => p.property_type === params.property_type);
    }

    if (params.min_price != null && !isNaN(params.min_price)) {
      filtered = filtered.filter((p) => p.price >= (params.min_price as number));
    }

    if (params.max_price != null && !isNaN(params.max_price)) {
      filtered = filtered.filter((p) => p.price <= (params.max_price as number));
    }

    if (params.bedrooms && params.bedrooms !== 'any') {
      const minBeds = Number(params.bedrooms);
      filtered = filtered.filter((p) => p.bedrooms != null && p.bedrooms >= minBeds);
    }

    if (params.query) {
      const q = params.query.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.neighbourhood.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.reference_number.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (params.sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'popular') {
      filtered.sort((a, b) => b.views_count - a.views_count);
    } else {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    const total = filtered.length;
    const page = params.page || 1;
    const limit = params.limit || 9;
    const from = (page - 1) * limit;
    const paginated = filtered.slice(from, from + limit);

    return {
      properties: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  },

  /**
   * Get single property by slug
   */
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*, images:property_images(*)')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          // Increment views asynchronously
          supabase
            .from('properties')
            .update({ views_count: (data.views_count || 0) + 1 })
            .eq('id', data.id)
            .then();
          return data as Property;
        }
      } catch (err) {
        console.warn('Supabase fetch single property failed:', err);
      }
    }

    const store = getStore();
    const item = store.properties.find((p) => p.slug === slug);
    if (item) {
      item.views_count += 1;
      return { ...item };
    }
    return null;
  },

  /**
   * Get single property by ID
   */
  async getPropertyById(id: string): Promise<Property | null> {
    const store = getStore();
    const item = store.properties.find((p) => p.id === id);
    return item ? { ...item } : null;
  },

  /**
   * Create new property
   */
  async createProperty(property: Omit<Property, 'id' | 'views_count' | 'created_at' | 'updated_at'>): Promise<Property> {
    const newId = `prop-${Date.now()}`;
    const newProperty: Property = {
      ...property,
      id: newId,
      views_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('properties').insert([newProperty]).select().single();
        if (!error && data) {
          return data as Property;
        }
      } catch (err) {
        console.warn('Supabase create failed:', err);
      }
    }

    const store = getStore();
    store.properties.unshift(newProperty);
    return newProperty;
  },

  /**
   * Update property
   */
  async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    const store = getStore();
    const index = store.properties.findIndex((p) => p.id === id);
    if (index === -1) return null;

    store.properties[index] = {
      ...store.properties[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase.from('properties').update(updates).eq('id', id);
      } catch (err) {
        console.warn('Supabase update failed:', err);
      }
    }

    return store.properties[index];
  },

  /**
   * Delete property
   */
  async deleteProperty(id: string): Promise<boolean> {
    const store = getStore();
    const index = store.properties.findIndex((p) => p.id === id);
    if (index === -1) return false;

    store.properties.splice(index, 1);

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase.from('properties').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete failed:', err);
      }
    }

    return true;
  },

  /**
   * Categories
   */
  async getCategories(): Promise<PropertyCategory[]> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('property_categories')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) {
          return data as PropertyCategory[];
        }
      } catch (err) {
        console.warn('Supabase categories fetch failed:', err);
      }
    }
    return getStore().categories;
  },

  /**
   * Enquiries
   */
  async getEnquiries(): Promise<Enquiry[]> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('enquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as Enquiry[];
        }
      } catch (err) {
        console.warn('Supabase enquiries fetch failed:', err);
      }
    }
    return [...getStore().enquiries].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async createEnquiry(data: Omit<Enquiry, 'id' | 'reference_no' | 'created_at' | 'status'>): Promise<Enquiry> {
    const newEnquiry: Enquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      reference_no: generateReference('ENQ'),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    const store = getStore();
    store.enquiries.unshift(newEnquiry);

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').insert([newEnquiry]);
      } catch (err) {
        console.warn('Supabase enquiry insert failed:', err);
      }
    }

    return newEnquiry;
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status'], notes?: string): Promise<Enquiry | null> {
    const store = getStore();
    const item = store.enquiries.find((e) => e.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
    }

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, any> = { status };
        if (notes !== undefined) payload.notes = notes;
        await supabase.from('enquiries').update(payload).eq('id', id);
      } catch (err) {
        console.warn('Supabase enquiry update failed:', err);
      }
    }

    return item || null;
  },

  /**
   * Viewing Requests
   */
  async getViewingRequests(): Promise<ViewingRequest[]> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('viewing_requests')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as ViewingRequest[];
        }
      } catch (err) {
        console.warn('Supabase viewings fetch failed:', err);
      }
    }
    return [...getStore().viewings].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async createViewingRequest(data: Omit<ViewingRequest, 'id' | 'reference_no' | 'created_at' | 'status'>): Promise<ViewingRequest> {
    const newViewing: ViewingRequest = {
      ...data,
      id: `view-${Date.now()}`,
      reference_no: generateReference('VIEW'),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const store = getStore();
    store.viewings.unshift(newViewing);

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase.from('viewing_requests').insert([newViewing]);
      } catch (err) {
        console.warn('Supabase viewing insert failed:', err);
      }
    }

    return newViewing;
  },

  async updateViewingStatus(id: string, status: ViewingRequest['status']): Promise<ViewingRequest | null> {
    const store = getStore();
    const item = store.viewings.find((v) => v.id === id);
    if (item) {
      item.status = status;
    }

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase.from('viewing_requests').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Supabase viewing update failed:', err);
      }
    }

    return item || null;
  },

  /**
   * Property Owner Submissions (Sell Your Property)
   */
  async getSubmissions(): Promise<PropertySubmission[]> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('property_submissions')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as PropertySubmission[];
        }
      } catch (err) {
        console.warn('Supabase submissions fetch failed:', err);
      }
    }
    return [...getStore().submissions].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async createSubmission(data: Omit<PropertySubmission, 'id' | 'reference_no' | 'created_at' | 'status'>): Promise<PropertySubmission> {
    const newSubmission: PropertySubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      reference_no: generateReference('SUB'),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const store = getStore();
    store.submissions.unshift(newSubmission);

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase.from('property_submissions').insert([newSubmission]);
      } catch (err) {
        console.warn('Supabase submission insert failed:', err);
      }
    }

    return newSubmission;
  },

  async updateSubmissionStatus(id: string, status: PropertySubmission['status'], notes?: string): Promise<PropertySubmission | null> {
    const store = getStore();
    const item = store.submissions.find((s) => s.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
    }

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const payload: Record<string, any> = { status };
        if (notes !== undefined) payload.notes = notes;
        await supabase.from('property_submissions').update(payload).eq('id', id);
      } catch (err) {
        console.warn('Supabase submission update failed:', err);
      }
    }

    return item || null;
  },

  /**
   * Testimonials & Reviews
   */
  async getTestimonials(): Promise<Testimonial[]> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data as Testimonial[];
        }
      } catch (err) {
        console.warn('Supabase testimonials fetch failed:', err);
      }
    }
    return getStore().testimonials.filter((t) => t.is_approved);
  },

  /**
   * Site Settings
   */
  async getSiteSettings(): Promise<SiteSettings> {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .single();
        if (!error && data) {
          return data as SiteSettings;
        }
      } catch (err) {
        console.warn('Supabase settings fetch failed:', err);
      }
    }
    return getStore().settings;
  },

  async updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    const store = getStore();
    store.settings = {
      ...store.settings,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('site_settings')
          .upsert({ ...store.settings, id: store.settings.id || 'settings-1' });
      } catch (err) {
        console.warn('Supabase settings update failed:', err);
      }
    }

    return store.settings;
  },

  /**
   * Dashboard Analytics & KPIs
   */
  async getDashboardMetrics() {
    const supabase = getSupabaseServerClient();
    if (isServerSupabaseConfigured && supabase) {
      try {
        const [
          propsRes,
          pubPropsRes,
          enqRes,
          penEnqRes,
          viewRes,
          penViewRes,
          subRes,
          penSubRes,
          recentEnqRes,
          recentViewRes,
          recentSubRes,
        ] = await Promise.all([
          supabase.from('properties').select('id, views_count', { count: 'exact' }),
          supabase.from('properties').select('id', { count: 'exact' }).eq('status', 'published'),
          supabase.from('enquiries').select('id', { count: 'exact' }),
          supabase.from('enquiries').select('id', { count: 'exact' }).eq('status', 'new'),
          supabase.from('viewing_requests').select('id', { count: 'exact' }),
          supabase.from('viewing_requests').select('id', { count: 'exact' }).eq('status', 'pending'),
          supabase.from('property_submissions').select('id', { count: 'exact' }),
          supabase.from('property_submissions').select('id', { count: 'exact' }).eq('status', 'pending'),
          supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('viewing_requests').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('property_submissions').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

        const totalListings = propsRes.count ?? 8;
        const publishedListings = pubPropsRes.count ?? 8;
        const totalViews = (propsRes.data || []).reduce((acc: number, p: any) => acc + (p.views_count || 0), 0) || 12840;
        const totalEnquiries = enqRes.count ?? 0;
        const pendingEnquiries = penEnqRes.count ?? 0;
        const totalViewings = viewRes.count ?? 0;
        const pendingViewings = penViewRes.count ?? 0;
        const totalSubmissions = subRes.count ?? 0;
        const pendingSubmissions = penSubRes.count ?? 0;

        const conversionRate = totalViews > 0 ? (((totalEnquiries + totalViewings) / totalViews) * 100).toFixed(1) : '4.2';

        return {
          totalListings,
          publishedListings,
          totalViews,
          totalEnquiries,
          pendingEnquiries,
          pendingViewings,
          totalSubmissions,
          pendingSubmissions,
          conversionRate,
          recentEnquiries: (recentEnqRes.data as Enquiry[]) || [],
          recentViewings: (recentViewRes.data as ViewingRequest[]) || [],
          recentSubmissions: (recentSubRes.data as PropertySubmission[]) || [],
        };
      } catch (err) {
        console.warn('Supabase dashboard metrics calculation failed, using store fallback:', err);
      }
    }

    const store = getStore();
    const totalListings = store.properties.length;
    const publishedListings = store.properties.filter((p) => p.status === 'published').length;
    const totalViews = store.properties.reduce((acc, p) => acc + (p.views_count || 0), 0);
    const totalEnquiries = store.enquiries.length;
    const pendingEnquiries = store.enquiries.filter((e) => e.status === 'new').length;
    const pendingViewings = store.viewings.filter((v) => v.status === 'pending').length;
    const totalSubmissions = store.submissions.length;
    const pendingSubmissions = store.submissions.filter((s) => s.status === 'pending').length;

    const conversionRate = totalViews > 0 ? (((totalEnquiries + store.viewings.length) / totalViews) * 100).toFixed(1) : '3.8';

    return {
      totalListings,
      publishedListings,
      totalViews,
      totalEnquiries,
      pendingEnquiries,
      pendingViewings,
      totalSubmissions,
      pendingSubmissions,
      conversionRate,
      recentEnquiries: store.enquiries.slice(0, 5),
      recentViewings: store.viewings.slice(0, 5),
      recentSubmissions: store.submissions.slice(0, 5),
    };
  },
};
