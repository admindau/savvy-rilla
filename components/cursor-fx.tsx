"use client";

import { useEffect, useRef, useState } from "react";

type MagnetTarget = HTMLElement | null;

function isMagnetTarget(el: Element | null): el is HTMLElement {
  if (!el) return false;
  if (!(el instanceof HTMLElement)) return false;
  return el.hasAttribute("data-cursor-magnet");
}

export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable completely on mobile / touch / reduced-motion.
    // This prevents the "phantom" ring that can appear centered on mobile.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const fineHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    if (prefersReduced || coarse || !fineHover) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    let activeMagnet: MagnetTarget = null;
    let magnetRect: DOMRect | null = null;

    // Slightly larger ring on hover
    let hoverScale = 1;
    let hoverScaleCurrent = 1;

    const isTextInput = (el: EventTarget | null) => {
      const t = el as HTMLElement | null;
      if (!t) return false;
      if (t.isContentEditable) return true;
      const tag = t.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return true;
      return !!t.closest("input, textarea, select, [contenteditable='true']");
    };

    const onFocusIn = (e: FocusEvent) => {
      if (isTextInput(e.target)) document.documentElement.classList.add("cursor-hidden");
    };

    const onFocusOut = () => {
      document.documentElement.classList.remove("cursor-hidden");
    };

    const onSelectionChange = () => {
      const sel = window.getSelection();
      const hasSelection = !!sel && !sel.isCollapsed && String(sel.toString() || "").length > 0;
      if (hasSelection) document.documentElement.classList.add("cursor-hidden");
      else document.documentElement.classList.remove("cursor-hidden");
    };

    const setMagnet = (target: MagnetTarget) => {
      activeMagnet = target;
      magnetRect = target ? target.getBoundingClientRect() : null;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      // Magnet logic: if hovering a magnet element, pull ring toward its center a bit
      const hovered = document.elementFromPoint(e.clientX, e.clientY);
      const magnet = isMagnetTarget(hovered) ? hovered : (hovered?.closest?.("[data-cursor-magnet]") as HTMLElement | null);

      if (magnet && magnet !== activeMagnet) setMagnet(magnet);
      if (!magnet && activeMagnet) setMagnet(null);

      hoverScale = magnet ? 1.22 : 1;
    };

    const onDown = () => {
      ring.style.opacity = "0.85";
      dot.style.opacity = "0.9";
      ring.style.filter = "blur(0px)";
    };

    const onUp = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
      ring.style.filter = "";
    };

    const onOver = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onOut = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onScrollOrResize = () => {
      if (activeMagnet) magnetRect = activeMagnet.getBoundingClientRect();
    };

    const tick = () => {
      // If magnet is active, pull ring toward target center (subtle)
      if (activeMagnet && magnetRect) {
        const cx = magnetRect.left + magnetRect.width / 2;
        const cy = magnetRect.top + magnetRect.height / 2;

        const pull = 0.18;
        const tx = x + (cx - x) * pull;
        const ty = y + (cy - y) * pull;

        rx += (tx - rx) * 0.14;
        ry += (ty - ry) * 0.14;
      } else {
        rx += (x - rx) * 0.14;
        ry += (y - ry) * 0.14;
      }

      // Smooth hover scale
      hoverScaleCurrent += (hoverScale - hoverScaleCurrent) * 0.12;
      ring.style.width = `${46 * hoverScaleCurrent}px`;
      ring.style.height = `${46 * hoverScaleCurrent}px`;

      // Perfect centering: apply translate(-50%, -50%) so it centers on pointer
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    // Use pointer events for best cross-device handling (desktop only here)
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    document.addEventListener("selectionchange", onSelectionChange);

    // Start visible once we have interaction
    ring.style.opacity = "1";
    dot.style.opacity = "1";

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("selectionchange", onSelectionChange);
      document.documentElement.classList.remove("cursor-hidden");
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
