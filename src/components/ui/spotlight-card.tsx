import * as React from "react";
import { cn } from "../../lib/utils";

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: string;
};

export function SpotlightCard({
  children,
  className,
        spotlightColor = "rgba(117, 255, 232, 0.16)",
  ...props
}: SpotlightCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-elegant",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
