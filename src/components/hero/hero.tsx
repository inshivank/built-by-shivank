"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { HeroContent } from "./hero-content";
import { HeroButtons } from "./hero-buttons";
import { HeroBadges } from "./hero-badges";
import { HeroMockup } from "./hero-mockup";
import { ScrollIndicator } from "./scroll-indicator";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
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

export function Hero() {
  return (
    <Section className="relative flex min-h-[90vh] md:min-h-dvh items-center overflow-hidden py-20 md:py-0">
      <Container size="wide" className="relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-16"
        >
          {/* Left Side: Content & Actions (55%) */}
          <div className="w-full md:w-[55%] flex flex-col gap-8 md:gap-10">
            <HeroContent />
            
            <motion.div variants={itemVariants}>
              <HeroButtons />
            </motion.div>

            <motion.div variants={itemVariants}>
              <HeroBadges />
            </motion.div>
          </div>

          {/* Right Side: Mockup (45%) */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-[45%] flex justify-center md:justify-end"
          >
            <HeroMockup />
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </Section>
  );
}
