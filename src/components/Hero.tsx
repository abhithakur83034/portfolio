"use client";

import { profile } from "@/data/resume";
import ProfilePhoto from "@/components/ProfilePhoto";
import RotatingRole from "@/components/RotatingRole";
import Counter from "@/components/Counter";
import AnimatedName from "@/components/AnimatedName";
import Reveal from "@/components/Reveal";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 7, suffix: "", label: "Live Products" },
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

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-sm text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
              Open to new opportunities
            </p>
          </Reveal>

          <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:mt-6 sm:text-6xl md:text-7xl">
            <AnimatedName text={profile.name} />
          </h1>

          <Reveal delay={500}>
            <h2 className="mt-3 h-10 text-xl font-medium sm:mt-4 sm:text-3xl">
              <RotatingRole />
            </h2>
          </Reveal>

          <Reveal delay={600}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={700}>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-10">
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
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent/50 hover:text-accent hover:scale-[1.04]"
              >
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={800}>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 sm:mt-16 sm:pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                  <p className="mt-1 font-mono text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <ProfilePhoto />
      </div>
    </section>
  );
}
