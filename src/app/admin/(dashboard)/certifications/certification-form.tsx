"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import {
  CertificationEntry,
  CertificationFormData,
  createCertification,
  updateCertification,
} from "@/actions/certifications";

interface CertificationFormProps {
  certification: CertificationEntry | null;
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

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function CertificationForm({
  certification,
  onClose,
  onSuccess,
}: CertificationFormProps) {
  const isEdit = !!certification;
  const [formData, setFormData] = useState<CertificationFormData>({
    title: certification?.title ?? "",
    issuer: certification?.issuer ?? "",
    credentialId: certification?.credentialId ?? "",
    date: certification?.date ?? "",
    expiryDate: certification?.expiryDate ?? "",
    credentialUrl: certification?.credentialUrl ?? "",
    logoUrl: certification?.logoUrl ?? "",
    imageUrl: certification?.imageUrl ?? "",
    skills: certification?.skills ?? [],
    description: certification?.description ?? "",
    order: certification?.order ?? 0,
    published: certification?.published ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!formData.title.trim()) e.title = "Certification title is required.";
    if (!formData.issuer.trim()) e.issuer = "Issuing organization is required.";
    if (!formData.date.trim()) e.date = "Issue date is required.";
    if (!formData.credentialUrl.trim()) {
      e.credentialUrl = "Verification URL is required.";
    } else if (!isValidUrl(formData.credentialUrl)) {
      e.credentialUrl = "Enter a valid verification URL.";
    }
    if (formData.logoUrl?.trim() && !isValidUrl(formData.logoUrl)) {
      e.logoUrl = "Enter a valid logo URL.";
    }
    if (formData.imageUrl?.trim() && !isValidUrl(formData.imageUrl)) {
      e.imageUrl = "Enter a valid certificate image URL.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: CertificationFormData = {
        ...formData,
        skills: formData.skills.filter((skill) => skill.trim()),
      };
      if (isEdit && certification) {
        await updateCertification(certification.id, payload);
      } else {
        await createCertification(payload);
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

  function addSkill() {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  }

  function removeSkill(index: number) {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  }

  function updateSkill(index: number, value: string) {
    setFormData((prev) => {
      const skills = [...prev.skills];
      skills[index] = value;
      return { ...prev, skills };
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
          maxWidth: "720px",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "28px",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="m-0 text-lg font-bold text-foreground">
            {isEdit ? "Edit Certification" : "Add Certification"}
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
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {errors._form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label style={labelStyle}>Certification Title *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.title ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.title}
                onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. AWS Certified Cloud Practitioner"
              />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
            </div>

            <div>
              <label style={labelStyle}>Issuing Organization *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.issuer ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.issuer}
                onChange={(e) => setFormData((p) => ({ ...p, issuer: e.target.value }))}
                placeholder="e.g. Amazon Web Services"
              />
              {errors.issuer && <p className="mt-1 text-xs text-red-400">{errors.issuer}</p>}
            </div>

            <div>
              <label style={labelStyle}>Credential ID</label>
              <input
                style={inputStyle}
                value={formData.credentialId ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, credentialId: e.target.value }))}
                placeholder="Optional credential ID"
              />
            </div>

            <div>
              <label style={labelStyle}>Issue Date *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.date ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.date}
                onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
                placeholder="e.g. Dec 2024"
              />
              {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
            </div>

            <div>
              <label style={labelStyle}>Expiry Date</label>
              <input
                style={inputStyle}
                value={formData.expiryDate ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, expiryDate: e.target.value }))}
                placeholder="Optional expiry date"
              />
            </div>

            <div className="sm:col-span-2">
              <label style={labelStyle}>Verification URL *</label>
              <input
                style={{ ...inputStyle, borderColor: errors.credentialUrl ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.credentialUrl}
                onChange={(e) => setFormData((p) => ({ ...p, credentialUrl: e.target.value }))}
                placeholder="https://..."
              />
              {errors.credentialUrl && <p className="mt-1 text-xs text-red-400">{errors.credentialUrl}</p>}
            </div>

            <div>
              <label style={labelStyle}>Certificate Image</label>
              <input
                style={{ ...inputStyle, borderColor: errors.imageUrl ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.imageUrl ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, imageUrl: e.target.value }))}
                placeholder="https://..."
              />
              {errors.imageUrl && <p className="mt-1 text-xs text-red-400">{errors.imageUrl}</p>}
            </div>

            <div>
              <label style={labelStyle}>Logo URL</label>
              <input
                style={{ ...inputStyle, borderColor: errors.logoUrl ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)" }}
                value={formData.logoUrl ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, logoUrl: e.target.value }))}
                placeholder="https://..."
              />
              {errors.logoUrl && <p className="mt-1 text-xs text-red-400">{errors.logoUrl}</p>}
            </div>

            <div>
              <label style={labelStyle}>Display Order</label>
              <input
                type="number"
                min={0}
                style={inputStyle}
                value={formData.order}
                onChange={(e) => setFormData((p) => ({ ...p, order: Number(e.target.value) }))}
              />
            </div>

            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData((p) => ({ ...p, published: e.target.checked }))}
                  className="h-4 w-4 accent-green-500"
                />
                <span className="text-sm text-zinc-400">Published</span>
              </label>
            </div>

            <div className="sm:col-span-2">
              <label style={labelStyle}>Description</label>
              <textarea
                style={{ ...inputStyle, minHeight: "84px", resize: "vertical" }}
                value={formData.description ?? ""}
                onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                placeholder="Brief note about the certification."
              />
            </div>

            <div className="sm:col-span-2">
              <label style={{ ...labelStyle, marginBottom: "10px" }}>Skills Covered</label>
              <div className="flex flex-col gap-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      style={{ ...inputStyle, flex: 1 }}
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder={`Skill ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="p-1 text-zinc-500 transition-colors hover:text-red-400"
                      aria-label="Remove skill"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSkill}
                className="mt-3 flex items-center gap-1.5 rounded-md border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand"
              >
                <Plus size={13} />
                Add Skill
              </button>
            </div>
          </div>

          <div className="mt-7 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Add Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
