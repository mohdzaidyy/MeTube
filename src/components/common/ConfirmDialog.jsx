import { Trash2 } from "lucide-react";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete item",
  description = "Are you sure you want to delete this? Once deleted, you will not be able to recover it.",
  confirmLabel = "Delete",
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-500">
          <Trash2 size={18} />
        </div>
        <div>
          <h3 className="font-display text-base font-semibold text-zinc-100">
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button className="btn-secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </button>
        <button className="btn-danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading && <Spinner size={14} />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
