"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Activity, Code, Cpu, Layers, LayoutGrid, Settings, Terminal } from "lucide-react";

export function HeroMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = usePrefersReducedMotion();

  // Mouse position values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate cursor coordinate relative to mockup center (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Subtle Radial Glow Behind Laptop */}
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_center,var(--brand-muted)_0%,transparent_70%)] blur-2xl opacity-60 rounded-full" />

      {/* Floating Laptop Mockup Container */}
      <motion.div
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full max-w-[540px] transition-shadow duration-300"
      >
        {/* Shadow underneath */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 0.94, 1],
                  opacity: [0.3, 0.18, 0.3],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-8 left-[5%] right-[5%] h-4 bg-black/40 blur-xl rounded-full -z-20 origin-center"
        />

        {/* Screen Bezel (MacBook Screen Outline) */}
        <div className="relative aspect-[16/10] w-full rounded-2xl border-[5px] border-[#1d1d21] bg-[#0c0c0e] p-[5px] shadow-2xl overflow-hidden flex flex-col">
          {/* Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none rounded-xl z-20" />

          {/* Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[7px] w-16 bg-[#1d1d21] rounded-b-md z-30 flex items-center justify-center">
            <div className="h-[3px] w-[3px] rounded-full bg-[#05051a]" />
          </div>

          {/* Realistic Dashboard UI Mockup inside Screen */}
          <div className="flex-1 bg-[#09090B] text-foreground rounded-lg overflow-hidden flex border border-border/40 select-none">
            {/* Mockup Sidebar */}
            <div className="w-[60px] xs:w-[72px] sm:w-[80px] bg-[#17171B]/90 border-r border-border/40 flex flex-col items-center py-4 gap-4">
              <div className="h-6 w-6 rounded-lg bg-brand/10 flex items-center justify-center border border-brand/20 mb-2">
                <Code className="h-3.5 w-3.5 text-brand" />
              </div>
              <div className="flex flex-col gap-3 items-center w-full">
                {[LayoutGrid, Activity, Cpu, Layers, Settings].map((Icon, i) => (
                  <div
                    key={i}
                    className={`h-7 w-7 rounded-md flex items-center justify-center transition-colors cursor-default ${
                      i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup Main Content */}
            <div className="flex-1 bg-[#09090B] flex flex-col overflow-hidden p-3.5 sm:p-5 gap-3.5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold text-foreground tracking-tight">
                    Production Cluster
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="text-[9px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 bg-secondary/30">
                    v15.5.19
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { title: "Avg Response", value: "48ms", color: "text-brand" },
                  { title: "Memory Usage", value: "32.4%", color: "text-emerald-500" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#17171B] border border-border/60 rounded-xl p-2 sm:p-3 flex flex-col justify-between shadow-sm"
                  >
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      {stat.title}
                    </span>
                    <span className={`text-sm sm:text-base font-bold ${stat.color} mt-1`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Vector Spline Chart */}
              <div className="flex-1 bg-[#17171B] border border-border/60 rounded-xl p-3 flex flex-col shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                    Throughput (req/s)
                  </span>
                  <span className="text-[10px] font-bold text-foreground">1,248 rps</span>
                </div>

                <div className="flex-1 flex items-end">
                  <svg className="w-full h-full min-h-[45px] sm:min-h-[65px]" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Fill underneath */}
                    <path
                      d="M 0 30 C 15 25, 25 15, 35 18 C 45 20, 55 5, 70 8 C 85 10, 90 2, 100 4 L 100 30 Z"
                      fill="url(#chartGlow)"
                    />
                    {/* The stroke */}
                    <path
                      d="M 0 30 C 15 25, 25 15, 35 18 C 45 20, 55 5, 70 8 C 85 10, 90 2, 100 4"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Mini Terminal console */}
              <div className="bg-[#0c0c0e] border border-border/60 rounded-xl p-2.5 font-mono text-[9px] text-zinc-400 flex items-center gap-2 shadow-inner">
                <Terminal className="h-3 w-3 text-brand shrink-0" />
                <div className="truncate flex-1">
                  <span className="text-zinc-600">$</span> npm run build:{" "}
                  <span className="text-emerald-500">✓ compiled successfully in 11.0s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Hinge Bottom Body Base */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[105%] h-3 bg-[#242429] border-t border-[#313137] border-b-2 border-black/80 rounded-b-xl z-20 shadow-md">
          {/* Lid Open Indent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#151518] rounded-b-md" />
        </div>
      </motion.div>
    </div>
  );
}
