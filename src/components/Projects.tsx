import Reveal from "@/components/Reveal";
import { projects } from "@/data/resume";

const banners = [
  "from-accent/40 via-accent/10 to-transparent",
  "from-accent-2/40 via-accent-2/10 to-transparent",
  "from-sky-400/35 via-sky-400/10 to-transparent",
  "from-amber-400/30 via-amber-400/10 to-transparent",
  "from-rose-400/30 via-rose-400/10 to-transparent",
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-28">
      <Reveal>
        <p className="font-mono text-sm text-accent">03 · Projects</p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Things I&apos;ve built
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.name} delay={i * 100}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_var(--accent)]"
            >
              <div
                className={`relative flex h-36 items-center justify-between bg-gradient-to-br px-6 ${banners[i % banners.length]}`}
              >
                <span className="font-display text-4xl font-semibold text-foreground/70">
                  {initials(project.name)}
                </span>
                <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 font-mono text-[11px] text-foreground backdrop-blur">
                  Featured
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                    {project.name}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="mt-4 flex-1 space-y-2">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <Reveal key={project.name} delay={(i % 3) * 100} className="h-full">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_40px_-24px_var(--accent)]"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-1 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <ul className="mt-4 flex-1 space-y-2">
                {project.points.slice(0, 2).map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {point}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
