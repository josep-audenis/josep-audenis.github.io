import { ArrowUpRight } from "lucide-react";
import { SplitText } from "../ui/split-text";

export function Hero() {
  return (
    <section
      id="intro"
      className="slide-section relative flex items-center overflow-hidden px-6 sm:px-10"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      <div className="absolute left-1/2 top-12 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/35 blur-3xl" />
      <div className="slide-content mx-auto flex w-full max-w-6xl flex-col gap-10">
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Personal website
        </p>
        <div className="max-w-4xl">
          <h1 className="text-balance text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">
            <SplitText text="Josep Audenis" />
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            Software-minded personal site for experience, selected projects,
            notes, and contact. Clean static site, ready for GitHub Pages.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#work"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View work
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#experience"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background/70 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background/70 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
