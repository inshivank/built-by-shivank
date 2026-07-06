"use client";

import { motion } from "framer-motion";
import { Code, Server, Brain, Database, Languages, Wrench, Zap } from "lucide-react";
import { SkillCategoryEntry } from "@/types/content";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Frontend: Code,
  Backend: Server,
  "AI/ML": Brain,
  Databases: Database,
  Languages: Languages,
  "Developer Tools": Wrench,
};

function getCategoryIcon(name: string): React.ElementType {
  return CATEGORY_ICONS[name] ?? Zap;
}

interface SkillsGridProps {
  categories: SkillCategoryEntry[];
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  if (categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No skills added yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = getCategoryIcon(category.name);
        return (
          <motion.div
            key={category.id}
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
                  {category.name}
                </h4>
              </div>

              {/* Skills Pill Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-full bg-secondary/80 border border-border/40 px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-secondary"
                  >
                    {skill.icon ? `${skill.icon} ` : ""}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
