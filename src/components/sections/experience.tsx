import { CalendarDays, MapPin } from "lucide-react";
import { SpotlightCard } from "../ui/spotlight-card";

const roles = [
  {
    title: "Data Scientist",
    company: "Accenture · Data & AI",
    period: "October 2025 - Present",
    location: "Barcelona",
    notes: [
      "Working on data science and AI problems inside the Data & AI team.",
      "Focus on models, experimentation, analysis, and technical delivery.",
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
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Experience
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Technical work and research experience.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Roles focused on data science, AI, optimization, and technical
            research. Projects and experiments live separately in Work.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {roles.map((role) => (
            <SpotlightCard key={role.title} className="p-7">
              <div className="flex min-h-72 flex-col justify-between gap-8">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-lg text-muted-foreground">
                    {role.company}
                  </p>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="inline-flex items-center gap-2">
                    <CalendarDays size={16} aria-hidden="true" />
                    {role.period}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} aria-hidden="true" />
                    {role.location}
                  </p>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  {role.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
