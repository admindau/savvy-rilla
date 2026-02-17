"use client";

import { useEffect, useRef, useState } from "react";

type MagnetTarget = HTMLElement | null;

function getMagnetTarget(el: Element | null): HTMLElement | null {
  if (!el) return null;

  const direct = el instanceof HTMLElement && el.hasAttribute("data-cursor-magnet") ? el : null;
  const closest =
    (el as any)?.closest?.("[data-cursor-magnet]") instanceof HTMLElement
      ? ((el as any).closest("[data-cursor-magnet]") as HTMLElement)
      : null;

  const magnet = direct ?? closest;

  // Optional: also allow primary buttons to magnet even if attribute is missing
  if (!magnet && el instanceof HTMLElement) {
    const btn = el.closest?.("a.btn,button.btn") as HTMLElement | null;
    if (btn && btn.classList.contains("btn-primary")) return btn;
  }

  return magnet;
}

export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on touch / reduced-motion
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

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    // We render BOTH dot and ring at the same smoothed coordinates
    // so the dot stays perfectly centered.
    let px = x;
    let py = y;

    let activeMagnet: MagnetTarget = null;
    let magnetRect: DOMRect | null = null;

    // scale for "hover/magnet"
    let targetScale = 1;
    let scale = 1;

    const setMagnet = (target: MagnetTarget) => {
      activeMagnet = target;
      magnetRect = target ? target.getBoundingClientRect() : null;
    };

    const onMove = (e: PointerEvent) => {
      hasMoved = true;
      x = e.clientX;
      y = e.clientY;

      const hovered = document.elementFromPoint(e.clientX, e.clientY);
      const magnet = getMagnetTarget(hovered);

      if (magnet && magnet !== activeMagnet) setMagnet(magnet);
      if (!magnet && activeMagnet) setMagnet(null);

      // stronger but controlled scale so it’s noticeable
      targetScale = magnet ? 1.18 : 1;

      // show once we move
      if (ring.style.opacity !== "1") {
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const onDown = () => {
      ring.style.opacity = "0.9";
      dot.style.opacity = "0.95";
    };

    const onUp = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onPointerLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onPointerEnter = () => {
      if (!hasMoved) return;
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onScrollOrResize = () => {
      if (activeMagnet) magnetRect = activeMagnet.getBoundingClientRect();
    };

    const tick = () => {
      // fast follow = no “laggy weirdness”
      const follow = 0.26;

      let tx = x;
      let ty = y;

      // magnet pulls cursor slightly toward target center
      if (activeMagnet && magnetRect) {
        const cx = magnetRect.left + magnetRect.width / 2;
        const cy = magnetRect.top + magnetRect.height / 2;

        const pull = 0.22; // noticeable but controlled
        tx = x + (cx - x) * pull;
        ty = y + (cy - y) * pull;
      }

      px += (tx - px) * follow;
      py += (ty - py) * follow;

      // smooth scale
      scale += (targetScale - scale) * 0.18;

      // IMPORTANT: dot and ring use same px/py => centered
      ring.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    // start hidden to avoid weird “sitting cursor”
    ring.style.opacity = "0";
    dot.style.opacity = "0";

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    // window boundary fade (no global mouseover/mouseout flicker)
    document.addEventListener("pointerleave", onPointerLeave, { passive: true } as any);
    document.addEventListener("pointerenter", onPointerEnter, { passive: true } as any);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("pointerleave", onPointerLeave as any);
      document.removeEventListener("pointerenter", onPointerEnter as any);
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
