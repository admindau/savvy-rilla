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

export default function CursorFX() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const pointer = useRef<Point>({ x: 0, y: 0 });
  const pos = useRef<Point>({ x: 0, y: 0 });
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

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      (navigator as any).maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;
    if (prefersReducedMotion()) return;

    const html = document.documentElement;
    html.classList.add("cursor-ready");

    const setMagnetTarget = (el: HTMLElement | null) => {
      magnet.current.target = el;

      if (!el) {
        magnet.current.active = false;
        html.classList.remove("cursor-hover", "cursor-magnet-on");
        return;
      }

      const r = el.getBoundingClientRect();
      magnet.current.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };

      const raw = el.getAttribute("data-cursor-magnet");
      const strength = raw == null || raw === "" ? 0.26 : Number(raw);
      magnet.current.strength = clamp(Number.isFinite(strength) ? strength : 0.26, 0.12, 0.45);
      magnet.current.active = true;

      html.classList.add("cursor-hover", "cursor-magnet-on");
    };

    const refreshMagnetCenter = () => {
      const el = magnet.current.target;
      if (!el) return;
      const r = el.getBoundingClientRect();
      magnet.current.center = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };

    let currentMagnet: HTMLElement | null = null;

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
    };

    const onDown = () => {
      isDown.current = true;
      html.classList.add("cursor-down");
    };

    const onUp = () => {
      isDown.current = false;
      html.classList.remove("cursor-down");
    };

    const onScroll = () => refreshMagnetCenter();
    const onResize = () => refreshMagnetCenter();

    const tick = () => {
      const p = pointer.current;

      if (hasMoved.current && pos.current.x === 0 && pos.current.y === 0) {
        pos.current.x = p.x;
        pos.current.y = p.y;
      }

      let tx = p.x;
      let ty = p.y;

      if (magnet.current.active) {
        const c = magnet.current.center;
        const pull = clamp(magnet.current.strength, 0.12, 0.45);
        tx = lerp(p.x, c.x, pull);
        ty = lerp(p.y, c.y, pull);
      }

      const follow = isDown.current ? 0.12 : 0.18;
      pos.current.x = lerp(pos.current.x, tx, follow);
      pos.current.y = lerp(pos.current.y, ty, follow);

      if (rootRef.current) {
        // Single anchor = perfect alignment of ring + dot
        rootRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
        rootRef.current.style.opacity = "1";
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
      html.classList.remove("cursor-ready", "cursor-hover", "cursor-down", "cursor-magnet-on");
    };
  }, []);

  const green = "rgba(34, 197, 94, 0.95)";
  const greenSoft = "rgba(34, 197, 94, 0.22)";

  return (
    <>
      {/* Cursor root is the ONLY element that moves. Children stay perfectly centered. */}
      <div
        ref={rootRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
          zIndex: 2147483647,
          opacity: 0, // becomes 1 after first move
          transform: "translate3d(0,0,0)",
        }}
      >
        {/* ring */}
        <div
          className="cursor-ring"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 36,
            height: 36,
            borderRadius: 9999,
            border: `2px solid ${green}`,
            boxShadow: `0 0 28px ${greenSoft}`,
            transform: "translate3d(-50%, -50%, 0)",
            transition: "width 160ms ease, height 160ms ease, border-width 160ms ease",
          }}
        />
        {/* dot */}
        <div
          className="cursor-dot"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 6,
            height: 6,
            borderRadius: 9999,
            background: green,
            boxShadow: `0 0 16px ${greenSoft}`,
            transform: "translate3d(-50%, -50%, 0)",
          }}
        />
      </div>

      {/* Minimal state styling without relying on your globals */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html.cursor-ready, html.cursor-ready body { cursor: none; }
            html.cursor-ready.cursor-magnet-on .cursor-ring { width: 46px; height: 46px; }
            html.cursor-ready.cursor-down .cursor-ring { width: 30px; height: 30px; }
          `,
        }}
      />
    </>
  );
}
