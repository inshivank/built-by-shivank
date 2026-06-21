import { Experience } from "@/types/content";

export const experiences: Experience[] = [
  {
    // TODO: Replace with actual company role title
    role: "Software Engineering Intern",
    company: "TechVeda Solutions",
    location: "Noida, India",
    period: "May 2025 – July 2025",
    type: "Internship",
    description: [
      // TODO: Replace with actual accomplishments/metrics
      "Developed high-performance full-stack web dashboards using React, Next.js, and FastAPI.",
      "Optimized query compilation in PostgreSQL, cutting metrics query search latency by 42%.",
      "Integrated machine learning microservices for real-time customer churn predictions.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Freelance Services",
    location: "Remote",
    period: "Jan 2024 – Present",
    type: "Freelance",
    description: [
      "Built clean, responsive software products for multi-regional campus business clients.",
      "Designed secure database systems using MongoDB and PostgreSQL with robust auth patterns.",
      "Maintained zero-downtime client pipelines deploying directly to Vercel and AWS Amplify.",
    ],
  },
  {
    role: "Machine Learning Research Assistant",
    company: "JUIT Department of Computer Science",
    location: "Solan, India",
    period: "Aug 2024 – Dec 2024",
    type: "Research",
    description: [
      "Researched natural language processing pipelines and model quantization techniques.",
      "Compiled dataset benchmarks to fine-tune BERT models for localized dialect classifications.",
      "Co-authored research findings on threat vector intrusion log anomalies.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "React & Next.js Ecosystems",
    location: "GitHub",
    period: "Ongoing",
    type: "Open Source",
    description: [
      "Contributed bug fixes and documentation updates for Next.js starter templates.",
      "Created reusable UI modules using Framer Motion spring setups, earning 50+ stars on GitHub.",
      "Optimized focus-trapping routines inside modal interfaces to ensure accessibility compliance.",
    ],
  },
];
