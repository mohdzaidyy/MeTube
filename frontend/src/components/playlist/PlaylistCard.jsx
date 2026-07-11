import { Link } from "react-router-dom";
import { ListVideo } from "lucide-react";
import { formatCount } from "../../utils/formatters";

export default function PlaylistCard({ playlist }) {
  return (
    <Link
      to={`/playlist/${playlist._id}`}
      className="group flex flex-col gap-2 overflow-hidden rounded-xl border border-base-border bg-base-surface transition-colors hover:border-brand-500/50"
    >
      <div className="relative flex aspect-video items-center justify-center bg-base-raised text-zinc-600">
        <ListVideo size={28} />
        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
          {formatCount(playlist.totalVideos)} videos
        </span>
      </div>
      <div className="px-3 pb-3">
        <h3 className="line-clamp-1 font-display text-sm font-semibold text-zinc-100 group-hover:text-brand-300">
          {playlist.name}
        </h3>
        <p className="line-clamp-2 mt-0.5 text-xs text-zinc-500">{playlist.description}</p>
      </div>
    </Link>
  );
}
