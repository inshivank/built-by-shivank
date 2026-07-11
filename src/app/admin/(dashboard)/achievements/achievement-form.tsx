"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AchievementEntry, AchievementFormData, createAchievement, updateAchievement } from "@/actions/achievements";

interface AchievementFormProps {
  achievement: AchievementEntry | null;
  onClose: () => void;
  onSuccess: () => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#FAFAFA",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 500,
  color: "#A1A1AA",
  marginBottom: "6px",
};

export function AchievementForm({ achievement, onClose, onSuccess }: AchievementFormProps) {
  const isEdit = !!achievement;
  const [formData, setFormData] = useState<AchievementFormData>({
    title: achievement?.title ?? "",
    description: achievement?.description ?? "",
    achievementType: achievement?.achievementType ?? "Achievement",
    organization: achievement?.organization ?? "",
    date: achievement?.date ?? "",
    imageUrl: achievement?.imageUrl ?? "",
    externalLink: achievement?.externalLink ?? "",
    order: achievement?.order ?? 0,
    published: achievement?.published ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData({
      title: achievement?.title ?? "",
      description: achievement?.description ?? "",
      achievementType: achievement?.achievementType ?? "Achievement",
      organization: achievement?.organization ?? "",
      date: achievement?.date ?? "",
      imageUrl: achievement?.imageUrl ?? "",
      externalLink: achievement?.externalLink ?? "",
      order: achievement?.order ?? 0,
      published: achievement?.published ?? true,
    });
  }, [achievement]);

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    if (!formData.title.trim()) nextErrors.title = "Title is required.";
    if (!formData.description.trim()) nextErrors.description = "Description is required.";
    if (!formData.achievementType.trim()) nextErrors.achievementType = "Type is required.";
    if (!formData.date.trim()) nextErrors.date = "Date is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (isEdit && achievement) {
        await updateAchievement(achievement.id, formData);
      } else {
        await createAchievement(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ _form: err instanceof Error ? err.message : "An error occurred." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#1C1C21",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FAFAFA", margin: 0 }}>
            {isEdit ? "Edit Achievement" : "Add Achievement"}
          </h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#A1A1AA", cursor: "pointer", padding: "4px" }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {errors._form && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", fontSize: "13px", color: "#EF4444" }}>
            {errors._form}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Title *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.title ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. 1st Place @ Hackathon"
              />
              {errors.title && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.title}</p>}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description *</label>
              <textarea
                style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }}
                value={formData.description}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Describe the achievement and impact."
              />
              {errors.description && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.description}</p>}
            </div>

            <div>
              <label style={labelStyle}>Type *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.achievementType ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.achievementType}
                onChange={(e) => setFormData((p) => ({ ...p, achievementType: e.target.value }))}
                placeholder="e.g. Hackathon, Contest, Award"
              />
              {errors.achievementType && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.achievementType}</p>}
            </div>

            <div>
              <label style={labelStyle}>Organization</label>
              <input
                style={inputStyle}
                value={formData.organization ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, organization: e.target.value }))}
                placeholder="e.g. ICPC, Devfolio"
              />
            </div>

            <div>
              <label style={labelStyle}>Date *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.date ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.date}
                onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                placeholder="e.g. 2025"
              />
              {errors.date && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.date}</p>}
            </div>

            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                type="number"
                style={inputStyle}
                value={formData.order}
                onChange={(e) => setFormData((p) => ({ ...p, order: Number(e.target.value) || 0 }))}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Achievement Image URL</label>
              <input
                style={inputStyle}
                value={formData.imageUrl ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>External Link</label>
              <input
                style={inputStyle}
                value={formData.externalLink ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, externalLink: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
              <input
                id="achievement-published"
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
              />
              <label htmlFor="achievement-published" style={{ fontSize: "13px", color: "#A1A1AA" }}>
                Published
              </label>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", color: "#FAFAFA", background: "transparent", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{ padding: "10px 14px", borderRadius: "8px", background: "#3B82F6", color: "white", border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
            >
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Achievement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
