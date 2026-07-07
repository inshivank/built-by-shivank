import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function parseCoursework(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// GET /api/education/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await prisma.education.findUnique({ where: { id } });
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: { ...row, coursework: parseCoursework(row.coursework) } });
  } catch (error) {
    console.error("[GET /api/education/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch education entry" }, { status: 500 });
  }
}

// PUT /api/education/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      institution,
      logoUrl,
      degree,
      field,
      location,
      startDate,
      endDate,
      isCurrent,
      gpa,
      description,
      progressYear,
      progressPct,
      coursework,
      order,
      published,
    } = body;

    if (!institution?.trim())
      return NextResponse.json({ error: "Institution is required" }, { status: 400 });
    if (!degree?.trim())
      return NextResponse.json({ error: "Degree is required" }, { status: 400 });
    if (!startDate?.trim())
      return NextResponse.json({ error: "Start date is required" }, { status: 400 });

    const row = await prisma.education.update({
      where: { id },
      data: {
        institution: institution.trim(),
        logoUrl: logoUrl?.trim() || null,
        degree: degree.trim(),
        field: field?.trim() || null,
        location: (location ?? "").trim(),
        startDate: startDate.trim(),
        endDate: isCurrent ? null : endDate?.trim() || null,
        isCurrent: Boolean(isCurrent),
        gpa: gpa?.trim() || null,
        description: description?.trim() || null,
        progressYear: progressYear?.trim() || null,
        progressPct: progressPct ? Number(progressPct) : null,
        coursework: JSON.stringify(
          Array.isArray(coursework) ? coursework.filter(Boolean) : []
        ),
        order: Number(order) || 0,
        published: published !== false,
      },
    });

    return NextResponse.json({ data: { ...row, coursework: parseCoursework(row.coursework) } });
  } catch (error) {
    console.error("[PUT /api/education/[id]]", error);
    return NextResponse.json({ error: "Failed to update education entry" }, { status: 500 });
  }
}

// DELETE /api/education/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.education.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/education/[id]]", error);
    return NextResponse.json({ error: "Failed to delete education entry" }, { status: 500 });
  }
}
