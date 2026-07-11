import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import Avatar from "../common/Avatar";
import ConfirmDialog from "../common/ConfirmDialog";
import { togglePublishStatus, deleteVideo } from "../../api/videoApi";
import { getErrorMessage } from "../../api/axiosClient";
import { formatFullDate } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";
import { cn } from "../../utils/cn";

export default function DashboardVideoRow({ video, owner, onEdit, onDeleted }) {
  const [isPublished, setIsPublished] = useState(video.isPublished);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleTogglePublish = async () => {
    setIsToggling(true);
    const next = !isPublished;
    setIsPublished(next);
    try {
      await togglePublishStatus(video._id);
    } catch (err) {
      setIsPublished(!next);
      toast.error(getErrorMessage(err));
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteVideo(video._id);
      toast.success("Video deleted");
      onDeleted?.(video._id);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <tr className="border-b border-base-border last:border-0">
        <td className="py-3 pl-4 pr-2">
          <button
            role="switch"
            aria-checked={isPublished}
            onClick={handleTogglePublish}
            disabled={isToggling}
            className={cn(
              "relative h-5 w-9 rounded-full transition-colors",
              isPublished ? "bg-brand-500" : "bg-zinc-700"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                isPublished ? "translate-x-4" : "translate-x-0.5"
              )}
            />
          </button>
        </td>
        <td className="py-3 pr-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              isPublished ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
            )}
          >
            {isPublished ? "Published" : "Unpublished"}
          </span>
        </td>
        <td className="py-3 pr-4">
          <div className="flex min-w-[220px] items-center gap-3">
            <div className="h-10 w-16 shrink-0 overflow-hidden rounded bg-base-raised">
              {resolveMediaUrl(video.thumbnail) && (
                <img
                  src={resolveMediaUrl(video.thumbnail)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Avatar src={owner?.avatar} name={owner?.username} size="xs" />
              <span className="line-clamp-1 max-w-[220px] text-sm text-zinc-200">{video.title}</span>
            </div>
          </div>
        </td>
        <td className="py-3 pr-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400">
              <ThumbsUp size={11} /> {video.likesCount ?? 0}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-red-500/15 px-2 py-0.5 text-xs text-red-400">
              <ThumbsDown size={11} /> 0
            </span>
          </div>
        </td>
        <td className="py-3 pr-4 text-sm text-zinc-500">{formatFullDate(video.createdAt)}</td>
        <td className="py-3 pr-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setConfirmOpen(true)}
              className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-red-400"
              aria-label="Delete video"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={() => onEdit(video)}
              className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
              aria-label="Edit video"
            >
              <Pencil size={15} />
            </button>
          </div>
        </td>
      </tr>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Video"
        description="Are you sure you want to delete this video? Once its deleted, you will not be able to recover it."
      />
    </>
  );
}
