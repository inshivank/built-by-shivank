"use server";

import { prisma } from "@/lib/db";
import { EducationEntry } from "@/types/content";
import { revalidatePath } from "next/cache";

// Re-export types so callers can import them from this module
export type { EducationEntry } from "@/types/content";

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseCoursework(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapToEntry(edu: {
  id: string;
  institution: string;
  logoUrl: string | null;
  degree: string;
  field: string | null;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  gpa: string | null;
  description: string | null;
  progressYear: string | null;
  progressPct: number | null;
  coursework: string;
  order: number;
  published: boolean;
}): EducationEntry {
  return {
    id: edu.id,
    institution: edu.institution,
    logoUrl: edu.logoUrl ?? undefined,
    degree: edu.degree,
    field: edu.field ?? undefined,
    location: edu.location,
    startDate: edu.startDate,
    endDate: edu.endDate ?? undefined,
    isCurrent: edu.isCurrent,
    gpa: edu.gpa ?? undefined,
    description: edu.description ?? undefined,
    progressYear: edu.progressYear ?? undefined,
    progressPct: edu.progressPct ?? undefined,
    coursework: parseCoursework(edu.coursework),
    order: edu.order,
    published: edu.published,
  };
}

// ── Public read ───────────────────────────────────────────────────────────────

/** Returns all published education entries, ordered for the public portfolio. */
export async function getEducation(): Promise<EducationEntry[]> {
  const rows = await prisma.education.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(mapToEntry);
}

// ── Admin reads ───────────────────────────────────────────────────────────────

/** Returns ALL education entries (incl. unpublished) for the admin dashboard. */
export async function getAllEducationAdmin(): Promise<EducationEntry[]> {
  const rows = await prisma.education.findMany({
    orderBy: { order: "asc" },
  });
  return rows.map(mapToEntry);
}

/** Returns a single education entry by ID. */
export async function getEducationById(id: string): Promise<EducationEntry | null> {
  const row = await prisma.education.findUnique({ where: { id } });
  if (!row) return null;
  return mapToEntry(row);
}

// ── Mutation payload ──────────────────────────────────────────────────────────

export type EducationFormData = {
  institution: string;
  logoUrl?: string;
  degree: string;
  field?: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: string;
  description?: string;
  progressYear?: string;
  progressPct?: number;
  coursework: string[]; // array of course strings
  order: number;
  published: boolean;
};

// ── Create ────────────────────────────────────────────────────────────────────

export async function createEducation(data: EducationFormData): Promise<EducationEntry> {
  if (!data.institution.trim()) throw new Error("Institution is required.");
  if (!data.degree.trim()) throw new Error("Degree is required.");
  if (!data.startDate.trim()) throw new Error("Start date is required.");

  const row = await prisma.education.create({
    data: {
      institution: data.institution.trim(),
      logoUrl: data.logoUrl?.trim() || null,
      degree: data.degree.trim(),
      field: data.field?.trim() || null,
      location: data.location.trim(),
      startDate: data.startDate.trim(),
      endDate: data.isCurrent ? null : data.endDate?.trim() || null,
      isCurrent: data.isCurrent,
      gpa: data.gpa?.trim() || null,
      description: data.description?.trim() || null,
      progressYear: data.progressYear?.trim() || null,
      progressPct: data.progressPct ?? null,
      coursework: JSON.stringify(data.coursework.filter((c) => c.trim())),
      order: data.order,
      published: data.published,
    },
  });

  revalidatePath("/");
  revalidatePath("/#education");

  return mapToEntry(row);
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateEducation(
  id: string,
  data: EducationFormData
): Promise<EducationEntry> {
  if (!data.institution.trim()) throw new Error("Institution is required.");
  if (!data.degree.trim()) throw new Error("Degree is required.");
  if (!data.startDate.trim()) throw new Error("Start date is required.");

  const row = await prisma.education.update({
    where: { id },
    data: {
      institution: data.institution.trim(),
      logoUrl: data.logoUrl?.trim() || null,
      degree: data.degree.trim(),
      field: data.field?.trim() || null,
      location: data.location.trim(),
      startDate: data.startDate.trim(),
      endDate: data.isCurrent ? null : data.endDate?.trim() || null,
      isCurrent: data.isCurrent,
      gpa: data.gpa?.trim() || null,
      description: data.description?.trim() || null,
      progressYear: data.progressYear?.trim() || null,
      progressPct: data.progressPct ?? null,
      coursework: JSON.stringify(data.coursework.filter((c) => c.trim())),
      order: data.order,
      published: data.published,
    },
  });

  revalidatePath("/");
  revalidatePath("/#education");

  return mapToEntry(row);
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteEducation(id: string): Promise<void> {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/#education");
}

// ── Publish / Unpublish ───────────────────────────────────────────────────────

export async function togglePublishEducation(
  id: string,
  published: boolean
): Promise<void> {
  await prisma.education.update({ where: { id }, data: { published } });
  revalidatePath("/");
  revalidatePath("/#education");
}

// ── Reorder ───────────────────────────────────────────────────────────────────

export async function reorderEducation(
  items: { id: string; order: number }[]
): Promise<void> {
  await Promise.all(
    items.map((item) =>
      prisma.education.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/#education");
}
