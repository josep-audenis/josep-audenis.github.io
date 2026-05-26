import { About } from "./components/sections/about";
import { Contact } from "./components/sections/contact";
import { Experience } from "./components/sections/experience";
import { Hero } from "./components/sections/hero";
import { Work } from "./components/sections/work";
import { PresentationNav } from "./components/ui/presentation-nav";

const navItems = [
  { label: "Intro", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function App() {
  return (
    <main className="h-svh snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth bg-background text-foreground">
      <PresentationNav items={navItems} />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
    </main>
  );
}
