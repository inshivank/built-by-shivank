"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  SkillEntry,
  SkillFormData,
  createSkill,
  updateSkill,
  getAllCategories,
} from "@/actions/skills";

interface SkillFormProps {
  skill: SkillEntry | null;
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

export function SkillForm({ skill, onClose, onSuccess }: SkillFormProps) {
  const isEdit = !!skill;

  const [categories, setCategories] = useState<
    { id: string; name: string; order: number; published: boolean }[]
  >([]);
  const [formData, setFormData] = useState<SkillFormData>({
    name: skill?.name ?? "",
    categoryId: skill?.categoryId ?? "",
    newCategoryName: "",
    icon: skill?.icon ?? "",
    proficiency: skill?.proficiency ?? 80,
    yearsExp: skill?.yearsExp,
    featured: skill?.featured ?? false,
    published: skill?.published ?? true,
    order: skill?.order ?? 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [useNewCategory, setUseNewCategory] = useState(false);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Skill name is required.";
    if (!useNewCategory && !formData.categoryId)
      e.category = "Please select a category.";
    if (useNewCategory && !formData.newCategoryName?.trim())
      e.category = "Category name is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: SkillFormData = {
        ...formData,
        newCategoryName: useNewCategory ? formData.newCategoryName : undefined,
        categoryId: useNewCategory ? "" : formData.categoryId,
      };
      if (isEdit && skill) {
        await updateSkill(skill.id, payload);
      } else {
        await createSkill(payload);
      }
      onSuccess();
      onClose();
    } catch (err) {
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
          maxWidth: "560px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "28px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#FAFAFA", margin: 0 }}>
            {isEdit ? "Edit Skill" : "Add Skill"}
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
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "16px",
              fontSize: "13px",
              color: "#EF4444",
            }}
          >
            {errors._form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Skill Name */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Skill Name *</label>
              <input
                id="skill-name"
                style={{
                  ...inputStyle,
                  borderColor: errors.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                }}
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. React 19"
              />
              {errors.name && <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.name}</p>}
            </div>

            {/* Category */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>Category *</label>
                <button
                  type="button"
                  onClick={() => setUseNewCategory((v) => !v)}
                  style={{
                    fontSize: "11px",
                    color: "#3B82F6",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {useNewCategory ? "← Select existing" : "+ New category"}
                </button>
              </div>
              {useNewCategory ? (
                <input
                  id="skill-new-category"
                  style={{
                    ...inputStyle,
                    borderColor: errors.category ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                  }}
                  value={formData.newCategoryName ?? ""}
                  onChange={(e) => setFormData((p) => ({ ...p, newCategoryName: e.target.value }))}
                  placeholder="e.g. Cloud & DevOps"
                />
              ) : (
                <select
                  id="skill-category"
                  style={{
                    ...inputStyle,
                    borderColor: errors.category ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)",
                  }}
                  value={formData.categoryId}
                  onChange={(e) => setFormData((p) => ({ ...p, categoryId: e.target.value }))}
                >
                  <option value="" style={{ background: "#1C1C21" }}>Select category…</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} style={{ background: "#1C1C21" }}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.category && (
                <p style={{ color: "#EF4444", fontSize: "11px", marginTop: "4px" }}>{errors.category}</p>
              )}
            </div>

            {/* Icon */}
            <div>
              <label style={labelStyle}>Icon (optional)</label>
              <input
                id="skill-icon"
                style={inputStyle}
                value={formData.icon ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, icon: e.target.value }))}
                placeholder="e.g. ⚛️ or 'react'"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label style={labelStyle}>Years of Experience</label>
              <input
                id="skill-years"
                type="number"
                step="0.5"
                min="0"
                style={inputStyle}
                value={formData.yearsExp ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    yearsExp: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                placeholder="e.g. 2.5"
              />
            </div>

            {/* Proficiency */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>
                Proficiency: <strong style={{ color: "#FAFAFA" }}>{formData.proficiency}%</strong>
              </label>
              <input
                id="skill-proficiency"
                type="range"
                min={0}
                max={100}
                step={5}
                value={formData.proficiency}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, proficiency: Number(e.target.value) }))
                }
                style={{
                  width: "100%",
                  accentColor: "#3B82F6",
                  cursor: "pointer",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#71717A", marginTop: "2px" }}>
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>

            {/* Display Order */}
            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                id="skill-order"
                type="number"
                style={inputStyle}
                value={formData.order}
                onChange={(e) => setFormData((p) => ({ ...p, order: Number(e.target.value) }))}
                min={0}
              />
            </div>

            {/* Toggles */}
            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  id="skill-featured"
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                  style={{ accentColor: "#F59E0B", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "#A1A1AA" }}>Featured</span>
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <input
                  id="skill-published"
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
                  style={{ accentColor: "#22C55E", width: "16px", height: "16px" }}
                />
                <span style={{ fontSize: "13px", color: "#A1A1AA" }}>Published</span>
              </label>
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
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
