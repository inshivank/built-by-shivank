/**
 * Skills Data Migration
 * Migrates all skills from src/content/skills.ts into the database.
 * Run: npx tsx prisma/seed-skills.ts
 */
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter, log: ["error"] });

const SKILLS_DATA = [
  {
    category: "Frontend",
    skills: [
      { name: "React 19", icon: "⚛️" },
      { name: "Next.js 15", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Tailwind CSS v4", icon: "🎨" },
      { name: "Framer Motion", icon: "🎬" },
      { name: "shadcn/ui", icon: "🧩" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js" },
      { name: "FastAPI", icon: "⚡" },
      { name: "Socket.io" },
      { name: "RESTful APIs" },
      { name: "WebSocket" },
    ],
  },
  {
    category: "AI/ML",
    skills: [
      { name: "PyTorch", icon: "🔥" },
      { name: "NLP / Transformers", icon: "🤖" },
      { name: "Scikit-Learn" },
      { name: "HuggingFace", icon: "🤗" },
      { name: "Model Quantization" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "SQL" },
      { name: "Redis Cache", icon: "🔴" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "C++", icon: "⚙️" },
      { name: "TypeScript", icon: "🔷" },
      { name: "JavaScript", icon: "🟡" },
      { name: "SQL" },
      { name: "HTML/CSS", icon: "🌐" },
    ],
  },
  {
    category: "Developer Tools",
    skills: [
      { name: "Git/GitHub", icon: "🐙" },
      { name: "Docker", icon: "🐋" },
      { name: "Vercel", icon: "▲" },
      { name: "Linux", icon: "🐧" },
      { name: "ESLint / Prettier" },
      { name: "Postman", icon: "📮" },
    ],
  },
];

async function main() {
  console.log("🌱 Migrating skills data to database…");

  for (let catIdx = 0; catIdx < SKILLS_DATA.length; catIdx++) {
    const { category, skills } = SKILLS_DATA[catIdx];

    // Upsert category
    const cat = await prisma.skillCategory.upsert({
      where: { id: `cat-${catIdx}` },
      update: { name: category, order: catIdx },
      create: { id: `cat-${catIdx}`, name: category, order: catIdx, published: true },
    });

    console.log(`  📁 Category: ${cat.name}`);

    // Create skills
    for (let skillIdx = 0; skillIdx < skills.length; skillIdx++) {
      const { name, icon } = skills[skillIdx];
      await prisma.skill.upsert({
        where: { id: `skill-${catIdx}-${skillIdx}` },
        update: { name, icon: icon ?? null, order: skillIdx, categoryId: cat.id },
        create: {
          id: `skill-${catIdx}-${skillIdx}`,
          name,
          icon: icon ?? null,
          proficiency: 85,
          yearsExp: null,
          featured: false,
          published: true,
          order: skillIdx,
          categoryId: cat.id,
        },
      });
      console.log(`    ✓ ${name}`);
    }
  }

  console.log("\n✅ Skills migration complete!");
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
