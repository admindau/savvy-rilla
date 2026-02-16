"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic cursor FX (desktop only).
 * - Completely disabled on coarse pointers (mobile/touch) and reduced-motion.
 * - Dot is always centered inside ring (both use identical translate3d coords).
 * - Hides on text selection + input/textarea/contenteditable.
 */
export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Decide enablement once on mount.
  useEffect(() => {
    setMounted(true);

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;

    if (prefersReduced || coarse) {
      document.documentElement.classList.remove("has-cursor-fx");
      setEnabled(false);
      return;
    }

    document.documentElement.classList.add("has-cursor-fx");
    setEnabled(true);
  }, []);

  // Attach listeners only when enabled.
  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
    };

    const setPos = (el: HTMLElement, x: number, y: number) => {
      // Keep both elements in exact sync (no translate(-50%,-50%) surprises).
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      state.x += (state.tx - state.x) * 0.16;
      state.y += (state.ty - state.y) * 0.16;
      setPos(dot, state.tx, state.ty);
      setPos(ring, state.x, state.y);
      raf = window.requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
      document.documentElement.classList.add("cursor-active");
    };

    const onDown = () => document.documentElement.classList.add("cursor-down");
    const onUp = () => document.documentElement.classList.remove("cursor-down");

    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      return (
        el.closest(
          "a, button, [role='button'], input, textarea, select, summary, [data-cursor='hover']"
        ) !== null
      );
    };

    const isTexty = (el: Element | null) => {
      if (!el) return false;
      return el.closest("input, textarea, [contenteditable='true'], [data-cursor='text']") !== null;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      if (isInteractive(t)) document.documentElement.classList.add("cursor-hover");
      if (isTexty(t)) document.documentElement.classList.add("cursor-text");
    };

    const onOut = () => {
      document.documentElement.classList.remove("cursor-hover");
      document.documentElement.classList.remove("cursor-text");
    };

    const onSelect = () => {
      const sel = window.getSelection();
      const hasSelection = sel && sel.toString().length > 0;
      document.documentElement.classList.toggle("cursor-selecting", !!hasSelection);
    };

    const onScrollOrResize = () => {
      // Prevent ring drift on certain browsers.
      setPos(ring, state.x, state.y);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    document.addEventListener("selectionchange", onSelect);

    tick();

    return () => {
      document.documentElement.classList.remove("has-cursor-fx");
      document.documentElement.classList.remove("cursor-active");
      document.documentElement.classList.remove("cursor-down");
      document.documentElement.classList.remove("cursor-hover");
      document.documentElement.classList.remove("cursor-text");
      document.documentElement.classList.remove("cursor-selecting");

      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("selectionchange", onSelect);
    };
  }, [enabled]);

  // Critical: never render the cursor on mobile/coarse pointers.
  if (!mounted || !enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
