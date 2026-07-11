import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FolderOpen, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { getUserPlaylists } from "../../api/playlistApi";
import { getErrorMessage } from "../../api/axiosClient";
import PlaylistCard from "../../components/playlist/PlaylistCard";
import PlaylistFormModal from "../../components/playlist/PlaylistFormModal";
import EmptyState from "../../components/common/EmptyState";
import { VideoCardSkeleton } from "../../components/video/VideoSkeleton";

export default function ChannelPlaylists() {
  const { channel, isOwner } = useOutletContext();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUserPlaylists(channel._id)
      .then(({ data }) => setPlaylists(data.data || []))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [channel._id]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {isOwner && (
        <div className="mb-4 flex justify-end">
          <button onClick={() => setCreateOpen(true)} className="btn-primary">
            <Plus size={15} /> New playlist
          </button>
        </div>
      )}

      {playlists.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No playlist created"
          description="There are no playlists created on this channel."
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
