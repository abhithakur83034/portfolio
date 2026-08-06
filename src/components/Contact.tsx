import Reveal from "@/components/Reveal";
import { profile } from "@/data/resume";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="glow-border relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accent/30 to-accent-2/30 blur-[100px]"
          />

          <p className="font-mono text-sm text-accent">04 · Contact</p>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-semibold text-foreground sm:text-4xl">
            Let&apos;s build something great together
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted leading-relaxed">
            I&apos;m open to new frontend opportunities and freelance work.
            Reach out and I&apos;ll get back to you.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 animate-gradient px-8 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.04]"
          >
            {profile.email}
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="rounded-full border border-border px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              LinkedIn
            </a>
            <span className="rounded-full border border-border px-4 py-2 font-mono text-sm text-muted">
              {profile.location}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
