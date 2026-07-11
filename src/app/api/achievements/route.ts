import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function cleanString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function cleanBoolean(value: unknown): boolean {
  return value !== false;
}

export async function GET() {
  try {
    const rows = await prisma.achievement.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("[GET /api/achievements]", error);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      achievementType,
      organization,
      date,
      imageUrl,
      externalLink,
      order,
      published,
    } = body;

    if (!title?.trim())
      return NextResponse.json({ error: "Achievement title is required" }, { status: 400 });
    if (!description?.trim())
      return NextResponse.json({ error: "Achievement description is required" }, { status: 400 });
    if (!achievementType?.trim())
      return NextResponse.json({ error: "Achievement type is required" }, { status: 400 });
    if (!date?.trim())
      return NextResponse.json({ error: "Achievement date is required" }, { status: 400 });

    const row = await prisma.achievement.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        achievementType: achievementType.trim(),
        organization: cleanString(organization),
        date: date.trim(),
        imageUrl: cleanString(imageUrl),
        externalLink: cleanString(externalLink),
        order: Number(order) || 0,
        published: cleanBoolean(published),
      },
    });

    return NextResponse.json({ data: row }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/achievements]", error);
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}
