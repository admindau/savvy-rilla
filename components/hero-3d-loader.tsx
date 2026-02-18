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
};

const Hero3D = dynamic(() => import("./hero-3d"), { ssr: false });

function useFlags() {
  const [flags, setFlags] = useState({
    prefersReduced: false,
    coarse: false,
    lowPower: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const saveData = (navigator as any)?.connection?.saveData === true;

    const compute = () => {
      const dpr = window.devicePixelRatio ?? 1;
      setFlags({
        prefersReduced: reduced.matches,
        coarse: coarse.matches,
        lowPower: saveData || ((navigator as any)?.deviceMemory && (navigator as any).deviceMemory <= 4),
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
  depth = 0.22,
  className,
}: Props) {
  const resolvedSrc = svgUrl ?? src;
  const { prefersReduced, coarse, lowPower } = useFlags();

  const allow3d = useMemo(() => {
    if (prefersReduced) return false;
    if (coarse) return false;
    if (lowPower) return false;
    return true;
  }, [prefersReduced, coarse, lowPower]);

  // Keep the scene alive on desktop; still “cinematic” but not battery-killing.
  const animate = !prefersReduced && !coarse;

  if (!allow3d) {
    return (
      <div className={`hero3d-fallback ${className ?? ""}`.trim()} aria-hidden="true">
        <img className="hero3d-fallback-mark" src={resolvedSrc} alt="" />
      </div>
    );
  }

  return (
    <Hero3D
      src={resolvedSrc}
      scale={scale}
      depth={depth}
      animate={animate}
      className={className}
    />
  );
}
