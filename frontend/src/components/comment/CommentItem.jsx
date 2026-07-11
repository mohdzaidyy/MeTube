import { useState } from "react";
import { ThumbsUp, Pencil, Trash2, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import Avatar from "../common/Avatar";
import ConfirmDialog from "../common/ConfirmDialog";
import { timeAgo } from "../../utils/formatters";
import { formatCount } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";
import { toggleCommentLike } from "../../api/likeApi";
import { updateComment, deleteComment } from "../../api/commentApi";
import { getErrorMessage } from "../../api/axiosClient";
import useLikeToggle from "../../hooks/useLikeToggle";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

export default function CommentItem({ comment, onUpdated, onDeleted }) {
  const { user } = useAuth();
  const isOwner = user?._id === comment.owner?._id;
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isLiked, count, toggle } = useLikeToggle({
    id: comment._id,
    initialLiked: comment.isLiked,
    initialCount: comment.likesCount,
    toggleFn: toggleCommentLike,
  });

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setIsSaving(true);
    try {
      const { data } = await updateComment(comment._id, trimmed);
      onUpdated?.(comment._id, data.data.content);
      setIsEditing(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteComment(comment._id);
      onDeleted?.(comment._id);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Avatar
        src={resolveMediaUrl(comment.owner?.avatar)}
        name={comment.owner?.fullName || comment.owner?.username}
        size="sm"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-zinc-100">
            {comment.owner?.username || "unknown"}
          </span>
          <span className="text-xs text-zinc-500">{timeAgo(comment.createdAt)}</span>
        </div>

        {isEditing ? (
          <div className="mt-1.5">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              className="input-field"
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              <button onClick={handleSave} disabled={isSaving} className="btn-primary !py-1.5 !px-3 text-xs">
                <Check size={14} /> Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setDraft(comment.content);
                }}
                className="btn-secondary !py-1.5 !px-3 text-xs"
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-zinc-300">
            {comment.content}
          </p>
        )}

        {!isEditing && (
          <div className="mt-1.5 flex items-center gap-4 text-xs text-zinc-500">
            <button
              onClick={toggle}
              className={cn("flex items-center gap-1.5 hover:text-zinc-200", isLiked && "text-brand-400")}
            >
              <ThumbsUp size={13} className={isLiked ? "fill-brand-400" : ""} />
              {formatCount(count)}
            </button>
            {isOwner && (
              <>
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-1 hover:text-zinc-200">
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => setConfirmOpen(true)}
                  className="flex items-center gap-1 hover:text-red-400"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete comment"
        description="Are you sure you want to delete this comment? This cannot be undone."
      />
    </div>
  );
}
