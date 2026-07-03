import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiSuccess, apiError, apiNotFound, apiServerError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published") !== "false";
    const featured = searchParams.get("featured") === "true";

    const where: Record<string, unknown> = {};
    if (published) where.published = true;
    if (featured) where.featured = true;

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return apiSuccess(projects);
  } catch (error) {
    return apiServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        heroDescription: data.heroDescription,
        problem: data.problem,
        solution: data.solution,
        features: JSON.stringify(data.features || []),
        techStack: JSON.stringify(data.techStack || []),
        architecture: data.architecture,
        challenges: JSON.stringify(data.challenges || []),
        lessonsLearned: JSON.stringify(data.lessonsLearned || []),
        futureImprovements: JSON.stringify(data.futureImprovements || []),
        github: data.github,
        liveDemo: data.liveDemo,
        caseStudy: data.caseStudy,
        coverImage: data.coverImage,
        demoVideo: data.demoVideo,
        gallery: JSON.stringify(data.gallery || []),
        duration: data.duration,
        status: data.status || "Draft",
        featured: data.featured || false,
        published: data.published ?? true,
        order: data.order || 0,
        tags: JSON.stringify(data.tags || []),
      },
    });

    return apiSuccess(project, 201);
  } catch (error) {
    return apiServerError(error);
  }
}