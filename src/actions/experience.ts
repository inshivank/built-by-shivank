"use server";

import { prisma } from "@/lib/db";
import { ExperienceEntry } from "@/types/content";
import { revalidatePath } from "next/cache";

// Re-export types so callers can import them from this module
export type { ExperienceEntry } from "@/types/content";


// ── Helpers ──────────────────────────────────────────────────────────────────

function parseDescription(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapToEntry(exp: {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  isCurrent: boolean;
  logoUrl: string | null;
  order: number;
  published?: boolean;
}): ExperienceEntry {
  return {
    id: exp.id,
    role: exp.role,
    company: exp.company,
    location: exp.location,
    period: exp.period,
    type: exp.type,
    description: parseDescription(exp.description),
    isCurrent: exp.isCurrent,
    logoUrl: exp.logoUrl ?? undefined,
    order: exp.order,
    published: (exp as { published?: boolean }).published ?? true,
  };
}

// ── Public read ───────────────────────────────────────────────────────────────

/** Returns all published experience entries, ordered for the public portfolio. */
export async function getExperiences(): Promise<ExperienceEntry[]> {
  const rows = await prisma.experience.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map((r) => mapToEntry({ ...r, published: true }));
}

// ── Admin reads ───────────────────────────────────────────────────────────────

/** Returns ALL experience entries (incl. unpublished) for the admin dashboard. */
export async function getAllExperiencesAdmin(): Promise<ExperienceEntry[]> {
  const rows = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });
  return rows.map((r) =>
    mapToEntry({ ...r, published: (r as { published?: boolean }).published ?? true })
  );
}

/** Returns a single experience entry by ID. */
export async function getExperienceById(id: string): Promise<ExperienceEntry | null> {
  const row = await prisma.experience.findUnique({ where: { id } });
  if (!row) return null;
  return mapToEntry({ ...row, published: (row as { published?: boolean }).published ?? true });
}

// ── Mutation payload ──────────────────────────────────────────────────────────

export type ExperienceFormData = {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[]; // array of bullet strings
  isCurrent: boolean;
  logoUrl?: string;
  order: number;
  published: boolean;
};

// ── Create ────────────────────────────────────────────────────────────────────

export async function createExperience(data: ExperienceFormData): Promise<ExperienceEntry> {
  if (!data.role.trim()) throw new Error("Role is required.");
  if (!data.company.trim()) throw new Error("Company is required.");
  if (!data.period.trim()) throw new Error("Period is required.");
  if (!data.type.trim()) throw new Error("Type is required.");

  const row = await prisma.experience.create({
    data: {
      role: data.role.trim(),
      company: data.company.trim(),
      location: data.location.trim(),
      period: data.period.trim(),
      type: data.type.trim(),
      description: JSON.stringify(data.description.filter((b) => b.trim())),
      isCurrent: data.isCurrent,
      logoUrl: data.logoUrl?.trim() || null,
      order: data.order,
      published: data.published,
    },
  });

  revalidatePath("/");
  revalidatePath("/#journey");

  return mapToEntry({ ...row, published: (row as { published?: boolean }).published ?? true });
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateExperience(
  id: string,
  data: ExperienceFormData
): Promise<ExperienceEntry> {
  if (!data.role.trim()) throw new Error("Role is required.");
  if (!data.company.trim()) throw new Error("Company is required.");
  if (!data.period.trim()) throw new Error("Period is required.");
  if (!data.type.trim()) throw new Error("Type is required.");

  const row = await prisma.experience.update({
    where: { id },
    data: {
      role: data.role.trim(),
      company: data.company.trim(),
      location: data.location.trim(),
      period: data.period.trim(),
      type: data.type.trim(),
      description: JSON.stringify(data.description.filter((b) => b.trim())),
      isCurrent: data.isCurrent,
      logoUrl: data.logoUrl?.trim() || null,
      order: data.order,
      published: data.published,
    },
  });

  revalidatePath("/");
  revalidatePath("/#journey");

  return mapToEntry({ ...row, published: (row as { published?: boolean }).published ?? true });
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteExperience(id: string): Promise<void> {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/#journey");
}

// ── Publish / Unpublish ───────────────────────────────────────────────────────

export async function togglePublishExperience(
  id: string,
  published: boolean
): Promise<void> {
  await prisma.experience.update({ where: { id }, data: { published } });
  revalidatePath("/");
  revalidatePath("/#journey");
}

// ── Reorder ───────────────────────────────────────────────────────────────────

export async function reorderExperiences(
  items: { id: string; order: number }[]
): Promise<void> {
  await Promise.all(
    items.map((item) =>
      prisma.experience.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/#journey");
}
