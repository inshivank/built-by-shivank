"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { ExperienceEntry, ExperienceFormData } from "@/actions/experience";
import { createExperience, updateExperience } from "@/actions/experience";

interface ExperienceFormProps {
  experience: ExperienceEntry | null;
  onClose: () => void;
  onSuccess: () => void;
}

const EXPERIENCE_TYPES = ["Internship", "Freelance", "Research", "Open Source", "Full-time", "Part-time", "Contract", "Volunteer"];

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

export function ExperienceForm({ experience, onClose, onSuccess }: ExperienceFormProps) {
  const isEdit = !!experience;

  const [formData, setFormData] = useState<ExperienceFormData>({
    role: experience?.role ?? "",
    company: experience?.company ?? "",
    location: experience?.location ?? "",
    period: experience?.period ?? "",
    type: experience?.type ?? "Internship",
    description: experience?.description ?? [""],
    isCurrent: experience?.isCurrent ?? false,
    logoUrl: experience?.logoUrl ?? "",
    order: experience?.order ?? 0,
    published: experience?.published ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.role.trim()) e.role = "Role is required.";
    if (!formData.company.trim()) e.company = "Company is required.";
    if (!formData.period.trim()) e.period = "Period is required.";
    if (!formData.type.trim()) e.type = "Type is required.";
    if (formData.description.filter((b) => b.trim()).length === 0)
      e.description = "At least one bullet point is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      if (isEdit && experience) {
        await updateExperience(experience.id, {
          ...formData,
          description: formData.description.filter((b) => b.trim()),
        });
      } else {
        await createExperience({
          ...formData,
          description: formData.description.filter((b) => b.trim()),
        });
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

  function addBullet() {
    setFormData((prev) => ({ ...prev, description: [...prev.description, ""] }));
  }

  function removeBullet(i: number) {
    setFormData((prev) => ({
      ...prev,
      description: prev.description.filter((_, idx) => idx !== i),
    }));
  }

  function updateBullet(i: number, value: string) {
    setFormData((prev) => {
      const description = [...prev.description];
      description[i] = value;
      return { ...prev, description };
    });
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
          maxWidth: "640px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "28px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FAFAFA", margin: 0 }}>
            {isEdit ? "Edit Experience" : "Add Experience"}
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

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Role */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Role / Title *</label>
              <input
                id="exp-role"
                style={{ ...inputStyle, borderColor: errors.role ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.role}
                onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                placeholder="e.g. Software Engineering Intern"
              />
              {errors.role && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.role}</p>}
            </div>

            {/* Company */}
            <div>
              <label style={labelStyle}>Company / Organisation *</label>
              <input
                id="exp-company"
                style={{ ...inputStyle, borderColor: errors.company ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                placeholder="e.g. Acme Corp"
              />
              {errors.company && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.company}</p>}
            </div>

            {/* Type */}
            <div>
              <label style={labelStyle}>Type *</label>
              <select
                id="exp-type"
                style={{ ...inputStyle, borderColor: errors.type ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.type}
                onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
              >
                {EXPERIENCE_TYPES.map((t) => (
                  <option key={t} value={t} style={{ background: "#1C1C21" }}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.type && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.type}</p>}
            </div>

            {/* Location */}
            <div>
              <label style={labelStyle}>Location</label>
              <input
                id="exp-location"
                style={inputStyle}
                value={formData.location}
                onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Noida, India / Remote"
              />
            </div>

            {/* Period */}
            <div>
              <label style={labelStyle}>Period *</label>
              <input
                id="exp-period"
                style={{ ...inputStyle, borderColor: errors.period ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.period}
                onChange={(e) => setFormData((p) => ({ ...p, period: e.target.value }))}
                placeholder="e.g. May 2025 – July 2025"
              />
              {errors.period && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.period}</p>}
            </div>

            {/* Order */}
            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                id="exp-order"
                type="number"
                style={inputStyle}
                value={formData.order}
                onChange={(e) => setFormData((p) => ({ ...p, order: Number(e.target.value) }))}
                min={0}
              />
            </div>

            {/* Logo URL */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Logo URL (optional)</label>
              <input
                id="exp-logo"
                style={inputStyle}
                value={formData.logoUrl ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, logoUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            {/* Toggles */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  id="exp-current"
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData((p) => ({ ...p, isCurrent: e.target.checked }))}
                  style={{ accentColor: "#3B82F6", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "#A1A1AA" }}>Current Role</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  id="exp-published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
                  style={{ accentColor: "#22C55E", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "#A1A1AA" }}>Published</span>
              </label>
            </div>

            {/* Description bullets */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ ...labelStyle, marginBottom: "10px" }}>
                Description Bullets *
              </label>
              {errors.description && (
                <p style={{ color: "#EF4444", fontSize: "11px", marginBottom: "8px" }}>{errors.description}</p>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {formData.description.map((bullet, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#3B82F6", fontSize: "18px", lineHeight: 1, flexShrink: 0, marginTop: "1px" }}>•</span>
                    <input
                      id={`exp-bullet-${i}`}
                      style={{ ...inputStyle, flex: 1 }}
                      value={bullet}
                      onChange={(e) => updateBullet(i, e.target.value)}
                      placeholder={`Bullet point ${i + 1}`}
                    />
                    {formData.description.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBullet(i)}
                        style={{ background: "none", border: "none", color: "#71717A", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                        aria-label="Remove bullet"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addBullet}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  color: "#3B82F6",
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                <Plus size={13} /> Add Bullet
              </button>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "28px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "transparent",
                color: "#A1A1AA",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "8px 20px",
                borderRadius: "8px",
                background: saving ? "rgba(59,130,246,0.5)" : "#3B82F6",
                border: "none",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Experience"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
