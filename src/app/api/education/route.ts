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

// GET /api/education — list published education entries (public)
export async function GET() {
  try {
    const rows = await prisma.education.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    const data = rows.map((r) => ({
      ...r,
      coursework: parseCoursework(r.coursework),
    }));
    return NextResponse.json({ data });
  } catch (error) {
    console.error("[GET /api/education]", error);
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

// POST /api/education — create new entry
export async function POST(req: NextRequest) {
  try {
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

    const row = await prisma.education.create({
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

    return NextResponse.json(
      { data: { ...row, coursework: parseCoursework(row.coursework) } },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/education]", error);
    return NextResponse.json({ error: "Failed to create education entry" }, { status: 500 });
  }
}
