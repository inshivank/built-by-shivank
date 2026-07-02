import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage site settings, admin credentials, and configuration."
      />
      <ComingSoon feature="Settings" />
    </div>
  );
}
