import { Project } from "@/types/content";

export const imageEditorProject: Project = {
  title: "Image Editor",
  slug: "image-editor",
  description: "An interactive browser image editor hosting adjustment sliders for brightness, saturation, and crop ratios.",
  
  // TODO: Replace with actual project short description
  shortDescription: "Browser-based canvas editor with custom adjustments.",
  
  // TODO: Replace with actual hero description
  heroDescription: "Replace with project hero description.",
  
  // TODO: Replace with actual project problem description
  problem: "Replace with project problem.",
  
  // TODO: Replace with actual project solution details
  solution: "Replace with project solution.",
  
  features: [
    "Real-time adjustment filters (contrast, brightness)",
    "Custom canvas cropping controls",
    "Dynamic undo, redo, and download layers",
    "Sleek dark mode control board layout",
  ],
  
  techStack: ["React", "TypeScript", "Tailwind", "Canvas API", "Framer Motion"],
  
  // TODO: Replace with actual architecture diagram writeup
  architecture: "Engineered entirely on HTML5 Canvas API and React state hooks for filter processing. Rendered with responsive Tailwind grids.",
  
  challenges: [
    "Processing pixel matrix adjustments in real-time on high-resolution image uploads without lagging UI slider controls.",
  ],
  
  lessonsLearned: [
    "Moving pixel manipulation routines to offscreen canvas structures and debouncing frame rendering solved slider responsiveness challenges.",
  ],
  
  futureImprovements: [
    // TODO: Replace with actual roadmap items
    "Replace with project future improvements.",
  ],
  
  // TODO: Replace with actual GitHub repository url
  github: "https://github.com/inshivank/image-editor",
  
  // TODO: Replace with actual live demo link
  liveDemo: "https://editor.builtbyshivank.com",
  
  caseStudy: "/projects/image-editor",
  
  // TODO: Add actual project assets inside public/projects/image-editor/
  coverImage: "/projects/image-editor/cover.jpg",
  demoVideo: "/projects/image-editor/demo.mp4",
  gallery: [
    "/projects/image-editor/gallery/image-1.jpg",
    "/projects/image-editor/gallery/image-2.jpg",
    "/projects/image-editor/gallery/image-3.jpg",
  ],
  
  // TODO: Replace with actual project timeline duration
  duration: "Replace with project duration.",
  
  // TODO: Replace with actual project development status
  status: "Replace with project status.",
};
