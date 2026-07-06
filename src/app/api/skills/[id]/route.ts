import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/skills/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await prisma.skill.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: row });
  } catch (error) {
    console.error("[GET /api/skills/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch skill" }, { status: 500 });
  }
}

// PUT /api/skills/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, categoryId, icon, proficiency, yearsExp, featured, published, order } = body;

    if (!name?.trim())
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    if (!categoryId)
      return NextResponse.json({ error: "Category is required" }, { status: 400 });

    const row = await prisma.skill.update({
      where: { id },
      data: {
        name: name.trim(),
        icon: icon?.trim() || null,
        proficiency: Math.min(100, Math.max(0, Number(proficiency) || 80)),
        yearsExp: yearsExp ? Number(yearsExp) : null,
        featured: Boolean(featured),
        published: published !== false,
        order: Number(order) || 0,
        categoryId,
      },
      include: { category: true },
    });
    return NextResponse.json({ data: row });
  } catch (error) {
    console.error("[PUT /api/skills/[id]]", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// DELETE /api/skills/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/skills/[id]]", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
