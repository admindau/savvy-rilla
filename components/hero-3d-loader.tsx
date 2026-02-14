// components/hero-3d-loader.tsx
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";

type Hero3DProps = {
  /** public path to the svg, e.g. "/srt-logo.svg" */
  src?: string;
  /** overall scale in world units */
  scale?: number;
  /** thickness for extruded fills */
  depth?: number;
  /** disable animation (reduced motion / low power) */
  animate?: boolean;
  className?: string;
};

const Hero3D = dynamic<Hero3DProps>(() => import("@/components/hero-3d"), {
  ssr: false,
  // Keep loading ultra-light; visuals are handled by CSS + fallback mark
  loading: () => <div className="hero3d-fallback" aria-hidden="true" />,
});

type Props = {
  /** Preferred prop name */
  src?: string;
  /** Legacy alias (some older page.tsx versions used this) */
  svgUrl?: string;
  scale?: number;
  depth?: number;
  className?: string;
};

function useFlags() {
  return useMemo(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const coarse =
      typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;

    const lowPower =
      typeof document !== "undefined" && document.documentElement.classList.contains("low-power");

    return { prefersReduced: !!prefersReduced, coarse: !!coarse, lowPower: !!lowPower };
  }, []);
}

export default function Hero3DLoader({
  src,
  svgUrl,
  scale = 1,
  depth = 0.22,
  className,
}: Props) {
  const resolvedSrc = src ?? svgUrl ?? "/srt-logo.svg";
  const { prefersReduced, coarse, lowPower } = useFlags();
  const [wideEnough, setWideEnough] = useState(false);

  useEffect(() => {
    const compute = () => setWideEnough(window.innerWidth >= 920);
    compute();
    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Enable 3D for desktop widths.
  // Reduced motion or touch/small screens -> fallback 2D mark (still visible).
  const allow3d = wideEnough && !prefersReduced && !coarse;

  if (!allow3d) {
    return (
      <div className={`hero3d-fallback ${className ?? ""}`.trim()} aria-hidden="true">
        <img className="hero3d-fallback-mark" src={resolvedSrc} alt="" />
      </div>
    );
  }

  // Low-power: render 3D but reduce motion
  const animate = !prefersReduced && !lowPower;

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
