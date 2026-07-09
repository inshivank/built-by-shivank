import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

function parseSkills(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapCertification(row: {
  skills: string;
  [key: string]: unknown;
}) {
  return { ...row, skills: parseSkills(row.skills) };
}

function cleanSkills(skills: unknown): string {
  return JSON.stringify(
    Array.isArray(skills)
      ? skills.map((skill) => String(skill).trim()).filter(Boolean)
      : []
  );
}

export async function GET() {
  try {
    const rows = await prisma.certification.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ data: rows.map(mapCertification) });
  } catch (error) {
    console.error("[GET /api/certifications]", error);
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      issuer,
      credentialId,
      date,
      expiryDate,
      credentialUrl,
      logoUrl,
      imageUrl,
      skills,
      description,
      order,
      published,
    } = body;

    if (!title?.trim())
      return NextResponse.json({ error: "Certification title is required" }, { status: 400 });
    if (!issuer?.trim())
      return NextResponse.json({ error: "Issuing organization is required" }, { status: 400 });
    if (!date?.trim())
      return NextResponse.json({ error: "Issue date is required" }, { status: 400 });
    if (!credentialUrl?.trim())
      return NextResponse.json({ error: "Verification URL is required" }, { status: 400 });

    const row = await prisma.certification.create({
      data: {
        title: title.trim(),
        issuer: issuer.trim(),
        credentialId: credentialId?.trim() || null,
        date: date.trim(),
        expiryDate: expiryDate?.trim() || null,
        credentialUrl: credentialUrl.trim(),
        logoUrl: logoUrl?.trim() || null,
        imageUrl: imageUrl?.trim() || null,
        skills: cleanSkills(skills),
        description: description?.trim() || null,
        order: Number(order) || 0,
        published: published !== false,
      },
    });

    return NextResponse.json({ data: mapCertification(row) }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/certifications]", error);
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 });
  }
}
