import { Project } from "@/types/content";

export const weatherProject: Project = {
  title: "Weather Application",
  slug: "weather-application",
  description: "A minimalist weather application presenting real-time reports, wind data, precipitation forecasts, and hourly temperature charts.",
  
  // TODO: Replace with actual project short description
  shortDescription: "Clean weather widget with interactive data visual charts.",
  
  // TODO: Replace with actual hero description
  heroDescription: "Replace with project hero description.",
  
  // TODO: Replace with actual project problem description
  problem: "Replace with project problem.",
  
  // TODO: Replace with actual project solution details
  solution: "Replace with project solution.",
  
  features: [
    "Real-time local weather updates",
    "Smooth hourly precipitation charts",
    "Search autocomplete by city name",
    "Responsive cards layout design",
  ],
  
  techStack: ["React", "Next.js", "TypeScript", "Tailwind", "RESTful APIs"],
  
  // TODO: Replace with actual architecture diagram writeup
  architecture: "Crafted with Next.js client router, fetching weather metrics from OpenWeatherMap RESTful endpoints. The hourly forecast is mapped onto a clean vector SVG graphic.",
  
  challenges: [
    "Caching weather API queries to prevent rate-limit throttling while keeping visual stats fresh when users toggle between global locations.",
  ],
  
  lessonsLearned: [
    "Using stale-while-revalidate caching and browser localStorage reduced API load overhead by 80% and speed up UI responses.",
  ],
  
  futureImprovements: [
    // TODO: Replace with actual roadmap items
    "Replace with project future improvements.",
  ],
  
  // TODO: Replace with actual GitHub repository url
  github: "https://github.com/inshivank/weather-app",
  
  // TODO: Replace with actual live demo link
  liveDemo: "https://weather.builtbyshivank.com",
  
  caseStudy: "/projects/weather-application",
  
  // TODO: Add actual project assets inside public/projects/weather/
  coverImage: "/projects/weather-application/cover.jpg",
  demoVideo: "/projects/weather-application/demo.mp4",
  gallery: [
    "/projects/weather-application/gallery/image-1.jpg",
    "/projects/weather-application/gallery/image-2.jpg",
    "/projects/weather-application/gallery/image-3.jpg",
  ],
  
  // TODO: Replace with actual project timeline duration
  duration: "Replace with project duration.",
  
  // TODO: Replace with actual project development status
  status: "Replace with project status.",
};
