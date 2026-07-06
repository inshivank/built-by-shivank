"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { ExperienceForm } from "./experience-form";
import {
  getAllExperiencesAdmin,
  deleteExperience,
  togglePublishExperience,
  reorderExperiences,
} from "@/actions/experience";
import { ExperienceEntry } from "@/actions/experience";

type FilterType = "all" | "Internship" | "Freelance" | "Research" | "Open Source" | "Full-time" | "Part-time" | "Contract" | "Volunteer";

const TYPE_BADGE_COLORS: Record<string, string> = {
  Internship: "#3B82F6",
  Freelance: "#8B5CF6",
  Research: "#06B6D4",
  "Open Source": "#22C55E",
  "Full-time": "#F59E0B",
  "Part-time": "#F97316",
  Contract: "#EC4899",
  Volunteer: "#A78BFA",
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ExperienceEntry | null>(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllExperiencesAdmin();
      setExperiences(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const filtered = experiences.filter((exp) => {
    const matchesSearch =
      !search ||
      exp.role.toLowerCase().includes(search.toLowerCase()) ||
      exp.company.toLowerCase().includes(search.toLowerCase()) ||
      exp.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || exp.type === typeFilter;
    return matchesSearch && matchesType;
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience entry? This cannot be undone.")) return;
    await deleteExperience(id);
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  }

  async function handleTogglePublish(id: string, published: boolean) {
    await togglePublishExperience(id, !published);
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, published: !published } : e))
    );
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const updated = [...experiences];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    const reordered = updated.map((e, i) => ({ ...e, order: i }));
    setExperiences(reordered);
    await reorderExperiences(reordered.map((e) => ({ id: e.id, order: e.order })));
  }

  async function handleMoveDown(index: number) {
    if (index === experiences.length - 1) return;
    const updated = [...experiences];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    const reordered = updated.map((e, i) => ({ ...e, order: i }));
    setExperiences(reordered);
    await reorderExperiences(reordered.map((e) => ({ id: e.id, order: e.order })));
  }

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "Internship", label: "Internship" },
    { value: "Freelance", label: "Freelance" },
    { value: "Research", label: "Research" },
    { value: "Open Source", label: "Open Source" },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Volunteer", label: "Volunteer" },
  ];

  return (
    <div>
      <PageHeader
        title="Experience"
        description="Manage your work experience entries shown on the public portfolio."
        action={
          <button
            id="add-experience-btn"
            onClick={() => { setEditingExperience(null); setShowForm(true); }}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        }
      />

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              id="exp-search"
              type="text"
              placeholder="Search role or company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-secondary/30 text-foreground placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-500" />
            <select
              id="exp-type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as FilterType)}
              className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"} found
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-zinc-500">Loading experience entries…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          {experiences.length === 0
            ? "No experience entries yet. Click \"Add Experience\" to get started."
            : "No entries match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Role / Company</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Period</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Published</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((exp) => {
                const badgeColor = TYPE_BADGE_COLORS[exp.type] ?? "#A1A1AA";
                // Find true index in experiences (not filtered) for reordering
                const trueIndex = experiences.findIndex((e) => e.id === exp.id);
                return (
                  <tr key={exp.id} className="border-b border-border/50 hover:bg-secondary/20">
                    {/* Order controls */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          id={`exp-move-up-${exp.id}`}
                          onClick={() => handleMoveUp(trueIndex)}
                          disabled={trueIndex === 0}
                          className="text-zinc-500 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <span className="text-xs text-zinc-500">{exp.order}</span>
                        <button
                          id={`exp-move-down-${exp.id}`}
                          onClick={() => handleMoveDown(trueIndex)}
                          disabled={trueIndex === experiences.length - 1}
                          className="text-zinc-500 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Move down"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Role / Company */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{exp.role}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{exp.company}</div>
                    </td>

                    {/* Type badge */}
                    <td className="px-4 py-3">
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.03em",
                          background: `${badgeColor}18`,
                          color: badgeColor,
                          border: `1px solid ${badgeColor}30`,
                          textTransform: "uppercase",
                        }}
                      >
                        {exp.type}
                      </span>
                    </td>

                    {/* Period */}
                    <td className="px-4 py-3 text-sm text-zinc-400">{exp.period}</td>

                    {/* Location */}
                    <td className="px-4 py-3 text-sm text-zinc-400">{exp.location || "—"}</td>

                    {/* Published toggle */}
                    <td className="px-4 py-3">
                      <button
                        id={`exp-publish-${exp.id}`}
                        onClick={() => handleTogglePublish(exp.id, exp.published)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                          exp.published
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30"
                        }`}
                      >
                        {exp.published ? "Live" : "Hidden"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          id={`exp-edit-${exp.id}`}
                          onClick={() => { setEditingExperience(exp); setShowForm(true); }}
                          className="rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          id={`exp-delete-${exp.id}`}
                          onClick={() => handleDelete(exp.id)}
                          className="rounded-md px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ExperienceForm
          experience={editingExperience}
          onClose={() => { setShowForm(false); setEditingExperience(null); }}
          onSuccess={fetchExperiences}
        />
      )}
    </div>
  );
}
