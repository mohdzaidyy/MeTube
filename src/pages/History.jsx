import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getWatchHistory } from "../api/userApi";
import { getErrorMessage } from "../api/axiosClient";
import VideoCollection from "../components/video/VideoCollection";
import ViewToggle from "../components/video/ViewToggle";

export default function History() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    setIsLoading(true);
    getWatchHistory()
      .then(({ data }) => setVideos(data.data || []))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-zinc-100">Watch History</h1>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>
      <VideoCollection
        videos={videos}
        isLoading={isLoading}
        viewMode={viewMode}
        emptyTitle="No watch history"
        emptyDescription="Videos you watch will show up here."
      />
    </div>
  );
}
