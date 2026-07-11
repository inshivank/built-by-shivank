"use server";

import { prisma } from "@/lib/db";
import { Achievement } from "@/types/content";
import { revalidatePath } from "next/cache";

export type AchievementEntry = Omit<Achievement, "id"> & {
  id: string;
};

export type AchievementFormData = {
  title: string;
  description: string;
  achievementType: string;
  organization?: string;
  date: string;
  imageUrl?: string;
  externalLink?: string;
  order: number;
  published: boolean;
};

function cleanString(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function validateAchievement(data: AchievementFormData) {
  if (!data.title.trim()) throw new Error("Achievement title is required.");
  if (!data.description.trim()) throw new Error("Achievement description is required.");
  if (!data.achievementType.trim()) throw new Error("Achievement type is required.");
  if (!data.date.trim()) throw new Error("Achievement date is required.");
}

function toDbData(data: AchievementFormData) {
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    achievementType: data.achievementType.trim(),
    organization: cleanString(data.organization),
    date: data.date.trim(),
    imageUrl: cleanString(data.imageUrl),
    externalLink: cleanString(data.externalLink),
    order: data.order,
    published: data.published,
  };
}

function mapToEntry(row: {
  id: string;
  title: string;
  description: string;
  achievementType: string | null;
  organization: string | null;
  date: string;
  imageUrl: string | null;
  externalLink: string | null;
  order: number;
  published: boolean;
  metric: string | null;
}): AchievementEntry {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    achievementType: row.achievementType ?? "Achievement",
    organization: row.organization ?? undefined,
    date: row.date,
    imageUrl: row.imageUrl ?? undefined,
    externalLink: row.externalLink ?? undefined,
    order: row.order,
    published: row.published,
    metric: row.metric ?? undefined,
  };
}

export async function getAchievements(): Promise<AchievementEntry[]> {
  const rows = await prisma.achievement.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(mapToEntry);
}

export async function getAllAchievementsAdmin(): Promise<AchievementEntry[]> {
  const rows = await prisma.achievement.findMany({
    orderBy: { order: "asc" },
  });
  return rows.map(mapToEntry);
}

export async function getAchievementById(id: string): Promise<AchievementEntry | null> {
  const row = await prisma.achievement.findUnique({ where: { id } });
  return row ? mapToEntry(row) : null;
}

export async function createAchievement(data: AchievementFormData): Promise<AchievementEntry> {
  validateAchievement(data);
  const row = await prisma.achievement.create({ data: toDbData(data) });
  revalidatePath("/");
  revalidatePath("/#achievements");
  revalidatePath("/admin");
  return mapToEntry(row);
}

export async function updateAchievement(
  id: string,
  data: AchievementFormData
): Promise<AchievementEntry> {
  validateAchievement(data);
  const row = await prisma.achievement.update({
    where: { id },
    data: toDbData(data),
  });
  revalidatePath("/");
  revalidatePath("/#achievements");
  revalidatePath("/admin");
  return mapToEntry(row);
}

export async function deleteAchievement(id: string): Promise<void> {
  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/#achievements");
  revalidatePath("/admin");
}

export async function togglePublishAchievement(id: string, published: boolean): Promise<void> {
  await prisma.achievement.update({ where: { id }, data: { published } });
  revalidatePath("/");
  revalidatePath("/#achievements");
  revalidatePath("/admin");
}

export async function reorderAchievements(
  items: { id: string; order: number }[]
): Promise<void> {
  await Promise.all(
    items.map((item) =>
      prisma.achievement.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/#achievements");
  revalidatePath("/admin");
}
