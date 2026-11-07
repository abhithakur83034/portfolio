"use client";

import { useEffect, useRef, useState } from "react";
import Tilt3D from "@/components/Tilt3D";

const GRID = 8;

function pieceMotion(row: number, col: number) {
  const seed = row * 131 + col * 977 + 53;
  const angle = ((seed * 71) % 360) * (Math.PI / 180);
  const distance = 110 + (seed % 7) * 34;
  const dx = Math.round(Math.cos(angle) * distance);
  const dy = Math.round(Math.sin(angle) * distance);
  const rotate = ((seed % 9) - 4) * 12;
  const delay = (seed * 37) % 3900;
  return { dx, dy, rotate, delay };
}

const pieces = Array.from({ length: GRID * GRID }, (_, i) => {
  const row = Math.floor(i / GRID);
  const col = i % GRID;
  return { row, col, ...pieceMotion(row, col) };
});

export default function ProfilePhoto() {
  const [broken, setBroken] = useState(false);
  const [visible, setVisible] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setBroken(true);
    }
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Only allow the pop-out once the mosaic reveal has fully assembled.
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setAssembled(true), 5200);
    return () => clearTimeout(t);
  }, [visible]);

  const badgeStyle = (delay: number, float: string) =>
    visible
      ? {
          animation: `fade-slide 0.6s ease forwards ${delay}ms, ${float} 6s ease-in-out infinite ${delay}ms`,
        }
      : { opacity: 0 };

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-sm">
      {/* hidden probe to detect a missing image without showing a broken <img> */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/profile.jpg"
        alt=""
        aria-hidden
        onError={() => setBroken(true)}
        className="absolute h-0 w-0 opacity-0"
      />

      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-2xl"
      />

      <Tilt3D max={10} className="relative z-10">
      <div className={`photo-bg relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] ${broken ? "border border-border bg-surface" : ""} ${assembled ? "is-ready" : ""}`}>
        {!broken ? (
          pieces.map(({ row, col, dx, dy, rotate, delay }) => (
            <div
              key={`${row}-${col}`}
              className="absolute bg-cover"
              style={{
                left: `${(col * 100) / GRID}%`,
                top: `${(row * 100) / GRID}%`,
                width: `${100 / GRID}%`,
                height: `${100 / GRID}%`,
                backgroundImage: "url(/profile.jpg)",
                backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                backgroundPosition: `${(col * 100) / (GRID - 1)}% ${(row * 100) / (GRID - 1)}%`,
                transitionProperty: "transform, opacity",
                transitionDuration: "1100ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${delay}ms`,
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translate(0, 0) rotate(0deg)"
                  : `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`,
              }}
            />
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface via-surface to-accent-soft">
            <span className="font-display text-6xl font-semibold text-foreground/30">
              AS
            </span>
            <span className="max-w-[70%] text-center font-mono text-xs text-muted">
              Drop your photo at public/profile.jpg
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>

      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/profile-cutout.png"
          alt=""
          aria-hidden
          draggable={false}
          className={`photo-cutout absolute inset-0 h-full w-full select-none object-fill ${assembled ? "is-ready" : ""}`}
        />
      )}
      </Tilt3D>

      <div
        className="absolute z-20 -right-4 -top-4 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur"
        style={badgeStyle(4600, "float")}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
        React.js
      </div>

      <div
        className="absolute z-20 -left-6 top-1/3 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur"
        style={badgeStyle(4800, "float-slow")}
      >
        Next.js
      </div>

      <div
        className="absolute z-20 -bottom-4 left-1/4 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur"
        style={badgeStyle(5000, "float")}
      >
        TypeScript
      </div>
    </div>
  );
}
