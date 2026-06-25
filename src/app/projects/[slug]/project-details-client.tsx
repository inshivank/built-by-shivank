"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code,
  ExternalLink,
  Layout,
  Hammer,
  BookOpen,
  AlertTriangle,
} from "lucide-react";
import { Project } from "@/types/content";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PageShell } from "@/components/layout/page-shell";
import { Footer } from "@/components/layout/footer";
import { ProjectMedia } from "@/components/work/project-media";

interface ProjectDetailsClientProps {
  project: Project;
}

export function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  return (
    <PageShell className="pt-24 md:pt-32 select-none">
      <Section spacing="default" className="pb-12">
        <Container size="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Navigation Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/20 pb-6">
              <Link
                href="/#work"
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md px-2 py-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Selected Work</span>
              </Link>

              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-secondary/80 border border-border/80 px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Code className="h-4 w-4" />
                  <span>View Repository</span>
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary/95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Title / Description */}
            <div className="space-y-4 max-w-3xl">
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
                {project.title}
              </h1>
              <p className="font-sans text-base sm:text-lg leading-relaxed text-muted-foreground">
                {project.shortDescription}
              </p>
            </div>

            {/* Visual Cover Screen */}
            <ProjectMedia project={project} className="rounded-2xl" />

            {/* Detail Layout Grid */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 pt-6">
              {/* Main Content Columns (col-span 2) */}
              <div className="lg:col-span-2 space-y-12">
                {/* Project Overview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <Layout className="h-5 w-5 text-brand" />
                    <h2 className="text-lg font-bold uppercase tracking-wider font-heading">
                      Project Overview
                    </h2>
                  </div>
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <Hammer className="h-5 w-5 text-brand" />
                    <h2 className="text-lg font-bold uppercase tracking-wider font-heading">
                      Key Features
                    </h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-secondary/20 p-4 text-xs sm:text-sm font-semibold text-foreground shadow-sm hover:border-foreground/10 transition-colors"
                      >
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshots Gallery */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <Layout className="h-5 w-5 text-brand" />
                    <h2 className="text-lg font-bold uppercase tracking-wider font-heading">
                      Screenshots
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {project.gallery.length ? (
                      project.gallery.map((imageUrl, idx) => (
                        <div key={imageUrl} className="aspect-video overflow-hidden rounded-2xl border border-border/60 bg-secondary/10">
                          <img
                            src={imageUrl}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="aspect-video rounded-2xl border border-border/60 bg-secondary/20 flex items-center justify-center text-sm text-muted-foreground">
                        No screenshots available.
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Challenges */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <AlertTriangle className="h-5 w-5 text-brand" />
                    <h2 className="text-lg font-bold uppercase tracking-wider font-heading">
                      Key Technical Challenges
                    </h2>
                  </div>
                  <div className="space-y-3.5 border-l-2 border-border pl-6 py-1">
                    {project.challenges.map((challenge, idx) => (
                      <p key={idx} className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {challenge}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Lessons Learned */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-foreground">
                    <BookOpen className="h-5 w-5 text-brand" />
                    <h2 className="text-lg font-bold uppercase tracking-wider font-heading">
                      Lessons Learned
                    </h2>
                  </div>
                  <div className="space-y-3.5">
                    {project.lessonsLearned.map((lesson, idx) => (
                      <p key={idx} className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {lesson}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Metadata (col-span 1) */}
              <div className="space-y-8 rounded-2xl border border-border/60 bg-secondary/10 p-6 sm:p-8 h-fit shadow-sm">
                {/* Tech Stack */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-foreground">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-card border border-border/80 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-border/40" aria-hidden="true" />

                {/* Architecture Overview */}
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-foreground">
                    Architecture Overview
                  </h3>
                  <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                    {project.architecture}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
      <Footer />
    </PageShell>
  );
}
