"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { motionTransitions } from "@/lib/motion";
import { navigationContent } from "@/content/navigation";
import { siteConfig } from "@/content/site";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { scrollY } = useScroll();

  // Handle scroll detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu on click link or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll(
      'a[href], button, [tabindex="0"]'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabTrap);
    // Focus first element on open
    setTimeout(() => {
      firstElement?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleTabTrap);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 border-b border-border/60 py-3 backdrop-blur-md shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <Container size="wide">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {navigationContent.brand}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <ul
              className="relative flex items-center gap-1"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navigationContent.items.map((item, idx) => (
                <li key={item.name} className="relative">
                  <Link
                    href={item.href}
                    className="relative block px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-md"
                    onMouseEnter={() => setHoveredIndex(idx)}
                  >
                    {item.name}
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 -z-10 rounded-md bg-secondary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={motionTransitions.spring}
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="h-4 w-[1px] bg-border/60" aria-hidden="true" />
            <ThemeToggle />
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              ref={triggerRef}
              onClick={toggleMobileMenu}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-transparent text-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span
                  className="h-[1.5px] w-5 bg-foreground origin-center"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="h-[1.5px] w-5 bg-foreground"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="h-[1.5px] w-5 bg-foreground origin-center"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[65px] z-30 flex flex-col bg-background/95 backdrop-blur-lg border-b border-border md:hidden overflow-hidden"
          >
            <Container className="flex-1 py-12 flex flex-col justify-between">
              <motion.ul
                className="flex flex-col gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {navigationContent.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={motionTransitions.smooth}
                  >
                    <Link
                      href={item.href}
                      className="block text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Bottom Info inside Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="border-t border-border/40 pt-8"
              >
                <p className="text-xs text-muted-foreground">
                  {siteConfig.designerCredits}
                </p>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
