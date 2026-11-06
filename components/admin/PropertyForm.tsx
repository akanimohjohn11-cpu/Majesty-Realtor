'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property, PropertyType, ListingType, PropertyStatus, PropertyCategorySlug, PropertyImage } from '@/lib/types';
import ImageUploadZone from './ImageUploadZone';
import { Save, ArrowLeft, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';

interface PropertyFormProps {
  initialProperty?: Property;
  isEdit?: boolean;
}

const COMMON_AMENITIES = [
  'Private Swimming Pool',
  'Smart Home Automation',
  '24/7 Armed Security & CCTV',
  'Private Elevator / Lift',
  'Fitted Chef Kitchen with Pantry',
  'Dual Staff Quarters (BQ)',
  'Solar & Inverter Pre-wiring',
  'Industrial Water Treatment Plant',
  'Lagoon / Panoramic City View',
  'Gymnasium & Fitness Studio',
  'Central Air Conditioning (HVAC)',
  'Basement / Covered Carport',
  'Cinema Room / Home Theatre',
  'Governor’s Consent / Clean C of O',
];

export default function PropertyForm({ initialProperty, isEdit = false }: PropertyFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialProperty?.title || '');
  const [slug, setSlug] = useState(initialProperty?.slug || '');
  const [referenceNumber, setReferenceNumber] = useState(initialProperty?.reference_number || '');
  const [description, setDescription] = useState(initialProperty?.description || '');
  const [price, setPrice] = useState(initialProperty?.price?.toString() || '');
  const [pricePrefix, setPricePrefix] = useState(initialProperty?.price_prefix || '');
  const [listingType, setListingType] = useState<ListingType>(initialProperty?.listing_type || 'sale');
  const [categorySlug, setCategorySlug] = useState<PropertyCategorySlug>(
    initialProperty?.category_slug || 'residential'
  );
  const [propertyType, setPropertyType] = useState<PropertyType>(
    initialProperty?.property_type || 'detached_duplex'
  );

  const [state, setState] = useState(initialProperty?.state || 'Lagos');
  const [city, setCity] = useState(initialProperty?.city || 'Ikoyi');
  const [neighbourhood, setNeighbourhood] = useState(initialProperty?.neighbourhood || 'Banana Island');
  const [address, setAddress] = useState(initialProperty?.address || '');

  const [bedrooms, setBedrooms] = useState(initialProperty?.bedrooms?.toString() || '5');
  const [bathrooms, setBathrooms] = useState(initialProperty?.bathrooms?.toString() || '6');
  const [toilets, setToilets] = useState(initialProperty?.toilets?.toString() || '7');
  const [parkingSpaces, setParkingSpaces] = useState(initialProperty?.parking_spaces?.toString() || '4');
  const [landSizeSqm, setLandSizeSqm] = useState(initialProperty?.land_size_sqm?.toString() || '600');
  const [buildingSizeSqm, setBuildingSizeSqm] = useState(initialProperty?.building_size_sqm?.toString() || '');

  const [amenities, setAmenities] = useState<string[]>(initialProperty?.amenities || [
    'Private Swimming Pool',
    'Smart Home Automation',
    '24/7 Armed Security & CCTV',
    'Fitted Chef Kitchen with Pantry',
  ]);

  const [featured, setFeatured] = useState<boolean>(initialProperty?.featured || false);
  const [status, setStatus] = useState<PropertyStatus>(initialProperty?.status || 'published');
  const [images, setImages] = useState<PropertyImage[]>(initialProperty?.images || []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      slug: slug.trim() || undefined,
      reference_number: referenceNumber.trim() || undefined,
      description,
      price: Number(price),
      currency: 'NGN',
      price_prefix: pricePrefix,
      listing_type: listingType,
      category_slug: categorySlug,
      property_type: propertyType,
      state,
      city,
      neighbourhood,
      address,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      toilets: toilets ? Number(toilets) : null,
      parking_spaces: parkingSpaces ? Number(parkingSpaces) : null,
      land_size_sqm: landSizeSqm ? Number(landSizeSqm) : null,
      building_size_sqm: buildingSizeSqm ? Number(buildingSizeSqm) : null,
      amenities,
      featured,
      status,
      images,
    };

    try {
      const url = isEdit ? `/api/properties/${initialProperty?.id}` : '/api/properties';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save property listing');
      }

      router.push('/admin/properties');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving property.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Direct Photographs Upload Section */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32]">
            1. Property Photographs (Direct Laptop & Mobile Upload)
          </h3>
          <p className="text-xs text-[#5C6E66] mt-0.5">
            Upload high-resolution photography. You can set the primary cover and delete files directly.
          </p>
        </div>

        <ImageUploadZone images={images} onChange={setImages} />
      </div>

      {/* 2. Core Information & Identification */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          2. Basic Identification & Pricing
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Property Headline Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Contemporary 5-Bedroom Smart Detached Duplex with Private Pool"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Custom Reference No. (Optional)
            </label>
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Auto-generated if empty"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Price Prefix (Optional)
            </label>
            <input
              type="text"
              value={pricePrefix}
              onChange={(e) => setPricePrefix(e.target.value)}
              placeholder="e.g. Guide Price, From"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Price in Nigerian Naira (₦) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 850000000"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Listing Intent <span className="text-red-500">*</span>
            </label>
            <select
              value={listingType}
              onChange={(e) => setListingType(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white"
            >
              <option value="sale">For Sale (Outright Purchase)</option>
              <option value="rent">For Rent (Annual Lease)</option>
              <option value="lease">Commercial Lease</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Sector Category <span className="text-red-500">*</span>
            </label>
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white"
            >
              <option value="residential">Residential Sales</option>
              <option value="luxury">Luxury & Penthouses</option>
              <option value="commercial">Commercial & Offices</option>
              <option value="land">Land & Development</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#26342F] mb-1">
            Detailed Architectural Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the spatial layout, finishes, European fittings, smart automation, power backup, security gate access..."
            className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] resize-none"
          />
        </div>
      </div>

      {/* 3. Location & Address */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          3. Geographical Location in Nigeria
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. Lagos, Abuja (FCT), Rivers"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              City / Administrative Area <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Ikoyi, Victoria Island, Maitama"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Neighbourhood / Estate
            </label>
            <input
              type="text"
              value={neighbourhood}
              onChange={(e) => setNeighbourhood(e.target.value)}
              placeholder="e.g. Banana Island, Diplomatic Zone"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Full Street Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Zone B, Close 4, Banana Island"
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>
      </div>

      {/* 4. Specifications & Amenities */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          4. Physical Specifications & Verified Amenities
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-[#5C6E66] mb-1">Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="5"
              className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6E66] mb-1">Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="6"
              className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6E66] mb-1">Toilets</label>
            <input
              type="number"
              value={toilets}
              onChange={(e) => setToilets(e.target.value)}
              placeholder="7"
              className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6E66] mb-1">Car Parking</label>
            <input
              type="number"
              value={parkingSpaces}
              onChange={(e) => setParkingSpaces(e.target.value)}
              placeholder="4"
              className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6E66] mb-1">Land (SQM)</label>
            <input
              type="number"
              value={landSizeSqm}
              onChange={(e) => setLandSizeSqm(e.target.value)}
              placeholder="650"
              className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#5C6E66] mb-1">Building Floor (SQM)</label>
            <input
              type="number"
              value={buildingSizeSqm}
              onChange={(e) => setBuildingSizeSqm(e.target.value)}
              placeholder="520"
              className="w-full text-xs p-2 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32]"
            />
          </div>
        </div>

        {/* Amenities Checkbox Matrix */}
        <div>
          <label className="block text-xs font-semibold text-[#26342F] mb-2">
            Select Verified Facilities & Features:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_AMENITIES.map((item) => {
              const isChecked = amenities.includes(item);
              return (
                <button
                  type="button"
                  key={item}
                  onClick={() => toggleAmenity(item)}
                  className={`text-left text-xs p-2.5 rounded border transition-colors flex items-center justify-between ${
                    isChecked
                      ? 'bg-[#173F32]/10 border-[#173F32] font-semibold text-[#173F32]'
                      : 'bg-white border-[#173F32]/15 text-[#5C6E66] hover:border-[#173F32]/40'
                  }`}
                >
                  <span>{item}</span>
                  {isChecked && <Check className="w-4 h-4 text-[#173F32]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Publication Status & Featured Flag */}
      <div className="bg-white p-6 rounded-xl border border-[#173F32]/12 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#173F32] pb-2 border-b border-[#173F32]/10">
          5. Visibility & Listing State
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-medium text-[#26342F] mb-1">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PropertyStatus)}
              className="w-full text-xs p-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white font-semibold"
            >
              <option value="published">Published (Visible on Public Website)</option>
              <option value="draft">Draft (Private to Admins)</option>
              <option value="reserved">Reserved (Under Offer)</option>
              <option value="sold">Sold (Marked Closed)</option>
              <option value="rented">Rented (Marked Leased)</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-0">
            <input
              type="checkbox"
              id="featured-check"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#173F32] cursor-pointer"
            />
            <label htmlFor="featured-check" className="text-xs font-semibold text-[#26342F] cursor-pointer">
              Promote to Featured Showcase on Homepage
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <Link
          href="/admin/properties"
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#5C6E66] hover:text-[#26342F]"
        >
          ← Cancel and Return
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#D8C5A2]" />
          <span>{loading ? 'Saving Listing...' : isEdit ? 'Update Property Listing' : 'Publish New Property'}</span>
        </button>
      </div>
    </form>
  );
}
