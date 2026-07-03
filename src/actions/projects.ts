"use server";

import { prisma } from "@/lib/db";
import { parseProject } from "@/lib/projects";
import { revalidatePath } from "next/cache";

export type ProjectFormData = {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  heroDescription?: string;
  problem?: string;
  solution?: string;
  features: string[];
  techStack: string[];
  architecture?: string;
  challenges: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
  github?: string;
  liveDemo?: string;
  caseStudy?: string;
  coverImage?: string;
  demoVideo?: string;
  gallery: string[];
  duration?: string;
  status: string;
  featured: boolean;
  published: boolean;
  order: number;
};

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return projects.map(parseProject);
  } catch (error) {
    throw new Error("Failed to fetch projects");
  }
}

export async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { order: "asc" },
    });
    return projects.map(parseProject);
  } catch (error) {
    throw new Error("Failed to fetch featured projects");
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findFirst({
      where: { slug, published: true },
    });
    return project ? parseProject(project) : null;
  } catch (error) {
    throw new Error("Failed to fetch project");
  }
}

export async function getAllProjectsAdmin() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return projects.map(parseProject);
  } catch (error) {
    throw new Error("Failed to fetch projects");
  }
}

export async function createProject(data: ProjectFormData) {
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        features: JSON.stringify(data.features),
        techStack: JSON.stringify(data.techStack),
        challenges: JSON.stringify(data.challenges),
        lessonsLearned: JSON.stringify(data.lessonsLearned),
        futureImprovements: JSON.stringify(data.futureImprovements),
        gallery: JSON.stringify(data.gallery),
        tags: JSON.stringify([]),
      },
    });
    revalidatePath("/");
    revalidatePath("/projects");
    return project;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create project");
  }
}

export async function updateProject(id: string, data: ProjectFormData) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        features: JSON.stringify(data.features),
        techStack: JSON.stringify(data.techStack),
        challenges: JSON.stringify(data.challenges),
        lessonsLearned: JSON.stringify(data.lessonsLearned),
        futureImprovements: JSON.stringify(data.futureImprovements),
        gallery: JSON.stringify(data.gallery),
        tags: JSON.stringify([]),
      },
    });
    revalidatePath("/");
    revalidatePath("/projects");
    return project;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update project");
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/projects");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete project");
  }
}

export async function toggleFeatureProject(id: string, featured: boolean) {
  try {
    await prisma.project.update({
      where: { id },
      data: { featured },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update project feature status");
  }
}

export async function togglePublishProject(id: string, published: boolean) {
  try {
    await prisma.project.update({
      where: { id },
      data: { published },
    });
    revalidatePath("/");
    revalidatePath("/projects");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update project publish status");
  }
}

export async function updateProjectStatus(id: string, status: string) {
  try {
    await prisma.project.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/");
    revalidatePath("/projects");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update project status");
  }
}

export async function reorderProjects(order: { id: string; order: number }[]) {
  try {
    await Promise.all(
      order.map((item) =>
        prisma.project.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reorder projects");
  }
}