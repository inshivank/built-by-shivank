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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await prisma.achievement.findUnique({ where: { id } });
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: row });
  } catch (error) {
    console.error("[GET /api/achievements/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch achievement" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const row = await prisma.achievement.update({
      where: { id },
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

    return NextResponse.json({ data: row });
  } catch (error) {
    console.error("[PUT /api/achievements/[id]]", error);
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.achievement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/achievements/[id]]", error);
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 });
  }
}
