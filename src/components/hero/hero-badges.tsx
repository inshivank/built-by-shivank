import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { motionTransitions } from "@/lib/motion";
import { heroContent } from "@/content/hero";

const iconMap = {
  MapPin,
  GraduationCap,
  Briefcase,
};

export function HeroBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {heroContent.badges.map((badge) => {
        const Icon = iconMap[badge.icon as keyof typeof iconMap] || MapPin;
        return (
          <motion.div
            key={badge.text}
            whileHover={{ y: -2, scale: 1.02 }}
            transition={motionTransitions.spring}
            className="flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm hover:border-foreground/10 hover:text-foreground cursor-default select-none"
          >
            <Icon className="h-3.5 w-3.5 text-brand" strokeWidth={1.8} />
            <span>{badge.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
