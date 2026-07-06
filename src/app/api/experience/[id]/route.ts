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

// GET /api/experience/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const row = await prisma.experience.findUnique({ where: { id } });
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: { ...row, description: parseDescription(row.description) } });
  } catch (error) {
    console.error("[GET /api/experience/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

// PUT /api/experience/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { role, company, location, period, type, description, isCurrent, logoUrl, order, published } = body;

    if (!role?.trim()) return NextResponse.json({ error: "Role is required" }, { status: 400 });
    if (!company?.trim()) return NextResponse.json({ error: "Company is required" }, { status: 400 });
    if (!period?.trim()) return NextResponse.json({ error: "Period is required" }, { status: 400 });
    if (!type?.trim()) return NextResponse.json({ error: "Type is required" }, { status: 400 });

    const row = await prisma.experience.update({
      where: { id },
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
    return NextResponse.json({ data: { ...row, description: parseDescription(row.description) } });
  } catch (error) {
    console.error("[PUT /api/experience/[id]]", error);
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

// DELETE /api/experience/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/experience/[id]]", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
