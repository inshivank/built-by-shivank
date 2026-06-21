import { motion, type Variants } from "framer-motion";
import { heroContent } from "@/content/hero";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 14,
      mass: 0.8,
    },
  },
};

export function HeroContent() {
  return (
    <div className="flex flex-col gap-4">
      {/* Eyebrow */}
      <motion.span
        variants={itemVariants}
        className="font-sans text-xs font-bold tracking-[0.25em] text-brand uppercase"
      >
        {heroContent.eyebrow}
      </motion.span>

      {/* Main Heading */}
      <motion.h1
        variants={itemVariants}
        className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
      >
        {heroContent.mainHeading}
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="max-w-[650px] font-sans text-base md:text-lg leading-relaxed text-muted-foreground"
      >
        {heroContent.description}
      </motion.p>
    </div>
  );
}
