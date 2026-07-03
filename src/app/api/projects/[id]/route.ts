import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { apiSuccess, apiNotFound, apiServerError } from "@/lib/api";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return apiNotFound("Project");
    }

    return apiSuccess(project);
  } catch (error) {
    return apiServerError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const project = await prisma.project.update({
      where: { id },
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
        status: data.status,
        featured: data.featured,
        published: data.published,
        order: data.order,
        tags: JSON.stringify(data.tags || []),
      },
    });

    return apiSuccess(project);
  } catch (error) {
    return apiServerError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.project.delete({
      where: { id },
    });

    return apiSuccess({ deleted: true });
  } catch (error) {
    return apiServerError(error);
  }
}