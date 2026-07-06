import { Suspense } from "react";
import { getSkills } from "@/actions/skills";
import { SkillsGrid } from "./skills-grid";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

async function SkillsContent() {
  const categories = await getSkills();
  return <SkillsGrid categories={categories} />;
}

export function Skills() {
  return (
    <Section id="skills" className="pt-20">
      <Container size="wide" className="space-y-12">
        {/* Section Title */}
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Technical Skills
          </h3>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-xl">
            A comprehensive overview of programming languages, tools, frameworks, and fields of expertise I leverage to build software.
          </p>
        </div>

        {/* Categories Grid */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border/80 bg-card p-6 animate-pulse"
                  style={{ minHeight: "160px" }}
                />
              ))}
            </div>
          }
        >
          <SkillsContent />
        </Suspense>
      </Container>
    </Section>
  );
}
