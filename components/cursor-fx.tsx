"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

/**
 * CursorFX
 * - Ring + dot (green)
 * - Magnetic hover on [data-cursor-magnet]
 * - Depth reaction on [data-cursor-depth] (tilt + micro-translate)
 *
 * Usage:
 *   <CursorFX />
 *
 * Mark elements:
 *   <div data-cursor-magnet>...</div>
 *   <div data-cursor-magnet data-cursor-depth>...</div>
 *
 * Optional tuning per element:
 *   data-cursor-magnet="0.30"     // strength 0..1
 *   data-cursor-depth="0.65"      // depth intensity 0..1
 */
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
    target: HTMLElement | null;
  }>({
    active: false,
    center: { x: 0, y: 0 },
    strength: 0.26,
    target: null,
  });

  // For depth reaction on hovered cards
  const depth = useRef<{
    active: boolean;
    target: HTMLElement | null;
    intensity: number; // 0..1
  }>({
    active: false,
    target: null,
    intensity: 0.65,
  });

  useEffect(() => {
    // Disable custom cursor on coarse pointers / touch
    const isTouch =
      "ontouchstart" in window ||
      (navigator as any).maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;
    if (prefersReducedMotion()) return;

    const root = document.documentElement;
    root.classList.add("cursor-ready");

    // If you want the native cursor fully hidden, keep this class-based approach:
    // Add CSS: html.cursor-ready, html.cursor-ready body { cursor: none; }
    // (snippet included below)

    const setMagnetTarget = (el: HTMLElement | null) => {
      magnet.current.target = el;

      if (!el) {
        magnet.current.active = false;
        root.classList.remove("cursor-hover", "cursor-magnet-on");
        return;
      }

      const r = el.getBoundingClientRect();
      magnet.current.active = true;
      magnet.current.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };

      const raw = el.getAttribute("data-cursor-magnet");
      const strength = raw == null || raw === "" ? 0.26 : Number(raw);
      magnet.current.strength = clamp(Number.isFinite(strength) ? strength : 0.26, 0.12, 0.45);

      root.classList.add("cursor-hover", "cursor-magnet-on");
    };

    const setDepthTarget = (el: HTMLElement | null) => {
      depth.current.target = el;

      if (!el) {
        depth.current.active = false;
        root.classList.remove("cursor-depth-on");
        return;
      }

      depth.current.active = true;

      const raw = el.getAttribute("data-cursor-depth");
      const intensity = raw == null || raw === "" ? 0.65 : Number(raw);
      depth.current.intensity = clamp(Number.isFinite(intensity) ? intensity : 0.65, 0.2, 1);

      // Make transforms smooth but responsive
      el.style.willChange = "transform";
      el.style.transformStyle = "preserve-3d";

      root.classList.add("cursor-depth-on");
    };

    const refreshMagnetCenter = () => {
      const el = magnet.current.target;
      if (!el) return;
      const r = el.getBoundingClientRect();
      magnet.current.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    const clearDepthTransform = () => {
      const el = depth.current.target;
      if (!el) return;
      // Only reset what we set
      el.style.transform = "";
      el.style.willChange = "";
      el.style.transformStyle = "";
    };

    let currentMagnet: HTMLElement | null = null;
    let currentDepth: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      hasMoved.current = true;
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;

      const tgt = e.target as HTMLElement | null;

      const magnetEl = tgt?.closest?.("[data-cursor-magnet]") as HTMLElement | null;
      if (magnetEl !== currentMagnet) {
        currentMagnet = magnetEl;
        setMagnetTarget(magnetEl);
      } else if (magnetEl) {
        refreshMagnetCenter();
      }

      const depthEl = tgt?.closest?.("[data-cursor-depth]") as HTMLElement | null;
      if (depthEl !== currentDepth) {
        // reset old
        clearDepthTransform();
        currentDepth = depthEl;
        setDepthTarget(depthEl);
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

    const onScroll = () => refreshMagnetCenter();
    const onResize = () => refreshMagnetCenter();

    const tick = () => {
      const p = pointer.current;

      // Initialize positions on first move so we don't lerp from (0,0)
      if (hasMoved.current && dot.current.x === 0 && dot.current.y === 0) {
        dot.current.x = p.x;
        dot.current.y = p.y;
        ring.current.x = p.x;
        ring.current.y = p.y;
      }

      // Dot is snappy
      dot.current.x = lerp(dot.current.x, p.x, 0.5);
      dot.current.y = lerp(dot.current.y, p.y, 0.5);

      // Ring is weighted + magnetized
      let tx = p.x;
      let ty = p.y;

      if (magnet.current.active) {
        const c = magnet.current.center;
        const pull = clamp(magnet.current.strength, 0.12, 0.45);
        tx = lerp(p.x, c.x, pull);
        ty = lerp(p.y, c.y, pull);
      }

      // Ring follow rate (slower on click for “mass” feel)
      const ringFollow = isDown.current ? 0.11 : 0.16;
      ring.current.x = lerp(ring.current.x, tx, ringFollow);
      ring.current.y = lerp(ring.current.y, ty, ringFollow);

      // Apply transforms directly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // Depth reaction on hovered card (tilt + micro-translate)
      if (depth.current.active && depth.current.target) {
        const el = depth.current.target;
        const r = el.getBoundingClientRect();

        const nx = (p.x - r.left) / Math.max(1, r.width); // 0..1
        const ny = (p.y - r.top) / Math.max(1, r.height); // 0..1
        const px = clamp((nx - 0.5) * 2, -1, 1); // -1..1
        const py = clamp((ny - 0.5) * 2, -1, 1); // -1..1

        const inten = depth.current.intensity;

        // Keep it subtle + premium (no “toy” wobble)
        const rotY = px * (6.5 * inten);
        const rotX = py * (-5.0 * inten);
        const tX = px * (6.0 * inten);
        const tY = py * (5.0 * inten);

        // IMPORTANT: This will overwrite existing transforms on the element.
        // If you already animate the card transform elsewhere, wrap inner content instead.
        el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
          2
        )}deg) translate3d(${tX.toFixed(2)}px, ${tY.toFixed(2)}px, 0)`;
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

      clearDepthTransform();

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      root.classList.remove("cursor-ready", "cursor-hover", "cursor-down", "cursor-magnet-on", "cursor-depth-on");
    };
  }, []);

  // “Failsafe” inline styles so it still shows even if CSS is missing/overridden
  const green = "rgba(34, 197, 94, 0.95)"; // Tailwind green-500-ish
  const greenSoft = "rgba(34, 197, 94, 0.22)";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: green,
          boxShadow: `0 0 16px ${greenSoft}`,
          pointerEvents: "none",
          zIndex: 2147483647,
          opacity: 1,
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 34,
          height: 34,
          borderRadius: 9999,
          border: `2px solid ${green}`,
          boxShadow: `0 0 28px ${greenSoft}`,
          pointerEvents: "none",
          zIndex: 2147483646,
          opacity: 1,
          mixBlendMode: "normal",
          transition: "width 160ms ease, height 160ms ease, border-width 160ms ease",
        }}
      />
      <style
        // tiny state styling without needing your globals.css (optional)
        dangerouslySetInnerHTML={{
          __html: `
            html.cursor-ready, html.cursor-ready body { cursor: none; }
            html.cursor-ready .cursor-ring { opacity: 1; }
            html.cursor-ready.cursor-magnet-on .cursor-ring { width: 44px; height: 44px; }
            html.cursor-ready.cursor-down .cursor-ring { width: 30px; height: 30px; border-width: 2px; }
          `,
        }}
      />
    </>
  );
}
