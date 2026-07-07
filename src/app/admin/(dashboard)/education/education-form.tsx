"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import {
  EducationEntry,
  EducationFormData,
  createEducation,
  updateEducation,
} from "@/actions/education";

interface EducationFormProps {
  education: EducationEntry | null;
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

export function EducationForm({ education, onClose, onSuccess }: EducationFormProps) {
  const isEdit = !!education;

  const [formData, setFormData] = useState<EducationFormData>({
    institution: education?.institution ?? "",
    logoUrl: education?.logoUrl ?? "",
    degree: education?.degree ?? "",
    field: education?.field ?? "",
    location: education?.location ?? "",
    startDate: education?.startDate ?? "",
    endDate: education?.endDate ?? "",
    isCurrent: education?.isCurrent ?? false,
    gpa: education?.gpa ?? "",
    description: education?.description ?? "",
    progressYear: education?.progressYear ?? "",
    progressPct: education?.progressPct ?? undefined,
    coursework: education?.coursework ?? [],
    order: education?.order ?? 0,
    published: education?.published ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.institution.trim()) e.institution = "Institution is required.";
    if (!formData.degree.trim()) e.degree = "Degree is required.";
    if (!formData.startDate.trim()) e.startDate = "Start date is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: EducationFormData = {
        ...formData,
        coursework: formData.coursework.filter((c) => c.trim()),
        endDate: formData.isCurrent ? undefined : formData.endDate,
      };
      if (isEdit && education) {
        await updateEducation(education.id, payload);
      } else {
        await createEducation(payload);
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

  function addCourse() {
    setFormData((prev) => ({ ...prev, coursework: [...prev.coursework, ""] }));
  }

  function removeCourse(i: number) {
    setFormData((prev) => ({
      ...prev,
      coursework: prev.coursework.filter((_, idx) => idx !== i),
    }));
  }

  function updateCourse(i: number, value: string) {
    setFormData((prev) => {
      const coursework = [...prev.coursework];
      coursework[i] = value;
      return { ...prev, coursework };
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
          maxWidth: "680px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "28px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FAFAFA", margin: 0 }}>
            {isEdit ? "Edit Education" : "Add Education"}
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

            {/* Institution */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Institution *</label>
              <input
                id="edu-institution"
                style={{ ...inputStyle, borderColor: errors.institution ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.institution}
                onChange={(e) => setFormData((p) => ({ ...p, institution: e.target.value }))}
                placeholder="e.g. Jaypee University of Information Technology"
              />
              {errors.institution && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.institution}</p>}
            </div>

            {/* Logo URL */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Institution Logo URL (optional)</label>
              <input
                id="edu-logo"
                style={inputStyle}
                value={formData.logoUrl ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, logoUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>

            {/* Degree */}
            <div>
              <label style={labelStyle}>Degree *</label>
              <input
                id="edu-degree"
                style={{ ...inputStyle, borderColor: errors.degree ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.degree}
                onChange={(e) => setFormData((p) => ({ ...p, degree: e.target.value }))}
                placeholder="e.g. Bachelor of Technology"
              />
              {errors.degree && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.degree}</p>}
            </div>

            {/* Field of Study */}
            <div>
              <label style={labelStyle}>Field of Study</label>
              <input
                id="edu-field"
                style={inputStyle}
                value={formData.field ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, field: e.target.value }))}
                placeholder="e.g. Computer Science & Engineering"
              />
            </div>

            {/* Location */}
            <div>
              <label style={labelStyle}>Location</label>
              <input
                id="edu-location"
                style={inputStyle}
                value={formData.location}
                onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Solan, India"
              />
            </div>

            {/* Start Date */}
            <div>
              <label style={labelStyle}>Start Date *</label>
              <input
                id="edu-start-date"
                style={{ ...inputStyle, borderColor: errors.startDate ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.startDate}
                onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))}
                placeholder="e.g. 2023"
              />
              {errors.startDate && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.startDate}</p>}
            </div>

            {/* End Date */}
            <div>
              <label style={labelStyle}>End Date {formData.isCurrent ? "(Ongoing)" : ""}</label>
              <input
                id="edu-end-date"
                style={{ ...inputStyle, opacity: formData.isCurrent ? 0.4 : 1 }}
                value={formData.isCurrent ? "" : (formData.endDate ?? "")}
                onChange={(e) => setFormData((p) => ({ ...p, endDate: e.target.value }))}
                placeholder="e.g. 2027"
                disabled={formData.isCurrent}
              />
            </div>

            {/* GPA */}
            <div>
              <label style={labelStyle}>CGPA / Grade (optional)</label>
              <input
                id="edu-gpa"
                style={inputStyle}
                value={formData.gpa ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, gpa: e.target.value }))}
                placeholder="e.g. 8.4 / 10.0 (Current)"
              />
            </div>

            {/* Display Order */}
            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                id="edu-order"
                type="number"
                style={inputStyle}
                value={formData.order}
                onChange={(e) => setFormData((p) => ({ ...p, order: Number(e.target.value) }))}
                min={0}
              />
            </div>

            {/* Description */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description (optional)</label>
              <textarea
                id="edu-description"
                style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                value={formData.description ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Brief description of your studies, achievements, etc."
              />
            </div>

            {/* Progress fields — shown when isCurrent */}
            {formData.isCurrent && (
              <>
                <div>
                  <label style={labelStyle}>Progress Year Label</label>
                  <input
                    id="edu-progress-year"
                    style={inputStyle}
                    value={formData.progressYear ?? ""}
                    onChange={(e) => setFormData((p) => ({ ...p, progressYear: e.target.value }))}
                    placeholder="e.g. 3rd Year (B.Tech CSE)"
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Progress %: <strong style={{ color: "#FAFAFA" }}>{formData.progressPct ?? 0}%</strong>
                  </label>
                  <input
                    id="edu-progress-pct"
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={formData.progressPct ?? 0}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, progressPct: Number(e.target.value) }))
                    }
                    style={{ width: "100%", accentColor: "#3B82F6", cursor: "pointer" }}
                  />
                </div>
              </>
            )}

            {/* Toggles */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  id="edu-current"
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData((p) => ({ ...p, isCurrent: e.target.checked, endDate: e.target.checked ? "" : p.endDate }))}
                  style={{ accentColor: "#3B82F6", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "#A1A1AA" }}>Currently Studying</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  id="edu-published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
                  style={{ accentColor: "#22C55E", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "#A1A1AA" }}>Published</span>
              </label>
            </div>

            {/* Coursework chips */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ ...labelStyle, marginBottom: "10px" }}>Relevant Coursework</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {formData.coursework.map((course, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#3B82F6", fontSize: "18px", lineHeight: 1, flexShrink: 0, marginTop: "1px" }}>•</span>
                    <input
                      id={`edu-course-${i}`}
                      style={{ ...inputStyle, flex: 1 }}
                      value={course}
                      onChange={(e) => updateCourse(i, e.target.value)}
                      placeholder={`Course ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeCourse(i)}
                      style={{ background: "none", border: "none", color: "#71717A", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                      aria-label="Remove course"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addCourse}
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
                <Plus size={13} /> Add Course
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
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Education"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
