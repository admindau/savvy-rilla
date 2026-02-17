"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "fade";

type RevealProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;

  /**
   * Optional delay for sequencing.
   * Preferred: delayMs (milliseconds).
   * Back-compat: delay (seconds) – supports <Reveal delay={0.05} />.
   */
  delayMs?: number;
  delay?: number;

  /** Animation direction preset */
  variant?: RevealVariant;

  /** IntersectionObserver config */
  threshold?: number;
  rootMargin?: string;

  /** Reveal once or every time it re-enters viewport */
  once?: boolean;

  /** Merge in custom style */
  style?: React.CSSProperties;

  /** Pass-through HTML props */
  [key: string]: any;
};

function getTransform(variant: RevealVariant) {
  switch (variant) {
    case "up":
      return "translate3d(0, 14px, 0)";
    case "down":
      return "translate3d(0, -14px, 0)";
    case "left":
      return "translate3d(14px, 0, 0)";
    case "right":
      return "translate3d(-14px, 0, 0)";
    case "fade":
    default:
      return "translate3d(0, 0, 0)";
  }
}

export default function Reveal({
  as,
  className = "",
  children,
  delayMs,
  delay,
  variant = "up",
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  style: styleProp,
  ...rest
}: RevealProps) {
  const Comp = (as ?? "div") as any;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const resolvedDelayMs = useMemo(() => {
    if (typeof delayMs === "number") return delayMs;
    if (typeof delay === "number") return Math.max(0, Math.round(delay * 1000));
    return 0;
  }, [delay, delayMs]);

  const style = useMemo<React.CSSProperties>(() => {
    return resolvedDelayMs
      ? ({ ["--reveal-delay" as any]: `${resolvedDelayMs}ms` } as React.CSSProperties)
      : {};
  }, [resolvedDelayMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);

    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  const baseTransform = getTransform(variant);

  return (
    <Comp
      ref={ref as any}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={{
        ...style,
        ...styleProp,
        transform: isVisible ? "translate3d(0,0,0)" : baseTransform,
        opacity: isVisible ? 1 : 0,
        transitionDelay: isVisible ? `var(--reveal-delay, 0ms)` : "0ms",
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
