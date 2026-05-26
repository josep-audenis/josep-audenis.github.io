import * as React from "react";
import { cn } from "../../lib/utils";

type NavItem = {
  label: string;
  href: string;
};

type PresentationNavProps = {
  items: NavItem[];
};

export function PresentationNav({ items }: PresentationNavProps) {
  const [activeHref, setActiveHref] = React.useState(items[0]?.href ?? "");

  React.useEffect(() => {
    const sectionIds = items.map((item) => item.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        threshold: [0.45, 0.6, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <nav
        aria-label="Presentation navigation"
        className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 rounded-full border border-border bg-background/80 p-1 shadow-elegant backdrop-blur md:block"
      >
        <div className="relative flex items-center gap-1">
          {items.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      <div
        aria-label="Slide progress"
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "h-2.5 w-2.5 rounded-full border border-foreground/30 transition-all duration-300",
              activeHref === item.href
                ? "h-8 bg-foreground"
                : "bg-background/80 hover:bg-accent",
            )}
          >
            <span className="sr-only">{item.label}</span>
          </a>
        ))}
      </div>
    </>
  );
}
