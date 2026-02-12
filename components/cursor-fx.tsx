"use client";

import { useEffect, useRef } from "react";

type MagnetEl = HTMLElement & { dataset: { magnet?: string } };

export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Respect reduced motion / touch devices
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarse) return;

    document.documentElement.classList.add("has-cursor-fx");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    let activeMagnet: MagnetEl | null = null;
    let magnetRect: DOMRect | null = null;
    let magnetStrength = 14;

    const setMagnet = (el: MagnetEl | null) => {
      activeMagnet = el;
      magnetRect = el ? el.getBoundingClientRect() : null;
      if (el?.dataset?.magnet) {
        const n = Number(el.dataset.magnet);
        if (!Number.isNaN(n)) magnetStrength = Math.max(6, Math.min(24, n));
      } else {
        magnetStrength = 14;
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      document.documentElement.style.setProperty("--cx", `${x}px`);
      document.documentElement.style.setProperty("--cy", `${y}px`);

      if (activeMagnet && magnetRect) {
        const cx = magnetRect.left + magnetRect.width / 2;
        const cy = magnetRect.top + magnetRect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const mx = Math.max(-magnetStrength, Math.min(magnetStrength, dx * 0.12));
        const my = Math.max(-magnetStrength, Math.min(magnetStrength, dy * 0.12));
        activeMagnet.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };

    const onDown = (e: MouseEvent) => {
      document.documentElement.classList.add("cursor-down");

      // Click ripple on interactive elements
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest(
        "a, button, .btn, .nav-cta, .card, .hero-panel, .hero-image-card"
      ) as HTMLElement | null;
      if (!clickable) return;

      const rect = clickable.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      clickable.classList.add("has-ripple");
      clickable.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 750);
    };

    const onUp = () => {
      document.documentElement.classList.remove("cursor-down");
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      const magnet = t.closest(
        ".btn, .nav-cta, .card, .hero-panel, .hero-image-card, .footer-cta"
      ) as MagnetEl | null;
      if (magnet) {
        magnet.classList.add("magnet-active");
        setMagnet(magnet);
      }

      const interactive = t.closest("a, button, .btn, .nav-cta") as HTMLElement | null;
      if (interactive) document.documentElement.classList.add("cursor-hover");
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      const magnet = t.closest(
        ".btn, .nav-cta, .card, .hero-panel, .hero-image-card, .footer-cta"
      ) as MagnetEl | null;
      if (magnet) {
        magnet.classList.remove("magnet-active");
        magnet.style.transform = "";
        setMagnet(null);
      }

      const interactive = t.closest("a, button, .btn, .nav-cta") as HTMLElement | null;
      if (interactive) document.documentElement.classList.remove("cursor-hover");
    };

    const onScrollOrResize = () => {
      if (activeMagnet) magnetRect = activeMagnet.getBoundingClientRect();
    };

    // Render loop for smooth ring lag
    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-cursor-fx");
      document.documentElement.classList.remove("cursor-down");
      document.documentElement.classList.remove("cursor-hover");
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
