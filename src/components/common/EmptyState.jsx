import { cn } from "../../utils/cn";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 px-4 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
          <Icon size={26} />
        </div>
      )}
      <p className="font-display text-base font-semibold text-zinc-100">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-zinc-500">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
