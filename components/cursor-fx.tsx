"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Premium cursor:
 * - Dot = snappy
 * - Ring = weighted lag
 * - Magnet targets: [data-cursor-magnet]
 * - States: html.cursor-hover, html.cursor-down, html.cursor-magnet-on
 */
export default function CursorFX() {
  const rafRef = useRef<number | null>(null);

  const pointer = useRef<Point>({ x: 0, y: 0 });
  const dot = useRef<Point>({ x: 0, y: 0 });
  const ring = useRef<Point>({ x: 0, y: 0 });

  const hasPointer = useRef(false);
  const isDown = useRef(false);

  const magnet = useRef<{
    active: boolean;
    target: HTMLElement | null;
    center: Point;
    strength: number; // 0..1
  }>({
    active: false,
    target: null,
    center: { x: 0, y: 0 },
    strength: 0.22,
  });

  useEffect(() => {
    // Don’t show custom cursor on touch devices
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || (navigator as any).maxTouchPoints > 0);

    if (isTouch) return;

    const root = document.documentElement;
    root.classList.add("cursor-ready");

    const setMagnetTarget = (el: HTMLElement | null) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        magnet.current.active = true;
        magnet.current.target = el;
        magnet.current.center = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };

        root.classList.add("cursor-magnet-on");
        root.classList.add("cursor-hover");
      } else {
        magnet.current.active = false;
        magnet.current.target = null;

        root.classList.remove("cursor-magnet-on");
        root.classList.remove("cursor-hover");
      }
    };

    const refreshMagnetCenter = () => {
      const el = magnet.current.target;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      magnet.current.center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      hasPointer.current = true;
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;

      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor-magnet]"
      ) as HTMLElement | null;

      // IMPORTANT: braces to avoid the syntax error you hit
      if (el) {
        setMagnetTarget(el);
      } else {
        setMagnetTarget(null);
      }
    };

    const onPointerDown = () => {
      isDown.current = true;
      root.classList.add("cursor-down");
    };

    const onPointerUp = () => {
      isDown.current = false;
      root.classList.remove("cursor-down");
    };

    const onScroll = () => {
      // keep magnet center correct while scrolling
      refreshMagnetCenter();
    };

    const onResize = () => {
      refreshMagnetCenter();
    };

    // Smooth animation loop
    const tick = () => {
      const p = pointer.current;

      // On first move, snap both to pointer to avoid jump
      if (hasPointer.current && dot.current.x === 0 && dot.current.y === 0) {
        dot.current.x = p.x;
        dot.current.y = p.y;
        ring.current.x = p.x;
        ring.current.y = p.y;
      }

      // Snappy dot
      const dotFollow = 0.42; // higher = snappier
      dot.current.x += (p.x - dot.current.x) * dotFollow;
      dot.current.y += (p.y - dot.current.y) * dotFollow;

      // Weighted ring (lag)
      const ringFollow = isDown.current ? 0.12 : 0.16;

      // Magnet influence (ring more than dot)
      let targetX = p.x;
      let targetY = p.y;

      if (magnet.current.active) {
        const c = magnet.current.center;
        const dx = c.x - p.x;
        const dy = c.y - p.y;

        // limit pull so it feels premium, not “teleport”
        const pull = clamp(magnet.current.strength, 0.08, 0.36);
        targetX = p.x + dx * pull;
        targetY = p.y + dy * pull;
      }

      ring.current.x += (targetX - ring.current.x) * ringFollow;
      ring.current.y += (targetY - ring.current.y) * ringFollow;

      // write to CSS variables (single source of truth)
      root.style.setProperty("--cursor-x", `${dot.current.x}px`);
      root.style.setProperty("--cursor-y", `${dot.current.y}px`);
      root.style.setProperty("--cursor-ring-x", `${ring.current.x}px`);
      root.style.setProperty("--cursor-ring-y", `${ring.current.y}px`);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      root.classList.remove("cursor-ready");
      root.classList.remove("cursor-hover");
      root.classList.remove("cursor-down");
      root.classList.remove("cursor-magnet-on");
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--cursor-ring-x");
      root.style.removeProperty("--cursor-ring-y");
    };
  }, []);

  return null;
}
