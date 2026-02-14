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
    let running = false;

    // targets + currents (smoothed)
    let tRx = 0;
    let tRy = 0;
    let cRx = 0;
    let cRy = 0;

    // depth layers: anything inside with data-depth="0.2..1"
    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'));

    // idle detection
    let settleFrames = 0;
    const settleThreshold = 0.02; // degrees
    const settleNeeded = 18; // ~300ms @60fps

    const wake = () => {
      settleFrames = 0;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (ev: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const nx = (ev.clientX - rect.left) / rect.width; // 0..1
      const ny = (ev.clientY - rect.top) / rect.height; // 0..1
      const px = (nx - 0.5) * 2; // -1..1
      const py = (ny - 0.5) * 2; // -1..1

      tRx = clamp(py * -maxDeg, -maxDeg, maxDeg);
      tRy = clamp(px * maxDeg, -maxDeg, maxDeg);

      wake();
    };

    const onEnter = () => {
      wake();
    };

    const onLeave = () => {
      tRx = 0;
      tRy = 0;
      wake();
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

      const near =
        Math.abs(cRx - tRx) < settleThreshold &&
        Math.abs(cRy - tRy) < settleThreshold &&
        Math.abs(cRx) < 0.12 &&
        Math.abs(cRy) < 0.12;

      if (near) settleFrames += 1;
      else settleFrames = 0;

      if (settleFrames >= settleNeeded) {
        running = false;
        raf = 0;
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);

    // Start only on interaction (no always-on RAF)

    return () => {
      if (raf) cancelAnimationFrame(raf);
      root.removeEventListener('pointerenter', onEnter);
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
