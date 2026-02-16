"use client";

import dynamic from "next/dynamic";
import React from "react";

type Hero3DLikeProps = {
  src?: string;
  scale?: number;
  depth?: number;
  animate?: boolean;
  className?: string;
};

const Hero3D = dynamic<Hero3DLikeProps>(
  () => import("@/components/hero-3d").then((m) => m.default as any),
  {
    ssr: false,
    loading: () => (
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
    ),
  }
);

export default function Hero3DLoader({
  src = "/srt-logo.svg",
  scale = 1,
  depth = 0.22,
  animate = true,
  className,
}: Hero3DLikeProps) {
  return <Hero3D src={src} scale={scale} depth={depth} animate={animate} className={className} />;
}
