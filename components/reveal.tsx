"use client";

import React, { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType; // ✅ avoids global JSX namespace
  delayMs?: number;
};

export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.add("reveal-in");
      return;
    }

    el.style.setProperty("--reveal-delay", `${delayMs}ms`);

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
  }, [delayMs]);

  return (
    <Tag ref={ref as any} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
