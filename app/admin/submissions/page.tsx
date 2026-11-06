import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import SubmissionsManager from '@/components/admin/SubmissionsManager';
import { repository } from '@/lib/db/repository';

export const metadata = {
  title: 'Owner Submissions | Majesty Realty Admin',
};

export default async function AdminSubmissionsPage() {
  const submissions = await repository.getSubmissions();

  return (
    <AdminLayoutShell
      title="Property Owner Listings"
      subtitle="Review property sales and rental proposals submitted by landlords and asset holders."
    >
      <SubmissionsManager initialSubmissions={submissions} />
    </AdminLayoutShell>
  );
}
