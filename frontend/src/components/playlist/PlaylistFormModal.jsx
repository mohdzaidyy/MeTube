import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Spinner from "../common/Spinner";
import { createPlaylist, updatePlaylist } from "../../api/playlistApi";
import { getErrorMessage } from "../../api/axiosClient";

export default function PlaylistFormModal({ isOpen, onClose, playlist, onSaved }) {
  const isEditMode = Boolean(playlist);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(playlist?.name || "");
      setDescription(playlist?.description || "");
    }
  }, [isOpen, playlist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error("Name and description are both required");
      return;
    }
    setIsSaving(true);
    try {
      const payload = { name: name.trim(), description: description.trim() };
      const { data } = isEditMode
        ? await updatePlaylist(playlist._id, payload)
        : await createPlaylist(payload);
      toast.success(isEditMode ? "Playlist updated" : "Playlist created");
      onSaved?.(data.data);
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit playlist" : "New playlist"}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSubmit} disabled={isSaving}>
            {isSaving && <Spinner size={14} />}
            {isEditMode ? "Save changes" : "Create playlist"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="playlist-name" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Name
          </label>
          <input
            id="playlist-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="React Mastery"
          />
        </div>
        <div>
          <label htmlFor="playlist-description" className="mb-1.5 block text-sm font-medium text-zinc-300">
            Description
          </label>
          <textarea
            id="playlist-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="input-field"
            placeholder="What's this playlist about?"
          />
        </div>
      </form>
    </Modal>
  );
}
