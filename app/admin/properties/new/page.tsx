import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import PropertyForm from '@/components/admin/PropertyForm';

export const metadata = {
  title: 'Add New Property | Majesty Realty Admin',
};

export default function NewPropertyPage() {
  return (
    <AdminLayoutShell
      title="Create New Property Listing"
      subtitle="Upload photographs directly, input spatial metrics, amenities, and publish to inventory."
    >
      <PropertyForm isEdit={false} />
    </AdminLayoutShell>
  );
}
