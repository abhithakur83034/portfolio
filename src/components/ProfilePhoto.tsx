"use client";

import { useEffect, useRef, useState } from "react";

export default function ProfilePhoto() {
  const [broken, setBroken] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setBroken(true);
    }
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-2xl"
      />

      <div className="glow-border relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border bg-surface">
        {!broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src="/profile.jpg"
            alt="Abhishek Kumar Sharma"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover"
          />
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

      <div className="animate-float absolute -right-4 -top-4 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
        React.js
      </div>

      <div
        className="animate-float-slow absolute -left-6 top-1/3 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur"
        style={{ animationDelay: "1.2s" }}
      >
        Next.js
      </div>

      <div
        className="animate-float absolute -bottom-4 left-1/4 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 font-mono text-xs text-foreground shadow-lg backdrop-blur"
        style={{ animationDelay: "2.4s" }}
      >
        TypeScript
      </div>
    </div>
  );
}
