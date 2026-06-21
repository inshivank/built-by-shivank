"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { experiences } from "@/content/experience";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export function Experience() {
  return (
    <Section id="journey" className="border-t border-border/20 pt-24 md:pt-36">
      <Container size="wide" className="space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Professional Experience
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
            A history of my technical internships, freelance projects, academic research, and contributions to open source tools.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-border pl-6 sm:pl-8 ml-2 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: -16 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 14,
                    mass: 0.8,
                  },
                },
              }}
              className="relative"
            >
              {/* Pulsing Timeline Track Node */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-border shadow-sm">
                <Briefcase className="h-3 w-3 text-brand" />
              </div>

              {/* Experience Info Card */}
              <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm space-y-4 hover:border-foreground/10 transition-colors">
                
                {/* Heading details */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                        {exp.role}
                      </h3>
                      {exp.type && (
                        <span className="rounded-full bg-brand/5 border border-brand/10 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase tracking-wider">
                          {exp.type}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-sm font-semibold text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>

                  {/* Metas duration and location */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-border/40" aria-hidden="true" />

                {/* Bullets List */}
                <ul className="space-y-2.5">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
