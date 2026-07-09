"use client";

import type { CertificationEntry } from "@/actions/certifications";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function CertificationsList({
  certifications,
}: {
  certifications: CertificationEntry[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((cert) => (
        <motion.a
          key={cert.id}
          href={cert.credentialUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -4 }}
          className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-md hover:border-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring cursor-pointer"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/10 bg-brand/5 text-brand shadow-inner">
                <Award className="h-5 w-5" />
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>

            <div className="space-y-1">
              <h4 className="font-heading text-base font-bold text-foreground leading-tight">
                {cert.title}
              </h4>
              <p className="font-sans text-xs font-semibold text-muted-foreground">
                {cert.issuer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-6 text-[10px] font-medium text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-zinc-500" />
            <span>Earned {cert.date}</span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
