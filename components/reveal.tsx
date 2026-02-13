'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type RevealProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;

  /** Optional delay for sequencing (ms) */
  delayMs?: number;

  /** Direction variants */
  variant?: 'up' | 'down' | 'left' | 'right' | 'none';

  /** IntersectionObserver tuning */
  threshold?: number;
  rootMargin?: string;

  /** Reveal once then stop observing */
  once?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function Reveal({
  as,
  className = '',
  children,
  delayMs = 0,
  variant = 'up',
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  style: styleProp,
  ...rest
}: RevealProps) {
  // Cast to `any` to avoid TS inferring children as `never` for polymorphic JSX tags.
  const Comp: any = as ?? 'div';

  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const style = useMemo<React.CSSProperties>(() => {
    return delayMs ? ({ ['--reveal-delay' as any]: `${delayMs}ms` } as React.CSSProperties) : {};
  }, [delayMs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = document.documentElement.classList.contains('low-power');
    if (prefersReduced || lowPower) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  const vClass =
    variant === 'none' ? 'reveal--none' : variant ? `reveal--${variant}` : 'reveal--up';

  return (
    <Comp
      ref={(node: any) => {
        ref.current = node;
      }}
      className={`reveal ${vClass} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ ...style, ...(styleProp as any) }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
