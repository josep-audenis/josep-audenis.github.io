import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "../ui/spotlight-card";
import { TiltedCard } from "../ui/tilted-card";

const projects = [
  {
    title: "Project One",
    type: "Product",
    description: "Placeholder for a concise case study or highlighted build.",
  },
  {
    title: "Project Two",
    type: "Research",
    description: "Placeholder for technical writing, experiments, or demos.",
  },
  {
    title: "Project Three",
    type: "Open source",
    description: "Placeholder for repositories, tools, or community work.",
  },
];

export function Work() {
  return (
    <section id="work" className="slide-section px-6 sm:px-10">
      <div className="slide-content mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Work
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Projects and experiments.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Project cards live here, separate from professional experience.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <TiltedCard key={project.title}>
              <SpotlightCard className="min-h-72 p-6">
                <div className="flex min-h-60 flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {project.type}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-4 leading-7 text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
                    View detail
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
