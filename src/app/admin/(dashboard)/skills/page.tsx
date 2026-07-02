import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function SkillsPage() {
  return (
    <div>
      <PageHeader
        title="Skills"
        description="Manage skill categories, individual skills, and proficiency levels."
      />
      <ComingSoon feature="Skills Management" />
    </div>
  );
}
