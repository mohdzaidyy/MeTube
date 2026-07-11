import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Check, ListVideo } from "lucide-react";
import Modal from "../common/Modal";
import Spinner from "../common/Spinner";
import EmptyState from "../common/EmptyState";
import PlaylistFormModal from "./PlaylistFormModal";
import { getUserPlaylists, addVideoToPlaylist, removeVideoFromPlaylist } from "../../api/playlistApi";
import { getErrorMessage } from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function SaveToPlaylistModal({ isOpen, onClose, videoId }) {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingId, setPendingId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !user?._id) return;
    setIsLoading(true);
    getUserPlaylists(user._id)
      .then(({ data }) => setPlaylists(data.data || []))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setIsLoading(false));
  }, [isOpen, user?._id]);

  const isVideoInPlaylist = (playlist) =>
    Array.isArray(playlist.videos) && playlist.videos.includes(videoId);

  const handleToggle = async (playlist) => {
    setPendingId(playlist._id);
    const alreadyIn = isVideoInPlaylist(playlist);
    try {
      if (alreadyIn) {
        await removeVideoFromPlaylist(videoId, playlist._id);
        setPlaylists((prev) =>
          prev.map((p) =>
            p._id === playlist._id
              ? { ...p, videos: (p.videos || []).filter((v) => v !== videoId) }
              : p
          )
        );
      } else {
        await addVideoToPlaylist(videoId, playlist._id);
        setPlaylists((prev) =>
          prev.map((p) =>
            p._id === playlist._id ? { ...p, videos: [...(p.videos || []), videoId] } : p
          )
        );
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setPendingId(null);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Save video to..." size="sm">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner size={22} />
          </div>
        ) : playlists.length === 0 ? (
          <EmptyState
            icon={ListVideo}
            title="No playlists yet"
            description="Create your first playlist to start saving videos."
          />
        ) : (
          <ul className="space-y-1">
            {playlists.map((playlist) => {
              const checked = isVideoInPlaylist(playlist);
              return (
                <li key={playlist._id}>
                  <button
                    onClick={() => handleToggle(playlist)}
                    disabled={pendingId === playlist._id}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-white/5"
                  >
                    <span className="truncate text-zinc-200">{playlist.name}</span>
                    {pendingId === playlist._id ? (
                      <Spinner size={14} />
                    ) : (
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          checked ? "border-brand-500 bg-brand-500 text-white" : "border-base-border"
                        }`}
                      >
                        {checked && <Check size={12} />}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <button
          onClick={() => setCreateOpen(true)}
          className="btn-secondary mt-4 w-full"
        >
          <Plus size={15} /> New playlist
        </button>
      </Modal>

      <PlaylistFormModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={(newPlaylist) => setPlaylists((prev) => [newPlaylist, ...prev])}
      />
    </>
  );
}
