"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import { getAllProjectsAdmin, deleteProject, togglePublishProject, toggleFeatureProject, updateProjectStatus } from "@/actions/projects";
import { Project } from "@/types/content";
import { ProjectForm } from "./project-form";

type FilterStatus = "all" | "Draft" | "Ongoing" | "Completed" | "Archived";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, search, statusFilter]);

  async function fetchProjects() {
    setLoading(true);
    try {
      const fetched = await getAllProjectsAdmin();
      setProjects(fetched);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  async function handleTogglePublish(id: string, published: boolean) {
    try {
      await togglePublishProject(id, !published);
      setProjects(
        projects.map((p) =>
          p.id === id ? { ...p, published: !published } : p
        )
      );
    } catch (error) {
      console.error("Failed to toggle publish:", error);
    }
  }

  async function handleToggleFeature(id: string, featured: boolean) {
    try {
      await toggleFeatureProject(id, !featured);
      setProjects(
        projects.map((p) =>
          p.id === id ? { ...p, featured: !featured } : p
        )
      );
    } catch (error) {
      console.error("Failed to toggle feature:", error);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      await updateProjectStatus(id, status);
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  }

  const statusOptions: { value: FilterStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "Draft", label: "Draft" },
    { value: "Ongoing", label: "Ongoing" },
    { value: "Completed", label: "Completed" },
    { value: "Archived", label: "Archived" },
  ];

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage your portfolio projects, their details, media, and visibility."
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        }
      />

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-secondary/30 text-foreground placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className="rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}{" "}
          found
        </div>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500">Loading projects...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                  Featured
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                  Published
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground">
                  Order
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border/50 hover:bg-secondary/20"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{project.title}</div>
                    <div className="text-xs text-zinc-500 mt-1 truncate max-w-xs">
                      {project.shortDescription}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={project.status}
                      onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-brand/20"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleFeature(project.id, project.featured)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.featured
                          ? "bg-brand/20 text-brand"
                          : "bg-secondary/50 text-zinc-400"
                      }`}
                    >
                      {project.featured ? "Yes" : "No"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleTogglePublish(project.id, project.published)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.published
                          ? "bg-green-500/20 text-green-500"
                          : "bg-zinc-500/20 text-zinc-500"
                      }`}
                    >
                      {project.published ? "Live" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-zinc-400">{project.order}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-2.5 py-1.5 text-xs text-zinc-400 hover:text-foreground transition-colors"
                      >
                        View
                      </a>
                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setShowForm(true);
                        }}
                        className="rounded-md bg-secondary/50 px-2.5 py-1.5 text-xs text-foreground hover:bg-secondary transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="rounded-md px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Project Form Modal */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
}