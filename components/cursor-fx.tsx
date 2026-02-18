"use client";

import { useEffect, useRef, useState } from "react";

type MagnetTarget = HTMLElement | null;

function findMagnetTarget(el: Element | null): HTMLElement | null {
  if (!el) return null;

  // Any element with data-cursor-magnet (boolean OR string) qualifies.
  const direct =
    el instanceof HTMLElement && el.hasAttribute("data-cursor-magnet") ? el : null;

  const closest =
    (el as any)?.closest?.("[data-cursor-magnet]") instanceof HTMLElement
      ? ((el as any).closest("[data-cursor-magnet]") as HTMLElement)
      : null;

  return direct ?? closest;
}

export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on touch / reduced motion.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    if (prefersReduced || !fineHover) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    document.documentElement.classList.add("has-cursor-fx");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Defensive: ensure cursor layers never block hover hit-testing
    dot.style.pointerEvents = "none";
    ring.style.pointerEvents = "none";

    let raf = 0;
    let hasMoved = false;

    // Pointer target
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    // Smoothed cursor position (USED BY BOTH ring + dot so they stay centered)
    let rcx = x;
    let rcy = y;
    let dcx = x;
    let dcy = y;

    // Magnet state
    let magnetEl: MagnetTarget = null;
    let magnetRect: DOMRect | null = null;

    // Visual state
    let targetScale = 1;
    let scale = 1;

    const setMagnet = (el: MagnetTarget) => {
      magnetEl = el;
      magnetRect = el ? el.getBoundingClientRect() : null;

      if (el) document.documentElement.classList.add("cursor-magnet-on");
      else document.documentElement.classList.remove("cursor-magnet-on");
      document.documentElement.classList.remove("cursor-down");
    };

    const onMove = (e: PointerEvent) => {
      hasMoved = true;
      x = e.clientX;
      y = e.clientY;

      // Determine hovered magnet target
      let hovered = document.elementFromPoint(e.clientX, e.clientY);

      // Fallback: if elementFromPoint fails (rare), use event target
      if (!hovered) hovered = e.target as Element | null;

      const target = findMagnetTarget(hovered);

      if (target && target !== magnetEl) setMagnet(target);
      if (!target && magnetEl) setMagnet(null);

      // Cursor presence
      if (ring.style.opacity !== "1") {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }

      // Obvious but controlled scale on hover
      targetScale = target ? 1.34 : 1;
    };

    const onDown = () => {
      document.documentElement.classList.add("cursor-down");
      ring.style.opacity = "0.9";
      dot.style.opacity = "0.95";
      targetScale = magnetEl ? 1.38 : 1.12;
    };

    const onUp = () => {
      document.documentElement.classList.remove("cursor-down");
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      targetScale = magnetEl ? 1.34 : 1;
    };

    const onLeaveWindow = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      document.documentElement.classList.remove("cursor-magnet-on");
      document.documentElement.classList.remove("cursor-down");
    };

    const onEnterWindow = () => {
      if (!hasMoved) return;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onScrollOrResize = () => {
      if (magnetEl) magnetRect = magnetEl.getBoundingClientRect();
    };

    const tick = () => {
      // Separate smoothing so the dot feels snappy and the ring feels weighted.
      const dotFollow = 0.46;   // faster
      const ringFollow = 0.18;  // slower

      // Default is raw pointer
      let tx = x;
      let ty = y;

      // Magnet: pull cursor toward element center, but keep it subtle and premium.
      if (magnetEl && magnetRect) {
        const mx = magnetRect.left + magnetRect.width / 2;
        const my = magnetRect.top + magnetRect.height / 2;

        const pull = 0.42;
        tx = x + (mx - x) * pull;
        ty = y + (my - y) * pull;
      }

      // Smooth positions (ring uses rcx/rcy; dot uses dcx/dcy)
      rcx += (tx - rcx) * ringFollow;
      rcy += (ty - rcy) * ringFollow;

      dcx += (tx - dcx) * dotFollow;
      dcy += (ty - dcy) * dotFollow;

      // Smooth scale (ring only)
      scale += (targetScale - scale) * 0.18;

      ring.style.transform = `translate3d(${rcx}px, ${rcy}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${dcx}px, ${dcy}px, 0) translate(-50%, -50%)`;

      raf = window.requestAnimationFrame(tick);
    };

    // Start hidden until movement
    ring.style.opacity = "0";
    dot.style.opacity = "0";

    raf = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    document.addEventListener("pointerleave", onLeaveWindow, { passive: true } as any);
    document.addEventListener("pointerenter", onEnterWindow, { passive: true } as any);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("pointerleave", onLeaveWindow as any);
      document.removeEventListener("pointerenter", onEnterWindow as any);

      document.documentElement.classList.remove("cursor-magnet-on");
      document.documentElement.classList.remove("cursor-down");
      document.documentElement.classList.remove("has-cursor-fx");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={
          enabled
            ? undefined
            : { opacity: 0, transform: "translate3d(-9999px,-9999px,0)" }
        }
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={
          enabled
            ? undefined
            : { opacity: 0, transform: "translate3d(-9999px,-9999px,0)" }
        }
      />
    </>
  );
}
