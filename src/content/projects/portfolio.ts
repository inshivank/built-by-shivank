import { Project } from "@/types/content";

export const portfolioProject: Project = {
  title: "Portfolio Website",
  slug: "portfolio-website",
  description: "My personal developer portfolio website, engineered to represent a premium product showcase rather than a simple resume template.",
  
  // TODO: Replace with actual project short description
  shortDescription: "My personal developer portfolio website, engineered to represent a premium product showcase.",
  
  // TODO: Replace with actual hero description
  heroDescription: "Replace with project hero description.",
  
  // TODO: Replace with actual project problem description
  problem: "Replace with project problem.",
  
  // TODO: Replace with actual project solution details
  solution: "Replace with project solution.",
  
  features: [
    "Shared layout expanding project cards",
    "Floating 3D MacBook device mockup",
    "Hydration-safe light/dark theme switchers",
    "Full keyboard accessible focus trapping",
  ],
  
  techStack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  
  // TODO: Replace with actual architecture diagram writeup
  architecture: "Built on Next.js 15 App Router, React 19, and Tailwind CSS v4. Managed layout states and spring animations with Framer Motion.",
  
  challenges: [
    "Resolving hydration mismatch states on theme scripts while keeping initial layouts layout-shift free.",
  ],
  
  lessonsLearned: [
    "Isolating server-script theme states from React hydration boundaries ensured absolute visual alignment and instant dark styling load.",
  ],
  
  futureImprovements: [
    // TODO: Replace with actual roadmap items
    "Replace with project future improvements.",
  ],
  
  // TODO: Replace with actual GitHub repository url
  github: "https://github.com/inshivank/built-by-shivank",
  
  // TODO: Replace with actual live demo link
  liveDemo: "https://builtbyshivank.com",
  
  caseStudy: "/projects/portfolio-website",
  
  // TODO: Add actual project assets inside public/projects/portfolio/
  coverImage: "/projects/portfolio-website/cover.jpg",
  demoVideo: "/projects/portfolio-website/demo.mp4",
  gallery: [
    "/projects/portfolio-website/gallery/image-1.jpg",
    "/projects/portfolio-website/gallery/image-2.jpg",
    "/projects/portfolio-website/gallery/image-3.jpg",
  ],
  
  // TODO: Replace with actual project timeline duration
  duration: "Replace with project duration.",
  
  // TODO: Replace with actual project development status
  status: "Replace with project status.",
};
