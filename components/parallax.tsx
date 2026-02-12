'use client';

import React, { useEffect, useRef } from 'react';

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;

  /** Max rotation strength. Clamped internally to avoid toy-feel. */
  strength?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Parallax({ children, className = '', strength = 10 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const inner = root.querySelector<HTMLElement>('.parallax-inner');
    if (!inner) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = document.documentElement.classList.contains('low-power');
    if (prefersReduced || lowPower) return;

    const maxDeg = clamp(strength, 4, 10);
    const maxTranslate = clamp(8 + maxDeg * 1.0, 10, 18);

    let raf = 0;

    // targets + currents (smoothed)
    let tRx = 0;
    let tRy = 0;
    let cRx = 0;
    let cRy = 0;

    // depth layers: anything inside with data-depth="0.2..1"
    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'));

    const onMove = (ev: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (ev.clientX - rect.left) / rect.width; // 0..1
      const ny = (ev.clientY - rect.top) / rect.height; // 0..1
      const px = (nx - 0.5) * 2; // -1..1
      const py = (ny - 0.5) * 2; // -1..1

      tRx = clamp(py * -maxDeg, -maxDeg, maxDeg);
      tRy = clamp(px * maxDeg, -maxDeg, maxDeg);
    };

    const onLeave = () => {
      tRx = 0;
      tRy = 0;
    };

    const tick = () => {
      cRx = lerp(cRx, tRx, 0.12);
      cRy = lerp(cRy, tRy, 0.12);

      inner.style.setProperty('--rx', `${cRx.toFixed(2)}deg`);
      inner.style.setProperty('--ry', `${cRy.toFixed(2)}deg`);

      // depth translate: closer elements move more
      for (const node of layers) {
        const d = clamp(Number(node.dataset.depth ?? '0.6'), 0.15, 1);
        const tx = (cRy / maxDeg) * (maxTranslate * d);
        const ty = (cRx / maxDeg) * (maxTranslate * d);
        node.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`parallax ${className}`.trim()}>
      <div className="parallax-inner">{children}</div>
    </div>
  );
}
