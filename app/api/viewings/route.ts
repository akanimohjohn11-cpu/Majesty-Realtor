import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const viewings = await repository.getViewingRequests();
    return NextResponse.json(viewings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve viewing requests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.property_id || !body.full_name || !body.email || !body.phone || !body.preferred_date || !body.preferred_time) {
      return NextResponse.json(
        { error: 'Please provide full name, email, phone number, preferred date and time.' },
        { status: 400 }
      );
    }

    const viewing = await repository.createViewingRequest({
      property_id: body.property_id,
      property_title: body.property_title || 'Selected Property',
      property_slug: body.property_slug || '',
      full_name: body.full_name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      preferred_date: body.preferred_date,
      preferred_time: body.preferred_time,
      notes: body.notes ? body.notes.trim() : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        reference_no: viewing.reference_no,
        message: 'Your viewing request has been booked. Our inspection coordinator will confirm arrangements.',
        data: viewing,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API /api/viewings POST error:', error);
    return NextResponse.json({ error: 'Failed to schedule viewing' }, { status: 500 });
  }
}
