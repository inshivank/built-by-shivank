"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { skills } from "@/content/skills";
import { Code, Server, Brain, Database, Languages, Wrench } from "lucide-react";

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  "AI/ML": Brain,
  Databases: Database,
  Languages: Languages,
  "Developer Tools": Wrench,
} as const;

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => {
            const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code;
            return (
              <motion.div
                key={category.category}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-foreground/10"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="font-heading text-base font-bold text-foreground">
                      {category.category}
                    </h4>
                  </div>

                  {/* Skills Pill Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-secondary/80 border border-border/40 px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
