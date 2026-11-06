import { NextRequest, NextResponse } from 'next/server';
import { repository } from '@/lib/db/repository';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await repository.updateSubmissionStatus(id, body.status, body.notes);
    if (!updated) {
      return NextResponse.json({ error: 'Property submission not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property submission' }, { status: 500 });
  }
}
