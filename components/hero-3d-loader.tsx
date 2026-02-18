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
      const lowPower = saveData || (mem && mem <= 4) || (cores && cores <= 4);

      // Cap DPR when low power
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
}: Props) {
  const resolvedSrc = svgUrl ?? src;
  const { prefersReduced, coarse, lowPower, dpr } = useFlags();

  const allow3d = useMemo(() => {
    if (prefersReduced) return false;
    if (coarse) return false;
    if (lowPower) return false;
    return true;
  }, [prefersReduced, coarse, lowPower]);

  // Keep the scene alive on desktop; still cinematic but not battery-killing.
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
      dpr={dpr}
    />
  );
}
