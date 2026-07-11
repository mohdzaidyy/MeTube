import { LayoutGrid, List } from "lucide-react";
import { cn } from "../../utils/cn";

export default function ViewToggle({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-base-border bg-base-surface p-1">
      <button
        onClick={() => onChange("grid")}
        aria-label="Card view"
        aria-pressed={value === "grid"}
        className={cn(
          "rounded-md p-1.5 transition-colors",
          value === "grid" ? "bg-brand-500 text-white" : "text-zinc-400 hover:text-zinc-100"
        )}
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => onChange("list")}
        aria-label="List view"
        aria-pressed={value === "list"}
        className={cn(
          "rounded-md p-1.5 transition-colors",
          value === "list" ? "bg-brand-500 text-white" : "text-zinc-400 hover:text-zinc-100"
        )}
      >
        <List size={16} />
      </button>
    </div>
  );
}
