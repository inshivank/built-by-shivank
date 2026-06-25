"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Code, ExternalLink, Layout, Hammer, BookOpen, AlertTriangle } from "lucide-react";
import { Project } from "@/types/content";
import { ProjectMedia } from "./project-media";

interface ProjectOverlayProps {
  project: Project;
  onClose: () => void;
}

export function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  // Manage body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Listen to Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap implementation
  useEffect(() => {
    if (!overlayRef.current) return;

    const previousFocusedElement = document.activeElement as HTMLElement;

    const focusableElements = overlayRef.current.querySelectorAll(
      'a[href], button, [tabindex="0"]'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabTrap);
    // Focus the Back button on mount
    backButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleTabTrap);
      previousFocusedElement?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 sm:p-6 md:p-10 backdrop-blur-lg select-none">
      {/* Click outside backdrop close layer */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} aria-hidden="true" />

      {/* Expanded Modal Box */}
      <motion.div
        ref={overlayRef}
        layoutId={`project-card-container-${project.slug}`}
        className="relative w-full max-w-5xl h-[85vh] bg-card rounded-2xl border border-border flex flex-col shadow-2xl overflow-hidden focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        tabIndex={-1}
      >
        {/* Sticky Header Topbar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-card/90 px-6 py-4 backdrop-blur-md z-10">
          <button
            ref={backButtonRef}
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md px-2 py-1"
            aria-label="Close case study"
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <h2 id="overlay-title" className="font-heading text-lg font-bold text-foreground truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {project.title}
          </h2>

          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs font-bold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md px-2.5 py-1"
          >
            <span>Open Case Study</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 md:p-12 space-y-12">
          
          {/* Cover Demo video/visual placeholder */}
          <ProjectMedia project={project} className="rounded-xl" />

          {/* Details Split Layout */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            
            {/* Main Details (Col-span 2) */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Overview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <Layout className="h-4.5 w-4.5 text-brand" />
                  <h3 className="text-base font-bold uppercase tracking-wider font-sans text-foreground">
                    Project Overview
                  </h3>
                </div>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <Hammer className="h-4.5 w-4.5 text-brand" />
                  <h3 className="text-base font-bold uppercase tracking-wider font-sans text-foreground">
                    Key Features
                  </h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-secondary/30 p-3 text-xs font-semibold text-foreground shadow-sm"
                    >
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery placeholders */}
              <div className="space-y-3">
                <h3 className="text-base font-bold uppercase tracking-wider font-sans text-foreground">
                  Application Screens
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {["Dashboard Screen", "Data Metrics", "User Settings"].map((screen, idx) => (
                    <div
                      key={idx}
                      className="aspect-video rounded-xl border border-border/60 bg-secondary/30 flex flex-col items-center justify-center p-4 shadow-inner"
                    >
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        [{screen}]
                      </div>
                      <div className="text-[9px] text-zinc-600 font-sans mt-1">
                        Mock Visual Mockup {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges and Resolutions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="h-4.5 w-4.5 text-brand" />
                  <h3 className="text-base font-bold uppercase tracking-wider font-sans text-foreground">
                    Key Technical Challenges
                  </h3>
                </div>
                <div className="space-y-3 border-l-2 border-border pl-4">
                  {project.challenges.map((challenge, idx) => (
                    <p key={idx} className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {challenge}
                    </p>
                  ))}
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-foreground">
                  <BookOpen className="h-4.5 w-4.5 text-brand" />
                  <h3 className="text-base font-bold uppercase tracking-wider font-sans text-foreground">
                    Lessons Learned
                  </h3>
                </div>
                <div className="space-y-3">
                  {project.lessonsLearned.map((lesson, idx) => (
                    <p key={idx} className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {lesson}
                    </p>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Meta Stack (Col-span 1) */}
            <div className="space-y-8 rounded-xl border border-border/60 bg-secondary/20 p-6 h-fit shadow-sm">
              
              {/* Tech Stack List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground font-sans">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-card border border-border/80 px-3 py-1 text-[10px] font-semibold text-foreground shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Architecture overview */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground font-sans">
                  Architecture Overview
                </h4>
                <p className="font-sans text-[11px] leading-relaxed text-muted-foreground">
                  {project.architecture}
                </p>
              </div>

              <div className="h-[1px] bg-border/60" aria-hidden="true" />

              {/* Project buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Code className="h-4 w-4" />
                  <span>View Repository</span>
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/50 px-4 py-2.5 text-xs font-bold text-foreground shadow-sm hover:bg-secondary transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <ExternalLink className="h-4 w-4 text-brand" />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
