"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ScrollIndicator() {
  const { prefersReducedMotion } = usePrefersReducedMotion();

  const handleScroll = () => {
    const nextSection = document.getElementById("work");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
    >
      <button
        onClick={handleScroll}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background/40 text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label="Scroll to projects section"
        type="button"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, 4, 0],
                }
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </motion.div>
      </button>
    </motion.div>
  );
}
