"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "./project-card";
import { ProjectOverlay } from "./project-overlay";
import { featuredProjects } from "@/content/projects";
import { Project } from "@/types/content";

export function FeaturedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="work" className="border-t border-border/20 pt-28 md:pt-36">
      <Container size="wide" className="space-y-16 md:space-y-24">
        {/* Section Header */}
        <div className="space-y-4 max-w-[700px]">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Selected Work
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
            A curated collection of products I&apos;ve designed, engineered and shipped. Each project represents a real problem solved through thoughtful engineering and modern technologies.
          </p>
        </div>

        {/* Staggered Vertical Project Cards Stack */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="space-y-16 md:space-y-24"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 70,
                    damping: 15,
                    mass: 0.8,
                  },
                },
              }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Expansion Overlay Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
