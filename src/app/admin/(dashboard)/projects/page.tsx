import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage your portfolio projects, their details, media, and visibility."
      />
      <ComingSoon feature="Project Management" />
    </div>
  );
}
