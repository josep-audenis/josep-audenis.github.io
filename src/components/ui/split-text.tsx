import { cn } from "../../lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
};

export function SplitText({ text, className, wordClassName }: SplitTextProps) {
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={cn("animate-word-reveal opacity-0", wordClassName)}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          {word}
          {index < text.split(" ").length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </span>
  );
}
