import { notFound } from 'next/navigation';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import PropertyForm from '@/components/admin/PropertyForm';
import { repository } from '@/lib/db/repository';

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: 'Edit Property Listing | Majesty Realty Admin',
};

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { id } = await params;
  const property = await repository.getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <AdminLayoutShell
      title={`Edit Property: ${property.title}`}
      subtitle={`Reference: ${property.reference_number} · Status: ${property.status}`}
    >
      <PropertyForm initialProperty={property} isEdit={true} />
    </AdminLayoutShell>
  );
}
