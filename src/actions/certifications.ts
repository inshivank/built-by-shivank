"use server";

import { prisma } from "@/lib/db";
import { Certification } from "@/types/content";
import { revalidatePath } from "next/cache";

export type CertificationEntry = Required<
  Pick<
    Certification,
    "id" | "title" | "issuer" | "date" | "credentialUrl" | "skills" | "order" | "published"
  >
> &
  Omit<
    Certification,
    "id" | "title" | "issuer" | "date" | "credentialUrl" | "skills" | "order" | "published"
  >;

export type CertificationFormData = {
  title: string;
  issuer: string;
  credentialId?: string;
  date: string;
  expiryDate?: string;
  credentialUrl: string;
  logoUrl?: string;
  imageUrl?: string;
  skills: string[];
  description?: string;
  order: number;
  published: boolean;
};

function parseSkills(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cleanSkills(skills: string[]): string[] {
  return skills.map((skill) => skill.trim()).filter(Boolean);
}

function validateCertification(data: CertificationFormData) {
  if (!data.title.trim()) throw new Error("Certification title is required.");
  if (!data.issuer.trim()) throw new Error("Issuing organization is required.");
  if (!data.date.trim()) throw new Error("Issue date is required.");
  if (!data.credentialUrl.trim()) throw new Error("Verification URL is required.");
}

function mapToEntry(cert: {
  id: string;
  title: string;
  issuer: string;
  credentialId: string | null;
  date: string;
  expiryDate: string | null;
  credentialUrl: string;
  logoUrl: string | null;
  imageUrl: string | null;
  skills: string;
  description: string | null;
  order: number;
  published: boolean;
}): CertificationEntry {
  return {
    id: cert.id,
    title: cert.title,
    issuer: cert.issuer,
    credentialId: cert.credentialId ?? undefined,
    date: cert.date,
    expiryDate: cert.expiryDate ?? undefined,
    credentialUrl: cert.credentialUrl,
    logoUrl: cert.logoUrl ?? undefined,
    imageUrl: cert.imageUrl ?? undefined,
    skills: parseSkills(cert.skills),
    description: cert.description ?? undefined,
    order: cert.order,
    published: cert.published,
  };
}

function toDbData(data: CertificationFormData) {
  return {
    title: data.title.trim(),
    issuer: data.issuer.trim(),
    credentialId: data.credentialId?.trim() || null,
    date: data.date.trim(),
    expiryDate: data.expiryDate?.trim() || null,
    credentialUrl: data.credentialUrl.trim(),
    logoUrl: data.logoUrl?.trim() || null,
    imageUrl: data.imageUrl?.trim() || null,
    skills: JSON.stringify(cleanSkills(data.skills)),
    description: data.description?.trim() || null,
    order: data.order,
    published: data.published,
  };
}

export async function getCertifications(): Promise<CertificationEntry[]> {
  const rows = await prisma.certification.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(mapToEntry);
}

export async function getAllCertificationsAdmin(): Promise<CertificationEntry[]> {
  const rows = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });
  return rows.map(mapToEntry);
}

export async function getCertificationById(id: string): Promise<CertificationEntry | null> {
  const row = await prisma.certification.findUnique({ where: { id } });
  return row ? mapToEntry(row) : null;
}

export async function createCertification(
  data: CertificationFormData
): Promise<CertificationEntry> {
  validateCertification(data);
  const row = await prisma.certification.create({ data: toDbData(data) });
  revalidatePath("/");
  revalidatePath("/#certifications");
  revalidatePath("/admin");
  return mapToEntry(row);
}

export async function updateCertification(
  id: string,
  data: CertificationFormData
): Promise<CertificationEntry> {
  validateCertification(data);
  const row = await prisma.certification.update({
    where: { id },
    data: toDbData(data),
  });
  revalidatePath("/");
  revalidatePath("/#certifications");
  revalidatePath("/admin");
  return mapToEntry(row);
}

export async function deleteCertification(id: string): Promise<void> {
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/#certifications");
  revalidatePath("/admin");
}

export async function togglePublishCertification(
  id: string,
  published: boolean
): Promise<void> {
  await prisma.certification.update({ where: { id }, data: { published } });
  revalidatePath("/");
  revalidatePath("/#certifications");
  revalidatePath("/admin");
}

export async function reorderCertifications(
  items: { id: string; order: number }[]
): Promise<void> {
  await Promise.all(
    items.map((item) =>
      prisma.certification.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/#certifications");
  revalidatePath("/admin");
}
