import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="View visitor analytics and portfolio performance metrics."
      />
      <ComingSoon feature="Analytics Dashboard" />
    </div>
  );
}
