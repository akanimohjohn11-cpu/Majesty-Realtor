import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import SettingsManager from '@/components/admin/SettingsManager';
import { repository } from '@/lib/db/repository';
import { INITIAL_SETTINGS } from '@/lib/db/mock-data';

export const metadata = {
  title: 'Site Settings | Majesty Realty Admin',
};

// Force dynamic so admin always sees latest live configurations
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminSettingsPage() {
  let settings = INITIAL_SETTINGS;
  try {
    const fetched = await repository.getSiteSettings();
    if (fetched && fetched.business_name) {
      settings = fetched;
    }
  } catch (err) {
    console.error('Error fetching settings for admin settings page:', err);
  }

  return (
    <AdminLayoutShell
      title="Website Configuration & Settings"
      subtitle="Update public telephone lines, WhatsApp number, office address, and hero messaging."
    >
      <SettingsManager initialSettings={settings} />
    </AdminLayoutShell>
  );
}
