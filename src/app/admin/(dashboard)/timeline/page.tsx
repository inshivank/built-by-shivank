import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function TimelinePage() {
  return (
    <div>
      <PageHeader
        title="Timeline"
        description="Manage your career and education timeline events."
      />
      <ComingSoon feature="Timeline Management" />
    </div>
  );
}
