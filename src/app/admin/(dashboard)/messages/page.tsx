import { PageHeader } from "@/components/admin/page-header";
import { ComingSoon } from "@/components/admin/coming-soon";

export default function MessagesPage() {
  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description="View and manage messages submitted through the contact form."
      />
      <ComingSoon feature="Messages Inbox" />
    </div>
  );
}
