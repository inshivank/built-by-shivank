"use client";

import { logout } from "@/actions/auth";
import { LogOut, User } from "lucide-react";
import { useTransition } from "react";

interface TopbarProps {
  pageTitle?: string;
  adminEmail?: string;
}

export function AdminTopbar({
  pageTitle = "Dashboard",
  adminEmail = "admin@shivank.dev",
}: TopbarProps) {
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await logout();
    });
  }

  return (
    <header
      style={{
        height: "64px",
        background: "#17171B",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Left: Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#FAFAFA",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Right: Profile + Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Admin profile chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <User size={12} color="#fff" />
          </div>
          <span
            style={{
              fontSize: "12px",
              color: "#A1A1AA",
              maxWidth: "180px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {adminEmail}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={isPending}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            color: "#A1A1AA",
            fontSize: "13px",
            fontWeight: 500,
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.5 : 1,
            transition: "all 0.15s",
          }}
          aria-label="Logout"
        >
          <LogOut size={14} />
          <span style={{ display: "none" }} className="sm:inline">
            {isPending ? "Signing out..." : "Logout"}
          </span>
        </button>
      </div>
    </header>
  );
}
