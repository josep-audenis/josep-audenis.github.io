import { CalendarDays, MapPin } from "lucide-react";
import { AnimatedList } from "../ui/animated-list";
import { SpotlightCard } from "../ui/spotlight-card";

const roles = [
  {
    title: "Current Role Placeholder",
    company: "Company Name",
    period: "2024 - Present",
    location: "City / Remote",
    notes: [
      "Short impact bullet for current responsibilities.",
      "Another placeholder for scope, systems, or leadership.",
    ],
  },
  {
    title: "Previous Role Placeholder",
    company: "Company Name",
    period: "2022 - 2024",
    location: "City / Remote",
    notes: [
      "Short impact bullet for shipped work.",
      "Another placeholder for collaboration or ownership.",
    ],
  },
];

const focusAreas = [
  "Product engineering",
  "Data systems",
  "Developer tooling",
  "Research prototypes",
  "Frontend architecture",
  "Automation",
];

export function Experience() {
  return (
    <section id="experience" className="slide-section px-6 sm:px-10">
      <div className="slide-content mx-auto max-w-6xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Experience
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Working history, separated from projects.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Placeholder timeline for jobs, roles, and professional context.
            Keep this factual and scannable; use Work for project case studies.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-5">
            {roles.map((role) => (
              <SpotlightCard key={role.title} className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">{role.title}</h3>
                    <p className="mt-2 text-muted-foreground">{role.company}</p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground sm:text-right">
                    <p className="inline-flex items-center gap-2">
                      <CalendarDays size={16} aria-hidden="true" />
                      {role.period}
                    </p>
                    <p className="flex items-center gap-2 sm:justify-end">
                      <MapPin size={16} aria-hidden="true" />
                      {role.location}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                  {role.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
          <AnimatedList items={focusAreas} className="lg:sticky lg:top-28" />
        </div>
      </div>
    </section>
  );
}
