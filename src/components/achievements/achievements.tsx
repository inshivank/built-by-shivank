"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Trophy, Code, Target } from "lucide-react";
import { AchievementEntry, getAchievements } from "@/actions/achievements";

const achievementIcons = [Code, Trophy, Target];

export function Achievements() {
  const [items, setItems] = useState<AchievementEntry[]>([]);

  useEffect(() => {
    getAchievements().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <Section id="achievements" className="pt-20">
      <Container size="wide" className="space-y-12">
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Key Achievements
          </h3>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-xl">
            A selection of milestones and competitive benchmarks I have achieved in programming contests and hackathons.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = achievementIcons[idx % achievementIcons.length];
            return (
              <motion.div
                key={item.id ?? item.title}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-foreground/10"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors group-hover:bg-brand/10 group-hover:text-brand">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    {item.metric && (
                      <span className="rounded-md border border-brand/10 bg-brand/5 px-2 py-0.5 text-[10px] font-bold font-mono text-brand">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-heading text-base font-bold leading-tight text-foreground">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.description}
                    </p>
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
