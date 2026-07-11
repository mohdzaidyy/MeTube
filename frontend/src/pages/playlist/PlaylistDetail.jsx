import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Pencil, Trash2, ListVideo, X } from "lucide-react";
import { getPlaylistById, deletePlaylist, removeVideoFromPlaylist } from "../../api/playlistApi";
import { getErrorMessage } from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { FullPageSpinner } from "../../components/common/Spinner";
import Avatar from "../../components/common/Avatar";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PlaylistFormModal from "../../components/playlist/PlaylistFormModal";
import VideoListItem from "../../components/video/VideoListItem";
import { formatCount } from "../../utils/formatters";

export default function PlaylistDetail() {
  const { playlistId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await getPlaylistById(playlistId);
      setPlaylist(data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [playlistId]);

  useEffect(() => {
    load();
  }, [load]);

  const isOwner = user?._id === playlist?.owner?._id;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePlaylist(playlistId);
      toast.success("Playlist deleted");
      navigate(`/channel/${playlist.owner.username}/playlist`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist(videoId, playlistId);
      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
        totalVideos: prev.totalVideos - 1,
      }));
      toast.success("Removed from playlist");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) return <FullPageSpinner />;

  if (error || !playlist) {
    return (
      <div className="p-6">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error || "Playlist not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-base-border bg-base-surface p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
            <ListVideo size={24} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-zinc-100">{playlist.name}</h1>
            <p className="mt-1 max-w-xl text-sm text-zinc-500">{playlist.description}</p>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
              <Link to={`/channel/${playlist.owner?.username}`} className="flex items-center gap-1.5 hover:text-zinc-300">
                <Avatar src={playlist.owner?.avatar} name={playlist.owner?.username} size="xs" />
                {playlist.owner?.username}
              </Link>
              <span>·</span>
              <span>{formatCount(playlist.totalVideos)} videos</span>
              <span>·</span>
              <span>{formatCount(playlist.totalViews)} views</span>
            </div>
          </div>
        </div>

        {isOwner && (
          <div className="flex shrink-0 gap-2">
            <button onClick={() => setEditOpen(true)} className="btn-secondary">
              <Pencil size={14} /> Edit
            </button>
            <button onClick={() => setDeleteOpen(true)} className="btn-danger">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        {!playlist.videos || playlist.videos.length === 0 ? (
          <EmptyState
            icon={ListVideo}
            title="No videos in this playlist"
            description="Videos added to this playlist will show up here."
          />
        ) : (
          <div className="flex flex-col gap-1">
            {playlist.videos.map((video) => (
              <div key={video._id} className="group relative">
                <VideoListItem video={video} />
                {isOwner && (
                  <button
                    onClick={() => handleRemoveVideo(video._id)}
                    className="absolute right-3 top-3 hidden rounded-lg bg-black/70 p-1.5 text-zinc-300 hover:text-red-400 group-hover:block"
                    aria-label="Remove from playlist"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <PlaylistFormModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        playlist={playlist}
        onSaved={(updated) => setPlaylist((prev) => ({ ...prev, ...updated }))}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete playlist"
        description="Are you sure you want to delete this playlist? Once deleted, you will not be able to recover it."
      />
    </div>
  );
}
