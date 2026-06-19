import { env } from "@/lib/env";

export const siteConfig = {
  name: "Built by Shivank",
  title: "Built by Shivank",
  description:
    "Premium software engineering portfolio showcasing product-minded development, design systems, and high-performance web experiences.",
  url: env.siteUrl,
  locale: "en_US",
  author: {
    name: "Shivank",
    url: env.siteUrl,
  },
  keywords: [
    "software engineer",
    "frontend engineer",
    "full stack developer",
    "portfolio",
    "Next.js",
    "React",
    "TypeScript",
  ],
  twitter: {
    handle: env.twitterHandle,
  },
} as const;
