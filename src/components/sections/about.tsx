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
            I am a Barcelona-based engineer working in Data & AI.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            I like building systems around complex problems: AI tools,
            optimization engines, prediction workflows, and software that helps
            people reason, plan, or decide better.
          </p>
          <p className="text-lg leading-8 text-muted-foreground">
            My work usually combines algorithms, data, constraints,
            experimentation, LLM systems, and product-minded engineering. I am
            especially interested in projects where technical depth matters, but
            the end result still has to be useful, understandable, and reliable.
          </p>
          <p className="text-lg leading-8 text-foreground/90">
            For me, the interesting part is not just building models. It is
            turning them into systems that work.
          </p>
        </div>
      </div>
    </section>
  );
}
