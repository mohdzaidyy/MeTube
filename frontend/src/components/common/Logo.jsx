import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function Logo({ className, iconOnly = false }) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2 shrink-0", className)}
      aria-label="Metube home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient shadow-glow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M6 4L20 12L6 20Z" fill="white" />
        </svg>
      </span>
      {!iconOnly && (
        <span className="font-display text-lg font-bold tracking-tight text-zinc-50">
          Metube
        </span>
      )}
    </Link>
  );
}
