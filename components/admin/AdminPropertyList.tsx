'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property, PropertyStatus } from '@/lib/types';
import { formatNaira, formatListingType, formatPropertyType } from '@/lib/format';
import { Edit, Trash2, PlusCircle, Search, ExternalLink, AlertTriangle } from 'lucide-react';

interface AdminPropertyListProps {
  initialProperties: Property[];
}

export default function AdminPropertyList({ initialProperties }: AdminPropertyListProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filtered = properties.filter((p) => {
    const matchesSearch =
      searchTerm === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
      } else {
        alert('Failed to delete property.');
      }
    } catch (err) {
      alert('Error occurred during deletion.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: PropertyStatus) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, Tabs, New Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#5C6E66] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, ref, city..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded border border-[#173F32]/20 focus:outline-none focus:border-[#173F32] bg-white"
          />
        </div>

        <Link
          href="/admin/properties/new"
          className="px-4 py-2.5 bg-[#173F32] hover:bg-[#14372C] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-xs shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#D8C5A2]" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
        {[
          { label: 'All Listings', value: 'all' },
          { label: 'Published', value: 'published' },
          { label: 'Drafts', value: 'draft' },
          { label: 'Reserved', value: 'reserved' },
          { label: 'Sold', value: 'sold' },
          { label: 'Rented', value: 'rented' },
          { label: 'Archived', value: 'archived' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-3 py-1.5 rounded font-medium whitespace-nowrap transition-colors ${
              statusFilter === tab.value
                ? 'bg-[#173F32] text-white'
                : 'bg-white text-[#5C6E66] hover:text-[#173F32] border border-[#173F32]/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-[#173F32]/10 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F2] border-b border-[#173F32]/10 text-[#5C6E66] font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#173F32]/8 text-[#26342F]">
              {filtered.map((prop) => {
                const cover =
                  prop.images?.find((img) => img.is_cover)?.image_url ||
                  prop.images?.[0]?.image_url ||
                  '/images/hero.jpg';

                return (
                  <tr key={prop.id} className="hover:bg-[#FAF8F2]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded overflow-hidden bg-[#EAE7DF] shrink-0 border border-[#173F32]/10">
                          <Image
                            src={cover}
                            alt={prop.title}
                            fill
                            sizes="60px"
                            referrerPolicy="no-referrer"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-[#173F32] line-clamp-1 max-w-xs">
                            {prop.title}
                          </div>
                          <span className="text-[10px] text-[#5C6E66] font-mono">
                            {prop.reference_number}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-[#173F32] tabular-nums whitespace-nowrap">
                      {formatNaira(prop.price, prop.listing_type === 'rent')}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-[11px] text-[#5C6E66]">
                      <span>{formatListingType(prop.listing_type)}</span>
                      <span className="block text-[10px] text-[#5C6E66]/80">
                        {formatPropertyType(prop.property_type)}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap text-[11px]">
                      {prop.neighbourhood ? `${prop.neighbourhood}, ` : ''}
                      {prop.city}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={prop.status}
                        onChange={(e) => handleStatusChange(prop.id, e.target.value as PropertyStatus)}
                        className={`text-[11px] font-semibold py-1 px-2 rounded border focus:outline-none ${
                          prop.status === 'published'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : prop.status === 'sold'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : prop.status === 'archived'
                            ? 'bg-gray-100 text-gray-700 border-gray-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/properties/${prop.slug}`}
                        target="_blank"
                        className="inline-block p-1.5 text-[#5C6E66] hover:text-[#173F32] rounded hover:bg-[#FAF8F2]"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/properties/${prop.id}/edit`}
                        className="inline-block p-1.5 text-[#173F32] hover:text-[#26342F] rounded hover:bg-[#FAF8F2]"
                        title="Edit Property"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(prop.id)}
                        className="p-1.5 text-red-600 hover:text-red-800 rounded hover:bg-red-50"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#5C6E66]">
            No properties found matching your criteria.
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 shadow-xl border border-red-200">
            <div className="flex items-center gap-3 text-red-700">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="text-sm font-bold">Confirm Deletion</h4>
            </div>
            <p className="text-xs text-[#5C6E66] leading-relaxed">
              Are you sure you want to delete this property listing? This operation will remove its photographs
              and records from the inventory.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs text-[#5C6E66] hover:text-[#26342F]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Listing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
