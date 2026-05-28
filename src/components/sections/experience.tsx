import { CalendarDays, MapPin } from "lucide-react";
import { SpotlightCard } from "../ui/spotlight-card";

const roles = [
  {
    title: "Data Scientist",
    company: "Accenture · Data & AI",
    period: "October 2025 - Present",
    location: "Barcelona",
    notes: [
      "Working on GenAI and agentic systems inside the Data & AI team.",
      "Focus on LLM workflows, automation, evaluation, and technical delivery.",
    ],
  },
  {
    title: "Quantum Computing Assistant Researcher",
    company: "La Salle",
    period: "September 2024 - July 2025",
    location: "Barcelona",
    notes: [
      "Supported research work around quantum computing topics and experiments.",
      "Worked close to algorithmic, mathematical, and computational ideas.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="slide-section px-6 sm:px-10">
      <div className="slide-content mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Experience
          </p>
        </div>

        <div className="relative pl-0 md:pl-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:block" />
          <div className="space-y-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="experience-item relative"
              >
                <SpotlightCard className="experience-card p-6">
                  <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-start">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {role.title}
                      </h3>
                      <p className="mt-3 text-lg text-muted-foreground">
                        {role.company}
                      </p>
                      <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground">
                        {role.notes.map((note) => (
                          <li key={note} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3 text-sm text-muted-foreground lg:text-right">
                      <p className="inline-flex items-center gap-2 lg:justify-end">
                        <CalendarDays size={16} aria-hidden="true" />
                        {role.period}
                      </p>
                      <p className="flex items-center gap-2 lg:justify-end">
                        <MapPin size={16} aria-hidden="true" />
                        {role.location}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
