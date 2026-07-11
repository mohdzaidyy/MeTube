import { useState } from "react";
import { resolveMediaUrl, getInitials } from "../../utils/media";
import { cn } from "../../utils/cn";

const SIZE_MAP = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-24 w-24 text-2xl",
};

export default function Avatar({ src, name = "", size = "md", className }) {
  const [errored, setErrored] = useState(false);
  const url = resolveMediaUrl(src);
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;

  if (url && !errored) {
    return (
      <img
        src={url}
        alt={name || "avatar"}
        onError={() => setErrored(true)}
        className={cn(
          "shrink-0 rounded-full object-cover bg-base-raised",
          sizeClass,
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display font-semibold text-white",
        sizeClass,
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
