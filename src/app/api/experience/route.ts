import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function parseDescription(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// GET /api/experience — list published experience (public)
export async function GET() {
  try {
    const rows = await prisma.experience.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    const data = rows.map((r) => ({
      ...r,
      description: parseDescription(r.description),
    }));
    return NextResponse.json({ data });
  } catch (error) {
    console.error("[GET /api/experience]", error);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

// POST /api/experience — create new entry (admin only — caller should verify auth)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { role, company, location, period, type, description, isCurrent, logoUrl, order, published } = body;

    if (!role?.trim()) return NextResponse.json({ error: "Role is required" }, { status: 400 });
    if (!company?.trim()) return NextResponse.json({ error: "Company is required" }, { status: 400 });
    if (!period?.trim()) return NextResponse.json({ error: "Period is required" }, { status: 400 });
    if (!type?.trim()) return NextResponse.json({ error: "Type is required" }, { status: 400 });

    const row = await prisma.experience.create({
      data: {
        role: role.trim(),
        company: company.trim(),
        location: (location ?? "").trim(),
        period: period.trim(),
        type: type.trim(),
        description: JSON.stringify(Array.isArray(description) ? description.filter(Boolean) : []),
        isCurrent: Boolean(isCurrent),
        logoUrl: logoUrl?.trim() || null,
        order: Number(order) || 0,
        published: published !== false,
      },
    });
    return NextResponse.json({ data: { ...row, description: parseDescription(row.description) } }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/experience]", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
