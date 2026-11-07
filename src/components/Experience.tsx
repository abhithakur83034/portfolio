import Reveal from "@/components/Reveal";
import Tilt3D from "@/components/Tilt3D";
import Depth from "@/components/Depth";
import { experience } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-28">
      <Reveal>
        <p className="font-mono text-sm text-accent">02 · Experience</p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Where I&apos;ve worked
        </h2>
      </Reveal>

      <Depth className="mt-10 space-y-6 sm:mt-14">
        {experience.map((job, i) => {
          const current = i === 0;
          return (
            <Reveal key={job.company} delay={i * 100}>
              <Tilt3D max={5}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_40px_-24px_var(--accent)] sm:p-8">
                <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-accent/5 blur-3xl transition-opacity group-hover:bg-accent/10" />

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="pop pop-3 font-display text-lg font-semibold text-foreground">
                        {job.role}
                      </h3>
                      {current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 font-mono text-[11px] text-accent">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-ring" />
                          Current
                        </span>
                      )}
                    </div>
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      <span className="text-sm text-accent">{job.company}</span>
                    )}
                    <p className="font-mono text-xs text-muted">{job.location}</p>
                  </div>

                  <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              </Tilt3D>
            </Reveal>
          );
        })}
      </Depth>
    </section>
  );
}
