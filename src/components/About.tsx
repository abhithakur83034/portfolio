import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/resume";

const groupAccent: Record<string, string> = {
  Frontend: "from-accent/25 to-transparent",
  Backend: "from-accent-2/25 to-transparent",
  "Tools & Practices": "from-sky-400/20 to-transparent",
};

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="font-mono text-sm text-accent">01 · About</p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Skills &amp; toolkit
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <div className="glow-border relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            <p className="font-display text-lg font-semibold text-foreground">
              Building interfaces people trust.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Shipping production frontends for enterprise insurance
              platforms and SaaS products — pixel-accurate UI, REST
              integrations, and performance tuning.
            </p>
          </div>
        </Reveal>

        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 100}>
            <div
              className={`relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40`}
            >
              <div
                className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${
                  groupAccent[group.label] ?? "from-accent/20 to-transparent"
                } blur-2xl`}
              />
              <h3 className="font-mono text-sm text-accent">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-background/40 px-3 py-1 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
