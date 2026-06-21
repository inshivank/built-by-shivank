"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { education, gpa } from "@/content/education";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export function Education() {
  return (
    <Section id="education" className="pt-20">
      <Container size="wide" className="space-y-12">
        {/* Section Title */}
        <div className="space-y-3">
          <h3 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Education
          </h3>
        </div>

        {/* Academic Card container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 80,
                damping: 14,
                mass: 0.8,
              },
            },
          }}
          className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-sm hover:border-foreground/10 transition-colors"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            
            {/* Degree and institution details (60%) */}
            <div className="space-y-6 lg:w-[60%]">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-brand shadow-inner">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                      {education.degree}
                    </h4>
                    <p className="font-sans text-sm font-semibold text-muted-foreground">
                      {education.institution}
                    </p>
                  </div>
                </div>

                {/* Academic details info row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium pt-2 pl-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{education.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{education.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-zinc-500" />
                    <span>CGPA: {gpa}</span>
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 space-y-2 max-w-md shadow-sm">
                <div className="flex justify-between text-xs font-bold text-foreground">
                  <span>Current Progress</span>
                  <span className="text-brand">{education.currentProgress.year}</span>
                </div>
                <div className="h-2 w-full bg-border/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand rounded-full transition-all duration-500" 
                    style={{ width: `${education.currentProgress.percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Coursework Chips (40%) */}
            <div className="lg:w-[40%] space-y-3.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-foreground font-sans">
                Relevant Coursework
              </h5>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="rounded-full bg-secondary/80 border border-border/40 px-3 py-1 text-xs font-semibold text-foreground"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
