import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    description: "Best for roles, collaborations, and direct conversations.",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/josep-audenis",
    description: "Projects, experiments, and public code live here.",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    description: "Professional background, updates, and network context.",
    icon: Linkedin,
  },
];

export function Contact() {
  return (
    <section id="contact" className="slide-section px-6 sm:px-10">
      <div className="slide-content mx-auto grid min-h-[62svh] w-full max-w-6xl gap-12 border-t border-border pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="flex flex-col justify-between gap-10">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Contact
          </p>
          <div>
            <h2 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              Open to serious technical work.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              I am open to collaborations, product engineering roles, research
              prototypes, useful tooling, and focused technical conversations.
            </p>
          </div>
        </div>
        <div className="grid content-end gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="contact-card group flex min-h-28 flex-col justify-between rounded-lg border border-border bg-card px-6 py-5"
              >
                <span className="flex items-center justify-between gap-4 text-lg font-semibold">
                  {link.label}
                  <Icon
                    size={20}
                    aria-hidden="true"
                    className="contact-card-icon"
                  />
                </span>
                <span className="max-w-sm text-sm leading-6 text-muted-foreground">
                  {link.description}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
