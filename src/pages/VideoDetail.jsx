import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Bookmark, Lock } from "lucide-react";
import { getVideoById, getAllVideos } from "../api/videoApi";
import { getErrorMessage } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { FullPageSpinner } from "../components/common/Spinner";
import Avatar from "../components/common/Avatar";
import VideoLikeButton from "../components/video/VideoLikeButton";
import SubscribeButton from "../components/channel/SubscribeButton";
import SaveToPlaylistModal from "../components/playlist/SaveToPlaylistModal";
import CommentSection from "../components/comment/CommentSection";
import VideoListItem from "../components/video/VideoListItem";
import { VideoListItemSkeleton } from "../components/video/VideoSkeleton";
import { resolveMediaUrl } from "../utils/media";
import { formatViews, timeAgo, formatCount } from "../utils/formatters";

export default function VideoDetail() {
  const { videoId } = useParams();
  const { isAuthenticated } = useAuth();

  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveOpen, setSaveOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const [related, setRelated] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  const loadVideo = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getVideoById(videoId);
      setVideo(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [videoId, isAuthenticated]);

  useEffect(() => {
    loadVideo();
  }, [loadVideo]);

  useEffect(() => {
    setRelatedLoading(true);
    getAllVideos({ page: 1, limit: 10 })
      .then(({ data }) => {
        const docs = (data.data?.docs || []).filter((v) => v._id !== videoId);
        setRelated(docs);
      })
      .catch(() => {})
      .finally(() => setRelatedLoading(false));
  }, [videoId]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
          <Lock size={24} />
        </div>
        <h1 className="font-display text-lg font-semibold text-zinc-100">
          Log in to watch this video
        </h1>
        <p className="max-w-sm text-sm text-zinc-500">
          Create a free account or log in to watch videos, like, comment and subscribe to channels.
        </p>
        <div className="flex gap-3">
          <Link to="/login" state={{ from: `/watch/${videoId}` }} className="btn-primary">
            Log in
          </Link>
          <Link to="/register" className="btn-secondary">
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <FullPageSpinner />;

  if (error || !video) {
    return (
      <div className="p-6">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error || "Video not found."}
        </p>
      </div>
    );
  }

  const owner = video.owner || {};
  const videoUrl = resolveMediaUrl(video.videoFile);

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          {videoUrl ? (
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              autoPlay
              className="h-full w-full"
              poster={resolveMediaUrl(video.thumbnail)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-600">
              Video unavailable
            </div>
          )}
        </div>

        <h1 className="mt-4 font-display text-lg font-bold text-zinc-100 sm:text-xl">
          {video.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <Link to={`/channel/${owner.username}`} className="flex items-center gap-3">
            <Avatar src={owner.avatar} name={owner.username} size="md" />
            <div>
              <p className="text-sm font-semibold text-zinc-100">{owner.username}</p>
              <p className="text-xs text-zinc-500">
                {formatCount(owner.subscribersCount)} subscribers
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <SubscribeButton channelId={owner._id} isSubscribed={owner.isSubscribed} />
            <VideoLikeButton videoId={video._id} isLiked={video.isLiked} likesCount={video.likesCount} />
            <button className="btn-secondary" onClick={() => setSaveOpen(true)}>
              <Bookmark size={15} /> Save
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-base-border bg-base-surface p-4">
          <p className="text-xs font-medium text-zinc-400">
            {formatViews(video.views)} · {timeAgo(video.createdAt)}
          </p>
          <p
            className={`mt-2 whitespace-pre-wrap text-sm text-zinc-300 ${
              descExpanded ? "" : "line-clamp-3"
            }`}
          >
            {video.description}
          </p>
          {video.description?.length > 160 && (
            <button
              onClick={() => setDescExpanded((v) => !v)}
              className="mt-2 text-xs font-medium text-brand-400 hover:text-brand-300"
            >
              {descExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="mt-6 border-t border-base-border pt-6">
          <CommentSection videoId={video._id} />
        </div>
      </div>

      <aside className="min-w-0">
        <h2 className="mb-3 font-display text-sm font-semibold text-zinc-300">Up next</h2>
        <div className="flex flex-col gap-1">
          {relatedLoading
            ? Array.from({ length: 6 }).map((_, i) => <VideoListItemSkeleton key={i} />)
            : related.map((v) => <VideoListItem key={v._id} video={v} />)}
        </div>
      </aside>

      <SaveToPlaylistModal isOpen={saveOpen} onClose={() => setSaveOpen(false)} videoId={video._id} />
    </div>
  );
}
