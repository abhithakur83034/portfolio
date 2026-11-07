import Reveal from "@/components/Reveal";
import Tilt3D from "@/components/Tilt3D";
import Depth from "@/components/Depth";
import { skillGroups } from "@/data/resume";

const groupAccent: Record<string, string> = {
  Frontend: "from-accent/25 to-transparent",
  Backend: "from-accent-2/25 to-transparent",
  "Tools & Practices": "from-sky-400/20 to-transparent",
};

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-28">
      <Reveal>
        <p className="font-mono text-sm text-accent">01 · About</p>
        <h2 className="font-display mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Skills &amp; toolkit
        </h2>
      </Reveal>

      <Depth className="mt-10 grid gap-6 sm:grid-cols-2 sm:mt-14 lg:grid-cols-4">
        <Reveal className="h-full">
          <Tilt3D className="h-full" max={5}>
          <div className="glow-border relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-transform duration-300">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            <p className="pop pop-3 font-display text-lg font-semibold text-foreground">
              Building interfaces people trust.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Shipping production frontends for enterprise insurance
              platforms and SaaS products — pixel-accurate UI, REST
              integrations, and performance tuning.
            </p>
          </div>
          </Tilt3D>
        </Reveal>

        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={(i + 1) * 100} className="h-full">
            <Tilt3D className="h-full" max={5}>
            <div
              className={`relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_40px_-20px_var(--accent)]`}
            >
              <div
                className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${
                  groupAccent[group.label] ?? "from-accent/20 to-transparent"
                } blur-2xl`}
              />
              <h3 className="pop pop-3 font-mono text-sm text-accent">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="chip-3d rounded-full border border-border bg-background/40 px-3 py-1 text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            </Tilt3D>
          </Reveal>
        ))}
      </Depth>
    </section>
  );
}
