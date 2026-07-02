import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function ExperiencePage() {
  return (
    <div>
      <PageHeader
        title="Experience"
        description="Manage your work experience entries, roles, and bullet points."
      />
      <ComingSoon feature="Experience Management" />
    </div>
  );
}
