import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import { formatDuration, formatViews, timeAgo } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";

export default function VideoListItem({ video }) {
  const owner = video.ownerDetails || video.owner || {};
  const thumbnailUrl = resolveMediaUrl(video.thumbnail);

  return (
    <Link
      to={`/watch/${video._id}`}
      className="group flex gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
    >
      <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-base-raised sm:w-56">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-600">
            No preview
          </div>
        )}
        {video.duration ? (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-display text-sm font-semibold text-zinc-100 group-hover:text-brand-300 sm:text-base">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
          {formatViews(video.views)} · {timeAgo(video.createdAt)}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Avatar src={owner.avatar} name={owner.username} size="xs" />
          <span className="truncate text-xs text-zinc-500 sm:text-sm">{owner.username}</span>
        </div>
        {video.description && (
          <p className="mt-2 hidden line-clamp-2 text-xs text-zinc-500 sm:block">
            {video.description}
          </p>
        )}
      </div>
    </Link>
  );
}
