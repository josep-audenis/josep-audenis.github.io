export function About() {
  return (
    <section id="about" className="slide-section px-6 sm:px-10">
      <div className="slide-content mx-auto grid max-w-6xl gap-10 border-t border-border pt-14 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            About
          </p>
        </div>
        <div className="space-y-6 text-2xl leading-10 tracking-tight sm:text-3xl sm:leading-[1.35]">
          <p>
            Short introduction placeholder. Replace this with a concise summary
            of background, focus areas, and current work.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            This space can hold interests, preferred tools, research notes, or
            any detail that gives visitors useful context without becoming a CV.
          </p>
        </div>
      </div>
    </section>
  );
}
