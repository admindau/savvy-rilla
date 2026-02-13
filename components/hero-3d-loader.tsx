'use client';

import dynamic from 'next/dynamic';
import React from 'react';

type Props = {
  className?: string;
  /** Public path to the SVG (default: /srt-logo.svg) */
  svgUrl?: string;
};

// IMPORTANT: ssr:false must live in a Client Component (this file).
const Hero3D = dynamic(() => import('./hero-3d'), { ssr: false });

export default function Hero3DLoader({ className, svgUrl = '/srt-logo.svg' }: Props) {
  return <Hero3D className={className} svgUrl={svgUrl} />;
}
