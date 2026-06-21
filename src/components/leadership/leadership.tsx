"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { leadership } from "@/content/leadership";
import { Users, ShieldCheck } from "lucide-react";

const leadershipIcons = [Users, ShieldCheck];

export function Leadership() {
  return (
    <Section id="leadership" className="pt-20">
      <Container size="wide" className="space-y-12">
        {/* Section Title */}
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Leadership & Extracurriculars
          </h3>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground max-w-xl">
            Key positions of responsibility and community services I have spearheaded during university terms.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {leadership.map((lead, idx) => {
            const Icon = leadershipIcons[idx % leadershipIcons.length];
            return (
              <motion.div
                key={lead.role}
                whileHover={{ y: -4 }}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-md hover:border-foreground/10"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-heading text-lg font-bold text-foreground">
                        {lead.role}
                      </h4>
                      <p className="font-sans text-sm font-semibold text-muted-foreground">
                        {lead.organization}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand transition-colors shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  <div className="h-[1px] bg-border/40" aria-hidden="true" />

                  {/* Description */}
                  <div className="space-y-2 font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {lead.description.map((desc, i) => (
                      <p key={i}>{desc}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 text-xs font-semibold text-brand font-mono">
                  {lead.period}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
