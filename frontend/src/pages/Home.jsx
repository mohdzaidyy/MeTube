import { useCallback, useState } from "react";
import { getAllVideos } from "../api/videoApi";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import VideoCollection from "../components/video/VideoCollection";
import ViewToggle from "../components/video/ViewToggle";
import LoadMoreButton from "../components/common/LoadMoreButton";

export default function Home() {
  const [viewMode, setViewMode] = useState("grid");

  const fetchPage = useCallback(
    (page) => getAllVideos({ page, limit: 12, sortBy: "createdAt", sortType: "desc" }),
    []
  );

  const { docs, isLoading, isLoadingMore, hasMore, loadMore, error } = usePaginatedFetch(
    fetchPage,
    []
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-zinc-100">Home</h1>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <VideoCollection videos={docs} isLoading={isLoading} viewMode={viewMode} />
      <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} hasMore={hasMore} />
    </div>
  );
}
