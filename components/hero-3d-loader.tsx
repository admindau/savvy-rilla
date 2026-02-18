"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

type Props = {
  /** Preferred prop name used by app/page.tsx */
  svgUrl?: string;
  /** Back-compat alias */
  src?: string;

  scale?: number;
  depth?: number;
  className?: string;

  /**
   * Optional override:
   * - true: always try to render 3D on desktop
   * - false: never render 3D (force fallback)
   */
  force3d?: boolean;
};

const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false });

function useFlags() {
  const [flags, setFlags] = useState({
    prefersReduced: false,
    coarse: false,
    lowPower: false,
    dpr: 2,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const saveData = (navigator as any)?.connection?.saveData === true;

    const compute = () => {
      const mem = (navigator as any)?.deviceMemory ?? 0;
      const cores = (navigator as any)?.hardwareConcurrency ?? 0;

      // Conservative: only flag lowPower on very small devices or Save-Data.
      const lowPower =
        saveData ||
        (mem && mem <= 3) ||
        (cores && cores <= 2) ||
        document.documentElement.classList.contains("low-power");

      const deviceDpr = window.devicePixelRatio ?? 1;
      const dpr = lowPower ? Math.min(1.35, deviceDpr) : Math.min(2, deviceDpr);

      setFlags({
        prefersReduced: reduced.matches,
        coarse: coarse.matches,
        lowPower,
        dpr,
      });
    };

    compute();
    reduced.addEventListener?.("change", compute);
    coarse.addEventListener?.("change", compute);

    return () => {
      reduced.removeEventListener?.("change", compute);
      coarse.removeEventListener?.("change", compute);
    };
  }, []);

  return flags;
}

export default function Hero3DLoader({
  svgUrl,
  src = "/srt-logo.svg",
  scale = 1,
  depth = 0.24,
  className,
  force3d,
}: Props) {
  const resolvedSrc = svgUrl ?? src;
  const { prefersReduced, coarse, dpr } = useFlags();

  const allow3d = useMemo(() => {
    if (force3d === false) return false;
    if (force3d === true) return true;

    // Accessibility + touch gating
    if (prefersReduced) return false;
    if (coarse) return false;

    return true;
  }, [prefersReduced, coarse, force3d]);

  const animate = useMemo(() => {
    if (prefersReduced) return false;
    if (coarse) return false;
    return true;
  }, [prefersReduced, coarse]);

  // Fallback that matches your CSS hook: .hero-visual__fallback
  const Fallback = (
    <div
      className={`hero-visual__fallback ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      <img
        className="hero3d-fallback-mark"
        src={resolvedSrc}
        alt=""
        draggable={false}
      />
    </div>
  );

  if (!allow3d) return Fallback;

  return (
    <Hero3D
      src={resolvedSrc}
      scale={scale}
      depth={depth}
      animate={animate}
      className={className}
      dpr={dpr}
      fallbackSrc={resolvedSrc}
    />
  );
}
