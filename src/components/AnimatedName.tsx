"use client";

import { useEffect, useState } from "react";

const directions = [
  { x: -140, y: -40, rotate: -10 },
  { x: 0, y: -160, rotate: 8 },
  { x: 140, y: -40, rotate: 10 },
  { x: 0, y: 160, rotate: -8 },
];

export default function AnimatedName({ text }: { text: string }) {
  const words = text.split(" ");
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setArrived(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span className="inline-flex flex-wrap gap-x-4">
      {words.map((word, i) => {
        const dir = directions[i % directions.length];
        return (
          <span
            key={word + i}
            className="inline-block will-change-transform"
            style={{
              transitionProperty: "transform, opacity, filter",
              transitionDuration: "1000ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * 130}ms`,
              opacity: arrived ? 1 : 0,
              filter: arrived ? "blur(0px)" : "blur(8px)",
              transform: arrived
                ? "translate(0, 0) rotate(0deg)"
                : `translate(${dir.x}px, ${dir.y}px) rotate(${dir.rotate}deg)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
