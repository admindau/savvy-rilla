"use client";

import React, { useEffect, useRef } from "react";

type RevealVariant = "up" | "left" | "right";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delayMs?: number;

  /** Adds staggered reveal to each direct child of this wrapper */
  staggerChildren?: boolean;
  staggerMs?: number;

  /** Slide direction */
  variant?: RevealVariant;
};

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delayMs = 0,
  staggerChildren = false,
  staggerMs = 70,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set base delay
    el.style.setProperty("--reveal-delay", `${delayMs}ms`);

    // If staggering, mark direct children
    if (staggerChildren) {
      el.style.setProperty("--stagger-step", `${staggerMs}ms`);
      const kids = Array.from(el.children) as HTMLElement[];
      kids.forEach((k, i) => {
        k.classList.add("reveal-stagger-item");
        k.style.setProperty("--stagger-i", String(i));
      });
    }

    if (prefersReduced) {
      el.classList.add("reveal-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, staggerChildren, staggerMs]);

  const variantClass =
    variant === "left" ? "reveal--left" : variant === "right" ? "reveal--right" : "";

  const staggerClass = staggerChildren ? "reveal-stagger" : "";

  return (
    <Tag
      ref={ref as any}
      className={`reveal ${variantClass} ${staggerClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
