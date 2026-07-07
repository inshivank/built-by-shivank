
export interface SiteConfig {
  title: string;
  developerName: string;
  designerCredits: string;
  canonicalUrl: string;
}

export interface HeroBadge {
  icon: string; // Dynamic lookup identifier or inline custom SVG
  text: string;
}

export interface HeroContent {
  eyebrow: string;
  mainHeading: string;
  description: string;
  badges: HeroBadge[];
  primaryButton: {
    text: string;
  };
  secondaryButton: {
    text: string;
    filename: string;
  };
}

export interface NavItem {
  name: string;
  href: string;
}

export interface NavigationContent {
  brand: string;
  items: NavItem[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  leetcode: string;
}

export interface Project {
  id: string;
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
  tags?: string[];
}

/** Database-driven experience entry (used by admin and public portfolio) */
export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[]; // parsed from JSON stored in DB
  isCurrent: boolean;
  logoUrl?: string;
  order: number;
  published: boolean;
}

export interface Leadership {
  role: string;
  organization: string;
  period: string;
  description: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  logoUrl?: string; // fallback if needed
}

export interface Achievement {
  title: string;
  metric: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

/** Database-driven skill entry (used by admin and public portfolio) */
export interface SkillEntry {
  id: string;
  name: string;
  icon?: string;
  proficiency: number;
  yearsExp?: number;
  featured: boolean;
  published: boolean;
  order: number;
  categoryId: string;
  categoryName: string;
}

/** Database-driven skill category (groups SkillEntry records) */
export interface SkillCategoryEntry {
  id: string;
  name: string;
  order: number;
  published: boolean;
  skills: SkillEntry[];
}


export interface ContactContent {
  tagline: string;
  description: string;
  email: string;
  socials: SocialLinks;
}

export interface AboutValue {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutMilestone {
  year: string;
  title: string;
  desc: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  story: string[];
  values: AboutValue[];
  milestones: AboutMilestone[];
}

/** Legacy static-content interface (kept for backward compat with content files) */
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  currentProgress: {
    year: string;
    percentage: number;
  };
  coursework: string[];
}

/** Database-driven education entry (used by admin and public portfolio) */
export interface EducationEntry {
  id: string;
  institution: string;
  logoUrl?: string;
  degree: string;
  field?: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  gpa?: string;
  description?: string;
  progressYear?: string;
  progressPct?: number;
  coursework: string[];
  order: number;
  published: boolean;
}

