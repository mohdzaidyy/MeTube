import { cn } from "../../utils/cn";

export default function Spinner({ size = 20, className }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("inline-block animate-spin rounded-full border-2 border-current border-t-transparent text-brand-500", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <Spinner size={32} />
    </div>
  );
}
