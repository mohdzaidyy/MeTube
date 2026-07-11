import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl border border-base-border bg-base-surface shadow-2xl animate-scale-in",
          sizeClass
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-base-border px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-zinc-100">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-sm text-zinc-500">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-base-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
