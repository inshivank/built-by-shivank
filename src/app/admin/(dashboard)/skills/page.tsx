"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Filter, ChevronUp, ChevronDown, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { SkillForm } from "./skill-form";
import {
  getAllSkillsAdmin,
  getAllCategories,
  deleteSkill,
  togglePublishSkill,
  toggleFeaturedSkill,
  reorderSkills,
} from "@/actions/skills";
import { SkillEntry } from "@/actions/skills";

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillEntry | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [skillData, catData] = await Promise.all([
        getAllSkillsAdmin(),
        getAllCategories(),
      ]);
      setSkills(skillData);
      setCategories(catData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = skills.filter((s) => {
    const matchesSearch =
      !search || s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || s.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill? This cannot be undone.")) return;
    await deleteSkill(id);
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }

  async function handleTogglePublish(id: string, published: boolean) {
    await togglePublishSkill(id, !published);
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !published } : s))
    );
  }

  async function handleToggleFeatured(id: string, featured: boolean) {
    await toggleFeaturedSkill(id, !featured);
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, featured: !featured } : s))
    );
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const updated = [...skills];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    const reordered = updated.map((s, i) => ({ ...s, order: i }));
    setSkills(reordered);
    await reorderSkills(reordered.map((s) => ({ id: s.id, order: s.order })));
  }

  async function handleMoveDown(index: number) {
    if (index === skills.length - 1) return;
    const updated = [...skills];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    const reordered = updated.map((s, i) => ({ ...s, order: i }));
    setSkills(reordered);
    await reorderSkills(reordered.map((s) => ({ id: s.id, order: s.order })));
  }

  return (
    <div>
      <PageHeader
        title="Skills"
        description="Manage your technical skills shown on the public portfolio."
        action={
          <button
            id="add-skill-btn"
            onClick={() => { setEditingSkill(null); setShowForm(true); }}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            Add Skill
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
              id="skill-search"
              type="text"
              placeholder="Search skills…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-secondary/30 text-foreground placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-500" />
            <select
              id="skill-category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          {filtered.length} skill{filtered.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-zinc-500">Loading skills…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          {skills.length === 0
            ? "No skills yet. Click \"Add Skill\" to get started."
            : "No skills match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Skill</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Proficiency</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Yrs</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Featured</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Published</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((skill) => {
                const trueIndex = skills.findIndex((s) => s.id === skill.id);
                return (
                  <tr key={skill.id} className="border-b border-border/50 hover:bg-secondary/20">
                    {/* Order controls */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          id={`skill-move-up-${skill.id}`}
                          onClick={() => handleMoveUp(trueIndex)}
                          disabled={trueIndex === 0}
                          className="text-zinc-500 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <span className="text-xs text-zinc-500">{skill.order}</span>
                        <button
                          id={`skill-move-down-${skill.id}`}
                          onClick={() => handleMoveDown(trueIndex)}
                          disabled={trueIndex === skills.length - 1}
                          className="text-zinc-500 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
                          aria-label="Move down"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </td>

                    {/* Skill name + icon */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {skill.icon && (
                          <span className="text-base leading-none">{skill.icon}</span>
                        )}
                        <span className="font-medium text-foreground">{skill.name}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 10px",
                          borderRadius: "20px",
                          fontSize: "11px",
                          fontWeight: 600,
                          background: "rgba(59,130,246,0.12)",
                          color: "#3B82F6",
                          border: "1px solid rgba(59,130,246,0.2)",
                        }}
                      >
                        {skill.categoryName}
                      </span>
                    </td>

                    {/* Proficiency bar */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          style={{
                            width: "64px",
                            height: "4px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "2px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${skill.proficiency}%`,
                              height: "100%",
                              background:
                                skill.proficiency >= 80
                                  ? "#22C55E"
                                  : skill.proficiency >= 60
                                  ? "#3B82F6"
                                  : "#F59E0B",
                              borderRadius: "2px",
                            }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400">{skill.proficiency}%</span>
                      </div>
                    </td>

                    {/* Years */}
                    <td className="px-4 py-3 text-sm text-zinc-400">
                      {skill.yearsExp != null ? `${skill.yearsExp}y` : "—"}
                    </td>

                    {/* Featured */}
                    <td className="px-4 py-3">
                      <button
                        id={`skill-featured-${skill.id}`}
                        onClick={() => handleToggleFeatured(skill.id, skill.featured)}
                        aria-label={skill.featured ? "Unfeature skill" : "Feature skill"}
                        title={skill.featured ? "Click to unfeature" : "Click to feature"}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
                      >
                        <Star
                          size={14}
                          className={skill.featured ? "text-amber-400 fill-amber-400" : "text-zinc-600 hover:text-zinc-400"}
                        />
                      </button>
                    </td>

                    {/* Published toggle */}
                    <td className="px-4 py-3">
                      <button
                        id={`skill-publish-${skill.id}`}
                        onClick={() => handleTogglePublish(skill.id, skill.published)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                          skill.published
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30"
                        }`}
                      >
                        {skill.published ? "Live" : "Hidden"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          id={`skill-edit-${skill.id}`}
                          onClick={() => { setEditingSkill(skill); setShowForm(true); }}
                          className="rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          id={`skill-delete-${skill.id}`}
                          onClick={() => handleDelete(skill.id)}
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
        <SkillForm
          skill={editingSkill}
          onClose={() => { setShowForm(false); setEditingSkill(null); }}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
