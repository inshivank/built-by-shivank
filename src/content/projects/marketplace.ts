import { Project } from "@/types/content";

export const marketplaceProject: Project = {
  title: "College Marketplace with Recommendation System",
  slug: "college-marketplace",
  description: "A high-performance peer-to-peer commerce platform designed for university students to safely list, negotiate, and trade campus products in real-time, backed by a collaborative recommendation system.",
  
  // TODO: Replace with actual project short description
  shortDescription: "P2P campus commerce platform with real-time negotiations and recommendation system.",
  
  // TODO: Replace with actual hero description
  heroDescription: "Replace with project hero description.",
  
  // TODO: Replace with actual project problem description
  problem: "Replace with project problem.",
  
  // TODO: Replace with actual project solution details
  solution: "Replace with project solution.",
  
  features: [
    "Real-time student negotiation dashboard & chat",
    "Secure university email verification filter",
    "Smart category filters and text-search indexes",
    "Collaborative product recommendations engine",
  ],
  
  techStack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind", "Socket.io"],
  
  // TODO: Replace with actual architecture diagram writeup
  architecture: "Built using the Next.js App Router for server-rendered page shells, paired with an asynchronous Node.js + Express backend service. Data is stored in MongoDB, and Socket.io manages live negotiation web socket connections. Styled entirely with Tailwind CSS variables to enforce design consistency.",
  
  challenges: [
    "Syncing item offers in real-time across parallel student websocket connections while maintaining a solid transactional ledger history of agreed-upon pricing.",
  ],
  
  lessonsLearned: [
    "Implementing localized state machines in React alongside debounced offer inputs significantly reduced websocket traffic overhead and prevented race conditions during concurrent bids.",
  ],
  
  futureImprovements: [
    // TODO: Replace with actual roadmap items
    "Replace with project future improvements.",
  ],
  
  // TODO: Replace with actual GitHub repository url
  github: "https://github.com/inshivank/college-marketplace",
  
  // TODO: Replace with actual live demo link
  liveDemo: "https://marketplace.builtbyshivank.com",
  
  caseStudy: "/projects/college-marketplace",
  
  // TODO: Add actual project assets inside public/projects/marketplace/
  coverImage: "/projects/college-marketplace/cover.png",
  demoVideo: "/projects/college-marketplace/demo.mp4",
  gallery: [
    "/projects/college-marketplace/gallery/image-1.jpg",
    "/projects/college-marketplace/gallery/image-2.jpg",
    "/projects/college-marketplace/gallery/image-3.jpg",
  ],
  
  // TODO: Replace with actual project timeline duration
  duration: "Replace with project duration.",
  
  // TODO: Replace with actual project development status
  status: "Replace with project status.",
};
