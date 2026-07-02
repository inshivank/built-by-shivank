import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function SocialLinksPage() {
  return (
    <div>
      <PageHeader
        title="Social Links"
        description="Manage your social media profiles and contact links."
      />
      <ComingSoon feature="Social Links Management" />
    </div>
  );
}
