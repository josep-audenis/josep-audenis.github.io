import { SplitText } from "../ui/split-text";
import speakingImage from "../../../assets/speaking.webp";

export function Hero() {
  return (
    <section
      id="intro"
      className="slide-section relative flex items-center overflow-hidden px-6 sm:px-10"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
      <div className="absolute left-1/2 top-12 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/35 blur-3xl" />
      <div className="slide-content mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-foreground">
            Hi, I'm
          </p>
          <h1 className="mt-5 text-balance text-6xl font-semibold leading-[0.92] tracking-tight sm:text-8xl">
            <SplitText text="Josep Audenis" />
          </h1>
          <p className="mt-10 max-w-3xl text-pretty text-2xl leading-9 text-foreground/90 sm:text-3xl sm:leading-[1.25] lg:text-2xl xl:text-3xl">
            I work on AI, optimization, algorithms, and data science problems.
          </p>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            I care most about the technical core: models, experiments, search,
            constraints, statistics, and turning rough problem spaces into
            working systems.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border bg-card px-4 py-2">
              AI systems
            </span>
            <span className="rounded-full border border-border bg-card px-4 py-2">
              Optimization
            </span>
            <span className="rounded-full border border-border bg-card px-4 py-2">
              Data science
            </span>
          </div>
        </div>

        <div className="hero-photo relative hidden min-h-[44rem] w-[152%] -translate-x-2 overflow-hidden lg:block xl:translate-x-4">
          <img
            src={speakingImage}
            alt="Josep Audenis speaking at a technical presentation"
            className="h-full min-h-[44rem] w-full object-cover object-[58%_45%] grayscale-[18%] brightness-[0.96] contrast-[1.04] saturate-[0.96]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)_/_0.46)_0%,hsl(var(--background)_/_0.16)_12%,transparent_28%),linear-gradient(180deg,hsl(var(--background)_/_0.52)_0%,transparent_15%,transparent_82%,hsl(var(--background)_/_0.62)_100%),radial-gradient(circle_at_48%_30%,hsl(var(--accent)_/_0.08),transparent_32%)]" />
        </div>
      </div>
    </section>
  );
}
