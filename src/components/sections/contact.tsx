import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  { label: "GitHub", href: "https://github.com/josep-audenis", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
];

export function Contact() {
  return (
    <section id="contact" className="slide-section px-6 sm:px-10">
      <div className="slide-content mx-auto grid max-w-6xl gap-10 border-t border-border pt-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Contact
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Placeholder call to connect.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center justify-between rounded-md border border-border bg-background/70 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
              >
                <span>{link.label}</span>
                <Icon size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
