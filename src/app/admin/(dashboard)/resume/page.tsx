import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function ResumePage() {
  return (
    <div>
      <PageHeader
        title="Resume"
        description="Upload and manage your downloadable resume file."
      />
      <ComingSoon feature="Resume Management" />
    </div>
  );
}
