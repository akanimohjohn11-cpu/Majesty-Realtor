import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const enquiries = await repository.getEnquiries();
    return NextResponse.json(enquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve enquiries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.full_name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Phone, Message) are required.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const newEnquiry = await repository.createEnquiry({
      property_id: body.property_id || undefined,
      property_title: body.property_title || undefined,
      full_name: body.full_name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      message: body.message.trim(),
      enquiry_type: body.enquiry_type || 'property',
    });

    return NextResponse.json(
      {
        success: true,
        reference_no: newEnquiry.reference_no,
        message: 'Your enquiry has been received by Majesty Realty. An advisor will contact you promptly.',
        data: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API /api/enquiries POST error:', error);
    return NextResponse.json({ error: 'Failed to record enquiry. Please try again.' }, { status: 500 });
  }
}
