"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Project } from "@/types/content";
import { ProjectPreview } from "./project-previews";

interface ProjectMediaProps {
  project: Project;
  className?: string;
}

export function ProjectMedia({ project, className = "" }: ProjectMediaProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [imageError, setImageError] = useState(false);
  const hasVideo = Boolean(project.demoVideo);

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-border/80 bg-[#060608] flex items-center justify-center ${className}`}>
      {isPlayingVideo && hasVideo ? (
        <video
          src={project.demoVideo}
          className="absolute inset-0 w-full h-full object-cover z-20 bg-black"
          autoPlay
          controls
          loop
          playsInline
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-80">
            {!imageError && project.coverImage ? (
              <img
                src={project.coverImage}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <ProjectPreview slug={project.slug} />
            )}
          </div>

          {hasVideo ? (
            <button
              onClick={() => setIsPlayingVideo(true)}
              className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary/95 text-primary-foreground shadow-lg hover:scale-105 hover:bg-primary transition-transform cursor-pointer border-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label="Play demo video"
              type="button"
            >
              <Play className="h-7 w-7 fill-current" />
            </button>
          ) : null}

          <div className="absolute bottom-4 left-4 z-10 text-xs font-mono text-muted-foreground bg-black/60 px-3 py-1.5 rounded-md border border-white/5 backdrop-blur-sm">
            {hasVideo ? "Interactive Demo Simulation" : "Project preview"}
          </div>
        </>
      )}
    </div>
  );
}
