import { useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import { getAllVideos } from "../../api/videoApi";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import VideoCollection from "../../components/video/VideoCollection";
import ViewToggle from "../../components/video/ViewToggle";
import LoadMoreButton from "../../components/common/LoadMoreButton";
import UploadVideoModal from "../../components/video/UploadVideoModal";

export default function ChannelVideos() {
  const { channel, isOwner } = useOutletContext();
  const [viewMode, setViewMode] = useState("grid");
  const [uploadOpen, setUploadOpen] = useState(false);

  const fetchPage = useCallback(
    (page) => getAllVideos({ page, limit: 12, userId: channel._id }),
    [channel._id]
  );

  const { docs, isLoading, isLoadingMore, hasMore, loadMore } = usePaginatedFetch(fetchPage, [
    channel._id,
  ]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <VideoCollection
        videos={docs}
        isLoading={isLoading}
        viewMode={viewMode}
        emptyTitle="No videos uploaded"
        emptyDescription="This page has yet to upload a video. Search another page in order to find more videos."
      />

      {!isLoading && docs.length === 0 && isOwner && (
        <div className="mt-4 flex justify-center">
          <button onClick={() => setUploadOpen(true)} className="btn-primary">
            <Plus size={15} /> New video
          </button>
        </div>
      )}

      <LoadMoreButton onClick={loadMore} isLoading={isLoadingMore} hasMore={hasMore} />

      <UploadVideoModal isOpen={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
