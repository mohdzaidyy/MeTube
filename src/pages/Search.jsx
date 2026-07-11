import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchX } from "lucide-react";
import { getAllVideos } from "../api/videoApi";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import VideoCollection from "../components/video/VideoCollection";
import ViewToggle from "../components/video/ViewToggle";
import LoadMoreButton from "../components/common/LoadMoreButton";
import EmptyState from "../components/common/EmptyState";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [viewMode, setViewMode] = useState("grid");

  const fetchPage = useCallback(
    (page) => getAllVideos({ page, limit: 12, query: query || undefined }),
    [query]
  );

  const { docs, isLoading, isLoadingMore, hasMore, loadMore } = usePaginatedFetch(fetchPage, [
    query,
  ]);

  if (!query) {
    return (
      <div className="p-4 sm:p-6">
        <EmptyState
          icon={SearchX}
          title="Search for something"
          description="Type in the search bar above to find videos on Metube."
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-zinc-100">
          Results for &ldquo;{query}&rdquo;
        </h1>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <VideoCollection
        videos={docs}
        isLoading={isLoading}
        viewMode={viewMode}
        emptyTitle="No results found"
        emptyDescription="We couldn't find any videos matching your search. Try different keywords."
      />
      <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} hasMore={hasMore} />
    </div>
  );
}
