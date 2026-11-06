'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Star, AlertCircle, Loader2 } from 'lucide-react';
import { PropertyImage } from '@/lib/types';

interface ImageUploadZoneProps {
  images: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
}

export default function ImageUploadZone({ images, onChange }: ImageUploadZoneProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload images');
      }

      if (data.images && data.images.length > 0) {
        // If no cover image yet, make first uploaded image the cover
        const currentHasCover = images.some((img) => img.is_cover);
        const newImages = data.images.map((img: PropertyImage, idx: number) => ({
          ...img,
          is_cover: !currentHasCover && idx === 0,
          sort_order: images.length + idx,
        }));

        onChange([...images, ...newImages]);
      }
    } catch (err: any) {
      setError(err.message || 'Image upload failed. Please try smaller files.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const setCover = (index: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      is_cover: i === index,
    }));
    onChange(updated);
  };

  const removeImage = (index: number) => {
    const target = images[index];
    const filtered = images.filter((_, i) => i !== index);

    // If we removed the cover, set the first remaining image as cover
    if (target.is_cover && filtered.length > 0) {
      filtered[0].is_cover = true;
    }
    onChange(filtered);
  };

  return (
    <div className="space-y-4">
      {/* Upload Drop Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#173F32]/20 hover:border-[#173F32] bg-[#FAF8F2] hover:bg-[#FAF8F2]/70 rounded-lg p-6 text-center cursor-pointer transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {uploading ? (
            <div className="flex items-center gap-2 text-xs text-[#173F32] font-semibold">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading & optimizing photographs...</span>
            </div>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 text-[#173F32]" />
              <p className="text-xs font-semibold text-[#173F32]">
                Click or drag & drop photographs here from your laptop or phone
              </p>
              <p className="text-[11px] text-[#5C6E66]">
                Supported formats: JPEG, PNG, WebP (Max 10MB per photograph)
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Previews & Management Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#26342F]">
              Uploaded Photographs ({images.length})
            </span>
            <span className="text-[11px] text-[#5C6E66]">
              Click the star to set a photograph as the primary cover
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id || idx}
                className={`relative aspect-4/3 rounded-lg overflow-hidden border bg-white shadow-xs group ${
                  img.is_cover ? 'border-[#173F32] ring-2 ring-[#173F32]/30' : 'border-[#173F32]/15'
                }`}
              >
                <Image
                  src={img.image_url}
                  alt={img.caption || 'Property photograph'}
                  fill
                  sizes="200px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />

                {/* Cover Badge */}
                {img.is_cover && (
                  <div className="absolute top-2 left-2 bg-[#173F32] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                    Primary Cover
                  </div>
                )}

                {/* Action Buttons Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCover(idx);
                    }}
                    title="Set as Primary Cover"
                    className={`p-1.5 rounded-full ${
                      img.is_cover
                        ? 'bg-[#D8C5A2] text-[#173F32]'
                        : 'bg-white/80 text-[#26342F] hover:bg-white'
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(idx);
                    }}
                    title="Remove Photograph"
                    className="p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
