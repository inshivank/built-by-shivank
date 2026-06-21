"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Code2, Sparkles } from "lucide-react";
import { aboutContent } from "@/content/about";

const iconMap = {
  Code2,
  Sparkles,
};

export function About() {
  return (
    <Section id="about" className="border-t border-border/20 pt-24 md:pt-36">
      <Container size="wide">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          
          {/* Left Column: Story (55%) */}
          <div className="w-full lg:w-[55%] space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {aboutContent.title}
              </h2>
              <h3 className="font-sans text-lg font-semibold text-brand">
                {aboutContent.subtitle}
              </h3>
            </div>

            <div className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground space-y-5">
              {aboutContent.story.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Core Values Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {aboutContent.values.map((value, i) => {
                const Icon = iconMap[value.icon as keyof typeof iconMap] || Code2;
                return (
                  <div key={i} className="flex gap-3.5 p-4 rounded-xl border border-border/60 bg-secondary/20 shadow-sm">
                    <Icon className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{value.title}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Milestones Timeline (40%) */}
          <div className="w-full lg:w-[40%] rounded-2xl border border-border/60 bg-secondary/10 p-6 sm:p-8 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground font-sans mb-8">
              Key Milestones
            </h4>

            <div className="relative border-l border-border/60 pl-6 space-y-8">
              {aboutContent.milestones.map((milestone, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Node Icon/Dot */}
                  <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-brand shadow-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                  </div>
                  
                  {/* Milestone Card */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold font-mono text-brand bg-brand/5 border border-brand/10 px-2 py-0.5 rounded-md">
                      {milestone.year}
                    </span>
                    <h5 className="text-sm font-bold text-foreground mt-1">
                      {milestone.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
