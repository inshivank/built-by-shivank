"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Award, ChevronDown, ChevronUp, Plus, Search, SortAsc } from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import {
  CertificationEntry,
  deleteCertification,
  getAllCertificationsAdmin,
  reorderCertifications,
  togglePublishCertification,
} from "@/actions/certifications";
import { CertificationForm } from "./certification-form";

type SortKey = "order" | "title" | "issuer" | "date";

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<CertificationEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [showForm, setShowForm] = useState(false);
  const [editingCertification, setEditingCertification] =
    useState<CertificationEntry | null>(null);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await getAllCertificationsAdmin();
      setCertifications(fetched);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    const rows = certifications.filter((cert) => {
      if (!query) return true;
      return (
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.date.toLowerCase().includes(query) ||
        cert.skills.some((skill) => skill.toLowerCase().includes(query))
      );
    });

    return [...rows].sort((a, b) => {
      if (sortKey === "order") return a.order - b.order;
      return String(a[sortKey]).localeCompare(String(b[sortKey]));
    });
  }, [certifications, search, sortKey]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this certification? This cannot be undone.")) return;
    await deleteCertification(id);
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
  }

  async function handleTogglePublish(id: string, published: boolean) {
    await togglePublishCertification(id, !published);
    setCertifications((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, published: !published } : cert))
    );
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const updated = [...certifications];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    const reordered = updated.map((cert, i) => ({ ...cert, order: i }));
    setCertifications(reordered);
    await reorderCertifications(reordered.map((cert) => ({ id: cert.id, order: cert.order })));
  }

  async function handleMoveDown(index: number) {
    if (index === certifications.length - 1) return;
    const updated = [...certifications];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    const reordered = updated.map((cert, i) => ({ ...cert, order: i }));
    setCertifications(reordered);
    await reorderCertifications(reordered.map((cert) => ({ id: cert.id, order: cert.order })));
  }

  return (
    <div>
      <PageHeader
        title="Certifications"
        description="Manage your professional certifications and credentials."
        action={
          <button
            onClick={() => {
              setEditingCertification(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            Add Certification
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search certifications..."
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
              <option value="issuer">Issuer</option>
              <option value="date">Issue Date</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          {filtered.length} certification{filtered.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-zinc-500">Loading certifications...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-zinc-500">
          {certifications.length === 0
            ? "No certifications yet. Click \"Add Certification\" to get started."
            : "No certifications match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Certification</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Issuer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Issue Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Skills</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">Published</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cert) => {
                const trueIndex = certifications.findIndex((item) => item.id === cert.id);
                return (
                  <tr key={cert.id} className="border-b border-border/50 hover:bg-secondary/20">
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
                        <span className="text-xs text-zinc-500">{cert.order}</span>
                        <button
                          onClick={() => handleMoveDown(trueIndex)}
                          disabled={trueIndex === certifications.length - 1}
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
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{cert.title}</div>
                          {cert.credentialId && (
                            <div className="mt-1 text-xs text-zinc-500">
                              ID: {cert.credentialId}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-400">{cert.issuer}</td>
                    <td className="px-4 py-3 text-sm text-zinc-400">
                      {cert.date}
                      {cert.expiryDate && (
                        <span className="block text-xs text-zinc-600">Expires {cert.expiryDate}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex max-w-xs flex-wrap gap-1.5">
                        {cert.skills.length > 0 ? (
                          cert.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-brand/20 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-zinc-500">None</span>
                        )}
                        {cert.skills.length > 3 && (
                          <span className="text-xs text-zinc-500">+{cert.skills.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleTogglePublish(cert.id, cert.published)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                          cert.published
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30"
                        }`}
                      >
                        {cert.published ? "Live" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md px-2.5 py-1.5 text-xs text-zinc-400 transition-colors hover:text-foreground"
                        >
                          View
                        </a>
                        <button
                          onClick={() => {
                            setEditingCertification(cert);
                            setShowForm(true);
                          }}
                          className="rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="rounded-md px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:text-red-300"
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
        <CertificationForm
          certification={editingCertification}
          onClose={() => {
            setShowForm(false);
            setEditingCertification(null);
          }}
          onSuccess={fetchCertifications}
        />
      )}
    </div>
  );
}
