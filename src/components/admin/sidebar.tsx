"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Zap,
  GraduationCap,
  Award,
  Trophy,
  Clock,
  Link2,
  FileText,
  Mail,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Zap },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/timeline", label: "Timeline", icon: Clock },
  { href: "/admin/social-links", label: "Social Links", icon: Link2 },
  { href: "/admin/resume", label: "Resume", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  unreadMessages?: number;
}

export function AdminSidebar({ unreadMessages = 0 }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="admin-sidebar"
      data-collapsed={collapsed ? "true" : "false"}
      style={{
        width: collapsed ? "68px" : "240px",
        minHeight: "100vh",
        background: "#17171B",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.22s cubic-bezier(0.16,1,0.3,1)",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "20px 0" : "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight: "64px",
        }}
      >
        {!collapsed && (
          <div>
            <span
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#FAFAFA",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              Admin Panel
            </span>
            <div
              style={{
                fontSize: "11px",
                color: "#A1A1AA",
                marginTop: "2px",
              }}
            >
              Built by Shivank
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#A1A1AA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          const isMessages = href === "/admin/messages";
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "8px",
                marginBottom: "2px",
                background: active
                  ? "rgba(59,130,246,0.15)"
                  : "transparent",
                color: active ? "#3B82F6" : "#A1A1AA",
                textDecoration: "none",
                fontSize: "13.5px",
                fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                overflow: "hidden",
                position: "relative",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <span style={{ flexShrink: 0, position: "relative" }}>
                <Icon size={16} strokeWidth={active ? 2.5 : 1.8} />
                {isMessages && unreadMessages > 0 && collapsed && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3B82F6",
                    }}
                  />
                )}
              </span>
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{label}</span>
                  {isMessages && unreadMessages > 0 && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        background: "#3B82F6",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "1px 6px",
                        minWidth: "18px",
                        textAlign: "center",
                      }}
                    >
                      {unreadMessages}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer brand */}
      {!collapsed && (
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: "11px",
            color: "rgba(161,161,170,0.5)",
          }}
        >
          Admin v2.0
        </div>
      )}
    </aside>
  );
}
