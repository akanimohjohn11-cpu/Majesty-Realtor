import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const submissions = await repository.getSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve property submissions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.owner_name || !body.email || !body.phone || !body.property_title || !body.location || !body.asking_price) {
      return NextResponse.json(
        { error: 'Please fill in Owner Name, Email, Phone, Property Title, Location, and Asking Price.' },
        { status: 400 }
      );
    }

    const submission = await repository.createSubmission({
      owner_name: body.owner_name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      property_title: body.property_title.trim(),
      property_type: body.property_type || 'detached_duplex',
      listing_intent: body.listing_intent || 'sell',
      location: body.location.trim(),
      asking_price: Number(body.asking_price),
      bedrooms: body.bedrooms ? Number(body.bedrooms) : null,
      bathrooms: body.bathrooms ? Number(body.bathrooms) : null,
      size_details: body.size_details ? body.size_details.trim() : undefined,
      description: body.description ? body.description.trim() : '',
    });

    return NextResponse.json(
      {
        success: true,
        reference_no: submission.reference_no,
        message: 'Your property details have been received. A senior valuation broker from Majesty Realty will review the submission within 24 hours.',
        data: submission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API /api/submissions POST error:', error);
    return NextResponse.json({ error: 'Failed to record property submission' }, { status: 500 });
  }
}
