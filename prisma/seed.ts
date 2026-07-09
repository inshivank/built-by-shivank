import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database with existing portfolio content...");

  // ── Admin ──────────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@shivank.dev";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });
  console.log(`✅ Admin created: ${adminEmail}`);

  // ── Hero ───────────────────────────────────────────────────────────────────
  await prisma.hero.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      eyebrow: "Computer Science Student • Full Stack Developer",
      mainHeading: "Hi, I'm Shivank Choudhary.",
      description:
        "I build full-stack web applications, AI-powered tools, and software that solve real-world problems through thoughtful engineering and design.",
      primaryBtnText: "View Projects",
      secondaryBtnText: "Download Resume",
      badges: {
        create: [
          { icon: "MapPin", text: "India", order: 0 },
          { icon: "GraduationCap", text: "B.Tech CSE @ JUIT", order: 1 },
          {
            icon: "Briefcase",
            text: "Open to Software Engineering Internships",
            order: 2,
          },
        ],
      },
    },
  });
  console.log("✅ Hero seeded");

  // ── About ──────────────────────────────────────────────────────────────────
  await prisma.about.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      title: "About Me",
      subtitle: "Product-Minded Engineer Building for the Real World",
      story: JSON.stringify([
        "I am a Computer Science student at JUIT, deeply focused on translating complex algorithms and data pipelines into high-fidelity, polished software products. I believe that engineering quality lies not just in writing maintainable code, but in designing interfaces that feel intuitive and responsive.",
        "My passion spans across Full Stack Development and Practical AI integration. Instead of building simple console templates, I enjoy crafting complete visual ecosystems—whether it is real-time campus marketplaces, security scan graphs, or automated moderation consoles.",
        "I actively seek software engineering challenges where I can leverage my skills in Next.js, React, Node.js, and Python backend services to solve operational, high-throughput problems.",
      ]),
      values: {
        create: [
          {
            icon: "Code2",
            title: "Modern Stack",
            desc: "Developing with Next.js 15, React 19, TypeScript, and Tailwind.",
            order: 0,
          },
          {
            icon: "Sparkles",
            title: "Product-Oriented",
            desc: "Prioritizing premium visual design, animations, and accessibility.",
            order: 1,
          },
        ],
      },
      milestones: {
        create: [
          {
            year: "2025",
            title: "Software Engineering Intern",
            desc: "Shipped core product modules, optimized PostgreSQL search, and integrated predictive model APIs.",
            order: 0,
          },
          {
            year: "2024",
            title: "Technical Lead @ IEEE",
            desc: "Led team of 15 devs, managed student hackathon web architectures, and ran workshops on React.",
            order: 1,
          },
          {
            year: "2023",
            title: "B.Tech CSE @ JUIT Solan",
            desc: "Launched academic journey, focused deeply on algorithmic theory, database engineering, and AI pipelines.",
            order: 2,
          },
        ],
      },
    },
  });
  console.log("✅ About seeded");

  // ── Skills ─────────────────────────────────────────────────────────────────
  const skillsData = [
    {
      name: "Frontend",
      order: 0,
      skills: [
        "React 19",
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "shadcn/ui",
      ],
    },
    {
      name: "Backend",
      order: 1,
      skills: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "Socket.io",
        "RESTful APIs",
        "WebSocket",
      ],
    },
    {
      name: "AI/ML",
      order: 2,
      skills: [
        "PyTorch",
        "NLP / Transformers",
        "Scikit-Learn",
        "HuggingFace",
        "Model Quantization",
      ],
    },
    {
      name: "Databases",
      order: 3,
      skills: ["MongoDB", "PostgreSQL", "SQL", "Redis Cache"],
    },
    {
      name: "Languages",
      order: 4,
      skills: ["Python", "C++", "TypeScript", "JavaScript", "SQL", "HTML/CSS"],
    },
    {
      name: "Developer Tools",
      order: 5,
      skills: [
        "Git/GitHub",
        "Docker",
        "Vercel",
        "Linux",
        "ESLint / Prettier",
        "Postman",
      ],
    },
  ];

  for (const cat of skillsData) {
    const category = await prisma.skillCategory.upsert({
      where: { id: cat.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        id: cat.name.toLowerCase().replace(/\s+/g, "-"),
        name: cat.name,
        order: cat.order,
      },
    });
    for (let i = 0; i < cat.skills.length; i++) {
      await prisma.skill.upsert({
        where: { id: `${category.id}-${i}` },
        update: {},
        create: {
          id: `${category.id}-${i}`,
          name: cat.skills[i],
          order: i,
          categoryId: category.id,
        },
      });
    }
  }
  console.log("✅ Skills seeded");

  // ── Experience ─────────────────────────────────────────────────────────────
  const experienceData = [
    {
      role: "Software Engineering Intern",
      company: "TechVeda Solutions",
      location: "Noida, India",
      period: "May 2025 – July 2025",
      type: "Internship",
      isCurrent: false,
      order: 0,
      description: [
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
      isCurrent: true,
      order: 1,
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
      isCurrent: false,
      order: 2,
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
      isCurrent: true,
      order: 3,
      description: [
        "Contributed bug fixes and documentation updates for Next.js starter templates.",
        "Created reusable UI modules using Framer Motion spring setups, earning 50+ stars on GitHub.",
        "Optimized focus-trapping routines inside modal interfaces to ensure accessibility compliance.",
      ],
    },
  ];

  for (const exp of experienceData) {
    await prisma.experience.upsert({
      where: { id: `exp-${exp.order}` },
      update: {},
      create: {
        id: `exp-${exp.order}`,
        ...exp,
        description: JSON.stringify(exp.description),
      },
    });
  }
  console.log("✅ Experience seeded");

  // ── Education ──────────────────────────────────────────────────────────────
  await prisma.education.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      institution: "Jaypee University of Information Technology (JUIT)",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      location: "Solan, India",
      startDate: "2023",
      endDate: "2027",
      isCurrent: true,
      progressYear: "3rd Year (B.Tech CSE)",
      progressPct: 75,
      gpa: "8.4 / 10.0 (Current)",
      coursework: JSON.stringify([
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Artificial Intelligence",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Machine Learning",
        "Compiler Design",
      ]),
    },
  });
  console.log("✅ Education seeded");

  // ── Leadership ─────────────────────────────────────────────────────────────
  const leadershipData = [
    {
      id: "lead-0",
      role: "Technical Lead",
      organization: "IEEE Student Branch JUIT",
      period: "Aug 2024 – Present",
      order: 0,
      description: [
        "Led a team of 15 student developers to build the official hackathon websites. Managed hosting deployments, automated server scaling, and conducted hands-on technical workshops on React & Git.",
      ],
    },
    {
      id: "lead-1",
      role: "Coordinator & Community Volunteer",
      organization: "Rotaract Club JUIT",
      period: "Oct 2023 – May 2025",
      order: 1,
      description: [
        "Orchestrated campus blood donation drives, educational camps for rural primary school students, and community environmental campaigns, coordinating logistics with local government agencies.",
      ],
    },
  ];

  for (const lead of leadershipData) {
    await prisma.leadership.upsert({
      where: { id: lead.id },
      update: {},
      create: {
        ...lead,
        description: JSON.stringify(lead.description),
      },
    });
  }
  console.log("✅ Leadership seeded");

  // ── Certifications ─────────────────────────────────────────────────────────
  const certData = [
    {
      id: "cert-0",
      title: "Deep Learning Specialization",
      issuer: "Coursera (DeepLearning.AI)",
      date: "Aug 2025",
      credentialUrl: "https://coursera.org/verify/specialization/DL2025",
      order: 0,
    },
    {
      id: "cert-1",
      title: "Meta Front-End Developer Specialization",
      issuer: "Coursera (Meta)",
      date: "May 2025",
      credentialUrl: "https://coursera.org/verify/specialization/META2025",
      order: 1,
    },
    {
      id: "cert-2",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Dec 2024",
      credentialUrl: "https://aws.amazon.com/verification",
      order: 2,
    },
  ];

  for (const cert of certData) {
    await prisma.certification.upsert({
      where: { id: cert.id },
      update: {},
      create: cert,
    });
  }
  console.log("✅ Certifications seeded");

  // ── Achievements ───────────────────────────────────────────────────────────
  const achievementData = [
    {
      id: "ach-0",
      title: "LeetCode Milestones",
      metric: "400+ Solved",
      description:
        "Solved 400+ coding interview problems using C++ & Python. Maintained top 12% rating in weekly contests.",
      order: 0,
    },
    {
      id: "ach-1",
      title: "1st Place @ Campus HackFest 2025",
      metric: "Winner / 120 Teams",
      description:
        "Designed and engineered an automated AI health diagnosis moduler dashboard that swept the top hackathon honors.",
      order: 1,
    },
    {
      id: "ach-2",
      title: "Top 50 National Coding League",
      metric: "Rank 42 / 5,000+",
      description:
        "Ranked among top 50 student competitors nationally in competitive programming speed-runs.",
      order: 2,
    },
  ];

  for (const ach of achievementData) {
    await prisma.achievement.upsert({
      where: { id: ach.id },
      update: {},
      create: ach,
    });
  }
  console.log("✅ Achievements seeded");

  // ── Contact Settings ───────────────────────────────────────────────────────
  await prisma.contactSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      tagline: "Let's Build Something Great Together.",
      description:
        "I'm currently seeking Software Engineering Internship opportunities for Summer 2026. If you have an internship position open, want to discuss software architecture, or just talk shop—drop a line!",
      email: "shivank.choudhary@outlook.com",
      github: "https://github.com/inshivank",
      linkedin: "https://linkedin.com/in/inshivank",
      leetcode: "https://leetcode.com/inshivank",
      resumeFilename: "Shivank_Choudhary_Resume.pdf",
    },
  });
  console.log("✅ Contact settings seeded");

  // ── Site Settings ──────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      developerName: "Shivank Choudhary",
      siteTitle: "Built by Shivank",
      canonicalUrl: "https://builtbyshivank.com",
    },
  });
  console.log("✅ Site settings seeded");

  // ── Projects ───────────────────────────────────────────────────────────────
  const projectsData = [
    {
      id: "proj-marketplace",
      title: "College Marketplace with Recommendation System",
      slug: "college-marketplace",
      description:
        "A high-performance peer-to-peer commerce platform designed for university students to safely list, negotiate, and trade campus products in real-time, backed by a collaborative recommendation system.",
      shortDescription:
        "P2P campus commerce platform with real-time negotiations and recommendation system.",
      heroDescription: "A peer-to-peer marketplace built for university students.",
      problem: "Students lacked a secure, university-specific platform for buying and selling goods.",
      solution: "Built a real-time marketplace with university email verification and a collaborative recommendation engine.",
      features: JSON.stringify([
        "Real-time student negotiation dashboard & chat",
        "Secure university email verification filter",
        "Smart category filters and text-search indexes",
        "Collaborative product recommendations engine",
      ]),
      techStack: JSON.stringify(["Next.js", "React", "Node.js", "MongoDB", "Tailwind", "Socket.io"]),
      architecture: "Built using the Next.js App Router for server-rendered page shells, paired with an asynchronous Node.js + Express backend service.",
      challenges: JSON.stringify(["Syncing item offers in real-time across parallel student websocket connections."]),
      lessonsLearned: JSON.stringify(["Implementing localized state machines in React alongside debounced offer inputs significantly reduced websocket traffic overhead."]),
      futureImprovements: JSON.stringify(["Mobile app", "Payment integration"]),
      github: "https://github.com/inshivank/college-marketplace",
      liveDemo: "https://marketplace.builtbyshivank.com",
      caseStudy: "/projects/college-marketplace",
      coverImage: "/projects/college-marketplace/cover.png",
      demoVideo: "/projects/college-marketplace/demo.mp4",
      gallery: JSON.stringify([
        "/projects/college-marketplace/gallery/image-1.jpg",
        "/projects/college-marketplace/gallery/image-2.jpg",
        "/projects/college-marketplace/gallery/image-3.jpg",
      ]),
      duration: "3 months",
      status: "Completed",
      featured: true,
      published: true,
      order: 0,
      tags: JSON.stringify(["Next.js", "MongoDB", "Socket.io", "Full Stack"]),
    },
    {
      id: "proj-cyber-threat",
      title: "Cyber Threat Detection System",
      slug: "cyber-threat-detection",
      description:
        "A machine learning-powered security monitoring system that detects and classifies network intrusions and cyber threats in real-time using anomaly detection algorithms.",
      shortDescription:
        "ML-powered network intrusion detection with real-time threat classification.",
      heroDescription: "A real-time cyber threat detection system using ML.",
      problem: "Traditional signature-based security systems fail to detect novel zero-day threats.",
      solution: "Built an ML pipeline that detects anomalies in network traffic using unsupervised and supervised models.",
      features: JSON.stringify([
        "Real-time network traffic analysis",
        "Anomaly detection using Isolation Forest",
        "Threat classification dashboard",
        "Automated alert system",
      ]),
      techStack: JSON.stringify(["Python", "FastAPI", "PyTorch", "Scikit-Learn", "React", "PostgreSQL"]),
      architecture: "FastAPI backend exposing ML model endpoints, React frontend for visualization.",
      challenges: JSON.stringify(["Achieving low false-positive rates while maintaining high recall on novel threats."]),
      lessonsLearned: JSON.stringify(["Ensemble models significantly outperformed single-model approaches on imbalanced security datasets."]),
      futureImprovements: JSON.stringify(["SIEM integration", "Federated learning for privacy-preserving detection"]),
      github: "https://github.com/inshivank/cyber-threat-detection",
      coverImage: "/projects/cyber-threat-detection/cover.png",
      gallery: JSON.stringify([]),
      duration: "4 months",
      status: "Completed",
      featured: true,
      published: true,
      order: 1,
      tags: JSON.stringify(["ML", "Security", "Python", "FastAPI"]),
    },
    {
      id: "proj-hate-speech",
      title: "Hate Speech Detection Model",
      slug: "hate-speech-detection",
      description:
        "An NLP-based content moderation system that automatically detects and classifies hate speech across social media platforms using fine-tuned transformer models.",
      shortDescription:
        "Transformer-based hate speech classifier for automated content moderation.",
      heroDescription: "NLP-powered hate speech detection for social platforms.",
      problem: "Manual content moderation is slow and inconsistent at scale.",
      solution: "Fine-tuned BERT for multi-class hate speech classification with 94% accuracy.",
      features: JSON.stringify([
        "Multi-class hate speech classification",
        "BERT fine-tuning pipeline",
        "REST API for real-time inference",
        "Explainability dashboard",
      ]),
      techStack: JSON.stringify(["Python", "HuggingFace", "PyTorch", "FastAPI", "React"]),
      architecture: "HuggingFace Transformers for model training, FastAPI for serving, React for the moderation dashboard.",
      challenges: JSON.stringify(["Handling class imbalance and domain-specific language variations."]),
      lessonsLearned: JSON.stringify(["Data augmentation and focal loss significantly improved minority class recall."]),
      futureImprovements: JSON.stringify(["Multi-lingual support", "Browser extension"]),
      github: "https://github.com/inshivank/hate-speech-detection",
      coverImage: "/projects/hate-speech-detection/cover.png",
      gallery: JSON.stringify([]),
      duration: "2 months",
      status: "Completed",
      featured: true,
      published: true,
      order: 2,
      tags: JSON.stringify(["NLP", "BERT", "Python", "AI/ML"]),
    },
    {
      id: "proj-weather",
      title: "Weather Application",
      slug: "weather-app",
      description:
        "A modern weather application with real-time forecasts, interactive maps, and location-based weather alerts built with Next.js and the OpenWeather API.",
      shortDescription:
        "Real-time weather app with interactive maps and location alerts.",
      heroDescription: "Weather forecasting with beautiful visualizations.",
      problem: "Existing weather apps lack clean, developer-friendly interfaces.",
      solution: "Built a visually appealing weather dashboard with OpenWeather API integration.",
      features: JSON.stringify([
        "Real-time weather data",
        "7-day forecast",
        "Interactive radar maps",
        "Location-based alerts",
      ]),
      techStack: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "OpenWeather API"]),
      architecture: "Next.js App Router with server-side API calls to OpenWeather, cached with React cache().",
      challenges: JSON.stringify(["Rate limiting on the free OpenWeather API tier."]),
      lessonsLearned: JSON.stringify(["Aggressive caching strategies reduced API calls by 80%."]),
      futureImprovements: JSON.stringify(["Push notifications", "Historical data analysis"]),
      github: "https://github.com/inshivank/weather-app",
      liveDemo: "https://weather.builtbyshivank.com",
      coverImage: "/projects/weather-app/cover.png",
      gallery: JSON.stringify([]),
      duration: "3 weeks",
      status: "Completed",
      featured: true,
      published: true,
      order: 3,
      tags: JSON.stringify(["Next.js", "API", "TypeScript"]),
    },
    {
      id: "proj-image-editor",
      title: "Browser-Based Image Editor",
      slug: "image-editor",
      description:
        "A full-featured browser-based image editor with real-time filters, crop, resize, and drawing tools built entirely with Canvas API and React.",
      shortDescription:
        "Canvas-based image editor with filters, crop, and drawing tools.",
      heroDescription: "A Photoshop-lite experience in the browser.",
      problem: "No lightweight, privacy-first image editor exists entirely in the browser.",
      solution: "Built a Canvas API-powered editor with 20+ real-time filters and non-destructive editing.",
      features: JSON.stringify([
        "20+ real-time image filters",
        "Crop and resize tools",
        "Drawing and annotation",
        "Export in multiple formats",
      ]),
      techStack: JSON.stringify(["React", "TypeScript", "Canvas API", "Tailwind CSS"]),
      architecture: "React state management for edit history, Canvas API for pixel manipulation.",
      challenges: JSON.stringify(["Maintaining 60fps performance with complex filter stacks on large images."]),
      lessonsLearned: JSON.stringify(["OffscreenCanvas and Web Workers are essential for heavy image processing."]),
      futureImprovements: JSON.stringify(["AI background removal", "Collaborative editing"]),
      github: "https://github.com/inshivank/image-editor",
      liveDemo: "https://editor.builtbyshivank.com",
      coverImage: "/projects/image-editor/cover.png",
      gallery: JSON.stringify([]),
      duration: "6 weeks",
      status: "Completed",
      featured: true,
      published: true,
      order: 4,
      tags: JSON.stringify(["Canvas", "React", "TypeScript"]),
    },
    {
      id: "proj-portfolio",
      title: "Developer Portfolio Website",
      slug: "portfolio",
      description:
        "A high-performance, animated developer portfolio built with Next.js 15, Framer Motion, and Tailwind CSS featuring smooth scroll, dark mode, and a CMS backend.",
      shortDescription:
        "Animated portfolio website with CMS backend and smooth scroll.",
      heroDescription: "This very portfolio you're looking at.",
      problem: "Generic portfolio templates don't reflect individual developer personality.",
      solution: "Built a fully custom portfolio with micro-animations, CMS integration, and a premium design system.",
      features: JSON.stringify([
        "Framer Motion animations",
        "Dark mode with Lenis smooth scroll",
        "CMS admin dashboard",
        "Dynamic project pages",
      ]),
      techStack: JSON.stringify(["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Prisma", "SQLite"]),
      architecture: "Next.js App Router with server components for data fetching, Prisma ORM for CMS backend.",
      challenges: JSON.stringify(["Balancing animation performance with accessibility and reduced-motion preferences."]),
      lessonsLearned: JSON.stringify(["Server components dramatically simplified data fetching compared to client-side hooks."]),
      futureImprovements: JSON.stringify(["Analytics dashboard", "Blog section"]),
      github: "https://github.com/inshivank/portfolio",
      liveDemo: "https://builtbyshivank.com",
      coverImage: "/projects/portfolio/cover.png",
      gallery: JSON.stringify([]),
      duration: "2 months",
      status: "Ongoing",
      featured: true,
      published: true,
      order: 5,
      tags: JSON.stringify(["Next.js", "Portfolio", "Framer Motion", "CMS"]),
    },
  ];

  for (const project of projectsData) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: project,
    });
  }
  console.log("✅ Projects seeded");

  console.log("\n🎉 Database seeded successfully!");
  console.log(`\n📋 Admin credentials:`);
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  console.log(`\n⚠️  Change your password at /dashboard/settings after first login!\n`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
