"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, ExternalLink } from "lucide-react";
import { Project } from "@/types/content";
import { ProjectPreview } from "./project-previews";
import { motionTransitions } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      layoutId={`project-card-container-${project.slug}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      whileHover={{ y: -6 }}
      transition={motionTransitions.spring}
      className="group relative flex h-[620px] w-full cursor-pointer flex-col rounded-2xl border border-border/80 bg-card overflow-hidden shadow-lg hover:shadow-xl hover:border-foreground/10 select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      {/* 70% Top: Visual Mockup */}
      <div className="relative h-[70%] w-full overflow-hidden bg-[#070709] border-b border-border/60 flex items-center justify-center">
        {/* Zooming wrapper on card hover */}
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {!imageError && project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <ProjectPreview slug={project.slug} />
          )}
        </div>
        {/* Overlay hover vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* 30% Bottom: Metadata & Actions */}
      <div className="flex h-[30%] flex-col justify-between p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          {/* Project Name and Arrow */}
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-foreground tracking-tight sm:text-2xl">
              {project.title}
            </h3>
            {/* Sliding Arrow Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors group-hover:bg-foreground/5 group-hover:text-foreground">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Short Description */}
          <p className="font-sans text-sm text-muted-foreground line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Badges & Actions row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary/80 border border-border/40 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-full bg-secondary/80 border border-border/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Core Action Links */}
          <div className="flex items-center gap-3">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline cursor-pointer"
                title="View live deployment"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
              title="View repository on GitHub"
            >
              <span>View Code</span>
              <Code className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
