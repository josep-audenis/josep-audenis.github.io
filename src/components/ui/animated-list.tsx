import { cn } from "../../lib/utils";

type AnimatedListProps = {
  items: string[];
  className?: string;
};

export function AnimatedList({ items, className }: AnimatedListProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-card to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-card to-transparent" />
      <div className="max-h-80 overflow-hidden p-2">
        <div className="animate-list-scroll space-y-2">
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-md border border-border/70 bg-background/70 px-4 py-3 text-sm text-foreground shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
