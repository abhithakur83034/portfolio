"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrubbed 3D entrance: the block swings up from a tilted, pushed-back
 * plane into place as it scrolls into view, then tilts away as it leaves.
 */
export default function Depth({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { rotateX: 22, z: -260, y: 80, opacity: 0.2, transformPerspective: 1400 },
        {
          rotateX: 0,
          z: 0,
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 45%", scrub: 1 },
        }
      );
      gsap.to(el, {
        rotateX: -10,
        z: -120,
        opacity: 0.4,
        ease: "power1.in",
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "bottom 35%", end: "bottom top", scrub: 1 },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`will-change-transform [transform-style:preserve-3d] ${className}`}>
      {children}
    </div>
  );
}
