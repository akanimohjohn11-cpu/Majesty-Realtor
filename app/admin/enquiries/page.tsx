import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import EnquiriesManager from '@/components/admin/EnquiriesManager';
import { repository } from '@/lib/db/repository';

export const metadata = {
  title: 'Client Enquiries | Majesty Realty Admin',
};

export default async function AdminEnquiriesPage() {
  const enquiries = await repository.getEnquiries();

  return (
    <AdminLayoutShell
      title="Inbound Client Enquiries"
      subtitle="Manage leads generated from property pages, general contact, and investment advisory."
    >
      <EnquiriesManager initialEnquiries={enquiries} />
    </AdminLayoutShell>
  );
}
