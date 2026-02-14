// components/hero-3d-loader.tsx
"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

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
  loading: () => <div className="hero3d-fallback" aria-hidden="true" />,
});

type Props = {
  src?: string;
  scale?: number;
  depth?: number;
  className?: string;
};

export default function Hero3DLoader({
  src = "/srt-logo.svg",
  scale = 1,
  depth = 0.22,
  className,
}: Props) {
  const [allow3d, setAllow3d] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower = document.documentElement.classList.contains("low-power");

    const compute = () => {
      const wideEnough = window.innerWidth >= 920;
      setAllow3d(!prefersReduced && !coarse && !lowPower && wideEnough);
    };

    compute();
    setAnimate(!prefersReduced && !lowPower);

    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  if (!allow3d) {
    return <div className={`hero3d-fallback ${className ?? ""}`.trim()} aria-hidden="true" />;
  }

  return (
    <Hero3D
      src={src}
      scale={scale}
      depth={depth}
      animate={animate}
      className={className}
    />
  );
}
