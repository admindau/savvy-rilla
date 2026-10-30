"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".page-hero .shell > *",
  ".section-heading > *",
  ".product-card",
  ".belief-grid > *",
  ".capability-grid article",
  ".detail-list article",
  ".prose-grid > *",
  ".contact-layout > *",
  ".product-detail-layout > *",
  ".product-facts > div",
  ".technology-map > *",
  ".technology-principles article",
  ".system-page-inner > *",
].join(",");

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(revealSelector),
      );

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0 },
      );

      elements.forEach((element, index) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.94) {
          return;
        } else {
          element.dataset.reveal = "";
          element.style.setProperty("--reveal-index", String(index % 6));
          observer?.observe(element);
        }
      });

      document.documentElement.classList.add("motion-ready");
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        delete element.dataset.reveal;
        element.classList.remove("is-visible");
        element.style.removeProperty("--reveal-index");
      });
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
