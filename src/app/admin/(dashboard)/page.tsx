"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Briefcase,
  Zap,
  Mail,
  Star,
  PlayCircle,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { getAllProjectsAdmin } from "@/actions/projects";
import { getAllExperiencesAdmin } from "@/actions/experience";
import { getAllCertificationsAdmin } from "@/actions/certifications";
import { getAllAchievementsAdmin } from "@/actions/achievements";
import { skills } from "@/content/skills";
import { Project } from "@/types/content";

export default function DashboardHomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [experienceCount, setExperienceCount] = useState<number>(0);
  const [certificationCount, setCertificationCount] = useState<number>(0);
  const [achievementCount, setAchievementCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAllProjectsAdmin(),
      getAllExperiencesAdmin(),
      getAllCertificationsAdmin(),
      getAllAchievementsAdmin(),
    ])
      .then(([projs, exps, certs, achs]) => {
        setProjects(projs);
        setExperienceCount(exps.length);
        setCertificationCount(certs.length);
        setAchievementCount(achs.length);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalProjects = projects.length;
  const featuredCount = projects.filter((p) => p.featured).length;
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const ongoingCount = projects.filter((p) => p.status === "Ongoing").length;
  const totalSkills = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  const STATS = [
    {
      title: "Total Projects",
      value: loading ? "-" : totalProjects,
      icon: FolderKanban,
      trend: "All portfolio projects",
      accentColor: "#3B82F6",
    },
    {
      title: "Featured Projects",
      value: loading ? "-" : featuredCount,
      icon: Star,
      trend: "Shown in featured section",
      accentColor: "#F59E0B",
    },
    {
      title: "Completed",
      value: loading ? "-" : completedCount,
      icon: CheckCircle2,
      trend: "Marked as completed",
      accentColor: "#22C55E",
    },
    {
      title: "Ongoing",
      value: loading ? "-" : ongoingCount,
      icon: PlayCircle,
      trend: "Currently in progress",
      accentColor: "#8B5CF6",
    },
    {
      title: "Total Skills",
      value: totalSkills,
      icon: Zap,
      trend: `Across ${skills.length} categories`,
      accentColor: "#EC4899",
    },
    {
      title: "Experience Entries",
      value: loading ? "-" : experienceCount,
      icon: Briefcase,
      trend: "Work experience records",
      accentColor: "#06B6D4",
    },
    {
      title: "Unread Messages",
      value: 0,
      icon: Mail,
      trend: "Contact form submissions",
      accentColor: "#F97316",
    },
    {
      title: "Certifications",
      value: loading ? "-" : certificationCount,
      icon: BookOpen,
      trend: "Professional certifications",
      accentColor: "#10B981",
    },
    {
      title: "Achievements",
      value: loading ? "-" : achievementCount,
      icon: Star,
      trend: "Portfolio achievements",
      accentColor: "#F59E0B",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#FAFAFA",
            margin: "0 0 6px",
            letterSpacing: "-0.02em",
          }}
        >
          Overview
        </h2>
        <p style={{ fontSize: "14px", color: "#A1A1AA", margin: 0 }}>
          Your portfolio at a glance. Manage content using the sidebar.
        </p>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "36px",
        }}
      >
        {STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Info banner */}
      <div
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: "12px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#3B82F6",
            flexShrink: 0,
            marginTop: "6px",
          }}
        />
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#FAFAFA",
              marginBottom: "4px",
            }}
          >
            Phase 3 Active — Content Module CRUD
          </div>
          <div style={{ fontSize: "13px", color: "#A1A1AA", lineHeight: 1.6 }}>
            Projects and Experience are now managed via the database. Stats
            above are live. Add, edit, and delete entries from the sidebar pages.
          </div>
        </div>
      </div>
    </div>
  );
}
