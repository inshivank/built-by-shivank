"use client";

import { useState, useEffect } from "react";
import { X, Save, Image as ImageIcon, Upload, Link as LinkIcon } from "lucide-react";
import { Project } from "@/types/content";
import {
  createProject,
  updateProject,
} from "@/actions/projects";

interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectForm({ project, onClose, onSuccess }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    heroDescription: "",
    problem: "",
    solution: "",
    features: "",
    techStack: "",
    architecture: "",
    challenges: "",
    lessonsLearned: "",
    futureImprovements: "",
    github: "",
    liveDemo: "",
    caseStudy: "",
    coverImage: "",
    demoVideo: "",
    gallery: "",
    duration: "",
    status: "Draft",
    featured: false,
    published: true,
    order: 0,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        slug: project.slug || "",
        description: project.description || "",
        shortDescription: project.shortDescription || "",
        heroDescription: project.heroDescription || "",
        problem: project.problem || "",
        solution: project.solution || "",
        features: project.features.join("\n") || "",
        techStack: project.techStack.join("\n") || "",
        architecture: project.architecture || "",
        challenges: project.challenges.join("\n") || "",
        lessonsLearned: project.lessonsLearned.join("\n") || "",
        futureImprovements: project.futureImprovements.join("\n") || "",
        github: project.github || "",
        liveDemo: project.liveDemo || "",
        caseStudy: project.caseStudy || "",
        coverImage: project.coverImage || "",
        demoVideo: project.demoVideo || "",
        gallery: project.gallery.join("\n") || "",
        duration: project.duration || "",
        status: project.status || "Draft",
        featured: project.featured || false,
        published: project.published ?? true,
        order: project.order || 0,
      });
    }
  }, [project]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...formData,
      features: formData.features.split("\n").filter(Boolean),
      techStack: formData.techStack.split("\n").filter(Boolean),
      challenges: formData.challenges.split("\n").filter(Boolean),
      lessonsLearned: formData.lessonsLearned.split("\n").filter(Boolean),
      futureImprovements: formData.futureImprovements.split("\n").filter(Boolean),
      gallery: formData.gallery.split("\n").filter(Boolean),
    };

    try {
      if (project) {
        await updateProject(project.id, data);
      } else {
        await createProject(data);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded-lg border border-border bg-card max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card/90 px-6 py-4 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground">
            {project ? "Edit Project" : "Add Project"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-zinc-400 hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="e.g., my-project"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                >
                  <option value="Draft">Draft</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border border-border text-brand focus:ring-brand"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded border border-border text-brand focus:ring-brand"
                  />
                  Published
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-semibold text-foreground mb-4">Media & Links</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.liveDemo}
                  onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Cover Image
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="/projects/my-project/cover.jpg"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Demo Video (optional)
                </label>
                <input
                  type="text"
                  value={formData.demoVideo}
                  onChange={(e) => setFormData({ ...formData, demoVideo: e.target.value })}
                  placeholder="/projects/my-project/demo.mp4"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="text-sm font-semibold text-foreground mb-4">Arrays (one per line)</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Technologies
                </label>
                <textarea
                  rows={3}
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="Next.js&#10;React&#10;TypeScript"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Features
                </label>
                <textarea
                  rows={3}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature one&#10;Feature two"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Challenges
                </label>
                <textarea
                  rows={3}
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  placeholder="Challenge one&#10;Challenge two"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  Gallery Images
                </label>
                <textarea
                  rows={3}
                  value={formData.gallery}
                  onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                  placeholder="/projects/my-project/image-1.jpg&#10;/projects/my-project/image-2.jpg"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-card/90 px-6 py-4 backdrop-blur-sm">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 hover:text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}