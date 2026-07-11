import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import { formatDuration, formatViews, timeAgo } from "../../utils/formatters";
import { resolveMediaUrl } from "../../utils/media";

export default function VideoCard({ video }) {
  const owner = video.ownerDetails || video.owner || {};
  const thumbnailUrl = resolveMediaUrl(video.thumbnail);

  return (
    <Link to={`/watch/${video._id}`} className="group flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-base-raised">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-600">
            No preview
          </div>
        )}
        {video.duration ? (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {formatDuration(video.duration)}
          </span>
        ) : null}
      </div>

      <div className="flex gap-2.5">
        <Avatar src={owner.avatar} name={owner.username} size="sm" className="mt-0.5" />
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-zinc-100 group-hover:text-brand-300">
            {video.title}
          </h3>
          <p className="mt-1 truncate text-xs text-zinc-500">
            {formatViews(video.views)} · {timeAgo(video.createdAt)}
          </p>
          <p className="truncate text-xs text-zinc-500">{owner.username}</p>
        </div>
      </div>
    </Link>
  );
}
