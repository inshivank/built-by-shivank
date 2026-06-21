"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { contact, resumeUrl, resumeDownloadFilename } from "@/content/contact";
import { Mail, Terminal, Download, Copy, Check } from "lucide-react";
import { motionTransitions } from "@/lib/motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" className="border-t border-border/20 pt-24 md:pt-36 pb-12">
      <Container size="default">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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
          className="rounded-2xl border border-border/60 bg-card p-8 sm:p-12 md:p-16 text-center shadow-xl space-y-8 relative overflow-hidden"
        >
          {/* Subtle Glow background element */}
          <div className="absolute -top-24 -left-24 h-48 w-48 bg-brand/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 bg-brand/10 blur-3xl pointer-events-none rounded-full" />

          {/* CTA Header */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              {contact.tagline}
            </h2>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-muted-foreground">
              {contact.description}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col gap-4 items-center justify-center sm:flex-row pt-4">
            {/* Primary: Mailto link */}
            <motion.a
              href={`mailto:${contact.email}`}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={motionTransitions.spring}
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/95 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Mail className="h-4 w-4" />
              <span>Email Me</span>
            </motion.a>

            {/* Secondary: Copy Email Clipboard */}
            <motion.button
              onClick={handleCopyEmail}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={motionTransitions.spring}
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/50 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
              type="button"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted-foreground" />
                  <span>Copy Address</span>
                </>
              )}
            </motion.button>

            {/* Resume button */}
            <motion.a
              href={resumeUrl}
              download={resumeDownloadFilename}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={motionTransitions.spring}
              className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/50 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer text-center"
            >
              <Download className="h-4 w-4 text-muted-foreground" />
              <span>Resume</span>
            </motion.a>
          </div>

          <div className="h-[1px] bg-border/40 max-w-md mx-auto" aria-hidden="true" />

          {/* Socials Connection */}
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: GithubIcon, label: "GitHub", href: contact.socials.github },
              { icon: LinkedinIcon, label: "LinkedIn", href: contact.socials.linkedin },
              { icon: Terminal, label: "LeetCode", href: contact.socials.leetcode },
            ].map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded px-2 py-1"
                  title={`Visit my ${soc.label}`}
                >
                  <Icon className="h-4 w-4 text-brand" />
                  <span>{soc.label}</span>
                </a>
              );
            })}
          </div>

        </motion.div>
      </Container>
    </Section>
  );
}
