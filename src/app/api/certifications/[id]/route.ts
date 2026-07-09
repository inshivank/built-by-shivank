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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = await prisma.certification.findUnique({ where: { id } });
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ data: mapCertification(row) });
  } catch (error) {
    console.error("[GET /api/certifications/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch certification" }, { status: 500 });
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

    const row = await prisma.certification.update({
      where: { id },
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

    return NextResponse.json({ data: mapCertification(row) });
  } catch (error) {
    console.error("[PUT /api/certifications/[id]]", error);
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.certification.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/certifications/[id]]", error);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}
