import { profile } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with Next.js &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
