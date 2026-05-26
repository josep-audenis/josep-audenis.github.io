import * as React from "react";
import { cn } from "../../lib/utils";

type TiltedCardProps = React.HTMLAttributes<HTMLDivElement> & {
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

export function TiltedCard({
  className,
  children,
  rotateAmplitude = 8,
  scaleOnHover = 1.015,
  ...props
}: TiltedCardProps) {
  const [transform, setTransform] = React.useState("perspective(900px)");

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = -y * rotateAmplitude;
    const rotateY = x * rotateAmplitude;
    setTransform(
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`,
    );
  }

  return (
    <div
      className={cn(
        "transition-transform duration-200 ease-out motion-reduce:transform-none",
        className,
      )}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform("perspective(900px)")}
      {...props}
    >
      {children}
    </div>
  );
}
