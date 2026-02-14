"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

type Hero3DProps = {
  textureUrl?: string;
  animate?: boolean;
  scale?: number;
  depth?: number;
  className?: string;
};

const Hero3D = dynamic<Hero3DProps>(() => import("@/components/hero-3d"), {
  ssr: false,
});

function Fallback() {
  return (
    <div
      aria-hidden="true"
      className="hero3d-fallback"
    />
  );
}

type Props = {
  /** Prefer PNG texture for reliable “3D logo” */
  textureUrl?: string;

  /** Kept for backward compat — ignored in this texture-based version */
  src?: string;
  svgUrl?: string;

  scale?: number;
  depth?: number;
  className?: string;
};

export default function Hero3DLoader({
  textureUrl = "/logo-white.png",
  scale = 1,
  depth = 0.12,
  className,
}: Props) {
  const [allow3d, setAllow3d] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower = document.documentElement.classList.contains("low-power");

    const compute = () => {
      const wideEnough = window.innerWidth >= 900;
      setAllow3d(!prefersReduced && !coarse && !lowPower && wideEnough);
    };

    compute();
    setAnimate(!prefersReduced && !lowPower);

    window.addEventListener("resize", compute, { passive: true });
    return () => window.removeEventListener("resize", compute);
  }, []);

  if (!allow3d) return <Fallback />;

  return (
    <Hero3D
      textureUrl={textureUrl}
      scale={scale}
      depth={depth}
      animate={animate}
      className={className}
    />
  );
}
