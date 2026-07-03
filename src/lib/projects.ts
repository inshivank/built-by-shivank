import { Project } from "@/types/content";

export function parseProject(data: {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  heroDescription: string | null;
  problem: string | null;
  solution: string | null;
  features: string;
  techStack: string;
  architecture: string | null;
  challenges: string | null;
  lessonsLearned: string | null;
  futureImprovements: string | null;
  github: string | null;
  liveDemo: string | null;
  caseStudy: string | null;
  coverImage: string | null;
  demoVideo: string | null;
  gallery: string;
  duration: string | null;
  status: string;
  featured: boolean;
  published: boolean;
  order: number;
  tags: string;
}): Project {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    shortDescription: data.shortDescription,
    heroDescription: data.heroDescription || undefined,
    problem: data.problem || undefined,
    solution: data.solution || undefined,
    features: parseJsonArray(data.features),
    techStack: parseJsonArray(data.techStack),
    architecture: data.architecture || undefined,
    challenges: parseJsonArray(data.challenges),
    lessonsLearned: parseJsonArray(data.lessonsLearned),
    futureImprovements: parseJsonArray(data.futureImprovements),
    github: data.github || undefined,
    liveDemo: data.liveDemo || undefined,
    caseStudy: data.caseStudy || undefined,
    coverImage: data.coverImage || undefined,
    demoVideo: data.demoVideo || undefined,
    gallery: parseJsonArray(data.gallery),
    duration: data.duration || undefined,
    status: data.status,
    featured: data.featured,
    published: data.published,
    order: data.order,
    tags: parseJsonArray(data.tags),
  };
}

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}