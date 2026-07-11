import { Film } from "lucide-react";
import VideoCard from "./VideoCard";
import VideoListItem from "./VideoListItem";
import { VideoCardSkeleton, VideoListItemSkeleton } from "./VideoSkeleton";
import EmptyState from "../common/EmptyState";

export default function VideoCollection({
  videos,
  isLoading,
  viewMode = "grid",
  emptyTitle = "No videos available",
  emptyDescription = "There are no videos here available. Please try to search something else.",
}) {
  if (isLoading) {
    return viewMode === "grid" ? (
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <VideoListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return <EmptyState icon={Film} title={emptyTitle} description={emptyDescription} />;
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-1">
        {videos.map((video) => (
          <VideoListItem key={video._id} video={video} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
}
