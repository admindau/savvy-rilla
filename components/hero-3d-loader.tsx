'use client';

import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('@/components/hero-3d'), {
  ssr: false,
});

export default Hero3D;
