import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/skills — list published skills grouped by category (public)
export async function GET() {
  try {
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
    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("[GET /api/skills]", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// POST /api/skills — create a new skill
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      categoryId,
      newCategoryName,
      icon,
      proficiency,
      yearsExp,
      featured,
      published,
      order,
    } = body;

    if (!name?.trim())
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });

    // Resolve category
    let resolvedCategoryId = categoryId;
    if (newCategoryName?.trim()) {
      const existing = await prisma.skillCategory.findFirst({
        where: { name: { equals: newCategoryName.trim() } },
      });
      if (existing) {
        resolvedCategoryId = existing.id;
      } else {
        const maxOrder = await prisma.skillCategory.aggregate({ _max: { order: true } });
        const cat = await prisma.skillCategory.create({
          data: {
            name: newCategoryName.trim(),
            order: (maxOrder._max.order ?? -1) + 1,
          },
        });
        resolvedCategoryId = cat.id;
      }
    }

    if (!resolvedCategoryId)
      return NextResponse.json({ error: "Category is required" }, { status: 400 });

    const row = await prisma.skill.create({
      data: {
        name: name.trim(),
        icon: icon?.trim() || null,
        proficiency: Math.min(100, Math.max(0, Number(proficiency) || 80)),
        yearsExp: yearsExp ? Number(yearsExp) : null,
        featured: Boolean(featured),
        published: published !== false,
        order: Number(order) || 0,
        categoryId: resolvedCategoryId,
      },
      include: { category: true },
    });

    return NextResponse.json({ data: row }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/skills]", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
