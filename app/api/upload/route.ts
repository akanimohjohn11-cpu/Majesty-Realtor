import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getSupabaseServerClient, isServerSupabaseConfigured } from '@/lib/supabase/server';
import { promises as fs } from 'fs';
import path from 'path';

// Max 10MB per file
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin session required.' }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided for upload.' }, { status: 400 });
    }

    const uploadedImages = [];

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Unsupported file type: ${file.type}. Please upload JPEG, PNG, or WebP.` },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds the 10MB limit.` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanBaseName = file.name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
      const uniqueName = `${Date.now()}_${cleanBaseName}.${ext}`;

      const supabase = getSupabaseServerClient();
      let publicUrl = '';
      let storagePath = '';

      if (isServerSupabaseConfigured && supabase) {
        try {
          const filePath = `listings/${uniqueName}`;
          const { error: uploadErr } = await supabase.storage
            .from('property-photographs')
            .upload(filePath, buffer, {
              contentType: file.type,
              upsert: true,
            });

          if (!uploadErr) {
            const { data } = supabase.storage.from('property-photographs').getPublicUrl(filePath);
            publicUrl = data.publicUrl;
            storagePath = filePath;
          } else {
            console.warn('Supabase storage upload failed, using local upload:', uploadErr);
          }
        } catch (storageErr) {
          console.warn('Supabase storage exception, using local upload fallback:', storageErr);
        }
      }

      // If Supabase Storage was not configured or returned an error, fallback to /public/uploads/
      if (!publicUrl) {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadsDir, { recursive: true });
        const localFilePath = path.join(uploadsDir, uniqueName);
        await fs.writeFile(localFilePath, buffer);
        publicUrl = `/uploads/${uniqueName}`;
        storagePath = `local:${uniqueName}`;
      }

      uploadedImages.push({
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        image_url: publicUrl,
        storage_path: storagePath,
        caption: file.name.replace(/\.[^/.]+$/, ''),
        is_cover: false,
        sort_order: uploadedImages.length,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
    });
  } catch (error) {
    console.error('API /api/upload error:', error);
    return NextResponse.json({ error: 'Failed to process image upload' }, { status: 500 });
  }
}
