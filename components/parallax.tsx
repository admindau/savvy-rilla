"use client";

import React, { useEffect, useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;

  /** Max rotation strength (deg-ish). Will be clamped internally. */
  strength?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Parallax({ children, className = "", strength = 10 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const maxDeg = clamp(strength, 4, 10); // ✅ clamp so it never feels toy-like
    let raf = 0;

    const onMove = (ev: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (ev.clientX - rect.left) / rect.width; // 0..1
      const ny = (ev.clientY - rect.top) / rect.height; // 0..1

      // convert to -1..1
      const px = (nx - 0.5) * 2;
      const py = (ny - 0.5) * 2;

      const rx = clamp(py * -maxDeg, -maxDeg, maxDeg);
      const ry = clamp(px * maxDeg, -maxDeg, maxDeg);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--px", `${px.toFixed(3)}`); // depth translate driver
        el.style.setProperty("--py", `${py.toFixed(3)}`);
      });
    };

    const onLeave = () => {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
      el.style.setProperty("--px", `0`);
      el.style.setProperty("--py", `0`);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`parallax ${className}`.trim()}>
      <div className="parallax-inner">{children}</div>
    </div>
  );
}
