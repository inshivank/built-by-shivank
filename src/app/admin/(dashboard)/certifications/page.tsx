import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function CertificationsPage() {
  return (
    <div>
      <PageHeader
        title="Certifications"
        description="Manage your professional certifications and credentials."
      />
      <ComingSoon feature="Certifications Management" />
    </div>
  );
}
