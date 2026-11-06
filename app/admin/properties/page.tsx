import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import AdminPropertyList from '@/components/admin/AdminPropertyList';
import { repository } from '@/lib/db/repository';

export const metadata = {
  title: 'Property Inventory Management | Majesty Realty Admin',
};

export default async function AdminPropertiesPage() {
  const { properties } = await repository.getProperties({ limit: 100 }, true);

  return (
    <AdminLayoutShell
      title="Property Inventory Management"
      subtitle="Publish, edit, draft, and archive residential, commercial, and land listings."
    >
      <AdminPropertyList initialProperties={properties} />
    </AdminLayoutShell>
  );
}
