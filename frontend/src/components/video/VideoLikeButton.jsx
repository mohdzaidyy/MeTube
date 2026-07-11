import { ThumbsUp } from "lucide-react";
import { toggleVideoLike } from "../../api/likeApi";
import { formatCount } from "../../utils/formatters";
import useLikeToggle from "../../hooks/useLikeToggle";
import { cn } from "../../utils/cn";

export default function VideoLikeButton({ videoId, isLiked, likesCount }) {
  const { isLiked: liked, count, toggle } = useLikeToggle({
    id: videoId,
    initialLiked: isLiked,
    initialCount: likesCount,
    toggleFn: toggleVideoLike,
  });

  return (
    <button
      onClick={toggle}
      className={cn("btn-secondary", liked && "border-brand-500 bg-brand-500/15 text-brand-300")}
      aria-pressed={liked}
    >
      <ThumbsUp size={15} className={liked ? "fill-brand-300" : ""} />
      {formatCount(count)}
    </button>
  );
}
