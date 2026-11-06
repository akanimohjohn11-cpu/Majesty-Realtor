import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getAdminSession } from '@/lib/auth';
import { generateSlug, generateReference } from '@/lib/format';
import { PropertyFilterParams } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const params: PropertyFilterParams = {
      query: searchParams.get('q') || undefined,
      listing_type: (searchParams.get('type') as any) || 'all',
      category: searchParams.get('category') || undefined,
      property_type: searchParams.get('property_type') || undefined,
      min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
      max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
      bedrooms: (searchParams.get('bedrooms') as any) || undefined,
      sort: (searchParams.get('sort') as any) || 'newest',
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 9,
    };

    const isAdminReq = searchParams.get('admin') === 'true';
    let includeAll = false;

    if (isAdminReq) {
      const session = await getAdminSession();
      if (session) {
        includeAll = true;
      }
    }

    const result = await repository.getProperties(params, includeAll);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API /api/properties error:', error);
    return NextResponse.json({ error: 'Failed to retrieve properties' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.price || !body.listing_type || !body.state || !body.city) {
      return NextResponse.json({ error: 'Missing mandatory fields (title, price, listing_type, state, city)' }, { status: 400 });
    }

    const slug = body.slug ? generateSlug(body.slug) : generateSlug(`${body.title}-${body.city}`);
    const reference_number = body.reference_number || generateReference('PROP');

    const newProperty = await repository.createProperty({
      title: body.title,
      slug,
      reference_number,
      description: body.description || '',
      price: Number(body.price),
      currency: body.currency || 'NGN',
      price_prefix: body.price_prefix || '',
      listing_type: body.listing_type,
      category_slug: body.category_slug || 'residential',
      property_type: body.property_type || 'detached_duplex',
      state: body.state,
      city: body.city,
      neighbourhood: body.neighbourhood || '',
      address: body.address || '',
      bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : null,
      toilets: body.toilets ? Number(body.toilets) : null,
      parking_spaces: body.parking_spaces ? Number(body.parking_spaces) : null,
      land_size_sqm: body.land_size_sqm ? Number(body.land_size_sqm) : null,
      building_size_sqm: body.building_size_sqm ? Number(body.building_size_sqm) : null,
      amenities: Array.isArray(body.amenities) ? body.amenities : [],
      featured: Boolean(body.featured),
      status: body.status || 'published',
      images: Array.isArray(body.images) ? body.images : [],
      is_demo: false,
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error('API POST /api/properties error:', error);
    return NextResponse.json({ error: 'Failed to create property listing' }, { status: 500 });
  }
}
