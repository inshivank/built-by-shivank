"use server";

import { prisma } from "@/lib/db";
import { SkillEntry, SkillCategoryEntry } from "@/types/content";
import { revalidatePath } from "next/cache";

// Re-export types so callers can import from this module
export type { SkillEntry, SkillCategoryEntry } from "@/types/content";

// ── Helpers ──────────────────────────────────────────────────────────────────

function mapToEntry(skill: {
  id: string;
  name: string;
  icon: string | null;
  proficiency: number;
  yearsExp: number | null;
  featured: boolean;
  published: boolean;
  order: number;
  categoryId: string;
  category: { name: string };
}): SkillEntry {
  return {
    id: skill.id,
    name: skill.name,
    icon: skill.icon ?? undefined,
    proficiency: skill.proficiency,
    yearsExp: skill.yearsExp ?? undefined,
    featured: skill.featured,
    published: skill.published,
    order: skill.order,
    categoryId: skill.categoryId,
    categoryName: skill.category.name,
  };
}

// ── Public read ───────────────────────────────────────────────────────────────

/** Returns published skills grouped by category for the public portfolio. */
export async function getSkills(): Promise<SkillCategoryEntry[]> {
  const categories = await prisma.skillCategory.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: {
      skills: {
        where: { published: true },
        orderBy: { order: "asc" },
      },
    },
  });

  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    order: cat.order,
    published: cat.published,
    skills: cat.skills.map((s) =>
      mapToEntry({ ...s, category: { name: cat.name } })
    ),
  }));
}

// ── Admin reads ───────────────────────────────────────────────────────────────

/** Returns ALL skills (incl. unpublished) for the admin dashboard. */
export async function getAllSkillsAdmin(): Promise<SkillEntry[]> {
  const rows = await prisma.skill.findMany({
    orderBy: [{ categoryId: "asc" }, { order: "asc" }],
    include: { category: true },
  });
  return rows.map(mapToEntry);
}

/** Returns a single skill by ID. */
export async function getSkillById(id: string): Promise<SkillEntry | null> {
  const row = await prisma.skill.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!row) return null;
  return mapToEntry(row);
}

/** Returns all skill categories. */
export async function getAllCategories(): Promise<
  { id: string; name: string; order: number; published: boolean }[]
> {
  return prisma.skillCategory.findMany({ orderBy: { order: "asc" } });
}

// ── Mutation payload ──────────────────────────────────────────────────────────

export type SkillFormData = {
  name: string;
  categoryId: string;      // existing category id
  newCategoryName?: string; // if creating a new category
  icon?: string;
  proficiency: number;
  yearsExp?: number;
  featured: boolean;
  published: boolean;
  order: number;
};

// ── Helpers for category resolution ──────────────────────────────────────────

async function resolveCategory(data: SkillFormData): Promise<string> {
  // If a new category name is provided, upsert it
  if (data.newCategoryName?.trim()) {
    const existing = await prisma.skillCategory.findFirst({
      where: { name: { equals: data.newCategoryName.trim() } },
    });
    if (existing) return existing.id;
    const maxOrder = await prisma.skillCategory.aggregate({ _max: { order: true } });
    const cat = await prisma.skillCategory.create({
      data: {
        name: data.newCategoryName.trim(),
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });
    return cat.id;
  }
  return data.categoryId;
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function createSkill(data: SkillFormData): Promise<SkillEntry> {
  if (!data.name.trim()) throw new Error("Skill name is required.");
  if (!data.categoryId && !data.newCategoryName?.trim())
    throw new Error("Category is required.");

  const categoryId = await resolveCategory(data);

  const row = await prisma.skill.create({
    data: {
      name: data.name.trim(),
      icon: data.icon?.trim() || null,
      proficiency: Math.min(100, Math.max(0, data.proficiency)),
      yearsExp: data.yearsExp ?? null,
      featured: data.featured,
      published: data.published,
      order: data.order,
      categoryId,
    },
    include: { category: true },
  });

  revalidatePath("/");
  revalidatePath("/#skills");
  return mapToEntry(row);
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateSkill(
  id: string,
  data: SkillFormData
): Promise<SkillEntry> {
  if (!data.name.trim()) throw new Error("Skill name is required.");
  if (!data.categoryId && !data.newCategoryName?.trim())
    throw new Error("Category is required.");

  const categoryId = await resolveCategory(data);

  const row = await prisma.skill.update({
    where: { id },
    data: {
      name: data.name.trim(),
      icon: data.icon?.trim() || null,
      proficiency: Math.min(100, Math.max(0, data.proficiency)),
      yearsExp: data.yearsExp ?? null,
      featured: data.featured,
      published: data.published,
      order: data.order,
      categoryId,
    },
    include: { category: true },
  });

  revalidatePath("/");
  revalidatePath("/#skills");
  return mapToEntry(row);
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteSkill(id: string): Promise<void> {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/#skills");
}

// ── Publish / Unpublish ───────────────────────────────────────────────────────

export async function togglePublishSkill(
  id: string,
  published: boolean
): Promise<void> {
  await prisma.skill.update({ where: { id }, data: { published } });
  revalidatePath("/");
  revalidatePath("/#skills");
}

// ── Featured / Unfeatured ─────────────────────────────────────────────────────

export async function toggleFeaturedSkill(
  id: string,
  featured: boolean
): Promise<void> {
  await prisma.skill.update({ where: { id }, data: { featured } });
  revalidatePath("/");
  revalidatePath("/#skills");
}

// ── Reorder ───────────────────────────────────────────────────────────────────

export async function reorderSkills(
  items: { id: string; order: number }[]
): Promise<void> {
  await Promise.all(
    items.map((item) =>
      prisma.skill.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/#skills");
}
