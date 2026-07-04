import { Project } from "@/types/content";

export const hateSpeechProject: Partial<Project> = {
  title: "Hate Speech Detection",
  slug: "hate-speech-detection",
  description: "An AI moderation system leveraging natural language processing models to classify, highlight, and annotate toxic text messages across messaging platforms.",
  
  // TODO: Replace with actual project short description
  shortDescription: "NLP-powered real-time social moderation engine.",
  
  // TODO: Replace with actual hero description
  heroDescription: "Replace with project hero description.",
  
  // TODO: Replace with actual project problem description
  problem: "Replace with project problem.",
  
  // TODO: Replace with actual project solution details
  solution: "Replace with project solution.",
  
  features: [
    "Multi-class toxicity text parsing (threats, insult, hate)",
    "Sentence highlight annotations based on model weights",
    "Moderator resolution queue and chat widgets",
    "Integration API keys and webhook triggers",
  ],
  
  techStack: ["Next.js", "React", "Python", "Tailwind", "Framer Motion"],
  
  // TODO: Replace with actual architecture diagram writeup
  architecture: "Leverages Python HuggingFace Transformers for multi-label text tokenization and classification. The web view is built on React/Next.js utilizing a custom glassmorphism review board to display attention weights visually.",
  
  challenges: [
    "Accurately evaluating semantic context, handling subtle sarcasms, and visually explaining complex neural network predictions to human moderators.",
  ],
  
  lessonsLearned: [
    "Developing a specialized visual heatmap showing attention mapping of individual words to predictions dramatically increased reviewer alignment and throughput.",
  ],
  
  futureImprovements: [
    // TODO: Replace with actual roadmap items
    "Replace with project future improvements.",
  ],
  
  // TODO: Replace with actual GitHub repository url
  github: "https://github.com/inshivank/hate-speech-classifier",
  
  // TODO: Replace with actual live demo link
  liveDemo: "https://moderation.builtbyshivank.com",
  
  caseStudy: "/projects/hate-speech-detection",
  
  // TODO: Add actual project assets inside public/projects/hate-speech/
  coverImage: "/projects/hate-speech-detection/cover.jpg",
  demoVideo: "/projects/hate-speech-detection/demo.mp4",
  gallery: [
    "/projects/hate-speech-detection/gallery/image-1.jpg",
    "/projects/hate-speech-detection/gallery/image-2.jpg",
    "/projects/hate-speech-detection/gallery/image-3.jpg",
  ],
  
  // TODO: Replace with actual project timeline duration
  duration: "Replace with project duration.",
  
  // TODO: Replace with actual project development status
  status: "Replace with project status.",
};

