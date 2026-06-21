import { Project } from "@/types/content";

export const cyberThreatProject: Project = {
  title: "Adaptive Cyber Threat Detection",
  slug: "adaptive-cyber-threat-detection",
  description: "An intelligent network security monitor that ingests and parses system access logs to detect and isolate unauthorized intrusion anomalies using customized classification models.",
  
  // TODO: Replace with actual project short description
  shortDescription: "AI-powered anomaly log monitor and intrusion detector.",
  
  // TODO: Replace with actual hero description
  heroDescription: "Replace with project hero description.",
  
  // TODO: Replace with actual project problem description
  problem: "Replace with project problem.",
  
  // TODO: Replace with actual project solution details
  solution: "Replace with project solution.",
  
  features: [
    "Real-time system access log ingestion stream",
    "Neural network classification of threat vectors",
    "Interactive SVG-based network topology nodes graph",
    "Configurable mitigation webhook alert triggers",
  ],
  
  techStack: ["Python", "PyTorch", "FastAPI", "React", "Tailwind", "Framer Motion"],
  
  // TODO: Replace with actual architecture diagram writeup
  architecture: "Engineered with a machine learning service written in Python using PyTorch and Scikit-learn, served via an asynchronous FastAPI routing layer. The user dashboard is a client-rendered Next.js page displaying real-time canvas-based network topology mapping.",
  
  challenges: [
    "Analyzing high-throughput logging streams with extremely low latency to trigger mitigations before system access layers could be compromised.",
  ],
  
  lessonsLearned: [
    "Model quantization and moving the classification load to a dedicated asynchronous worker process reduced main threat detection latency to sub-10ms bounds.",
  ],
  
  futureImprovements: [
    // TODO: Replace with actual roadmap items
    "Replace with project future improvements.",
  ],
  
  // TODO: Replace with actual GitHub repository url
  github: "https://github.com/inshivank/threat-detection",
  
  // TODO: Replace with actual live demo link
  liveDemo: "https://threats.builtbyshivank.com",
  
  caseStudy: "/projects/adaptive-cyber-threat-detection",
  
  // TODO: Add actual project assets inside public/projects/cyber-threat/
  coverImage: "/projects/adaptive-cyber-threat-detection/cover.jpg",
  demoVideo: "/projects/adaptive-cyber-threat-detection/demo.mp4",
  gallery: [
    "/projects/adaptive-cyber-threat-detection/gallery/image-1.jpg",
    "/projects/adaptive-cyber-threat-detection/gallery/image-2.jpg",
    "/projects/adaptive-cyber-threat-detection/gallery/image-3.jpg",
  ],
  
  // TODO: Replace with actual project timeline duration
  duration: "Replace with project duration.",
  
  // TODO: Replace with actual project development status
  status: "Replace with project status.",
};
