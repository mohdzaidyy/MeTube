import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, FolderOpen } from "lucide-react";
import { getUserPlaylists } from "../api/playlistApi";
import { getErrorMessage } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import PlaylistCard from "../components/playlist/PlaylistCard";
import PlaylistFormModal from "../components/playlist/PlaylistFormModal";
import EmptyState from "../components/common/EmptyState";
import { VideoCardSkeleton } from "../components/video/VideoSkeleton";

export default function Collections() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    setIsLoading(true);
    getUserPlaylists(user._id)
      .then(({ data }) => setPlaylists(data.data || []))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [user?._id]);

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-zinc-100">Collections</h1>
        <button onClick={() => setCreateOpen(true)} className="btn-primary">
          <Plus size={15} /> New playlist
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      ) : playlists.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No playlists yet"
          description="Create your first playlist to start organizing videos."
          action={
            <button onClick={() => setCreateOpen(true)} className="btn-primary">
              <Plus size={15} /> New playlist
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      )}

      <PlaylistFormModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={(p) => setPlaylists((prev) => [p, ...prev])}
      />
    </div>
  );
}
