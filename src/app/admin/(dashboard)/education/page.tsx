import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function EducationPage() {
  return (
    <div>
      <PageHeader
        title="Education"
        description="Manage your educational background, degree, and coursework."
      />
      <ComingSoon feature="Education Management" />
    </div>
  );
}
