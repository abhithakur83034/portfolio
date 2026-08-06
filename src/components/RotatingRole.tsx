"use client";

import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "React.js Specialist",
  "Next.js Engineer",
  "UI Craftsman",
];

export default function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span key={index} className="animate-fade-slide inline-block text-gradient">
      {roles[index]}
    </span>
  );
}
