"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Search, SortAsc, Trophy } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import {
  AchievementEntry,
  deleteAchievement,
  getAllAchievementsAdmin,
  reorderAchievements,
  togglePublishAchievement,
} from "@/actions/achievements";
import { AchievementForm } from "./achievement-form";

type SortKey = "order" | "title" | "achievementType" | "date";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<AchievementEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<AchievementEntry | null>(null);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await getAllAchievementsAdmin();
      setAchievements(fetched);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    const rows = achievements.filter((achievement) => {
      if (!query) return true;
      return [
        achievement.title,
        achievement.description,
        achievement.achievementType ?? "",
        achievement.organization ?? "",
        achievement.date,
      ].some((value) => value.toLowerCase().includes(query));
    });

    return [...rows].sort((a, b) => {
      if (sortKey === "order") return a.order - b.order;
      return String(a[sortKey]).localeCompare(String(b[sortKey]));
    });
  }, [achievements, search, sortKey]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this achievement? This cannot be undone.")) return;
    await deleteAchievement(id);
    setAchievements((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleTogglePublish(id: string, published: boolean) {
    await togglePublishAchievement(id, !published);
    setAchievements((prev) => prev.map((item) => (item.id === id ? { ...item, published: !published } : item)));
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const updated = [...achievements];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setAchievements(reordered);
    await reorderAchievements(reordered.map((item) => ({ id: item.id, order: item.order })));
  }

  async function handleMoveDown(index: number) {
    if (index === achievements.length - 1) return;
    const updated = [...achievements];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    const reordered = updated.map((item, i) => ({ ...item, order: i }));
    setAchievements(reordered);
    await reorderAchievements(reordered.map((item) => ({ id: item.id, order: item.order })));
  }

  return (
    <div>
      <PageHeader
        title="Achievements"
        description="Manage your notable achievements and milestones."
        action={
          <button
            onClick={() => {
              setEditingAchievement(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            Add Achievement
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-lg border border-border bg-secondary/30 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-zinc-500" />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="order">Display Order</option>
              <option value="title">Title</option>
              <option value="achievementType">Type</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          {filtered.length} achievement{filtered.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-zinc-500">Loading achievements...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-zinc-500">
          {achievements.length === 0
            ? 'No achievements yet. Click "Add Achievement" to get started.'
            : "No achievements match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Achievement</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Published</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((achievement) => {
                const trueIndex = achievements.findIndex((item) => item.id === achievement.id);
                return (
                  <tr key={achievement.id} className="border-b border-border/50 hover:bg-secondary/20">
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => handleMoveUp(trueIndex)}
                          disabled={trueIndex === 0}
                          className="text-zinc-500 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20"
                          aria-label="Move up"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <span className="text-xs text-zinc-500">{achievement.order}</span>
                        <button
                          onClick={() => handleMoveDown(trueIndex)}
                          disabled={trueIndex === achievements.length - 1}
                          className="text-zinc-500 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-20"
                          aria-label="Move down"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand/10 bg-brand/5 text-brand">
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{achievement.title}</div>
                          {achievement.organization && (
                            <div className="mt-1 text-xs text-zinc-500">{achievement.organization}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-400">{achievement.achievementType ?? "Achievement"}</td>
                    <td className="px-4 py-3 text-sm text-zinc-400">{achievement.date}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleTogglePublish(achievement.id, achievement.published)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                          achievement.published
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30"
                        }`}
                      >
                        {achievement.published ? "Live" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingAchievement(achievement);
                            setShowForm(true);
                          }}
                          className="rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(achievement.id)}
                          className="rounded-md px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-500/10"
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

      {showForm && (
        <AchievementForm
          achievement={editingAchievement}
          onClose={() => setShowForm(false)}
          onSuccess={() => fetchAchievements()}
        />
      )}
    </div>
  );
}
