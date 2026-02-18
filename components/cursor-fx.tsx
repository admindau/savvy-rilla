"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const pointer = useRef<Point>({ x: 0, y: 0 });
  const dot = useRef<Point>({ x: 0, y: 0 });
  const ring = useRef<Point>({ x: 0, y: 0 });

  const raf = useRef<number | null>(null);
  const hasMoved = useRef(false);
  const isDown = useRef(false);

  const magnet = useRef<{
    active: boolean;
    center: Point;
    strength: number; // 0..1
  }>({
    active: false,
    center: { x: 0, y: 0 },
    strength: 0.26,
  });

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouch =
      "ontouchstart" in window || (navigator as any).maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const root = document.documentElement;
    root.classList.add("cursor-ready");

    const setMagnet = (el: HTMLElement | null) => {
      if (!el) {
        magnet.current.active = false;
        root.classList.remove("cursor-hover");
        root.classList.remove("cursor-magnet-on");
        return;
      }
      const r = el.getBoundingClientRect();
      magnet.current.active = true;
      magnet.current.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      root.classList.add("cursor-hover");
      root.classList.add("cursor-magnet-on");
    };

    const refreshMagnet = (target: HTMLElement | null) => {
      if (!target) return;
      const r = target.getBoundingClientRect();
      magnet.current.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    let currentTarget: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      hasMoved.current = true;
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;

      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor-magnet]") as HTMLElement | null;

      if (el !== currentTarget) {
        currentTarget = el;
        setMagnet(el);
      } else if (el) {
        // keep center stable while moving over element
        refreshMagnet(el);
      }
    };

    const onDown = () => {
      isDown.current = true;
      root.classList.add("cursor-down");
    };

    const onUp = () => {
      isDown.current = false;
      root.classList.remove("cursor-down");
    };

    const onScroll = () => refreshMagnet(currentTarget);
    const onResize = () => refreshMagnet(currentTarget);

    const tick = () => {
      const p = pointer.current;

      if (hasMoved.current && dot.current.x === 0 && dot.current.y === 0) {
        dot.current.x = p.x;
        dot.current.y = p.y;
        ring.current.x = p.x;
        ring.current.y = p.y;
      }

      // Dot is snappy
      dot.current.x = lerp(dot.current.x, p.x, 0.48);
      dot.current.y = lerp(dot.current.y, p.y, 0.48);

      // Ring is weighted + magnetized
      let tx = p.x;
      let ty = p.y;

      if (magnet.current.active) {
        const c = magnet.current.center;
        const pull = clamp(magnet.current.strength, 0.14, 0.38);
        tx = lerp(p.x, c.x, pull);
        ty = lerp(p.y, c.y, pull);
      }

      const ringFollow = isDown.current ? 0.12 : 0.16;
      ring.current.x = lerp(ring.current.x, tx, ringFollow);
      ring.current.y = lerp(ring.current.y, ty, ringFollow);

      // Write transforms directly to elements (no CSS conflicts)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      root.classList.remove("cursor-ready", "cursor-hover", "cursor-down", "cursor-magnet-on");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
