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

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let hasMoved = false;

    // Pointer target
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    // Smoothed cursor position (USED BY BOTH ring + dot so they stay centered)
    let cx = x;
    let cy = y;

    // Magnet state
    let magnetEl: MagnetTarget = null;
    let magnetRect: DOMRect | null = null;

    // Visual state
    let targetScale = 1;
    let scale = 1;

    const setMagnet = (el: MagnetTarget) => {
      magnetEl = el;
      magnetRect = el ? el.getBoundingClientRect() : null;

      // Toggle a global class so your CSS can react to hover/magnet state if needed
      if (el) document.documentElement.classList.add("cursor-magnet-on");
      else document.documentElement.classList.remove("cursor-magnet-on");
    };

    const onMove = (e: PointerEvent) => {
      hasMoved = true;
      x = e.clientX;
      y = e.clientY;

      // Determine hovered magnet target
      const hovered = document.elementFromPoint(e.clientX, e.clientY);
      const target = findMagnetTarget(hovered);

      if (target && target !== magnetEl) setMagnet(target);
      if (!target && magnetEl) setMagnet(null);

      // Cursor presence
      if (ring.style.opacity !== "1") {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }

      // Obvious but controlled scale on hover
      targetScale = target ? 1.22 : 1;
    };

    const onDown = () => {
      ring.style.opacity = "0.9";
      dot.style.opacity = "0.95";
      targetScale = magnetEl ? 1.26 : 1.08;
    };

    const onUp = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      targetScale = magnetEl ? 1.22 : 1;
    };

    const onLeaveWindow = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      document.documentElement.classList.remove("cursor-magnet-on");
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
      // Fast follow = less lag
      const follow = 0.30;

      // Default is raw pointer
      let tx = x;
      let ty = y;

      // Magnet: pull slightly toward element center (but keep dot+ring together)
      if (magnetEl && magnetRect) {
        const mx = magnetRect.left + magnetRect.width / 2;
        const my = magnetRect.top + magnetRect.height / 2;

        // Pull strength: noticeable but not toy-like
        const pull = 0.26;
        tx = x + (mx - x) * pull;
        ty = y + (my - y) * pull;
      }

      // Smooth position
      cx += (tx - cx) * follow;
      cy += (ty - cy) * follow;

      // Smooth scale
      scale += (targetScale - scale) * 0.20;

      // Apply transforms (both share same cx/cy -> dot centered)
      ring.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;

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

    // Window boundary behavior
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
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={enabled ? undefined : { opacity: 0, transform: "translate3d(-9999px,-9999px,0)" }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={enabled ? undefined : { opacity: 0, transform: "translate3d(-9999px,-9999px,0)" }}
      />
    </>
  );
}
