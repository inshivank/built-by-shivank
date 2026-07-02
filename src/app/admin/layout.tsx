import { ReactNode } from "react";

// Root admin layout — thin wrapper, no sidebar
// The (dashboard) route group handles the sidebar/topbar layout
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090B",
        color: "#FAFAFA",
      }}
    >
      {children}
    </div>
  );
}
