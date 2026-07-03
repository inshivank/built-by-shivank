"use server";

import { prisma } from "@/lib/db";

// This seed file seeds from hardcoded content - now deprecated
// Projects are managed via admin dashboard
export async function seedProjects() {
  // Deprecated: Projects are now managed through admin dashboard
  console.log("Projects seeding is now handled via admin dashboard");
}

seedProjects()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = await import("@/lib/db");
    await prisma.$disconnect();
  });

seedProjects()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });