"use client";

import { profile } from "@/data/resume";
import ProfilePhoto from "@/components/ProfilePhoto";
import RotatingRole from "@/components/RotatingRole";
import Counter from "@/components/Counter";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 5, suffix: "", label: "Live Products" },
  { value: 3, suffix: "", label: "Companies" },
];

export default function Hero() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--spot-x",
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    e.currentTarget.style.setProperty(
      "--spot-y",
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="spotlight bg-grid relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-1/4 h-[380px] w-[380px] rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[5%] bottom-1/4 h-[320px] w-[320px] rounded-full bg-accent-2/20 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-sm text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
            Open to new opportunities
          </p>

          <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {profile.name}
          </h1>

          <h2 className="mt-4 h-10 text-2xl font-medium sm:text-3xl">
            <RotatingRole />
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 animate-gradient px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.04]"
            >
              View Projects
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="mt-1 font-mono text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <ProfilePhoto />
      </div>
    </section>
  );
}
