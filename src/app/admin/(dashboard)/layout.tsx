import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Server-side auth guard — redirect if no valid session
  const session = await getSessionPayload();
  if (!session) {
    redirect("/admin/login");
  }

  const adminEmail =
    typeof session.adminEmail === "string"
      ? session.adminEmail
      : "admin@shivank.dev";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#09090B",
      }}
    >
      {/* Sidebar */}
      <AdminSidebar unreadMessages={0} />

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <AdminTopbar adminEmail={adminEmail} />

        {/* Page content */}
        <main
          style={{
            flex: 1,
            padding: "28px",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
