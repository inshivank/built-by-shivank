import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function AchievementsPage() {
  return (
    <div>
      <PageHeader
        title="Achievements"
        description="Manage your notable achievements and metrics."
      />
      <ComingSoon feature="Achievements Management" />
    </div>
  );
}
