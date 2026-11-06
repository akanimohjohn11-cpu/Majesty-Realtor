import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import ViewingsManager from '@/components/admin/ViewingsManager';
import { repository } from '@/lib/db/repository';

export const metadata = {
  title: 'Viewing Inspections | Majesty Realty Admin',
};

export default async function AdminViewingsPage() {
  const viewings = await repository.getViewingRequests();

  return (
    <AdminLayoutShell
      title="Scheduled Viewing Inspections"
      subtitle="Confirm walk-through dates, assign field brokers, and issue gate clearance passes."
    >
      <ViewingsManager initialViewings={viewings} />
    </AdminLayoutShell>
  );
}
