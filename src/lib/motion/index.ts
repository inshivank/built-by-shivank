import type { Transition, Variants } from "framer-motion";

export const motionTransitions = {
  spring: {
    type: "spring",
    stiffness: 380,
    damping: 36,
    mass: 0.8,
  },
  smooth: {
    type: "tween",
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
  },
  reveal: {
    type: "tween",
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  },
} satisfies Record<string, Transition>;

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.reveal,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: motionTransitions.smooth,
  },
};

export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0.04,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
