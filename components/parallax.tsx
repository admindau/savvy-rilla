"use client";

import React, { useEffect, useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;

  /** Max rotation strength. Clamped internally to avoid toy-feel. */
  strength?: number;

  /** Subtle hover scale */
  hoverScale?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Parallax({
  children,
  className = "",
  strength = 10,
  hoverScale = 1.015,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const inner = root.querySelector<HTMLElement>(".parallax-inner");
    if (!inner) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = document.documentElement.classList.contains("low-power");
    if (prefersReduced || lowPower) return;

    const maxDeg = clamp(strength, 4, 10);
    const maxTranslate = clamp(10 + maxDeg * 0.9, 10, 18);

    inner.style.willChange = "transform";

    let raf = 0;
    let running = false;
    let settleFrames = 0;

    // targets + currents (Rq: smoothed)
    let tRx = 0;
    let tRy = 0;
    let cRx = 0;
    let cRy = 0;

    let tScale = 1;
    let cScale = 1;

    // depth layers: anything inside with data-depth="0.2..1"
    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));

    const startRaf = () => {
      if (running) return;
      running = true;
      settleFrames = 0;
      raf = requestAnimationFrame(tick);
    };

    const stopRaf = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onEnter = () => {
      tScale = hoverScale;
      root.classList.add("parallax-active");
      startRaf();
    };

    const onMove = (ev: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (ev.clientX - rect.left) / rect.width; // 0..1
      const ny = (ev.clientY - rect.top) / rect.height; // 0..1
      const px = (nx - 0.5) * 2; // -1..1
      const py = (ny - 0.5) * 2; // -1..1

      tRx = clamp(py * -maxDeg, -maxDeg, maxDeg);
      tRy = clamp(px * maxDeg, -maxDeg, maxDeg);

      startRaf();
    };

    const onLeave = () => {
      tRx = 0;
      tRy = 0;
      tScale = 1;
      root.classList.remove("parallax-active");
      startRaf();
    };

    const tick = () => {
      cRx = lerp(cRx, tRx, 0.12);
      cRy = lerp(cRy, tRy, 0.12);
      cScale = lerp(cScale, tScale, 0.14);

      inner.style.transform = `perspective(950px) rotateX(${cRx.toFixed(
        2
      )}deg) rotateY(${cRy.toFixed(2)}deg) translateZ(0) scale(${cScale.toFixed(3)})`;

      for (const node of layers) {
        const d = clamp(Number(node.dataset.depth ?? "0.6"), 0.15, 1);
        const tx = (cRy / maxDeg) * (maxTranslate * d);
        const ty = (cRx / maxDeg) * (maxTranslate * d);
        node.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }

      const dx = Math.abs(cRx - tRx) + Math.abs(cRy - tRy);
      const ds = Math.abs(cScale - tScale);

      if (dx < 0.04 && ds < 0.006) settleFrames += 1;
      else settleFrames = 0;

      if (settleFrames >= 12) {
        stopRaf();
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("parallax-active");
    };
  }, [strength, hoverScale]);

  return (
    <div ref={ref} className={`parallax ${className}`.trim()}>
      <div className="parallax-inner">{children}</div>
    </div>
  );
}
