import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { motionTransitions } from "@/lib/motion";
import { heroContent } from "@/content/hero";

export function HeroButtons() {
  const handleViewProjects = () => {
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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Primary: View Projects */}
      <motion.button
        onClick={handleViewProjects}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={motionTransitions.spring}
        className="group relative flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto"
        type="button"
      >
        <span>{heroContent.primaryButton.text}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      </motion.button>

      {/* Secondary: Download Resume */}
      <motion.a
        href="#"
        download={heroContent.secondaryButton.filename}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={motionTransitions.spring}
        className="flex cursor-pointer items-center justify-center rounded-xl border border-border/80 bg-background/50 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:border-foreground/10 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto text-center"
      >
        {heroContent.secondaryButton.text}
      </motion.a>
    </div>
  );
}
