"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

type Hero3DComponentProps = {
  src?: string;
  scale?: number;
  depth?: number;
  animate?: boolean;
  className?: string;
};

const Hero3D = dynamic<Hero3DComponentProps>(() => import("@/components/hero-3d"), {
  ssr: false,
});

function Fallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 24,
        background:
          "radial-gradient(closest-side, rgba(0,245,160,0.10), rgba(0,0,0,0) 70%)",
      }}
    />
  );
}

type Props = {
  /** public path to svg */
  src?: string;
  /** backward-compat alias */
  svgUrl?: string;
  scale?: number;
  depth?: number;
  className?: string;
};

export default function Hero3DLoader({
  src,
  svgUrl,
  scale = 1,
  depth = 0.22,
  className,
}: Props) {
  const resolvedSrc = src ?? svgUrl ?? "/srt-logo.svg";

  const [allow3d, setAllow3d] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower = document.documentElement.classList.contains("low-power");

    const compute = () => {
      const wideEnough = window.innerWidth >= 960;
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
      src={resolvedSrc}
      scale={scale}
      depth={depth}
      animate={animate}
      className={className}
    />
  );
}
